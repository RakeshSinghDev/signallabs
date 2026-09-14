import React from 'react';
import { useExperiment } from '../../state/ExperimentContext';

export const DefineExperiment: React.FC = () => {
  const { experiment, goToPhase, startExecutionSimulation } = useExperiment();

  const handleRunExperiment = () => {
    goToPhase('test');
    startExecutionSimulation();
  };

  const card1 = experiment.assumptions.card1;
  const card2 = experiment.assumptions.card2;
  const card3 = experiment.assumptions.card3;

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-[1440px] mx-auto px-margin py-space-lg pb-16">
        {/* Stage Flow Nav (Local Precision Stage Indicator) */}
        <div className="w-full py-space-md mb-space-lg flex items-center justify-between overflow-x-auto bg-surface-container-lowest px-space-xl rounded-lg shadow-xs border border-outline-variant/30">
          <div className="flex items-center gap-space-lg min-w-max">
            {/* 01 ASK (Checked) */}
            <button 
              onClick={() => goToPhase('ask')}
              className="flex items-center gap-space-xs text-on-surface cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center text-[11px] font-label-numeric font-semibold">
                <span className="material-symbols-outlined text-[12px]">check</span>
              </span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface">1. Ask</span>
            </button>
            <span className="w-4 h-px bg-outline-variant"></span>

            {/* 02 CLARIFY (Checked) */}
            <button 
              onClick={() => goToPhase('clarify')}
              className="flex items-center gap-space-xs text-on-surface cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center text-[11px] font-label-numeric font-semibold">
                <span className="material-symbols-outlined text-[12px]">check</span>
              </span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface">2. Clarify</span>
            </button>
            <span className="w-4 h-px bg-outline-variant"></span>

            {/* 03 DEFINE (Active) */}
            <div className="flex items-center gap-space-xs bg-primary text-on-primary px-space-md py-1 rounded-DEFAULT shadow-xs">
              <span className="w-4 h-4 rounded-full bg-on-primary text-primary flex items-center justify-center text-[10px] font-label-numeric font-bold">
                3
              </span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold">
                3. Define Spec
              </span>
            </div>
            <span className="w-4 h-px bg-outline-variant"></span>

            {/* 04 TEST (Pending) */}
            <button 
              onClick={handleRunExperiment}
              className="flex items-center gap-space-xs text-outline hover:text-on-surface cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-surface-container text-outline flex items-center justify-center text-[10px] font-label-numeric">
                4
              </span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider">4. Test</span>
            </button>
            <span className="w-4 h-px bg-outline-variant"></span>

            {/* 05 LEARN (Pending) */}
            <button 
              onClick={() => goToPhase('learn')}
              className="flex items-center gap-space-xs text-outline hover:text-on-surface cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-surface-container text-outline flex items-center justify-center text-[10px] font-label-numeric">
                5
              </span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider">5. Learn</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-space-md">
            <span className="font-label-code text-label-code text-on-surface-variant bg-surface-container px-space-sm py-0.5 rounded-DEFAULT">
              SPEC_HASH: {experiment.specHash}
            </span>
            <span className="font-label-code text-label-code text-on-tertiary-container flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container animate-pulse"></span>
              LOCKED &amp; VALIDATED
            </span>
          </div>
        </div>

        {/* Experiment Summary Header */}
        <div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-xs border border-outline-variant/30 mb-space-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
            <div className="space-y-space-xs min-w-0">
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="font-label-caps text-label-caps bg-surface-container text-on-surface-variant px-space-sm py-0.5 rounded-DEFAULT font-semibold uppercase">
                  SPECIFICATION DRAFT
                </span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-code text-label-code text-on-surface-variant">{experiment.id}</span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-code text-label-code text-on-surface-variant">NSE:NIFTY50</span>
              </div>

              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight truncate font-semibold">
                {experiment.market} · Short-term mean reversion post-decline
              </h1>

              <div className="flex flex-wrap items-center gap-space-md font-body-sm text-body-sm text-on-surface-variant">
                <span>Hypothesis Contract</span>
                <span>·</span>
                <span className="font-label-numeric text-label-numeric text-on-surface">EOD Historical Bar Series</span>
                <span>·</span>
                <span className="font-label-numeric text-label-numeric text-on-surface">Base: INR (₹)</span>
                <span>·</span>
                <span className="text-on-tertiary-container font-medium">Single-Asset Longitudinal Sample</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md shrink-0">
              <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-1.5 rounded-DEFAULT">
                <span className="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface font-semibold">
                  Ready to test · All rules validated
                </span>
              </div>

              <div className="flex items-center gap-space-sm">
                <button
                  onClick={() => goToPhase('clarify')}
                  className="h-8 px-space-md bg-surface-container text-on-surface hover:bg-surface-container-high rounded-DEFAULT font-body-sm text-body-sm font-medium transition-colors flex items-center gap-space-xs cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>Edit assumptions</span>
                </button>

                <button
                  onClick={handleRunExperiment}
                  className="h-8 px-space-lg bg-primary hover:bg-inverse-surface text-on-primary rounded-DEFAULT font-body-sm text-body-sm font-semibold transition-all shadow-xs flex items-center gap-space-xs active:scale-[0.98] cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">bolt</span>
                  <span>Run experiment on 2018–2025 dataset</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Structured Specification Matrix (Split 2-Column Clean Research Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg mb-space-lg">
          {/* Left Column: Hypothesis & Trigger Logic */}
          <div className="flex flex-col gap-space-lg">
            {/* Section: 01 / Formal Hypothesis */}
            <div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-xs border border-outline-variant/30">
              <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-numeric text-label-numeric text-outline font-semibold">01</span>
                  <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold text-on-surface">
                    Formal Hypothesis Statement
                  </span>
                </div>
                <span className="font-label-code text-label-code text-on-tertiary-container bg-surface-container px-1.5 py-0.5 rounded-DEFAULT">
                  P-VALUE TARGET: ≤ 0.05
                </span>
              </div>

              <div className="bg-surface-container-low p-space-lg rounded-DEFAULT mb-space-md border border-outline-variant/20">
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed italic">
                  “Buying {experiment.market} index after a ≥{((experiment.threshold || 0.05) * 100).toFixed(1)}% single-session decline yields statistically positive net returns over a {experiment.holdingDays || 5}-trading-day holding horizon.”
                </p>
              </div>

              <div className="grid grid-cols-2 gap-space-md text-on-surface-variant font-body-sm text-body-sm">
                <div className="bg-surface-container p-space-md rounded-DEFAULT">
                  <span className="font-label-caps text-label-caps block text-outline uppercase mb-0.5">
                    Null Hypothesis (H₀)
                  </span>
                  <span className="font-label-code text-label-code text-on-surface">μ(R_net) ≤ 0.00%</span>
                </div>
                <div className="bg-surface-container p-space-md rounded-DEFAULT">
                  <span className="font-label-caps text-label-caps block text-outline uppercase mb-0.5">
                    Alternative (H₁)
                  </span>
                  <span className="font-label-code text-label-code text-on-surface font-semibold">
                    μ(R_net) &gt; 0.00% [One-Tailed]
                  </span>
                </div>
              </div>
            </div>

            {/* Section: 02 / Universe & Asset Selection */}
            <div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-xs border border-outline-variant/30">
              <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-numeric text-label-numeric text-outline font-semibold">02</span>
                  <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold text-on-surface">
                    Universe &amp; Asset Selection
                  </span>
                </div>
                <span className="font-label-code text-label-code text-on-surface-variant">NSE_CASH_DAILY</span>
              </div>

              <div className="space-y-space-sm">
                <div className="flex items-center justify-between py-space-xs px-space-sm bg-surface-container-low rounded-DEFAULT">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Target Asset</span>
                  <div className="flex items-center gap-space-sm">
                    <span className="font-label-code text-label-code font-semibold text-on-surface">
                      {experiment.market} Index
                    </span>
                    <span className="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 rounded-DEFAULT text-outline">
                      TRI ADJUSTED
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-space-xs px-space-sm bg-surface-container-low rounded-DEFAULT">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Data Source</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">
                    Deterministic Prototype Historical Dataset
                  </span>
                </div>

                <div className="flex items-center justify-between py-space-xs px-space-sm bg-surface-container-low rounded-DEFAULT">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Sample Horizon Window</span>
                  <span className="font-label-code text-label-code font-medium text-on-surface">
                    {experiment.dataPeriod}
                  </span>
                </div>

                <div className="flex items-center justify-between py-space-xs px-space-sm bg-surface-container-low rounded-DEFAULT">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Coverage Scope</span>
                  <span className="font-label-numeric text-label-numeric text-on-surface">
                    7.08 Years · {experiment.totalTradingSessions} Sessions
                  </span>
                </div>
              </div>
            </div>

            {/* Section: 03 / Signal Condition */}
            <div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-xs border border-outline-variant/30">
              <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-numeric text-label-numeric text-outline font-semibold">03</span>
                  <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold text-on-surface">
                    Signal Condition &amp; Lookback
                  </span>
                </div>
                <span className="font-label-code text-label-code bg-surface-container text-on-surface-variant px-space-xs py-0.5 rounded-DEFAULT">
                  EVENT_DRIVEN
                </span>
              </div>

              <div className="space-y-space-sm">
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium block">Threshold Trigger</span>
                    <span className="font-label-code text-label-code text-outline">Single-session drawdown condition</span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-numeric text-label-numeric bg-surface-container px-space-sm py-1 rounded-DEFAULT font-bold text-error">
                      Δ ≤ -{((experiment.threshold || 0.05) * 100).toFixed(2)}%
                    </span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant">EOD</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium block">Decline Computation</span>
                    <span className="font-label-code text-label-code text-outline">Benchmark reference mode</span>
                  </div>
                  <span className="font-label-code text-label-code text-on-surface bg-surface-container px-space-sm py-1 rounded-DEFAULT">
                    Close(t) / Close(t-1) - 1
                  </span>
                </div>

                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium block">Lookback Window</span>
                    <span className="font-label-code text-label-code text-outline">Rolling temporal frame</span>
                  </div>
                  <span className="font-label-numeric text-label-numeric text-on-surface">1 Trading Session (T)</span>
                </div>

                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium block">Overlapping Signals Handling</span>
                    <span className="font-label-code text-label-code text-outline">Multi-trigger resolution</span>
                  </div>
                  <span className="font-label-caps text-label-caps bg-surface-container text-on-surface font-semibold px-space-sm py-1 rounded-DEFAULT">
                    FIFO Event Isolation
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Execution, Friction & Exit Logic */}
          <div className="flex flex-col gap-space-lg">
            {/* Section: 04 / Execution Rules */}
            <div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-xs border border-outline-variant/30">
              <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-numeric text-label-numeric text-outline font-semibold">04</span>
                  <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold text-on-surface">
                    Execution Rules &amp; Timing
                  </span>
                </div>
                <span className="font-label-code text-label-code text-on-surface-variant">DETERMINISTIC_T1</span>
              </div>

              <div className="space-y-space-sm">
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium block">Entry Timing</span>
                    <span className="font-label-code text-label-code text-outline">Post-signal execution bar</span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-code text-label-code font-semibold text-on-surface block">
                      {experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'Same-Day Close (T)' : 'Next Session Open (T+1)'}
                    </span>
                    <span className="font-label-code text-label-code text-outline">
                      {experiment.entryTiming === 'SAME_DAY_CLOSE' ? '15:30:00 IST Benchmark' : '09:15:00 IST Benchmark'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium block">Position Sizing</span>
                    <span className="font-label-code text-label-code text-outline">Capital allocation strategy</span>
                  </div>
                  <span className="font-label-code text-label-code text-on-surface bg-surface-container px-space-sm py-1 rounded-DEFAULT">
                    100% Fixed Nominal (Unlevered)
                  </span>
                </div>

                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium block">Modeled Slippage</span>
                    <span className="font-label-code text-label-code text-outline">Order book impact model</span>
                  </div>
                  <span className="font-label-numeric text-label-numeric font-semibold text-on-surface">
                    0.05% per side
                  </span>
                </div>
              </div>
            </div>

            {/* Section: 05 / Exit Horizon */}
            <div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-xs border border-outline-variant/30">
              <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-numeric text-label-numeric text-outline font-semibold">05</span>
                  <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold text-on-surface">
                    Exit Horizon &amp; Risk Constraints
                  </span>
                </div>
                <span className="font-label-code text-label-code bg-surface-container text-on-surface-variant px-space-xs py-0.5 rounded-DEFAULT">
                  TIME_BOUND
                </span>
              </div>

              <div className="space-y-space-sm">
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium block">Holding Period</span>
                    <span className="font-label-code text-label-code text-outline">Static duration constraint</span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-numeric text-label-numeric font-bold text-on-surface block">
                      {experiment.holdingDays || 5} Trading Days
                    </span>
                    <span className="font-label-code text-label-code text-outline">T+{experiment.holdingDays || 5} Close (15:30 IST)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium block">Stop-loss Threshold</span>
                    <span className="font-label-code text-label-code text-outline">Premature risk threshold</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-outline bg-surface-container px-space-sm py-1 rounded-DEFAULT font-semibold">
                    NONE (Unconstrained)
                  </span>
                </div>

                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium block">Take-profit Target</span>
                    <span className="font-label-code text-label-code text-outline">Early target harvest</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-outline bg-surface-container px-space-sm py-1 rounded-DEFAULT font-semibold">
                    NONE (Pure Holding)
                  </span>
                </div>
              </div>
            </div>

            {/* Section: 06 / Frictional Cost Model */}
            <div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-xs border border-outline-variant/30">
              <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-numeric text-label-numeric text-outline font-semibold">06</span>
                  <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold text-on-surface">
                    Frictional Cost Model &amp; Accounting
                  </span>
                </div>
                <span className="font-label-code text-label-code text-on-surface-variant">NET_BASIS</span>
              </div>

              <div className="space-y-space-sm">
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium block">
                      Round-Trip Friction Baseline
                    </span>
                    <span className="font-label-code text-label-code text-outline">
                      STT, Stamp duty, NSE fees, Execution drag
                    </span>
                  </div>
                  <span className="font-label-numeric text-label-numeric font-bold text-on-surface bg-surface-container px-space-sm py-1 rounded-DEFAULT">
                    {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% Total
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">
                      Net Return Formula
                    </span>
                    <span className="font-label-code text-label-code text-on-tertiary-container font-medium">
                      Deterministic
                    </span>
                  </div>
                  <div className="bg-surface-container p-space-sm rounded-DEFAULT font-label-code text-label-code text-on-surface overflow-x-auto">
                    R_net = ((P_exit / P_entry) - 1) - {(experiment.transactionCost || 0.001).toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assumption Provenance Table */}
        <div className="bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/30 overflow-hidden mb-space-lg">
          <div className="p-space-lg flex items-center justify-between border-b border-surface-container">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[18px] text-on-surface">history_edu</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Assumption Provenance Audit Log
              </h2>
            </div>
            <span className="font-label-code text-label-code text-on-surface-variant">4 Specifications Registered</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps uppercase border-b border-surface-container">
                  <th className="py-space-sm px-space-lg">Parameter Target</th>
                  <th className="py-space-sm px-space-md">Configured Value</th>
                  <th className="py-space-sm px-space-md">Audit Origin</th>
                  <th className="py-space-sm px-space-md">Status</th>
                  <th className="py-space-sm px-space-lg text-right">Determinism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-md px-space-lg">
                    <span className="font-medium text-on-surface block">Decline Trigger Threshold</span>
                    <span className="font-label-code text-label-code text-outline">trigger.drawdown.min</span>
                  </td>
                  <td className="py-space-md px-space-md font-label-numeric text-label-numeric font-semibold text-on-surface">
                    {card1.confirmedValue}
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="inline-flex items-center gap-1 font-label-code text-label-code bg-surface-container px-space-xs py-0.5 rounded-DEFAULT text-on-surface">
                      <span className="material-symbols-outlined text-[12px] text-on-tertiary-container">auto_awesome</span>
                      {card1.isConfirmed ? 'AI Suggested → User Confirmed' : 'AI Suggested · Unconfirmed'}
                    </span>
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="inline-flex items-center gap-1 font-label-caps text-label-caps text-on-tertiary-container font-semibold bg-surface-container px-space-xs py-0.5 rounded-DEFAULT uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
                      {card1.isConfirmed ? 'Locked' : 'Default'}
                    </span>
                  </td>
                  <td className="py-space-md px-space-lg text-right font-label-code text-label-code text-on-surface">
                    100% Deterministic
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-md px-space-lg">
                    <span className="font-medium text-on-surface block">Execution Timing</span>
                    <span className="font-label-code text-label-code text-outline">execution.timing.entry</span>
                  </td>
                  <td className="py-space-md px-space-md font-label-code text-label-code text-on-surface font-medium">
                    {card2.confirmedValue}
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="inline-flex items-center gap-1 font-label-code text-label-code bg-surface-container px-space-xs py-0.5 rounded-DEFAULT text-on-surface">
                      <span className="material-symbols-outlined text-[12px] text-on-tertiary-container">auto_awesome</span>
                      {card2.isConfirmed ? 'AI Suggested → User Confirmed' : 'AI Suggested · Unconfirmed'}
                    </span>
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="inline-flex items-center gap-1 font-label-caps text-label-caps text-on-tertiary-container font-semibold bg-surface-container px-space-xs py-0.5 rounded-DEFAULT uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
                      {card2.isConfirmed ? 'Locked' : 'Default'}
                    </span>
                  </td>
                  <td className="py-space-md px-space-lg text-right font-label-code text-label-code text-on-surface">
                    100% Deterministic
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-md px-space-lg">
                    <span className="font-medium text-on-surface block">Holding Horizon Window</span>
                    <span className="font-label-code text-label-code text-outline">exit.temporal.days</span>
                  </td>
                  <td className="py-space-md px-space-md font-label-numeric text-label-numeric font-semibold text-on-surface">
                    {card3.confirmedValue}
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="inline-flex items-center gap-1 font-label-code text-label-code bg-surface-container px-space-xs py-0.5 rounded-DEFAULT text-on-surface">
                      <span className="material-symbols-outlined text-[12px] text-on-tertiary-container">auto_awesome</span>
                      {card3.isConfirmed ? 'AI Suggested → User Confirmed' : 'AI Suggested · Unconfirmed'}
                    </span>
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="inline-flex items-center gap-1 font-label-caps text-label-caps text-on-tertiary-container font-semibold bg-surface-container px-space-xs py-0.5 rounded-DEFAULT uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
                      {card3.isConfirmed ? 'Locked' : 'Default'}
                    </span>
                  </td>
                  <td className="py-space-md px-space-lg text-right font-label-code text-label-code text-on-surface">
                    100% Deterministic
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-md px-space-lg">
                    <span className="font-medium text-on-surface block">Exchange &amp; Friction Drag</span>
                    <span className="font-label-code text-label-code text-outline">costs.roundtrip.rate</span>
                  </td>
                  <td className="py-space-md px-space-md font-label-numeric text-label-numeric font-semibold text-on-surface">
                    {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% Round-trip
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="inline-flex items-center gap-1 font-label-code text-label-code bg-surface-container px-space-xs py-0.5 rounded-DEFAULT text-outline">
                      <span className="material-symbols-outlined text-[12px]">verified_user</span>
                      System Baseline Rule
                    </span>
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="inline-flex items-center gap-1 font-label-caps text-label-caps text-outline font-semibold bg-surface-container px-space-xs py-0.5 rounded-DEFAULT uppercase">
                      Immutable
                    </span>
                  </td>
                  <td className="py-space-md px-space-lg text-right font-label-code text-label-code text-on-surface">
                    Institutional Fixed
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
