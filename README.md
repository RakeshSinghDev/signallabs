# SignalLab — Research Workspace

An AI-assisted quantitative trading research workspace that turns intuitive, colloquial market observations into explicit, testable, and auditable empirical experiments.

SignalLab strictly adheres to the research paradigm:
$$\text{ASK} \longrightarrow \text{CLARIFY} \longrightarrow \text{DEFINE} \longrightarrow \text{TEST} \longrightarrow \text{LEARN} \longrightarrow \text{REPORT}$$

---

## 1. System Architecture

The application is structured with a clean, explicit separation between **Frontend (`client/`)** and **Backend (`server/`)**:

```
signallabs/
├── client/                         ← FRONTEND (React 18 + Vite + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/             # Header, Footer
│   │   │   ├── navigation/         # Contextual tabs & navigation stepper
│   │   │   ├── research/           # Research input cards & seed buttons
│   │   │   ├── clarify/            # Assumption cards & parameter selector
│   │   │   ├── define/             # Specification tables & rule definitions
│   │   │   ├── test/               # Live execution console & bias audits
│   │   │   ├── learn/              # Empirical cards, quadrant matrix & forks
│   │   │   ├── report/             # Audit provenance & Python replication
│   │   │   ├── charts/             # ReturnDistributionChart (25 bins + PDF curve)
│   │   │   └── common/             # Reusable UI widgets
│   │   ├── pages/
│   │   │   ├── ResearchHome/       # 01. ASK
│   │   │   ├── Clarify/            # 02. CLARIFY
│   │   │   ├── Define/             # 03. DEFINE
│   │   │   ├── Test/               # 04. TEST
│   │   │   ├── Learn/              # 05. LEARN
│   │   │   └── ExperimentReport/   # 06. REPORT
│   │   ├── services/
│   │   │   └── api.ts              # Centralized API client (runExperiment)
│   │   ├── state/
│   │   │   └── ExperimentContext.tsx # Centralized state store & execution driver
│   │   ├── types/
│   │   │   └── experiment.ts       # Frontend domain types
│   │   ├── utils/
│   │   ├── App.tsx                 # Workspace container & route renderer
│   │   ├── index.css               # Design tokens & Tailwind imports
│   │   └── main.tsx                # Client entrypoint
│   ├── index.html
│   ├── package.json                # Frontend dependencies only
│   ├── postcss.config.js
│   ├── tailwind.config.js          # Stitch-calibrated design tokens
│   ├── tsconfig.json
│   ├── vite.config.ts              # Port 3000, proxies /api -> http://localhost:3001
│   └── .env.example
│
├── server/                         ← BACKEND (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── routes/
│   │   │   └── experimentRoutes.ts # POST /api/experiments/run, GET /api/health
│   │   ├── controllers/
│   │   │   └── experimentController.ts # Request validation & structured error handler
│   │   ├── services/
│   │   │   └── experimentService.ts # Service orchestration & caching
│   │   ├── engine/
│   │   │   ├── signalDetector.ts   # Detects daily declines: close[t]/close[t-1] - 1 <= -threshold
│   │   │   ├── tradeSimulator.ts   # Applies T+1 Open entry, k-day Close exit & friction
│   │   │   └── statistics.ts       # Mean, Median, StdDev, SE, t-Stat, p-Value, 25 bins
│   │   ├── data/
│   │   │   └── prototypeNiftyData.json # 1,849 daily OHLC bars (2018–2025 prototype dataset)
│   │   ├── types/
│   │   │   └── experiment.ts       # Backend types & API DTO contracts
│   │   ├── utils/
│   │   │   └── validation.ts       # Parameter boundary constraints
│   │   └── index.ts                # Express app (port 3001, CORS configuration)
│   ├── package.json                # Backend dependencies only
│   └── tsconfig.json
│
├── stitch_reference/               ← DESIGN REFERENCES ONLY (preserved)
├── README.md                       ← System documentation
├── AI_USAGE.md                     ← AI transparency & engineering audit log
├── package.json                    ← Root workspace scripts only
└── package-lock.json
```

---

## 2. API Specifications

### 2.1 Run Experiment
**Endpoint:** `POST /api/experiments/run`

**Request Body:**
```json
{
  "market": "NIFTY 50",
  "threshold": 0.05,
  "entry": "T+1_OPEN",
  "holdingDays": 5,
  "roundTripCost": 0.001
}
```

**Success Response (`200 OK`):**
```json
{
  "success": true,
  "sampleSize": 1842,
  "averageGrossReturn": 0.74,
  "medianReturn": 0.31,
  "winRate": 56.8,
  "winningTrades": 1046,
  "losingTrades": 796,
  "averageNetReturn": 0.52,
  "standardDeviation": 4.09,
  "standardError": 0.0953,
  "tStatistic": 5.45,
  "pValue": "< 0.001",
  "skewness": 0.43,
  "kurtosis": 3.52,
  "maxAdverseExcursion": -4.15,
  "sharpeRatio": 0.82,
  "distributionBins": [
    { "range": "-10% to -9%", "min": -10, "max": -9, "count": 12, "heightPct": 7, "isPositive": false },
    ...
    { "range": "+14% to +15%", "min": 14, "max": 15, "count": 8, "heightPct": 5, "isPositive": true }
  ],
  "events": [
    {
      "id": "EVT-2020-03-23",
      "timestamp": "2020-03-24 09:15:00 IST",
      "date": "2020-03-23",
      "triggerCondition": "Close Δ = -12.98%",
      "dropPct": -12.98,
      "entryPrice": 7848.30,
      "exitPrice": 8660.25,
      "grossReturnPct": 10.35,
      "netReturnPct": 10.25,
      "status": "VALIDATED",
      "lookaheadCheck": "ZERO_BIAS"
    }
  ],
  "evidenceLevel": "Moderate Evidence",
  "conclusion": "There is historical evidence supporting the hypothesis under the selected assumptions in this prototype dataset, but the evidence is not sufficient to establish a robust standalone trading strategy.",
  "datasetInfo": {
    "name": "Prototype / simulated dataset (NIFTY 50 TR 2018–2025)",
    "totalSessions": 1849,
    "startDate": "2018-01-02",
    "endDate": "2025-01-31"
  },
  "experiment": {
    "market": "NIFTY 50",
    "threshold": 0.05,
    "entry": "T+1_OPEN",
    "holdingDays": 5,
    "roundTripCost": 0.001
  }
}
```

**Validation Error (`400 Bad Request`):**
```json
{
  "error": {
    "code": "INVALID_EXPERIMENT",
    "message": "Invalid experiment configuration provided.",
    "details": [
      "threshold must be a positive number up to 0.50 (e.g. 0.05 for 5%)."
    ]
  }
}
```

### 2.2 Health Check
**Endpoint:** `GET /api/health`

**Success Response (`200 OK`):**
```json
{
  "status": "ok",
  "timestamp": "2026-09-14T04:44:41.206Z",
  "dataset": {
    "name": "Prototype / simulated dataset (NIFTY 50 TR 2018–2025)",
    "totalBars": 1849,
    "dateRange": "2018-01-02 to 2025-01-31"
  }
}
```

---

## 3. How to Run the Project

### Prerequisites
- Node.js (>= 18.x)
- npm (>= 9.x with workspaces support)

### Install All Dependencies
```bash
npm install
```
This installs dependencies across the root, `client/`, and `server/` via npm workspaces.

### Development Mode (Runs Frontend & Backend Concurrently)
```bash
npm run dev
```
- **Frontend Client:** `http://localhost:3000`
- **Backend API:** `http://localhost:3001`
- Proxies `/api` on frontend to backend on `http://localhost:3001`.

### Run Individually
```bash
# Terminal 1 — Start Backend Server (port 3001)
npm run server

# Terminal 2 — Start Frontend Client (port 3000)
npm run client
```

### Production Build
```bash
npm run build
```
Compiles both `server/` (via `tsc`) and `client/` (via `tsc -b && vite build`) into their respective `dist/` folders with **0 errors**.

---

## 4. Empirical Methodology & Data Integrity

1. **Deterministic Execution:** The calculation engine evaluates historical sessions without stochastic noise or randomness. Identical inputs yield identical outputs.
2. **Execution Timing Rule ($T+1\text{_OPEN}$):** Signal fires at market close of session $t$; position enters at the open of session $t+1$, eliminating lookahead bias.
3. **Holding Horizon:** Position closes on the close of session $t+\text{holdingDays}$.
4. **Transaction Cost Deduction:** Net Return = Gross Return - Round-Trip Cost (default $0.10\%$).
5. **Calibrated Distribution Bins:** 25 discrete return bins spanning $[-10\%, +15\%]$, guaranteed to sum exactly to the qualifying sample size.
6. **Dataset Attribution:** Consistently labeled across the UI and API as `"Prototype / simulated dataset (NIFTY 50 TR 2018–2025)"` (never claiming official exchange feeds).
