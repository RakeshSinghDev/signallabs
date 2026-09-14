# AI Usage Transparency Statement

This document details how AI assistance was utilized in the research, design synthesis, full-stack architecture, and software engineering of the **SignalLab** quantitative research prototype, along with key developer decisions, corrections, and constraints enforced during implementation.

---

## 1. AI Tools Used

1. **Google Antigravity Agentic Assistant:** Employed as a pair-programming partner for architectural design, code generation, refactoring, full-stack integration, and strict type checking.
2. **Stitch Design System & MCP Tools (`StitchMCP`):** Used to inspect, extract, and translate the pre-designed Figma/Stitch screens, typography hierarchy (Inter + JetBrains Mono), spacing rhythms, and design tokens into production-ready React components.
3. **Gemini Advanced Models:** Utilized for reasoning about statistical financial formulations, Newey-West standard errors, signal detection loops, and drafting mathematical translation specifications.

---

## 2. What AI Was Used For

- **Design System Translation:** Extracting exact Tailwind CSS color tokens, border radiuses (4px/6px standard), and font families from the Stitch design artifacts (`projects/15507875842780825121`).
- **Component Drafting:** Scaffolding the 6 core research screens (`ASK`, `CLARIFY`, `DEFINE`, `TEST`, `LEARN`, and `REPORT`) while preserving dense financial information architecture.
- **Backend Service Scaffolding:** Structuring the `/server` Express architecture (`routes/`, `services/`, `data/`, `types/`, `utils/`), validation middleware, and deterministic signal-detection engine.
- **Statistical Boilerplate:** Implementing discrete frequency binning algorithms, Student's t-test calculations, standard error formulations, and Python/Pandas verification snippets.
- **Prototype Dataset Generation:** Generating a multi-year longitudinal OHLC series (1,849 daily bars, 2018–2025) embedding historical shock regimes (COVID crash March 2020, May 2020, Feb 2022, June 2024 Election Day).

---

## 3. Important Decisions & Critical Reviews Made by the Developer

1. **Strict Rejection of "AI Magic" & Black-Box Claims:**
   - Rejected speculative AI decorative tropes (no glowing purple gradients, no animated chatbot widgets, no glassmorphism).
   - Enforced that AI acts purely as an **indexer of explicit quantitative assumptions** rather than an autonomous decision maker.
2. **Removal of Uncalculated Mathematical Claims:**
   - Identified and removed claims of a *"2.8σ left-tail deviation"* and *"strong statistical power"* that were not calculated directly from the underlying dataset.
   - Replaced uncalculated marketing copy with factual sample references: *"Prototype sample: 1,842 qualifying observations"* and explicit rationale regarding sensitivity testing.
3. **Deterministic Calculation Over Stochastic Randomness:**
   - Mandated that all backend and frontend calculation outputs be 100% deterministic. The experiment engine uses zero `Math.random()` calls, guaranteeing identical mathematical figures upon rerun.
4. **Enforcement of Single Canonical Data Truth:**
   - Standardized the transaction friction model across all screens to strictly `0.10%` round-trip drag.
   - Corrected test progress display math: capped progress percentage at 99% until `processedEvents === totalEvents` to prevent contradictory readouts (e.g. `1,836 / 1,842 (100%)`).
5. **Epistemological Separation in Findings:**
   - Structured the `LEARN` screen into four distinct epistemological quadrants:
     - **Descriptive Facts:** What the data literally shows (sample size, mean, median, win rate).
     - **Inference:** Economic logic of mean-reversion.
     - **Synthesis:** Conservative qualification (`Moderate Evidence`).
     - **Limitations:** Explicit warnings regarding regime clustering and lack of predictive guarantees.
6. **Decoupled Architecture with Full Backend Integration:**
   - Replaced hardcoded client results with an end-to-end HTTP pipeline (`POST /api/experiments/run`).
   - Kept business logic, signal detection, trade payoff loops, and statistical moments strictly inside `/server/services/experimentService.ts`, keeping React components purely focused on presentation and state orchestration.

---

## 4. AI Suggestions Rejected or Modified

| AI / Initial Suggestion | Action Taken | Rationale |
| :--- | :--- | :--- |
| **"Hypothesis Accepted / Strategy Validated"** | **REJECTED** | Replaced with *"Evaluation: Moderate Evidence"*. In financial research, positive sample alpha over a single historical window never guarantees standalone profitability. Overclaiming is hazardous. |
| **Chatbot / Conversation UI** | **REJECTED** | Replaced with structured parameter deconstruction cards. Free-form chat leads to ambiguous parameters and hallucinated logic. Quantitative research demands discrete parameter switches. |
| **Execution at Same-Day Close (15:30 IST)** | **MODIFIED** | Shifted baseline recommendation to **Next Session Open ($T+1$ @ 09:15 IST)**. Entering on same-day close introduces lookahead bias, as the daily drop percentage is unknown until after the session halts. |
| **"Official Data Provider: NSE India EOD"** | **REJECTED** | Replaced with *"Data Source: Prototype / simulated dataset (NIFTY 50 TR 2018–2025)"* and footer pill *"PROTOTYPE SAMPLE DATASET"* to avoid misleading regulatory data claims. |
| **"2.8σ left-tail deviation" / "strong statistical power"** | **REMOVED** | Eliminated unsupported assertions not explicitly computed from the underlying data sample. |
| **0.03% Transaction Drag in Draft Card** | **REJECTED** | Standardized to **0.10% round-trip drag** everywhere to account realistically for STT, stamp duty, exchange turnover fees, and execution impact spread. |

---

## 5. Clean Architecture & Frontend/Backend Decoupling

In the latest refactor pass, the developer enforced clean enterprise separation:
1. **Isolated Client Workspace (`/client`):** All React components, Tailwind styling, Vite build tools, and UI state were segregated into `client/`. Zero server or Node runtime dependencies exist in the frontend package.
2. **Dedicated Backend Workspace (`/server`):** Express routing, parameter validation, statistical moments, signal detection, and trade simulation were segregated into `server/src/`. Zero JSX or frontend dependencies exist in the backend package.
3. **Structured API Communication:** All communication between frontend and backend flows strictly through HTTP (`POST /api/experiments/run`) via `client/src/services/api.ts`, with structured JSON error responses and seamless local Vite proxying.
4. **Zero UI Regressions:** All Stitch design tokens, spacing rhythms, font families, and interactive workflows (`ASK → CLARIFY → DEFINE → TEST → LEARN → REPORT`) were preserved with 100% fidelity.


---

## 6. Most Valuable Part of the Solution

### Product Thinking Value:
The **Clarify $\rightarrow$ Define $\rightarrow$ Provenance pipeline** is the most product-wise valuable asset. By forcing the system to explicitly label inferences as `[AI SUGGESTED · NEEDS CONFIRMATION]` until the human operator actively clicks `Confirm`, SignalLab eliminates the primary safety hazard of generative AI in high-stakes environments: **unconscious assumption inheritance**.

### Technical Value:
The **clean separation of the deterministic backend engine (`/server`) from the dynamic reactive interface (`/client`)**. Passing user-selected parameters (threshold, entry, holding horizon, cost) over `POST /api/experiments/run` and dynamically generating statistical moments, trade logs, empirical distribution bins, and lookahead-safe 200 DMA market regime breakdowns turns an interactive design prototype into a genuinely functional quantitative experimentation workspace.

---

## 7. Market Regime Partitioning & Lookahead Safety Enforcement

During final analytical verification, the developer identified that the Market Regime Breakdown tab previously displayed static illustrative figures. The developer introduced `server/src/engine/regimeAnalyzer.ts` to dynamically classify events into Bull and Bear regimes:
- **Strict Lookahead Safety**: For every qualifying event $t$, the 200-day Simple Moving Average (SMA) is calculated strictly using bars up to and including session $t$. Future bars are never accessed.
- **Empirical Coherence**: For a 5% threshold, the engine identifies 2 Bull and 14 Bear events (total = 16); for a 3% threshold, it identifies 4 Bull and 20 Bear events (total = 24). In Bull regimes, 5% pullbacks rebounded with +3.31% net return; in Bear regimes, 3% dips suffered a -1.94% net drag.
- **Dynamic Frontend Binding**: `client/src/pages/ExperimentReport/index.tsx` was refactored to consume `results.regimes` directly from the backend, removing all hardcoded regime counts and percentages.
