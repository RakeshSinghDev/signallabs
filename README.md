# SignalLab

### Empirical Hypothesis Testing & Research Platform

SignalLab is a research workflow application that converts an intuitive market hypothesis expressed in natural language into a deterministic, auditable, and empirically testable experiment.

The platform guides the user through five stages:

```text
ASK → CLARIFY → DEFINE → TEST → LEARN

1. Problem

Quantitative research questions are often expressed in ambiguous natural language.

For example:

"Does buying NIFTY after a sharp fall work?"

The question does not define:

What qualifies as a "sharp fall"?
When should the position be entered?
How long should it be held?
What transaction costs should be considered?
How should overlapping events be handled?
How should market regimes affect the result?
How can lookahead bias be prevented?

SignalLab addresses this problem by forcing these assumptions to become explicit before an experiment is executed.

2. Research Workflow
01 — ASK

The researcher enters a natural-language hypothesis.

Example:

Does buying NIFTY after a sharp fall work?

The system creates a research experiment and captures the original hypothesis.

02 — CLARIFY

Ambiguous terms are converted into deterministic parameters.

Example:

"Sharp fall"
        ↓
≥ 5% decline in one trading day

"Buying after"
        ↓
Next trading session open

"Does it work?"
        ↓
5-trading-day holding period

The user can review, modify, and confirm the inferred assumptions.

This prevents ambiguous natural-language instructions from silently becoming hidden experiment parameters.

03 — DEFINE

The confirmed assumptions are converted into a formal experiment specification.

The specification includes:

Hypothesis statement
Null and alternative hypotheses
Asset universe
Historical observation window
Trigger condition
Lookback period
Entry timing
Position sizing
Holding period
Slippage
Transaction costs
Risk constraints
Return calculation

The resulting specification is deterministic and ready for execution.

04 — TEST

The backend execution engine evaluates the defined experiment against the historical prototype dataset.

The test validates:

Trigger conditions
Entry timing
Holding period
Transaction costs
Slippage
Non-overlapping event handling
Lookahead safety
Statistical calculations

Execution results are returned through the backend API rather than being generated directly by the frontend.

05 — LEARN

The final stage presents the empirical evidence.

The researcher can inspect:

Sample size
Average return
Median return
Win rate
Net return
Statistical significance
Return distribution
Market regime breakdown
Limitations
Sensitivity analysis
Recommended follow-up experiments

The system separates observed historical evidence from interpretation and research conclusions.

3. Architecture

SignalLab follows a separated frontend/backend architecture.

                         SignalLab
                            │
             ┌──────────────┴──────────────┐
             │                             │
        FRONTEND                       BACKEND
        React + TS                    Node + TS
             │                             │
             │ HTTP API                    │
             └──────────────┬──────────────┘
                            │
                    Experiment Service
                            │
                     Research Engine
                            │
                    Prototype Dataset
Frontend

Responsible for:

User interface
Workflow navigation
Experiment state
User input
Assumption confirmation
Results visualization
API communication

Location:

/client
Backend

Responsible for:

Experiment execution
Research calculations
Regime analysis
Dataset processing
Statistical computation
API responses
Analytical integrity

Location:

/server

The frontend does not directly perform the authoritative experiment calculations.

4. Project Structure
signal-lab/
│
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Ask/
│       │   ├── Clarify/
│       │   ├── Define/
│       │   ├── Test/
│       │   └── ExperimentReport/
│       │
│       ├── services/
│       │   └── api.ts
│       │
│       ├── state/
│       │   └── ExperimentContext.tsx
│       │
│       ├── types/
│       │   └── experiment.ts
│       │
│       └── data/
│           └── canonicalExperiment.ts
│
├── server/
│   └── src/
│       ├── engine/
│       │   └── regimeAnalyzer.ts
│       │
│       ├── services/
│       │   └── experimentService.ts
│       │
│       └── types/
│           └── experiment.ts
│
├── stitch_reference/
│
├── AI_USAGE.md
├── README.md
├── package.json
└── ...
5. Backend Experiment Engine

The backend contains the authoritative analytical logic.

The experiment service receives the experiment configuration and executes the research workflow.

The regime engine classifies qualifying events using a trailing 200-day Simple Moving Average.

SMA200(t)
    =
average of the previous 200 available closes
including session t

For an event occurring at session t:

Close(t) > SMA200(t)
        ↓
      BULL

Close(t) ≤ SMA200(t)
        ↓
      BEAR

The regime calculation uses only information available at or before the signal session.

Future entry and exit prices are not used to determine the regime.

6. Lookahead-Bias Protection

Lookahead bias is explicitly treated as an analytical integrity constraint.

For a signal occurring at index t:

Historical information
        │
        ▼
Signal at t
        │
        ├── Regime calculation
        │
        ▼
T+1 Entry
        │
        ▼
T+5 Exit

The regime classification is calculated before accessing future entry or exit prices.

This ensures that future market information cannot influence the classification of the historical event.

7. Regime Analysis

The backend dynamically calculates market-regime statistics.

The result contains:

Bull
├── observations
├── percentage
├── win rate
└── average net return

Bear
├── observations
├── percentage
├── win rate
└── average net return

These values are returned through the API and consumed by the frontend.

They are not hardcoded into the report UI.

The frontend therefore reflects the actual backend experiment configuration.

8. Sensitivity Testing

SignalLab supports parameter sensitivity testing.

For example:

5% threshold
        ↓
Run experiment
        ↓
Change threshold
        ↓
3% threshold
        ↓
Run experiment again
        ↓
Compare results

Changing the trigger threshold changes:

qualifying observations
regime distribution
win rate
average net return
downstream research findings

This demonstrates that the analytical UI is connected to the experiment engine rather than displaying a fixed result.

9. Prototype Dataset

The current implementation uses a historical prototype dataset covering the NIFTY research experiment.

The dataset is used to demonstrate:

deterministic experiment execution
event qualification
historical return calculation
regime classification
sensitivity analysis
lookahead-safe processing
statistical evaluation

The dataset is intended for prototype/research demonstration rather than live trading.

10. API

The frontend communicates with the backend through HTTP APIs.

Development configuration:

Frontend:
http://localhost:3000

Backend:
http://localhost:3001

The backend exposes experiment execution and result data required by the frontend.

The frontend consumes the returned analytical payload and maps it into application state.

11. Running Locally
Install dependencies
npm install
Start the backend
npm run server

The backend should start on:

http://localhost:3001
Start the frontend
npm run dev

The frontend should start on:

http://localhost:3000
12. Build Verification

The project has been verified with:

npm run build

The build includes:

TypeScript compilation
Vite production build

The current implementation passes the build without TypeScript compilation errors.

13. Analytical Integrity Verification

The following areas have been verified:

REGIME ENGINE             PASS
REGIME API DATA           PASS
REGIME FRONTEND           PASS
LOOKAHEAD SAFETY          PASS
5% → 3% SENSITIVITY       PASS
BUILD                     PASS

Additional integrity checks include:

Regime observations reconcile with total qualifying observations.
Backend-generated regime values are dynamically rendered in the frontend.
Future prices are not used for regime classification.
Transaction costs are incorporated into net return calculations.
Non-overlapping event handling is enforced.
Experiment parameters are represented explicitly.
14. Example Research Result

For the prototype NIFTY experiment using the configured baseline parameters, the backend produced regime-level results such as:

BULL
Observations: 2
Win Rate: 100.0%
Average Net Return: +3.31%

BEAR
Observations: 14
Win Rate: 57.1%
Average Net Return: +1.24%

When the threshold was changed from 5% to 3%, the backend produced a different result set:

BULL
Observations: 4
Win Rate: 75.0%
Average Net Return: +1.62%

BEAR
Observations: 20
Win Rate: 50.0%
Average Net Return: -1.94%

These figures are examples from the prototype execution and should not be interpreted as guarantees of future trading performance.

15. Limitations

SignalLab is a research prototype.

It does not provide:

Live trading execution
Investment recommendations
Guaranteed future returns
Production-grade market data infrastructure
Broker integration
Real-time portfolio management

Historical results do not guarantee future performance.

The prototype dataset and simplified execution assumptions may differ from real-world market conditions.

Particular attention should be given to:

Slippage assumptions
Transaction costs
Threshold selection
Market regime concentration
Sample size
Historical survivorship
Structural market changes

Further validation would be required before treating any result as a production trading strategy.

16. Design Philosophy

SignalLab is intentionally designed around:

Determinism

The same experiment parameters should produce reproducible analytical results.

Auditability

Important assumptions and analytical transformations should be visible to the researcher.

Separation of Evidence and Interpretation

The system distinguishes:

Raw observations
       ↓
Statistical results
       ↓
Interpretation
       ↓
Research conclusion
No Hidden Assumptions

Ambiguous natural-language parameters are surfaced for confirmation instead of silently being buried inside the experiment.

Research Before Execution

The platform emphasizes defining and validating an experiment before interpreting its results.

17. AI Usage

AI-assisted development was used during the construction of the project for:

UI/UX ideation
Component implementation assistance
Code generation assistance
Debugging
Refactoring
Documentation assistance

AI-generated suggestions were reviewed and integrated into the project based on the required application behavior.

The analytical execution logic remains explicitly implemented in the backend rather than relying on an LLM to generate numerical results at runtime.

See:

AI_USAGE.md

for additional details.

18. Technology Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
Backend
Node.js
TypeScript
HTTP API
Deterministic experiment services
Development
Git
GitHub
TypeScript
Vite
19. Final Architecture Principle

The central design principle of SignalLab is:

Natural Language
       ↓
Explicit Assumptions
       ↓
Formal Specification
       ↓
Deterministic Backend Execution
       ↓
Empirical Evidence
       ↓
Research Interpretation

The interface is therefore not simply a dashboard displaying pre-written numbers.

It represents a complete research workflow in which user-defined parameters flow through the application and affect backend execution and analytical results.

Status
Frontend              ✓
Backend               ✓
API Integration       ✓
Experiment Engine     ✓
Regime Analysis       ✓
Lookahead Protection  ✓
Sensitivity Testing   ✓
Build Verification    ✓
Documentation         ✓

SignalLab — Research prototype complete.


### Also update `AI_USAGE.md`

Don't leave that file vague. Put this in it:

```markdown
# AI Usage — SignalLab

AI tools were used as development assistants during the construction of SignalLab.

## Areas Where AI Assistance Was Used

### UI/UX

AI-assisted design exploration was used to establish the visual language and information hierarchy of the research workflow.

The final interface was implemented and adjusted to match the intended product behavior.

### Frontend Development

AI assistance was used for:

- React component scaffolding
- TypeScript implementation
- UI state handling
- API integration
- Refactoring
- Debugging

### Backend Development

AI assistance was used for:

- TypeScript implementation assistance
- Service-layer structure
- API integration
- Type definitions
- Debugging
- Analytical logic review

### Analytical Integrity

The experiment engine was implemented as deterministic application logic.

AI is not used at runtime to invent numerical experiment results.

Backend calculations produce the analytical payload consumed by the frontend.

## Human Verification

AI-generated code and suggestions were reviewed during development.

The final implementation was tested for:

- Frontend/backend integration
- Dynamic API-driven results
- Regime calculation
- Lookahead safety
- Sensitivity behavior
- TypeScript compilation
- Production build

## Principle

AI was used as a development accelerator, not as a replacement for deterministic appli