import React from 'react';
import { useExperiment } from '../../state/ExperimentContext';
import { ReturnDistributionChart } from '../../components/charts/ReturnDistributionChart';

export const LearnFindings: React.FC = () => {
  const { experiment, goToPhase, forkInvestigation } = useExperiment();
  const results = experiment.results;

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Context Sub-bar */}
      <div className="w-full bg-white/70 backdrop-blur-sm border-b border-[#E5EAF1] py-3 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#2879F2] font-semibold text-xs">
              Step 5 of 5
            </span>
            <span className="text-[#667085] font-medium">Learn: Findings, statistical interpretation, and next steps</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#667085]">
            <span className="w-2 h-2 rounded-full bg-[#08B878]"></span>
            <span>Study ID: {experiment.id}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header & Action Ribbon */}
        <header className="w-full bg-white p-6 sm:p-8 shadow-sm border border-[#E5EAF1] rounded-2xl flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E6F8F1] text-[#08B878] uppercase tracking-wider">
                HISTORICAL FINDINGS
              </span>
              <span className="text-xs text-[#667085]">•</span>
              <span className="text-xs text-[#667085]">{experiment.market} (2018–2025)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl text-[#111111] font-bold tracking-tight">
              So, what did we learn?
            </h1>
            <p className="text-sm text-[#667085] leading-relaxed">
              Here is what the historical data tells us about your question. We analyzed {results.sampleSize.toLocaleString()} qualifying events in the {experiment.market} dataset ({experiment.dataPeriod}) to see whether buying after sharp drops really produces a rebound.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 pt-1">
            <button
              onClick={() => goToPhase('report')}
              className="px-5 py-2.5 bg-[#111111] text-white text-xs font-semibold hover:bg-black transition-all rounded-xl shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <span>View Full Report</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        </header>

        {/* 5 Tabular Stat Cards */}
        <section className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-[#E5EAF1] shadow-sm flex flex-col justify-between space-y-1">
            <span className="text-xs font-semibold text-[#667085] uppercase">
              Events
            </span>
            <div className="text-2xl font-bold text-[#111111]">
              {results.sampleSize.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#667085] truncate">
              ≥{((experiment.threshold || 0.05) * 100).toFixed(1)}% drops
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E5EAF1] shadow-sm flex flex-col justify-between space-y-1">
            <span className="text-xs font-semibold text-[#667085] uppercase">
              Avg Gross
            </span>
            <div className="text-2xl font-bold text-[#08B878]">
              +{results.averageGrossReturn.toFixed(2)}%
            </div>
            <div className="text-[11px] text-[#667085] truncate">
              Before trade costs
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E5EAF1] shadow-sm flex flex-col justify-between space-y-1">
            <span className="text-xs font-semibold text-[#667085] uppercase">
              Median
            </span>
            <div className="text-2xl font-bold text-[#111111]">
              +{results.medianReturn.toFixed(2)}%
            </div>
            <div className="text-[11px] text-[#667085] truncate">
              Typical middle value
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E5EAF1] shadow-sm flex flex-col justify-between space-y-1">
            <span className="text-xs font-semibold text-[#667085] uppercase">
              Win Rate
            </span>
            <div className="text-2xl font-bold text-[#111111]">
              {results.winRate.toFixed(1)}%
            </div>
            <div className="text-[11px] text-[#667085] truncate">
              {results.winningTrades}W / {results.losingTrades}L
            </div>
          </div>

          <div className="bg-[#E6F8F1]/60 p-4 rounded-2xl border border-[#08B878]/30 shadow-sm flex flex-col justify-between space-y-1 col-span-2 sm:col-span-1">
            <span className="text-xs font-bold text-[#08B878] uppercase">
              Avg Net Gain
            </span>
            <div className="text-2xl font-bold text-[#08B878]">
              +{results.averageNetReturn.toFixed(2)}%
            </div>
            <div className="text-[11px] text-[#667085] truncate">
              After {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% costs
            </div>
          </div>
        </section>

        {/* Visual Evidence Panel: Distribution */}
        <section className="w-full bg-white p-6 sm:p-8 shadow-sm border border-[#E5EAF1] rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
            <div>
              <h2 className="text-lg text-[#111111] font-bold">
                Distribution of {experiment.holdingDays || 5}-Day Returns
              </h2>
              <p className="text-xs text-[#667085] mt-0.5">
                Examine where outcomes clustered across all qualifying episodes.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#667085] flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#2879F2] rounded-sm"></span>
                <span>Gains</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#CBD6E6] rounded-sm"></span>
                <span>Losses</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#08B878] rounded-sm"></span>
                <span>Mean (+{results.averageGrossReturn}%)</span>
              </span>
            </div>
          </div>

          <ReturnDistributionChart
            bins={results.distributionBins}
            mean={results.averageGrossReturn}
            median={results.medianReturn}
            sampleSize={results.sampleSize}
            kurtosis={results.kurtosis ?? 4.82}
            skewness={results.skewness ?? 1.14}
            stdDev={results.standardDeviation}
          />

          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] text-xs text-[#667085] flex items-center gap-2">
            <span className="text-[#2879F2] text-sm">💡</span>
            <span>
              <strong className="text-[#111111]">Key Takeaway:</strong> A few large rebound rallies pulled the average return up. In typical situations, gains were smaller and closer to median.
            </span>
          </div>
        </section>

        {/* 4 Focused Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Section 1: What The Data Shows */}
          <article className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAF1]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#2879F2] rounded-full"></span>
                <h3 className="text-base font-bold text-[#111111]">
                  1. What the Data Shows
                </h3>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] uppercase">
                FACTS
              </span>
            </div>
            <div className="space-y-3 text-xs text-[#667085] leading-relaxed pt-1">
              <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <p>
                  The average return across {results.sampleSize.toLocaleString()} qualifying drops of ≥{((experiment.threshold || 0.05) * 100).toFixed(1)}% in {experiment.market} was <strong className="text-[#08B878]">+{results.averageNetReturn}%</strong> after trading fees.
                </p>
              </div>
              <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <p>
                  The typical (median) result of <strong className="text-[#111111]">+{results.medianReturn}%</strong> is lower than the average. This reflects positive skewness: a few strong rallies helped elevate the mean.
                </p>
              </div>
            </div>
          </article>

          {/* Section 2: What It Might Mean */}
          <article className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAF1]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#2879F2] rounded-full"></span>
                <h3 className="text-base font-bold text-[#111111]">
                  2. What It Might Mean
                </h3>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] uppercase">
                INTUITION
              </span>
            </div>
            <div className="space-y-3 text-xs text-[#667085] leading-relaxed pt-1">
              <p>
                When a broad index drops sharply in one session, panic selling is often followed by opportunistic buyers entering, creating short-term mean reversion.
              </p>
              <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] space-y-1">
                <div className="font-bold text-[#111111]">Caution on Real Execution</div>
                <p>
                  A +{results.averageNetReturn}% gain over {experiment.holdingDays || 5} sessions is modest. Real-world execution slippage and wider spreads during panic days can reduce this margin.
                </p>
              </div>
            </div>
          </article>

          {/* Section 3: What We Can Reasonably Conclude */}
          <article className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAF1]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#2879F2] rounded-full"></span>
                <h3 className="text-base font-bold text-[#111111]">
                  3. What We Can Reasonably Conclude
                </h3>
              </div>
              <span className="text-xs font-mono text-[#667085]">p = {results.pValue}</span>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] flex items-center justify-between">
              <span className="text-xs font-bold text-[#111111]">
                STATUS: {Number(results.pValue) < 0.05 ? 'STATISTICALLY SIGNIFICANT (p < 0.05)' : 'NOT STATISTICALLY SIGNIFICANT (p ≥ 0.05)'}
              </span>
              <span className="text-xs font-mono text-[#667085]">t = {results.tStatistic}</span>
            </div>

            <p className="text-xs text-[#111111] italic bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E5EAF1] leading-relaxed font-medium">
              “{results.conclusion}”
            </p>

            <p className="text-[11px] text-[#667085]">
              With p = {results.pValue}, the sample of {results.sampleSize} events does not reach the 5% threshold for statistical significance. A positive observed sample return is not proof of a permanent edge.
            </p>
          </article>

          {/* Section 4: Limitations */}
          <article className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5EAF1]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF4A2D] rounded-full"></span>
                <h3 className="text-base font-bold text-[#111111]">
                  4. Things to Keep in Mind
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FF4A2D]/10 text-[#FF4A2D] uppercase">
                LIMITATIONS
              </span>
            </div>

            <ol className="space-y-2 text-xs text-[#667085]">
              {experiment.limitations.map((lim, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] flex items-start gap-2 text-[#111111]"
                >
                  <span className="font-mono text-[#667085] font-bold">
                    {idx + 1}.
                  </span>
                  <span className="text-xs leading-relaxed">{lim}</span>
                </li>
              ))}
            </ol>
          </article>
        </div>

        {/* Section: What Should We Test Next? */}
        <section className="w-full bg-white p-6 sm:p-8 shadow-sm border border-[#E5EAF1] rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5EAF1]">
            <div>
              <h2 className="text-lg text-[#111111] font-bold">
                What Should We Test Next?
              </h2>
              <p className="text-xs text-[#667085] mt-0.5">
                Good researchers probe their assumptions. Fork this experiment into a new test in one click:
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085]">
              4 Next Experiments
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {experiment.nextInvestigations.map((item) => (
              <div
                key={item.id}
                className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5EAF1] flex flex-col justify-between hover:bg-white hover:border-[#2879F2]/50 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#667085] font-bold">
                      {item.number}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#111111]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    {item.hypothesis}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => forkInvestigation(item)}
                  className="mt-4 w-full h-8 bg-white hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-semibold transition-all rounded-lg border border-[#E5EAF1] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>{item.actionText}</span>
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => goToPhase('test')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#111111] bg-white border border-[#E5EAF1] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          >
            ← Back to Test
          </button>
          <button
            onClick={() => goToPhase('report')}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#111111] text-white hover:bg-black transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Open Comprehensive Report</span>
            <span className="text-base">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
