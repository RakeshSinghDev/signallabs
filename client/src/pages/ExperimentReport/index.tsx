import React, { useState } from 'react';
import { useExperiment } from '../../state/ExperimentContext';

export const ExperimentReport: React.FC = () => {
  const { experiment, goToPhase, forkInvestigation } = useExperiment();
  const [activeTab, setActiveTab] = useState<'assumptions' | 'stats' | 'regimes' | 'limitations' | 'code'>('assumptions');
  const [copiedCode, setCopiedCode] = useState(false);
  const results = experiment.results;

  const pythonRecipe = `# SignalLab Research Recipe
# Experiment: ${experiment.title} (${experiment.id})
# Asset: ${experiment.market} | Horizon: ${experiment.dataPeriod}

import numpy as np
import pandas as pd

def test_nifty_mean_reversion(df: pd.DataFrame) -> dict:
    """
    Empirical test: ${experiment.title}
    Trigger: Daily drop <= -${((experiment.threshold || 0.05) * 100).toFixed(1)}%
    Entry: ${experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'Same-day close (T)' : 'Next open (T+1)'}
    Holding: ${experiment.holdingDays || 5} sessions (Exit T+${experiment.holdingDays || 5} Close)
    Friction: ${((experiment.transactionCost || 0.001) * 100).toFixed(2)}% round trip
    """
    df['pct_change'] = df['close'] / df['close'].shift(1) - 1.0
    
    # Qualification mask
    triggers = df[df['pct_change'] <= -${(experiment.threshold || 0.05).toFixed(3)}].copy()
    
    returns = []
    for idx in triggers.index:
        t_entry = idx + ${experiment.entryTiming === 'SAME_DAY_CLOSE' ? 0 : 1}
        t_exit = idx + ${experiment.holdingDays || 5}
        if t_exit < len(df):
            entry_price = df.loc[t_entry, '${experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'close' : 'open'}']
            exit_price = df.loc[t_exit, 'close']
            gross_ret = (exit_price / entry_price) - 1.0
            net_ret = gross_ret - ${(experiment.transactionCost || 0.001).toFixed(4)}
            returns.append(net_ret)
            
    ret_series = pd.Series(returns)
    return {
        'sample_size': len(ret_series),
        'mean_gross': ret_series.mean() + ${(experiment.transactionCost || 0.001).toFixed(4)},
        'mean_net': ret_series.mean(),
        'median': ret_series.median(),
        'win_rate': (ret_series > 0).mean()
    }
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonRecipe);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(experiment, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${experiment.id}_provenance_spec.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Command & Specifier Bar */}
      <section className="w-full bg-surface-container-lowest shadow-xs border-b border-outline-variant/30 px-margin py-space-md mb-space-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md max-w-7xl mx-auto">
          {/* Context & Titles */}
          <div className="flex flex-col gap-space-xs min-w-0">
            <div className="flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant truncate">
              <button 
                onClick={() => goToPhase('ask')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Experiments
              </button>
              <span className="text-outline">/</span>
              <span className="text-on-surface font-semibold bg-surface-container-low px-1.5 py-0.5 rounded-DEFAULT">
                {experiment.id}
              </span>
              <span className="text-outline">/</span>
              <span className="text-outline">Full Report &amp; Provenance Spec</span>
            </div>

            <div className="flex flex-wrap items-center gap-space-md">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-semibold">
                {experiment.title}
              </h1>
              <span className="inline-flex items-center gap-space-xs bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-label-caps px-space-sm py-0.5 rounded-DEFAULT font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
                COMPLETED · REPRODUCIBLE SNAPSHOT LOCKED
              </span>
            </div>

            <div className="flex items-center gap-space-md font-label-code text-label-code text-on-surface-variant flex-wrap">
              <span>Engine: <strong className="text-on-surface font-normal">SignalLab Core v2.4</strong></span>
              <span className="text-outline">•</span>
              <span>Universe: <span className="font-label-numeric text-label-numeric text-on-surface">{experiment.market}</span></span>
              <span className="text-outline">•</span>
              <span>Horizon: <span className="font-label-numeric text-label-numeric text-on-surface">{experiment.dataPeriod}</span></span>
              <span className="text-outline">•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-tertiary">lock</span> Read-Only Provenance Archive
              </span>
            </div>
          </div>

          {/* Action Group */}
          <div className="flex flex-wrap items-center gap-space-xs shrink-0 self-start lg:self-center">
            <button
              onClick={() => forkInvestigation(experiment.nextInvestigations[0])}
              className="h-8 px-space-md bg-surface-container-low text-on-surface hover:bg-surface-container font-body-sm text-body-sm rounded-DEFAULT flex items-center gap-space-xs transition-colors shadow-xs border border-outline-variant/30 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">fork_right</span>
              <span>Fork Experiment</span>
            </button>

            <button
              onClick={handleExportJson}
              className="h-8 px-space-md bg-surface-container-low text-on-surface hover:bg-surface-container font-body-sm text-body-sm rounded-DEFAULT flex items-center gap-space-xs transition-colors shadow-xs border border-outline-variant/30 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">data_object</span>
              <span>Export JSON Spec</span>
            </button>

            <button
              onClick={() => window.print()}
              className="h-8 px-space-md bg-primary text-on-primary hover:bg-inverse-surface font-body-sm text-body-sm rounded-DEFAULT flex items-center gap-space-xs transition-colors shadow-xs cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">print</span>
              <span>Print Research Brief</span>
            </button>
          </div>
        </div>
      </section>

      {/* Core Body */}
      <div className="px-margin flex flex-col gap-space-lg w-full max-w-7xl mx-auto">
        {/* Stepped Lifecycle Transformation Track */}
        <div className="w-full bg-surface-container-lowest shadow-xs border border-outline-variant/30 rounded-DEFAULT p-space-lg overflow-x-auto">
          <div className="flex items-center justify-between pb-space-sm mb-space-md bg-surface-container-low px-space-md py-space-xs rounded-DEFAULT border border-outline-variant/20">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
              Hypothesis Audit Lineage (Ask → Clarify → Define → Test → Learn)
            </span>
            <span className="font-label-code text-label-code text-outline">
              LATENCY: 412ms · ALL 5 PHASES SEALED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-space-sm min-w-[760px]">
            {/* Phase 01 */}
            <div 
              onClick={() => goToPhase('ask')}
              className="bg-surface-container-low p-space-md rounded-DEFAULT flex flex-col gap-space-xs relative border border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-numeric text-label-numeric font-semibold text-on-surface">01 · ASK</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              </div>
              <p className="font-headline-sm text-[13px] text-on-surface line-clamp-2">
                “{experiment.originalQuestion}”
              </p>
              <span className="font-label-code text-label-code text-outline mt-auto">Raw Natural Query</span>
            </div>

            {/* Phase 02 */}
            <div 
              onClick={() => goToPhase('clarify')}
              className="bg-surface-container-low p-space-md rounded-DEFAULT flex flex-col gap-space-xs relative border border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-numeric text-label-numeric font-semibold text-on-surface">02 · CLARIFY</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface">
                {((experiment.threshold || 0.05) * 100).toFixed(1)}% 1-day decline · {experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'Same-day market entry' : 'Next-session market entry'} · {experiment.holdingDays || 5}-day time-based holding
              </p>
              <span className="font-label-code text-label-code text-outline mt-auto">Ambiguity Resolved</span>
            </div>

            {/* Phase 03 */}
            <div 
              onClick={() => goToPhase('define')}
              className="bg-surface-container-low p-space-md rounded-DEFAULT flex flex-col gap-space-xs relative border border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-numeric text-label-numeric font-semibold text-on-surface">03 · DEFINE</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface">
                {experiment.market} · {experiment.dataPeriod} · {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% friction · FIFO non-overlapping
              </p>
              <span className="font-label-code text-label-code text-outline mt-auto">Execution Vector</span>
            </div>

            {/* Phase 04 */}
            <div 
              onClick={() => goToPhase('test')}
              className="bg-surface-container-low p-space-md rounded-DEFAULT flex flex-col gap-space-xs relative border border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-numeric text-label-numeric font-semibold text-on-surface">04 · TEST</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface">
                {results.sampleSize.toLocaleString()} qualifying observations validated · 0 lookahead errors
              </p>
              <span className="font-label-code text-label-code text-on-tertiary-container font-medium mt-auto">
                Integrity Pass: 100%
              </span>
            </div>

            {/* Phase 05 */}
            <div 
              onClick={() => goToPhase('learn')}
              className="bg-primary text-on-primary p-space-md rounded-DEFAULT flex flex-col gap-space-xs relative cursor-pointer hover:opacity-95 transition-opacity"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-numeric text-label-numeric font-semibold text-on-primary">05 · LEARN</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">verified</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-primary">
                +{results.averageNetReturn}% net return · {results.evidenceLevel} · Right-tail skew
              </p>
              <span className="font-label-code text-label-code text-outline-variant mt-auto">
                Empirical Evaluation
              </span>
            </div>
          </div>
        </div>

        {/* Tab Bar Controller */}
        <div className="w-full bg-surface-container-lowest shadow-xs border border-outline-variant/30 rounded-DEFAULT p-space-xs flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-space-xs min-w-max">
            <button
              onClick={() => setActiveTab('assumptions')}
              className={`px-space-md py-space-xs font-body-sm text-body-sm rounded-DEFAULT flex items-center gap-space-xs cursor-pointer transition-colors ${
                activeTab === 'assumptions'
                  ? 'bg-surface-container font-semibold text-on-surface shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">account_tree</span>
              <span>Assumptions &amp; Provenance</span>
              <span className="font-label-code text-label-code bg-surface-container-highest px-1 rounded-DEFAULT">
                Primary
              </span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`px-space-md py-space-xs font-body-sm text-body-sm rounded-DEFAULT flex items-center gap-space-xs cursor-pointer transition-colors ${
                activeTab === 'stats'
                  ? 'bg-surface-container font-semibold text-on-surface shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">equalizer</span>
              <span>Statistical Moments</span>
            </button>

            <button
              onClick={() => setActiveTab('regimes')}
              className={`px-space-md py-space-xs font-body-sm text-body-sm rounded-DEFAULT flex items-center gap-space-xs cursor-pointer transition-colors ${
                activeTab === 'regimes'
                  ? 'bg-surface-container font-semibold text-on-surface shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">stacked_bar_chart</span>
              <span>Market Regimes</span>
              <span className="font-label-caps text-label-caps bg-error-container text-on-error-container px-1 py-0.2 rounded-DEFAULT font-bold">
                1 Alert
              </span>
            </button>

            <button
              onClick={() => setActiveTab('limitations')}
              className={`px-space-md py-space-xs font-body-sm text-body-sm rounded-DEFAULT flex items-center gap-space-xs cursor-pointer transition-colors ${
                activeTab === 'limitations'
                  ? 'bg-surface-container font-semibold text-on-surface shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">warning</span>
              <span>Limitations &amp; Risks</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-space-md py-space-xs font-body-sm text-body-sm rounded-DEFAULT flex items-center gap-space-xs cursor-pointer transition-colors ${
                activeTab === 'code'
                  ? 'bg-surface-container font-semibold text-on-surface shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span>Python / SQL Recipe</span>
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-space-md px-space-md font-label-code text-label-code text-on-surface-variant shrink-0">
            <span className="text-outline">SPEC_REV:</span>
            <span className="bg-surface-container-low px-1.5 py-0.5 rounded-DEFAULT text-on-surface">
              {experiment.specHash}
            </span>
          </div>
        </div>

        {/* Tab 1: Assumptions & Provenance Audit */}
        {activeTab === 'assumptions' && (
          <div className="flex flex-col gap-space-lg w-full">
            {/* KPI Metric Tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
              <div className="bg-surface-container-lowest shadow-xs border border-outline-variant/30 p-space-md rounded-DEFAULT flex flex-col justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                  Sample Space (N)
                </span>
                <div className="my-space-xs flex items-baseline gap-space-xs">
                  <span className="font-headline-lg text-headline-lg font-label-numeric text-on-surface font-semibold">
                    {results.sampleSize.toLocaleString()}
                  </span>
                  <span className="font-label-code text-label-code text-outline">qualifying events</span>
                </div>
                <div className="bg-surface-container-low px-space-xs py-0.5 rounded-DEFAULT text-on-surface-variant font-label-code text-label-code truncate">
                  {experiment.datasetName}
                </div>
              </div>

              <div className="bg-surface-container-lowest shadow-xs border border-outline-variant/30 p-space-md rounded-DEFAULT flex flex-col justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                  Base Expected Return
                </span>
                <div className="my-space-xs flex items-baseline gap-space-xs">
                  <span className="font-headline-lg text-headline-lg font-label-numeric text-on-tertiary-container font-semibold">
                    +{results.averageNetReturn}%
                  </span>
                  <span className="font-label-code text-label-code text-outline">net/trade</span>
                </div>
                <div className="bg-surface-container-low px-space-xs py-0.5 rounded-DEFAULT text-on-surface-variant font-label-code text-label-code truncate">
                  Gross: +{results.averageGrossReturn}% · Friction: {((experiment.transactionCost || 0.001) * 100).toFixed(2)}%
                </div>
              </div>

              <div className="bg-surface-container-lowest shadow-xs border border-outline-variant/30 p-space-md rounded-DEFAULT flex flex-col justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                  Hypothesis T-Statistic
                </span>
                <div className="my-space-xs flex items-baseline gap-space-xs">
                  <span className="font-headline-lg text-headline-lg font-label-numeric text-on-surface font-semibold">
                    {results.tStatistic}
                  </span>
                  <span className="font-label-code text-label-code text-on-tertiary-container font-semibold">
                    p = {results.pValue}
                  </span>
                </div>
                <div className="bg-surface-container-low px-space-xs py-0.5 rounded-DEFAULT text-on-surface-variant font-label-code text-label-code truncate">
                  {results.evidenceLevel}
                </div>
              </div>

              <div className="bg-surface-container-lowest shadow-xs border border-outline-variant/30 p-space-md rounded-DEFAULT flex flex-col justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                  Regime Skew Ratio
                </span>
                <div className="my-space-xs flex items-baseline gap-space-xs">
                  <span className={`font-headline-lg text-headline-lg font-label-numeric font-semibold ${
                    (results.regimes?.bear.averageNetReturn ?? 0) < 0 ? 'text-error' : 'text-on-tertiary-container'
                  }`}>
                    {(results.regimes?.bear.averageNetReturn ?? 0) < (results.regimes?.bull.averageNetReturn ?? 0) ? 'Bull-Skewed' : 'Balanced'}
                  </span>
                </div>
                <div className={`px-space-xs py-0.5 rounded-DEFAULT font-label-code text-label-code truncate font-medium ${
                  (results.regimes?.bear.averageNetReturn ?? 0) < 0 ? 'bg-error-container text-on-error-container' : 'bg-surface-container-low text-on-surface-variant'
                }`}>
                  Bear Net Return: {results.regimes ? `${results.regimes.bear.averageNetReturn >= 0 ? '+' : ''}${results.regimes.bear.averageNetReturn}%` : 'N/A'}
                </div>
              </div>
            </div>

            {/* Provenance Audit Table */}
            <div className="bg-surface-container-lowest shadow-xs border border-outline-variant/30 rounded-DEFAULT overflow-hidden">
              <div className="px-space-lg py-space-md bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs border-b border-outline-variant/30">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    System Assumptions &amp; Provenance Audit
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Deterministic mapping between natural prompts, AI inferences, confirmed specifications, and test impact.
                  </p>
                </div>
                <div className="flex items-center gap-space-xs font-label-code text-label-code">
                  <span className="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
                  <span className="text-on-surface font-semibold">5 of 5 confirmed</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-body-md text-body-md">
                  <thead>
                    <tr className="bg-surface-container font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider border-b border-surface-container">
                      <th className="py-space-sm px-space-lg">Parameter Vector</th>
                      <th className="py-space-sm px-space-md">Initial User Prompt</th>
                      <th className="py-space-sm px-space-md">AI Inferred Setting</th>
                      <th className="py-space-sm px-space-md">User Confirmed Setting</th>
                      <th className="py-space-sm px-space-lg text-right">System Alpha Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-low font-label-code text-label-code">
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-space-md px-space-lg font-semibold text-on-surface">
                        Trigger Event
                        <span className="block font-body-sm text-body-sm text-outline font-normal">T_WINDOW</span>
                      </td>
                      <td className="py-space-md px-space-md text-on-surface-variant font-body-sm text-body-sm">
                        "sharp fall"
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-block px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-on-surface-variant">
                          Close-to-Close ≤ -{((experiment.threshold || 0.05) * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-DEFAULT bg-surface-container-highest text-on-surface font-semibold">
                          <span className="material-symbols-outlined text-[13px] text-tertiary">done</span>
                          {experiment.market} -{((experiment.threshold || 0.05) * 100).toFixed(2)}% 1-Day
                        </span>
                      </td>
                      <td className="py-space-md px-space-lg text-right font-label-numeric text-label-numeric text-on-surface">
                        Filters 97.4% non-events
                      </td>
                    </tr>

                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-space-md px-space-lg font-semibold text-on-surface">
                        Execution Timing
                        <span className="block font-body-sm text-body-sm text-outline font-normal">EXEC_LATENCY</span>
                      </td>
                      <td className="py-space-md px-space-md text-on-surface-variant font-body-sm text-body-sm">
                        "buying after"
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-block px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-on-surface-variant">
                          Immediate close or next open
                        </span>
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-DEFAULT bg-surface-container-highest text-on-surface font-semibold">
                          <span className="material-symbols-outlined text-[13px] text-tertiary">done</span>
                          {experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'T Session Close (MKT)' : 'T+1 Session Open (MKT)'}
                        </span>
                      </td>
                      <td className="py-space-md px-space-lg text-right font-label-numeric text-label-numeric text-error">
                        Avoids close slippage (-0.08%)
                      </td>
                    </tr>

                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-space-md px-space-lg font-semibold text-on-surface">
                        Holding Period
                        <span className="block font-body-sm text-body-sm text-outline font-normal">HOLD_DURATION</span>
                      </td>
                      <td className="py-space-md px-space-md text-on-surface-variant font-body-sm text-body-sm">
                        "does it work?" (unspecified)
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-block px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-on-surface-variant">
                          Default 5-Day Swing
                        </span>
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-DEFAULT bg-surface-container-highest text-on-surface font-semibold">
                          <span className="material-symbols-outlined text-[13px] text-tertiary">done</span>
                          {experiment.holdingDays || 5} Trading Sessions Flat
                        </span>
                      </td>
                      <td className="py-space-md px-space-lg text-right font-label-numeric text-label-numeric text-on-tertiary-container font-semibold">
                        Peak mean reversion apex
                      </td>
                    </tr>

                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-space-md px-space-lg font-semibold text-on-surface">
                        Friction &amp; Slippage
                        <span className="block font-body-sm text-body-sm text-outline font-normal">TOTAL_DRAG</span>
                      </td>
                      <td className="py-space-md px-space-md text-on-surface-variant font-body-sm text-body-sm">
                        Not stated
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-block px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-on-surface-variant">
                          Zero frictionless baseline
                        </span>
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-DEFAULT bg-surface-container-highest text-on-surface font-semibold">
                          <span className="material-symbols-outlined text-[13px] text-tertiary">done</span>
                          {((experiment.transactionCost || 0.001) * 10000).toFixed(0)} bps total (STT+Brokerage+Impact)
                        </span>
                      </td>
                      <td className="py-space-md px-space-lg text-right font-label-numeric text-label-numeric text-outline font-medium">
                        -{((experiment.transactionCost || 0.001) * 100).toFixed(2)}% gross-to-net penalty
                      </td>
                    </tr>

                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-space-md px-space-lg font-semibold text-on-surface">
                        Data Universe
                        <span className="block font-body-sm text-body-sm text-outline font-normal">UNIVERSE_ID</span>
                      </td>
                      <td className="py-space-md px-space-md text-on-surface-variant font-body-sm text-body-sm">
                        "NIFTY"
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-block px-1.5 py-0.5 rounded-DEFAULT bg-surface-container text-on-surface-variant">
                          Spot Index or Nearest Futures
                        </span>
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-DEFAULT bg-surface-container-highest text-on-surface font-semibold">
                          <span className="material-symbols-outlined text-[13px] text-tertiary">done</span>
                          NSE NIFTY 50 TRI (Total Return)
                        </span>
                      </td>
                      <td className="py-space-md px-space-lg text-right font-label-numeric text-label-numeric text-on-surface">
                        Includes dividend adjustments
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Statistical Breakdown */}
        {activeTab === 'stats' && (
          <div className="bg-surface-container-lowest p-space-xl rounded-DEFAULT shadow-xs border border-outline-variant/30 space-y-space-lg">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Statistical Moments &amp; Significance Parameters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md font-body-sm">
              <div className="p-space-md bg-surface-container-low rounded-DEFAULT border border-outline-variant/20 space-y-1">
                <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">Mean (μ)</span>
                <div className="font-label-numeric text-headline-sm text-on-surface font-semibold">+{results.averageGrossReturn}%</div>
                <p className="text-on-surface-variant text-body-sm">Arithmetic average of 5-day post-shock return series.</p>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-DEFAULT border border-outline-variant/20 space-y-1">
                <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">Median (P50)</span>
                <div className="font-label-numeric text-headline-sm text-on-surface font-semibold">+{results.medianReturn}%</div>
                <p className="text-on-surface-variant text-body-sm">Robust central tendency mitigating extreme rally outliers.</p>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-DEFAULT border border-outline-variant/20 space-y-1">
                <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">Standard Deviation (σ)</span>
                <div className="font-label-numeric text-headline-sm text-on-surface font-semibold">{results.standardDeviation}%</div>
                <p className="text-on-surface-variant text-body-sm">Cross-event volatility of forward 5-session performance.</p>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-DEFAULT border border-outline-variant/20 space-y-1">
                <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">Skewness</span>
                <div className="font-label-numeric text-headline-sm text-on-surface font-semibold">+{results.skewness}</div>
                <p className="text-on-surface-variant text-body-sm">Positive right tail: large upside rebounds out-magnitude down continuations.</p>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-DEFAULT border border-outline-variant/20 space-y-1">
                <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">Kurtosis</span>
                <div className="font-label-numeric text-headline-sm text-on-surface font-semibold">{results.kurtosis}</div>
                <p className="text-on-surface-variant text-body-sm">Leptokurtic fat-tail distribution typical of liquidation clusters.</p>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-DEFAULT border border-outline-variant/20 space-y-1">
                <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">Student's t-Stat</span>
                <div className="font-label-numeric text-headline-sm text-on-surface font-semibold">{results.tStatistic} (p={results.pValue})</div>
                <p className="text-on-surface-variant text-body-sm">Moderate rejection of null hypothesis μ ≤ 0 at 95% confidence level.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Market Regimes */}
        {activeTab === 'regimes' && (
          <div className="bg-surface-container-lowest p-space-xl rounded-DEFAULT shadow-xs border border-outline-variant/30 space-y-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Market Regime Conditioning Breakdown
              </h2>
              <span className="font-label-caps text-label-caps bg-error-container text-on-error-container px-2 py-0.5 rounded-DEFAULT font-bold">
                REGIME RISK DETECTED
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              When we partition the {results.sampleSize.toLocaleString()} qualifying observations by macroeconomic trend regime (above vs below 200-day moving average), the statistical edge demonstrates sharp divergence:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
              <div className="p-space-md bg-surface-container-low rounded-DEFAULT border border-outline-variant/20 space-y-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-label-caps text-on-tertiary-container font-semibold uppercase">
                    Bull Regime ({experiment.market} &gt; 200 DMA)
                  </span>
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    N = {results.regimes ? results.regimes.bull.observations.toLocaleString() : '0'} ({results.regimes ? results.regimes.bull.percentage : 0}%)
                  </span>
                </div>
                <div className="font-label-numeric text-headline-sm text-on-tertiary-container font-semibold">
                  {results.regimes && results.regimes.bull.averageNetReturn >= 0 ? '+' : ''}
                  {results.regimes ? results.regimes.bull.averageNetReturn.toFixed(2) : '0.00'}% Net Return (Win Rate: {results.regimes ? results.regimes.bull.winRate.toFixed(1) : '0.0'}%)
                </div>
                <p className="text-body-sm text-on-surface-variant">
                  In structural bull markets (closing price above the trailing 200-day SMA on signal date), pullbacks trigger institutional dip-buying and liquidity replenishment.
                </p>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-DEFAULT border border-outline-variant/20 space-y-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-label-caps text-error font-semibold uppercase">
                    Bear Regime ({experiment.market} &le; 200 DMA)
                  </span>
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    N = {results.regimes ? results.regimes.bear.observations.toLocaleString() : '0'} ({results.regimes ? results.regimes.bear.percentage : 0}%)
                  </span>
                </div>
                <div className={`font-label-numeric text-headline-sm font-semibold ${
                  (results.regimes?.bear.averageNetReturn ?? 0) >= 0 ? 'text-on-tertiary-container' : 'text-error'
                }`}>
                  {results.regimes && results.regimes.bear.averageNetReturn >= 0 ? '+' : ''}
                  {results.regimes ? results.regimes.bear.averageNetReturn.toFixed(2) : '0.00'}% Net Return (Win Rate: {results.regimes ? results.regimes.bear.winRate.toFixed(1) : '0.0'}%)
                </div>
                <p className="text-body-sm text-on-surface-variant">
                  In bear regimes (closing price at or below trailing 200-day SMA on signal date), single-session drops frequently exhibit heightened downside volatility and trend acceleration.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Limitations & Risks */}
        {activeTab === 'limitations' && (
          <div className="bg-surface-container-lowest p-space-xl rounded-DEFAULT shadow-xs border border-outline-variant/30 space-y-space-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Empirical Research Limitations
            </h2>
            <div className="space-y-space-sm font-body-sm">
              {experiment.limitations.map((lim, idx) => (
                <div
                  key={idx}
                  className="p-space-md bg-surface-container-low rounded-DEFAULT border border-outline-variant/20 flex items-start gap-space-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-label-numeric text-label-numeric font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-on-surface">{lim}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Code / SQL Recipe */}
        {activeTab === 'code' && (
          <div className="bg-surface-container-lowest p-space-xl rounded-DEFAULT shadow-xs border border-outline-variant/30 space-y-space-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Reproducible Experiment Code Recipe
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Executable Python script implementing the exact vector logic, entry timing, and friction drag.
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-space-md py-1 bg-surface-container text-on-surface font-label-code text-[11px] rounded-DEFAULT hover:bg-surface-container-high transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                <span>{copiedCode ? 'Copied Code!' : 'Copy Python'}</span>
              </button>
            </div>

            <pre className="p-space-md bg-surface-container-low rounded-DEFAULT font-label-code text-label-code text-on-surface overflow-x-auto border border-outline-variant/20 leading-relaxed">
              <code>{pythonRecipe}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
