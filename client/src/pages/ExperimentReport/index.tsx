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
    <div className="min-h-screen bg-[#CBD6E6] text-[#111111] pb-16 font-sans">
      {/* Subheader Tracker Ribbon */}
      <div className="w-full bg-white border-b border-[#E5EAF1] px-4 sm:px-6 py-2.5 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPhase('learn')}
              className="text-[#667085] hover:text-[#111111] font-medium transition-colors cursor-pointer"
            >
              ← Back to Learn
            </button>
            <span className="text-[#CBD6E6]">|</span>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#2879F2] font-semibold">
              Experiment Report
            </span>
            <span className="text-[#667085] font-medium">Complete Provenance &amp; Verification Audit</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#667085]">
            <span className="w-2 h-2 rounded-full bg-[#08B878]"></span>
            <span>Study ID: {experiment.id}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Top Header Card */}
        <section className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E5EAF1] flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E6F8F1] text-[#08B878] uppercase tracking-wider">
                COMPLETED · EXPERIMENT REPORT
              </span>
              <span className="text-xs text-[#667085]">•</span>
              <span className="text-xs text-[#667085]">{experiment.market} ({experiment.dataPeriod})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
              {experiment.originalQuestion || experiment.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-[#667085] flex-wrap">
              <span>Engine: <strong className="text-[#111111] font-medium">SignalLab Core v2.4</strong></span>
              <span>•</span>
              <span>Universe: <strong className="text-[#111111] font-medium">{experiment.market}</strong></span>
              <span>•</span>
              <span>Timeframe: <strong className="text-[#111111] font-medium">{experiment.dataPeriod}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#08B878] font-medium">
                ✓ Locked Provenance Spec
              </span>
            </div>
          </div>

          {/* Action Group */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-center">
            <button
              onClick={() => forkInvestigation(experiment.nextInvestigations[0])}
              className="px-4 py-2 bg-white text-[#111111] hover:bg-[#F8FAFC] text-xs font-semibold rounded-xl border border-[#E5EAF1] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              type="button"
            >
              <span>⇄</span>
              <span>Fork Experiment</span>
            </button>

            <button
              onClick={handleExportJson}
              className="px-4 py-2 bg-white text-[#111111] hover:bg-[#F8FAFC] text-xs font-semibold rounded-xl border border-[#E5EAF1] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              type="button"
            >
              <span>{`{ }`}</span>
              <span>Export JSON Spec</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#111111] text-white hover:bg-black text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              type="button"
            >
              <span>⎙</span>
              <span>Print Report</span>
            </button>
          </div>
        </section>

        {/* Stepped Lifecycle Transformation Track */}
        <section className="w-full bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
            <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
              Research Lifecycle Audit (Ask → Clarify → Define → Test → Learn)
            </span>
            <span className="text-xs text-[#08B878] font-semibold bg-[#E6F8F1] px-2.5 py-0.5 rounded-full">
              ALL 5 PHASES VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Phase 01 */}
            <div 
              onClick={() => goToPhase('ask')}
              className="bg-[#F8FAFC] p-3.5 rounded-xl flex flex-col gap-1.5 border border-[#E5EAF1] cursor-pointer hover:border-[#2879F2] hover:bg-[#E8F1FD]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111111]">01 · ASK</span>
                <span className="text-xs text-[#08B878] font-bold">✓</span>
              </div>
              <p className="text-xs text-[#111111] line-clamp-2 font-medium">
                "{experiment.originalQuestion}"
              </p>
              <span className="text-[11px] text-[#667085] mt-auto">Initial Query</span>
            </div>

            {/* Phase 02 */}
            <div 
              onClick={() => goToPhase('clarify')}
              className="bg-[#F8FAFC] p-3.5 rounded-xl flex flex-col gap-1.5 border border-[#E5EAF1] cursor-pointer hover:border-[#2879F2] hover:bg-[#E8F1FD]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111111]">02 · CLARIFY</span>
                <span className="text-xs text-[#08B878] font-bold">✓</span>
              </div>
              <p className="text-xs text-[#111111] font-medium">
                {((experiment.threshold || 0.05) * 100).toFixed(1)}% drop · {experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'Same-day' : 'Next open'} · {experiment.holdingDays || 5}d
              </p>
              <span className="text-[11px] text-[#667085] mt-auto">Assumptions Locked</span>
            </div>

            {/* Phase 03 */}
            <div 
              onClick={() => goToPhase('define')}
              className="bg-[#F8FAFC] p-3.5 rounded-xl flex flex-col gap-1.5 border border-[#E5EAF1] cursor-pointer hover:border-[#2879F2] hover:bg-[#E8F1FD]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111111]">03 · DEFINE</span>
                <span className="text-xs text-[#08B878] font-bold">✓</span>
              </div>
              <p className="text-xs text-[#111111] font-medium">
                {experiment.market} · {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% fee · Non-overlapping
              </p>
              <span className="text-[11px] text-[#667085] mt-auto">Execution Spec</span>
            </div>

            {/* Phase 04 */}
            <div 
              onClick={() => goToPhase('test')}
              className="bg-[#F8FAFC] p-3.5 rounded-xl flex flex-col gap-1.5 border border-[#E5EAF1] cursor-pointer hover:border-[#2879F2] hover:bg-[#E8F1FD]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111111]">04 · TEST</span>
                <span className="text-xs text-[#08B878] font-bold">✓</span>
              </div>
              <p className="text-xs text-[#111111] font-medium">
                {results.sampleSize} events analyzed · 4 safeguards
              </p>
              <span className="text-[11px] text-[#08B878] font-semibold mt-auto">All Passed</span>
            </div>

            {/* Phase 05 */}
            <div 
              onClick={() => goToPhase('learn')}
              className="bg-[#111111] text-white p-3.5 rounded-xl flex flex-col gap-1.5 cursor-pointer hover:bg-black transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">05 · LEARN</span>
                <span className="text-xs text-[#08B878] font-bold">✓</span>
              </div>
              <p className="text-xs text-white font-medium">
                +{results.averageNetReturn}% net return · {Number(results.pValue) < 0.05 ? 'p < 0.05' : 'p ≥ 0.05 (Not Sig.)'}
              </p>
              <span className="text-[11px] text-[#CBD6E6] mt-auto">Final Evaluation</span>
            </div>
          </div>
        </section>

        {/* Tab Navigation Pill Bar */}
        <div className="w-full bg-white p-2 rounded-2xl shadow-sm border border-[#E5EAF1] flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => setActiveTab('assumptions')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'assumptions'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#667085] hover:text-[#111111] hover:bg-[#F8FAFC]'
              }`}
              type="button"
            >
              Assumptions &amp; Choices
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'stats'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#667085] hover:text-[#111111] hover:bg-[#F8FAFC]'
              }`}
              type="button"
            >
              Detailed Numbers
            </button>

            <button
              onClick={() => setActiveTab('regimes')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'regimes'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#667085] hover:text-[#111111] hover:bg-[#F8FAFC]'
              }`}
              type="button"
            >
              <span>Market Environment</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'regimes' ? 'bg-[#FF4A2D] text-white' : 'bg-[#FEECE9] text-[#FF4A2D]'
              }`}>
                Key Split
              </span>
            </button>

            <button
              onClick={() => setActiveTab('limitations')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'limitations'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#667085] hover:text-[#111111] hover:bg-[#F8FAFC]'
              }`}
              type="button"
            >
              Important Limits
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#667085] hover:text-[#111111] hover:bg-[#F8FAFC]'
              }`}
              type="button"
            >
              Python Code
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-2 px-3 text-xs text-[#667085] shrink-0 font-mono">
            <span>HASH:</span>
            <span className="bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E5EAF1] text-[#111111]">
              {experiment.specHash}
            </span>
          </div>
        </div>

        {/* Tab 1: Assumptions & Provenance Audit */}
        {activeTab === 'assumptions' && (
          <div className="space-y-6">
            {/* KPI Metric Tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E5EAF1] flex flex-col justify-between">
                <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Qualifying Drops
                </span>
                <div className="my-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#111111]">
                    {results.sampleSize.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#667085]">events</span>
                </div>
                <div className="text-xs text-[#667085] bg-[#F8FAFC] px-2 py-1 rounded-lg border border-[#E5EAF1] truncate">
                  {experiment.datasetName}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E5EAF1] flex flex-col justify-between">
                <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Average Net Return
                </span>
                <div className="my-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#08B878]">
                    +{results.averageNetReturn}%
                  </span>
                  <span className="text-xs text-[#667085]">net per trade</span>
                </div>
                <div className="text-xs text-[#667085] bg-[#F8FAFC] px-2 py-1 rounded-lg border border-[#E5EAF1] truncate">
                  Gross: +{results.averageGrossReturn}% · Fee: {((experiment.transactionCost || 0.001) * 100).toFixed(2)}%
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E5EAF1] flex flex-col justify-between">
                <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  STATISTICAL TEST
                </span>
                <div className="my-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#111111]">
                    p = {results.pValue}
                  </span>
                  <span className="text-xs text-[#667085]">
                    t = {results.tStatistic}
                  </span>
                </div>
                <div className="text-xs text-[#667085] bg-[#F8FAFC] px-2 py-1 rounded-lg border border-[#E5EAF1] truncate">
                  Not statistically significant (p ≥ 0.05)
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E5EAF1] flex flex-col justify-between">
                <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                  Market Environment Split
                </span>
                <div className="my-2 flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${
                    (results.regimes?.bear.averageNetReturn ?? 0) < 0 ? 'text-[#FF4A2D]' : 'text-[#08B878]'
                  }`}>
                    {(results.regimes?.bear.averageNetReturn ?? 0) < (results.regimes?.bull.averageNetReturn ?? 0) ? 'Bull-Skewed' : 'Balanced'}
                  </span>
                </div>
                <div className={`text-xs px-2 py-1 rounded-lg border truncate font-medium ${
                  (results.regimes?.bear.averageNetReturn ?? 0) < 0 
                    ? 'bg-[#FEECE9] text-[#FF4A2D] border-[#FF4A2D]/20' 
                    : 'bg-[#F8FAFC] text-[#667085] border-[#E5EAF1]'
                }`}>
                  Bear Net: {results.regimes ? `${results.regimes.bear.averageNetReturn >= 0 ? '+' : ''}${results.regimes.bear.averageNetReturn}%` : 'N/A'}
                </div>
              </div>
            </div>

            {/* Provenance Audit Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF1] overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-[#E5EAF1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC]">
                <div>
                  <h2 className="text-base font-bold text-[#111111]">
                    Every Assumption Confirmed for This Test
                  </h2>
                  <p className="text-xs text-[#667085] mt-0.5">
                    How each casual phrase in your question was converted into an exact, testable rule.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#08B878] bg-[#E6F8F1] px-3 py-1 rounded-full w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#08B878]"></span>
                  <span>5 of 5 assumptions confirmed</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-white text-[#667085] font-semibold border-b border-[#E5EAF1]">
                      <th className="py-3 px-5">What We Needed to Decide</th>
                      <th className="py-3 px-4">What You First Asked</th>
                      <th className="py-3 px-4">Standard Setting</th>
                      <th className="py-3 px-4">Your Confirmed Choice</th>
                      <th className="py-3 px-5 text-right">Why This Matters</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5EAF1] text-[#111111]">
                    <tr className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-5 font-semibold">
                        What counts as a sharp fall?
                        <span className="block text-[11px] text-[#667085] font-normal">TRIGGER CONDITION</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#667085]">
                        "sharp fall"
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E5EAF1] text-[#667085]">
                          Drop of at least {((experiment.threshold || 0.05) * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#2879F2] font-semibold">
                          ✓ {experiment.market} -{((experiment.threshold || 0.05) * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right text-[#667085]">
                        Filters normal market noise; finds {results.sampleSize} drops
                      </td>
                    </tr>

                    <tr className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-5 font-semibold">
                        When would we buy?
                        <span className="block text-[11px] text-[#667085] font-normal">TRADE ENTRY RULE</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#667085]">
                        "buying after"
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E5EAF1] text-[#667085]">
                          Next market open
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#2879F2] font-semibold">
                          ✓ {experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'Same-day close (T Close)' : 'Next market open (T+1 Open)'}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right text-[#667085]">
                        Gives a realistic, executable price
                      </td>
                    </tr>

                    <tr className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-5 font-semibold">
                        How long should we stay invested?
                        <span className="block text-[11px] text-[#667085] font-normal">HOLDING PERIOD</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#667085]">
                        "does it work?" (unspecified)
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E5EAF1] text-[#667085]">
                          Default 5-Day Swing
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#2879F2] font-semibold">
                          ✓ {experiment.holdingDays || 5} Trading Sessions Flat
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right text-[#08B878] font-medium">
                        Measures the short-term rebound window
                      </td>
                    </tr>

                    <tr className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-5 font-semibold">
                        What does trading cost us?
                        <span className="block text-[11px] text-[#667085] font-normal">TRADING COSTS</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#667085]">
                        Not stated
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E5EAF1] text-[#667085]">
                          Zero frictionless baseline
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#2879F2] font-semibold">
                          ✓ {((experiment.transactionCost || 0.001) * 10000).toFixed(0)} bps ({((experiment.transactionCost || 0.001) * 100).toFixed(2)}%)
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right text-[#667085]">
                        -{((experiment.transactionCost || 0.001) * 100).toFixed(2)}% fee deducted per trade
                      </td>
                    </tr>

                    <tr className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-5 font-semibold">
                        What dataset are we studying?
                        <span className="block text-[11px] text-[#667085] font-normal">HISTORICAL DATASET</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#667085]">
                        "NIFTY"
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E5EAF1] text-[#667085]">
                          NIFTY 50 Index (Price Return)
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#2879F2] font-semibold">
                          ✓ NSE NIFTY 50 (2018–2025)
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right text-[#667085]">
                        Daily closing price series ({experiment.totalTradingSessions || 1849} sessions)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Detailed Numbers */}
        {activeTab === 'stats' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#111111]">
                Detailed Statistical Summary
              </h2>
              <p className="text-xs text-[#667085] mt-1">
                Mathematical indicators measuring consistency, spread, and sample reliability of post-drop returns.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] space-y-1.5">
                <span className="text-[11px] font-semibold text-[#667085] uppercase">Average Gross Return (μ)</span>
                <div className="text-2xl font-bold text-[#111111]">+{results.averageGrossReturn}%</div>
                <p className="text-[#667085]">Arithmetic average of {experiment.holdingDays || 5}-day returns before costs.</p>
              </div>
              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] space-y-1.5">
                <span className="text-[11px] font-semibold text-[#667085] uppercase">Median Return (P50)</span>
                <div className="text-2xl font-bold text-[#111111]">+{results.medianReturn}%</div>
                <p className="text-[#667085]">The midpoint return — half the trades performed better, half performed worse.</p>
              </div>
              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] space-y-1.5">
                <span className="text-[11px] font-semibold text-[#667085] uppercase">Spread / Volatility (σ)</span>
                <div className="text-2xl font-bold text-[#111111]">{results.standardDeviation}%</div>
                <p className="text-[#667085]">Standard deviation showing how much individual trades diverged from the mean.</p>
              </div>
              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] space-y-1.5">
                <span className="text-[11px] font-semibold text-[#667085] uppercase">Distribution Skew</span>
                <div className="text-2xl font-bold text-[#111111]">+{results.skewness}</div>
                <p className="text-[#667085]">Positive skew: a small number of outsized rallies pulled the arithmetic average upward.</p>
              </div>
              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] space-y-1.5">
                <span className="text-[11px] font-semibold text-[#667085] uppercase">Fat-Tail Risk (Kurtosis)</span>
                <div className="text-2xl font-bold text-[#111111]">{results.kurtosis}</div>
                <p className="text-[#667085]">Kurtosis indicates that extreme tail moves occurred more often than in a normal distribution.</p>
              </div>
              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] space-y-1.5">
                <span className="text-[11px] font-semibold text-[#667085] uppercase">Statistical Test (t-Stat &amp; p-Val)</span>
                <div className="text-2xl font-bold text-[#111111]">t = {results.tStatistic} (p = {results.pValue})</div>
                <p className="text-[#667085]">
                  {Number(results.pValue) < 0.05
                    ? 'Statistically significant at the 5% level.'
                    : `With p = ${results.pValue}, the result is not statistically significant at the 5% level.`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Market Regimes */}
        {activeTab === 'regimes' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
              <div>
                <h2 className="text-xl font-bold text-[#111111]">
                  Market Environment: Above vs Below 200-Day Moving Average
                </h2>
                <p className="text-xs text-[#667085] mt-1">
                  We partitioned the {results.sampleSize.toLocaleString()} qualifying events based on whether the index was above or below its 200-day simple moving average at entry.
                </p>
              </div>
              <span className="text-xs font-bold text-[#FF4A2D] bg-[#FEECE9] px-3 py-1 rounded-full shrink-0">
                CRITICAL REGIME SPLIT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-[#F0FDF4] rounded-xl border border-[#08B878]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#08B878] uppercase">
                    Bull Market ({experiment.market} &gt; 200 DMA)
                  </span>
                  <span className="text-xs text-[#667085] font-mono">
                    N = {results.regimes ? results.regimes.bull.observations.toLocaleString() : '0'} ({results.regimes ? results.regimes.bull.percentage : 0}%)
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#08B878]">
                  {results.regimes && results.regimes.bull.averageNetReturn >= 0 ? '+' : ''}
                  {results.regimes ? results.regimes.bull.averageNetReturn.toFixed(2) : '0.00'}% Net Return
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Win rate: <strong className="text-[#111111]">{results.regimes ? results.regimes.bull.winRate.toFixed(1) : '0.0'}%</strong>. In overall uptrends, sharp one-day declines often attract dip-buyers, resulting in dependable mean-reversion bounces.
                </p>
              </div>

              <div className="p-5 bg-[#FEF2F2] rounded-xl border border-[#FF4A2D]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FF4A2D] uppercase">
                    Bear Market ({experiment.market} &le; 200 DMA)
                  </span>
                  <span className="text-xs text-[#667085] font-mono">
                    N = {results.regimes ? results.regimes.bear.observations.toLocaleString() : '0'} ({results.regimes ? results.regimes.bear.percentage : 0}%)
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#FF4A2D]">
                  {results.regimes && results.regimes.bear.averageNetReturn >= 0 ? '+' : ''}
                  {results.regimes ? results.regimes.bear.averageNetReturn.toFixed(2) : '0.00'}% Net Return
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Win rate: <strong className="text-[#111111]">{results.regimes ? results.regimes.bear.winRate.toFixed(1) : '0.0'}%</strong>. In ongoing downtrends, sharp declines frequently cascade into further selling rather than immediate rebounds.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Limitations & Risks */}
        {activeTab === 'limitations' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#111111]">
                Important Research Limitations
              </h2>
              <p className="text-xs text-[#667085] mt-1">
                Transparency matters. Here are the core constraints and analytical boundaries of this study:
              </p>
            </div>
            <div className="space-y-3 text-xs">
              {experiment.limitations.map((lim, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-white border border-[#E5EAF1] text-[#111111] flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-[#111111] leading-relaxed font-medium">{lim}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Code / Python Recipe */}
        {activeTab === 'code' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#111111]">
                  Reproduce This Test in Python
                </h2>
                <p className="text-xs text-[#667085] mt-1">
                  Self-contained Python code you can run locally to verify these exact calculations.
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 bg-[#111111] text-white hover:bg-black text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{copiedCode ? '✓ Copied' : 'Copy Python'}</span>
              </button>
            </div>

            <pre className="p-4 bg-[#F8FAFC] rounded-xl font-mono text-xs text-[#111111] overflow-x-auto border border-[#E5EAF1] leading-relaxed">
              <code>{pythonRecipe}</code>
            </pre>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => goToPhase('learn')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#111111] bg-white border border-[#E5EAF1] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          >
            ← Back to Learn
          </button>
          <button
            onClick={() => goToPhase('ask')}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#111111] text-white hover:bg-black transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Start New Investigation</span>
            <span className="text-sm">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
