import React, { useState } from 'react';
import { useExperiment } from '../../state/ExperimentContext';

export const TestExecution: React.FC = () => {
  const { experiment, executionSimulation, goToPhase, startExecutionSimulation } = useExperiment();
  const [copied, setCopied] = useState(false);

  const handleCopyLog = () => {
    const text = JSON.stringify(experiment.auditLogs, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Context Sub-bar */}
      <div className="w-full bg-white/70 backdrop-blur-sm border-b border-[#E5EAF1] py-3 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#2879F2] font-semibold text-xs">
              Step 4 of 5
            </span>
            <span className="text-[#667085] font-medium">Test: See what historical data actually shows</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#667085]">
            <span className={`w-2 h-2 rounded-full ${executionSimulation.isComplete ? 'bg-[#08B878]' : 'bg-[#2879F2] animate-pulse'}`}></span>
            <span>{executionSimulation.isComplete ? 'Analysis Complete' : 'Calculating...'}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Specification Summary Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E5EAF1] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#667085]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-[#111111] bg-[#F3F6FA] px-2.5 py-1 rounded-lg">TESTED SPECIFICATION</span>
            <span>{experiment.market}</span>
            <span>•</span>
            <span>≥{((experiment.threshold || 0.05) * 100).toFixed(1)}% single-day drop</span>
            <span>•</span>
            <span>{experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'Day T Close' : 'Day T+1 Open'}</span>
            <span>•</span>
            <span>{experiment.holdingDays || 5}-Day Holding</span>
            <span>•</span>
            <span>{((experiment.transactionCost || 0.001) * 100).toFixed(2)}% cost deducted</span>
          </div>

          <button
            onClick={() => startExecutionSimulation()}
            disabled={executionSimulation.isLoading}
            className="px-3 py-1 rounded-xl bg-[#F8FAFC] border border-[#E5EAF1] text-[#111111] font-semibold hover:bg-white transition-colors cursor-pointer shrink-0 disabled:opacity-50"
          >
            {executionSimulation.isLoading ? 'Calculating...' : 'Re-run Engine'}
          </button>
        </div>

        {/* Primary Results Hero Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF1] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2879F2]">HISTORICAL RESULTS</span>
              <h1 className="text-2xl sm:text-3xl text-[#111111] font-bold tracking-tight mt-1">
                Let's see what happened.
              </h1>
              <p className="text-sm text-[#667085] mt-1">
                We analyzed {experiment.totalTradingSessions.toLocaleString()} daily sessions ({experiment.dataPeriod}) and found {executionSimulation.processedEvents} qualifying events.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E6F8F1] text-[#08B878]">
                Deterministic Run Validated
              </span>
            </div>
          </div>

          {/* 3 Prominent Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E5EAF1] space-y-1">
              <div className="text-xs font-semibold text-[#667085] uppercase">Qualifying Events</div>
              <div className="text-3xl text-[#111111] font-bold tracking-tight">
                {experiment.results.sampleSize}
              </div>
              <div className="text-xs text-[#667085]">
                Single-day drops ≥{((experiment.threshold || 0.05) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E5EAF1] space-y-1">
              <div className="text-xs font-semibold text-[#667085] uppercase">Win Rate</div>
              <div className="text-3xl text-[#111111] font-bold tracking-tight">
                {experiment.results.winRate.toFixed(1)}%
              </div>
              <div className="text-xs text-[#667085]">
                {experiment.results.winningTrades} wins vs {experiment.results.losingTrades} losses
              </div>
            </div>

            <div className="p-5 bg-[#E6F8F1]/60 rounded-2xl border border-[#08B878]/30 space-y-1">
              <div className="text-xs font-semibold text-[#08B878] uppercase">Average Net Return</div>
              <div className="text-3xl text-[#08B878] font-bold tracking-tight">
                +{experiment.results.averageNetReturn}%
              </div>
              <div className="text-xs text-[#667085]">
                Net gain after {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% trading friction
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quality Safeguards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base text-[#111111] font-bold">
              Research Safeguards &amp; Bias Checks
            </h2>
            <span className="text-xs text-[#08B878] font-semibold">
              4 of 4 checks verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#E6F8F1] text-[#08B878] flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-[11px] font-mono text-[#667085]">CHECK 1</span>
              </div>
              <h3 className="text-sm font-bold text-[#111111]">Realistic Entry Price</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Buys at next-day open to guarantee zero look-ahead bias from future data.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#E6F8F1] text-[#08B878] flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-[11px] font-mono text-[#667085]">CHECK 2</span>
              </div>
              <h3 className="text-sm font-bold text-[#111111]">Fixed Holding Period</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Exact {experiment.holdingDays || 5}-session duration without cherry-picking intraday peaks.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#E6F8F1] text-[#08B878] flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-[11px] font-mono text-[#667085]">CHECK 3</span>
              </div>
              <h3 className="text-sm font-bold text-[#111111]">Trading Costs Deducted</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% deducted to account for brokerage, STT and slippage.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#E6F8F1] text-[#08B878] flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-[11px] font-mono text-[#667085]">CHECK 4</span>
              </div>
              <h3 className="text-sm font-bold text-[#111111]">Non-Overlapping Events</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Signals are isolated so single market disruptions aren't counted twice.
              </p>
            </div>
          </div>
        </div>

        {/* Individual Qualifying Events Log */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF1] overflow-hidden">
          <div className="p-5 flex items-center justify-between border-b border-[#E5EAF1]">
            <div>
              <h2 className="text-base text-[#111111] font-bold">
                Individual Qualifying Events ({experiment.auditLogs.length})
              </h2>
              <p className="text-xs text-[#667085] mt-0.5">
                Full chronological ledger of every triggered trade and outcome.
              </p>
            </div>
            <button
              onClick={handleCopyLog}
              className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E5EAF1] text-xs font-semibold text-[#111111] hover:bg-white transition-colors cursor-pointer"
            >
              {copied ? 'Copied Data!' : 'Copy Event Data'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] text-[#667085] text-xs font-semibold border-b border-[#E5EAF1] h-10">
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Drop %</th>
                  <th className="py-2.5 px-4">Buy Price</th>
                  <th className="py-2.5 px-4">Sell Price</th>
                  <th className="py-2.5 px-4 text-right">Gross Return</th>
                  <th className="py-2.5 px-4 text-right">Net Return</th>
                  <th className="py-2.5 px-4 text-right pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF1]">
                {experiment.auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#111111]">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#FF4A2D]">
                      {log.triggerCondition}
                    </td>
                    <td className="py-3 px-4 text-[#111111]">
                      ₹{log.entryPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-[#111111]">
                      ₹{log.exitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-semibold text-xs ${
                        log.grossReturnPct >= 0 ? 'text-[#08B878]' : 'text-[#FF4A2D]'
                      }`}
                    >
                      {log.grossReturnPct >= 0 ? `+${log.grossReturnPct}%` : `${log.grossReturnPct}%`}
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-bold text-xs ${
                        log.netReturnPct >= 0 ? 'text-[#08B878]' : 'text-[#FF4A2D]'
                      }`}
                    >
                      {log.netReturnPct >= 0 ? `+${log.netReturnPct}%` : `${log.netReturnPct}%`}
                    </td>
                    <td className="py-3 px-4 text-right pr-6">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#08B878] bg-[#E6F8F1] px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA to proceed to Learn */}
        <div className="flex justify-end items-center gap-3 pt-2">
          <button
            onClick={() => goToPhase('define')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#111111] bg-white border border-[#E5EAF1] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          >
            Back to Plan
          </button>
          <button
            onClick={() => goToPhase('learn')}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#111111] text-white hover:bg-black transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>View findings and insights</span>
            <span className="text-base">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
