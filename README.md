# SignalLab

SignalLab is an AI-assisted financial research prototype that turns an incomplete market question into a structured, testable experiment and explains the resulting observations.

---

## What It Does

Most market questions begin as casual, incomplete intuitions (for example, *"Does buying after a sharp drop work?"*). However, turning that thought into an honest test requires answering several unstated questions: *How big is a "sharp drop"? When do you buy? When do you sell? What does trading cost?*

SignalLab guides users through a structured five-stage research workflow:

```
ASK → CLARIFY → DEFINE → TEST → LEARN
```

1. **ASK**: The user starts with an everyday market question (or selects a starter idea from example research topics).
2. **CLARIFY**: The system identifies ambiguous phrases and converts them into explicit, testable parameters with plain-English rationales.
3. **DEFINE**: The confirmed assumptions are synthesized into a formal, locked execution specification (covering asset, signal, entry timing, exit rule, trading friction, and benchmark).
4. **TEST**: The backend engine runs a deterministic evaluation across the historical sample dataset, verifies four methodological safeguards, and generates an event-by-event trade ledger.
5. **LEARN**: Findings are translated into clear, plain-English takeaways, exploring what worked, sample-size limitations, statistical significance, and market regime dependencies.

---

## Core Research Example

The application includes a canonical empirical experiment based on mean reversion:

- **Market**: NIFTY 50 Index (Price Return)
- **Period**: 2018-01-02 to 2025-01-31 (1,849 daily sessions analyzed)
- **Trigger**: Single-session decline $\ge 5.0\%$
- **Entry Timing**: Next trading session open ($T+1$ Open)
- **Holding Period**: 5 trading days flat (exit at $T+5$ Close)
- **Trading Cost**: $0.10\%$ (10 bps) round-trip friction deducted per trade
- **Dataset**: Deterministic sample / prototype dataset (`prototypeNiftyData.json`)
- **Qualifying Events**: 16 qualifying drops identified

> **Important**: The dataset used is a deterministic sample dataset for prototype validation. It is not a live data feed or official exchange data product. The results from this prototype do not constitute financial advice, investment recommendations, or a prediction of future market behavior.

---

## Results

The prototype executes calculations deterministically on the backend from the supplied sample dataset. For the canonical 5% decline experiment, the prototype yields:

- **Total Historical Sessions Analyzed**: 1,849 daily sessions
- **Qualifying Events ($N$)**: 16 events
- **Win Rate**: 62.5% (10 profitable trades / 6 losing trades)
- **Average Gross Return**: +1.60%
- **Average Net Return**: +1.50% (after 0.10% round-trip friction)
- **Median Return**: +0.30%
- **Standard Deviation ($\\sigma$)**: 7.62%
- **Statistical Test**: Student's $t = 0.67$, $p = 0.503$ (the result is **not statistically significant** at the 5% level due to small sample size)
- **Market Environment Breakdown**:
  - **Bull Market** (Index $> 200$-day SMA): 10 events, $+2.38\%$ average net return, $70.0\%$ win rate
  - **Bear Market** (Index $\\le 200$-day SMA): 6 events, $-0.73\%$ average net return, $50.0\%$ win rate

When sensitivity tested with a 3.0% threshold, the engine dynamically recalculates to 24 qualifying events, an average net return of $-1.35\%$, and a win rate of $54.2\%$.

---

## Research Safeguards

To prevent common backtesting pitfalls, SignalLab implements six specific safeguards directly in the simulation engine:

1. **Realistic Entry Price**: Rather than assuming execution at the day's close (which is impossible in practice since the drop percentage is unknown until the session ends), trades execute at the next session's opening price ($T+1$ Open).
2. **Fixed Holding Period**: Trades exit deterministically at the close of $T+5$ trading days, avoiding arbitrary post-hoc exit selection.
3. **Trading Costs**: A realistic round-trip friction of 0.10% (10 bps) is deducted from every trade to account for brokerage, exchange fees, taxes (STT/stamp duty), and slippage.
4. **Non-Overlapping Events (FIFO)**: When an active 5-day position is open, subsequent qualifying triggers during that window do not initiate overlapping positions, preventing capital double-counting.
5. **Avoiding Look-Ahead Bias**: Signal detection is strictly evaluated using information known at or before signal confirmation, with no future prices leaked into signal generation.
6. **Deterministic Calculations**: Calculations contain zero random elements (`Math.random()` is not used); re-running the same parameter specification always produces identical mathematical metrics.

---

## Technology Stack

### Frontend
- **Framework**: React 18 (TypeScript)
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS (custom design token palette)
- **State Management**: React Context API (`ExperimentContext`)

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5 (TypeScript)
- **Execution & Transpilation**: `tsx`
- **CORS**: `cors` middleware with environment-configurable origins

### Data / Research Engine
- **Engine**: Custom TypeScript analytical engine (`server/src/engine/`):
  - `signalDetector.ts`: Rule-based trigger condition evaluation
  - `tradeSimulator.ts`: FIFO entry/exit simulation and transaction cost modeling
  - `statistics.ts`: Discrete distribution binning, moments (mean, median, standard deviation, skewness, kurtosis), and $t$-distribution $p$-value calculations
  - `regimeAnalyzer.ts`: 200-day Simple Moving Average (SMA) regime partitioning
- **Dataset**: Multi-year daily OHLC sample series (1,849 sessions, 2018–2025) stored in `server/src/data/prototypeNiftyData.json`

### Build / Development Tools
- **Package Management**: npm workspaces (monorepo structure)
- **Process Orchestration**: `concurrently`
- **Type Checking**: TypeScript compiler (`tsc`)

---

## Architecture

```
User
 ↓
React Frontend
 ↓
Express Backend API
 ↓
Deterministic Research Engine
 ↓
Sample Dataset
 ↓
Research Results
 ↓
Learn / Report
```

---

## Project Structure

```
signallabs/
├── client/                     # Frontend Single Page Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Shared layout, header, footer, charts
│   │   ├── data/               # Canonical experiment baseline definitions
│   │   ├── pages/              # 6 workflow views:
│   │   │   ├── ResearchHome/   # 01 Ask
│   │   │   ├── Clarify/        # 02 Clarify
│   │   │   ├── Define/         # 03 Define
│   │   │   ├── Test/           # 04 Test
│   │   │   ├── Learn/          # 05 Learn
│   │   │   └── ExperimentReport/# Comprehensive Provenance Report
│   │   ├── services/           # Backend API client (`api.ts`)
│   │   ├── state/              # React Context experiment state provider
│   │   └── types/              # TypeScript interfaces and domain models
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                     # Backend Express API Service
│   ├── src/
│   │   ├── controllers/        # Request handlers (`experimentController.ts`)
│   │   ├── data/               # Prototype dataset (`prototypeNiftyData.json`)
│   │   ├── engine/             # Research & calculation engine
│   │   │   ├── signalDetector.ts
│   │   │   ├── tradeSimulator.ts
│   │   │   ├── statistics.ts
│   │   │   └── regimeAnalyzer.ts
│   │   ├── routes/             # Express routes (`/api/experiments/run`, `/api/health`)
│   │   ├── services/           # Business orchestration (`experimentService.ts`)
│   │   ├── types/              # Backend data & calculation contracts
│   │   ├── utils/              # Calculation helpers
│   │   └── index.ts            # Server entry point & CORS configuration
│   ├── package.json
│   └── tsconfig.json
├── stitch_reference/           # Design reference HTML specifications
├── AI_USAGE.md                 # AI usage transparency disclosure
├── README.md                   # Project documentation
├── package.json                # Root monorepo workspace configuration
└── package-lock.json
```

---

## Running Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 1. Install Dependencies
Install dependencies across all workspaces from the project root:

```bash
npm install
```

### 2. Start Frontend and Backend Concurrently
To start both the client and server with a single command:

```bash
npm run dev
```

- **Frontend**: `http://localhost:3000` (or `http://localhost:5173` depending on port availability)
- **Backend API**: `http://localhost:3001`

### 3. Running Workspaces Independently
If preferred, you can run the services individually:

- **Start Backend only**:
  ```bash
  npm run server
  # or: cd server && npm run dev
  ```
- **Start Frontend only**:
  ```bash
  npm run client
  # or: cd client && npm run dev
  ```

### 4. Building and Checking the Project
Verify TypeScript types and build production bundles:

```bash
# Build both server and client:
npm run build

# Or build individually:
npm run build:server
npm run build:client
```

---

## Deployment

The application is deployed with the following architecture:

- **Frontend**: Deployed on [Vercel](https://vercel.com) (`https://client-kappa-one-50.vercel.app`).
- **Backend API**: Deployed on [Render](https://render.com) (`https://signallabs-hvbq.onrender.com`).

The frontend communicates with the deployed backend API through the configured `VITE_API_BASE_URL` environment variable. The backend regulates browser access through CORS via the `CLIENT_URL` environment variable.

---

## Environment Variables

### Client (`client/.env`)
| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base URL of the backend API | `http://localhost:3001` (local) or `https://signallabs-hvbq.onrender.com` (production) |

### Server (`server/.env`)
| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Port for the Express server to listen on | `3001` |
| `CLIENT_URL` | Production or client origin allowed by CORS | `https://client-kappa-one-50.vercel.app` (accepts comma-separated URLs) |
| `CLIENT_ORIGIN` | Alternative/legacy variable for `CLIENT_URL` | `https://client-kappa-one-50.vercel.app` |

---

## AI Usage

In accordance with academic and engineering transparency standards, detailed documentation on how generative AI was used during this project is available in [AI_USAGE.md](AI_USAGE.md).

Key principles:
- AI tools were utilized as development accelerators for design extraction, UI component scaffolding, and drafting boilerplate calculations.
- AI is **not** used to make autonomous trading decisions, generate production trading signals, or replace empirical testing.
- All final parameters, calculations, and analytical conclusions are deterministic, inspected, and verified in code.

---

## Limitations

SignalLab is intentionally designed as an educational and analytical research prototype. Users and evaluators should note the following constraints:

1. **Research / Educational Prototype**: The application is built to demonstrate quantitative workflow framing, not for live execution or portfolio deployment.
2. **Deterministic Sample Data**: The dataset is an offline sample file containing 1,849 daily sessions. It does not reflect live streaming quotes, corporate actions, or order-book depth.
3. **Not Investment Advice**: Historical or sample observations do not guarantee future performance.
4. **Not a Production Backtesting Platform**: The prototype is not a production-grade backtesting or trading platform (e.g. no tick data, no multi-asset order routing).
5. **Simplified Market Assumptions**: Transaction costs and execution parameters are simplified to a single round-trip drag ($0.10\%$). Real execution involves variable bid-ask spreads, market impact, and borrow costs.
6. **Sample Size Constraints**: Statistical conclusions are limited by the small number of qualifying events ($N = 16$).

---

## Future Improvements

Possible technical and analytical additions for future iterations:

- Integration with a larger, verified historical dataset
- Support for additional assets and markets
- More robust statistical testing (e.g. bootstrap resampling, Monte Carlo permutation tests)
- Richer sensitivity analysis across multiple thresholds and holding horizons
- Additional transaction-cost and slippage models (e.g. volume-weighted impact curves)
- Production-grade data ingestion pipelines

---

## Disclaimer

**SignalLab is for educational and research purposes only and is not financial advice.** It is designed strictly to illustrate quantitative research principles, hypothesis specification, and basic statistical evaluation. Nothing contained in this application or documentation constitutes investment, financial, legal, or tax advice.
