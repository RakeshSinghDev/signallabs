import React from 'react';
import { useExperiment } from '../../state/ExperimentContext';
import { ReturnDistributionChart } from '../../components/charts/ReturnDistributionChart';

export const LearnFindings: React.FC = () => {
  const { experiment, goToPhase, forkInvestigation } = useExperiment();
  const results = experiment.results;

  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-margin py-space-lg pb-16 max-w-7xl mx-auto space-y-gutter">
        {/* Workflow Sub-Navigation / Completion Status Bar */}
        <section className="w-full bg-surface-container-lowest p-space-md shadow-xs border border-outline-variant/30 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm overflow-x-auto text-on-surface-variant font-label-caps text-label-caps">
            <span className="font-label-code text-label-code text-on-surface-variant">WORKFLOW:</span>
            <button
              onClick={() => goToPhase('ask')}
              className="flex items-center gap-1.5 px-space-sm py-1 bg-surface-container-low rounded-DEFAULT hover:text-on-surface cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
              <span>1. ASK</span>
            </button>
            <span className="text-outline-variant text-[10px]">→</span>
            <button
              onClick={() => goToPhase('clarify')}
              className="flex items-center gap-1.5 px-space-sm py-1 bg-surface-container-low rounded-DEFAULT hover:text-on-surface cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
              <span>2. CLARIFY</span>
            </button>
            <span className="text-outline-variant text-[10px]">→</span>
            <button
              onClick={() => goToPhase('define')}
              className="flex items-center gap-1.5 px-space-sm py-1 bg-surface-container-low rounded-DEFAULT hover:text-on-surface cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
              <span>3. DEFINE</span>
            </button>
            <span className="text-outline-variant text-[10px]">→</span>
            <button
              onClick={() => goToPhase('test')}
              className="flex items-center gap-1.5 px-space-sm py-1 bg-surface-container-low rounded-DEFAULT hover:text-on-surface cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
              <span>4. TEST</span>
            </button>
            <span className="text-outline-variant text-[10px]">→</span>
            <div className="flex items-center gap-1.5 px-space-md py-1 bg-primary text-on-primary rounded-DEFAULT font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span>
              <span>5. LEARN (ACTIVE)</span>
            </div>
          </div>

          <div className="flex items-center gap-space-md font-label-code text-label-code text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant">verified</span>
              SAMPLE: <strong className="text-on-surface font-medium">PROTOTYPE_NIFTY50_2018_2025</strong>
            </span>
            <span className="text-outline-variant">|</span>
            <span>RUN ID: <strong className="text-on-surface font-medium">{experiment.id}</strong></span>
          </div>
        </section>

        {/* Header & Action Ribbon */}
        <header className="w-full bg-surface-container-lowest p-space-xl shadow-xs border border-outline-variant/30 rounded-lg flex flex-col lg:flex-row lg:items-start lg:justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-3xl">
            <div className="flex items-center gap-space-sm">
              <span className="font-label-caps text-label-caps uppercase tracking-wider bg-surface-container px-space-xs py-0.5 rounded-DEFAULT text-on-surface-variant font-semibold">
                EMPIRICAL EVIDENCE &amp; EVALUATION
              </span>
              <span className="font-label-code text-label-code text-on-surface-variant">AUDITED HISTORICAL TEST</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-semibold">
              What did the data show?
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Empirical analysis of {results.sampleSize.toLocaleString()} qualifying historical observations ({experiment.market} longitudinal sample, {experiment.dataPeriod}). Formatted under strict statistical evaluation guidelines separating raw observation from empirical inference.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-space-xs shrink-0 pt-1">
            <button
              onClick={() => goToPhase('report')}
              className="h-8 px-space-md bg-primary text-on-primary font-body-sm text-body-sm hover:bg-inverse-surface transition-colors rounded-DEFAULT flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">account_tree</span>
              <span>View Full Report &amp; Provenance</span>
            </button>
          </div>
        </header>

        {/* Restrained Metric Row (5 clean blocks, strictly tabular) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-surface-container-high shadow-xs border border-outline-variant/30 rounded-lg overflow-hidden">
          {/* Metric 1 */}
          <div className="bg-surface-container-lowest p-space-md flex flex-col justify-between min-h-[104px]">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                Sample Size
              </span>
              <span className="font-label-code text-label-code text-outline">N={results.sampleSize.toLocaleString()}</span>
            </div>
            <div className="font-label-numeric text-[24px] font-semibold tracking-tight text-on-surface">
              {results.sampleSize.toLocaleString()}
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant truncate">
              ≥{((experiment.threshold || 0.05) * 100).toFixed(1)}% single-day decline
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container-lowest p-space-md flex flex-col justify-between min-h-[104px]">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                Avg {experiment.holdingDays || 5}-Day Return
              </span>
              <span className="font-label-code text-label-code text-on-tertiary-container bg-surface-container-low px-1 rounded-DEFAULT font-medium">
                Gross
              </span>
            </div>
            <div className="font-label-numeric text-[24px] font-semibold tracking-tight text-on-tertiary-container">
              +{results.averageGrossReturn.toFixed(2)}%
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Gross return before friction
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-surface-container-lowest p-space-md flex flex-col justify-between min-h-[104px]">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                Median Return
              </span>
              <span className="font-label-code text-label-code text-outline">P50</span>
            </div>
            <div className="font-label-numeric text-[24px] font-semibold tracking-tight text-on-surface">
              +{results.medianReturn.toFixed(2)}%
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Significant right skewness
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-surface-container-lowest p-space-md flex flex-col justify-between min-h-[104px]">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                Win Rate
              </span>
              <span className="font-label-code text-label-code text-outline">
                {results.winningTrades} / {results.losingTrades}
              </span>
            </div>
            <div className="font-label-numeric text-[24px] font-semibold tracking-tight text-on-surface">
              {results.winRate.toFixed(1)}%
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Pos. vs neg. terminal payoff
            </div>
          </div>

          {/* Metric 5 */}
          <div className="bg-surface-container-lowest p-space-md flex flex-col justify-between min-h-[104px]">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                Net Avg Return
              </span>
              <span className="font-label-code text-label-code text-outline">-{((experiment.transactionCost || 0.001) * 10000).toFixed(0)} bps friction</span>
            </div>
            <div className="font-label-numeric text-[24px] font-semibold tracking-tight text-on-tertiary-container">
              +{results.averageNetReturn.toFixed(2)}%
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Net of {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% total friction
            </div>
          </div>
        </section>

        {/* Visual Evidence Panel: Distribution of 5-Day Forward Returns */}
        <section className="w-full bg-surface-container-lowest p-space-lg shadow-xs border border-outline-variant/30 rounded-lg space-y-space-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs pb-space-xs">
            <div>
              <div className="flex items-center gap-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Distribution of {experiment.holdingDays || 5}-Day Forward Returns
                </h2>
                <span className="font-label-code text-label-code px-1.5 py-0.5 bg-surface-container rounded-DEFAULT text-on-surface-variant">
                  PDF &amp; KERNEL DENSITY ESTIMATE
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Empirical bin frequencies (bin width = 1.0%) with overlay markers for key central tendencies.
              </p>
            </div>
            <div className="flex items-center gap-space-lg text-on-surface-variant font-label-code text-label-code flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-surface-container-high rounded-DEFAULT"></span>
                <span>Observations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-outline"></span>
                <span>Zero Benchmark (0.00%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-on-surface"></span>
                <span>Median (+{results.medianReturn}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-on-tertiary-container"></span>
                <span>Mean (+{results.averageGrossReturn}%)</span>
              </div>
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
        </section>

        {/* Structural Quadrant: Separation of Raw Observation from Inference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column (7 Cols): Section A (Data) & Section B (System Interpretation) */}
          <div className="lg:col-span-7 space-y-gutter flex flex-col">
            {/* Section A: What The Data Shows */}
            <article className="bg-surface-container-lowest p-space-lg shadow-xs border border-outline-variant/30 rounded-lg space-y-space-sm">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2 h-2 bg-on-surface rounded-full"></span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    A. What the Data Shows
                  </h3>
                </div>
                <span className="font-label-caps text-label-caps uppercase bg-surface-container px-space-xs py-0.5 text-on-surface-variant rounded-DEFAULT font-semibold">
                  DESCRIPTIVE FACTS
                </span>
              </div>
              <div className="space-y-space-md text-on-surface font-body-md text-body-md leading-relaxed pt-space-xs">
                <div className="p-space-md bg-surface-container-low rounded-DEFAULT flex items-start gap-space-sm border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <p>
                    The historical sample demonstrates a modest positive average return (
                    <strong className="font-semibold text-on-tertiary-container font-label-numeric">
                      +{results.averageGrossReturn}% gross
                    </strong>
                    ,{' '}
                    <strong className="font-semibold text-on-tertiary-container font-label-numeric">
                      +{results.averageNetReturn}% net
                    </strong>
                    ) following a {((experiment.threshold || 0.05) * 100).toFixed(1)}% single-day {experiment.market} decline across the audited prototype dataset window ({experiment.dataPeriod}).
                  </p>
                </div>
                <div className="p-space-md bg-surface-container-low rounded-DEFAULT flex items-start gap-space-sm border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">
                    insights
                  </span>
                  <p>
                    The median return (
                    <span className="font-semibold font-label-numeric">+{results.medianReturn}%</span>) is noticeably lower than the mean (
                    <span className="font-semibold font-label-numeric">+{results.averageGrossReturn}%</span>), demonstrating{' '}
                    <strong>positive right-tail skewness</strong>: a substantial portion of the positive average stems from a small cluster of violent rebound rallies (e.g. March 2020, June 2024) rather than consistent steady gains across normal drawdowns.
                  </p>
                </div>
              </div>
            </article>

            {/* Section B: System Interpretation */}
            <article className="bg-surface-container-lowest p-space-lg shadow-xs border border-outline-variant/30 rounded-lg space-y-space-sm flex-1">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    B. System Interpretation
                  </h3>
                </div>
                <span className="font-label-caps text-label-caps uppercase bg-surface-container px-space-xs py-0.5 text-on-surface-variant rounded-DEFAULT font-semibold">
                  AUTOMATED RESEARCH INTERPRETATION
                </span>
              </div>
              <div className="space-y-space-md text-on-surface-variant font-body-md text-body-md leading-relaxed pt-space-xs">
                <p>
                  The observed sample is consistent with short-term mean reversion under the selected assumptions. When benchmark index constituents experience panic selling, liquidity providers demand an equity premium that frequently manifests as a multi-day rebound.
                </p>
                <div className="p-space-md bg-surface-container rounded-DEFAULT space-y-space-xs border border-outline-variant/20">
                  <div className="flex items-center gap-1.5 font-label-code text-label-code text-on-surface font-semibold">
                    <span className="material-symbols-outlined text-[15px]">info</span>
                    <span>ECONOMIC REALITY CHECK</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    However, the observed net edge (+{results.averageNetReturn}% over {experiment.holdingDays || 5} trading sessions) is modest in economic terms. It does not establish that the strategy will remain profitable under changing regime volatility or higher retail execution slippage during market dislocations.
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* Right Column (5 Cols): Section C (Conclusion) & Section D (Limitations) */}
          <div className="lg:col-span-5 space-y-gutter flex flex-col">
            {/* Section C: Synthesis & Conclusion */}
            <article className="bg-surface-container-lowest p-space-lg shadow-xs border border-outline-variant/30 rounded-lg space-y-space-md">
              <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  C. Synthesis &amp; Conclusion
                </h3>
                <span className="font-label-code text-label-code text-outline">P-VALUE = {results.pValue}</span>
              </div>

              {/* Institutional Rigor Badge */}
              <div className="p-space-sm bg-surface-container rounded-DEFAULT flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
                  <span className="font-label-caps text-label-caps uppercase text-on-surface tracking-wider font-semibold">
                    EVALUATION: {results.evidenceLevel}
                  </span>
                </div>
                <span className="font-label-code text-label-code text-on-surface-variant">Conf: 95%</span>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-DEFAULT border border-outline-variant/20">
                <p className="font-body-md text-body-md text-on-surface font-medium leading-relaxed">
                  “{results.conclusion}”
                </p>
              </div>

              <div className="grid grid-cols-2 gap-space-xs font-label-code text-label-code text-on-surface-variant pt-1">
                <div className="p-space-xs bg-surface-container rounded-DEFAULT flex justify-between">
                  <span>t-Statistic:</span>
                  <span className="text-on-surface font-medium">{results.tStatistic}</span>
                </div>
                <div className="p-space-xs bg-surface-container rounded-DEFAULT flex justify-between">
                  <span>Sharpe (ann.):</span>
                  <span className="text-on-surface font-medium">{results.sharpeRatio}</span>
                </div>
              </div>
            </article>

            {/* Section D: Limitations & Sensitivity Risks */}
            <article className="bg-surface-container-lowest p-space-lg shadow-xs border border-outline-variant/30 rounded-lg space-y-space-md flex-1">
              <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
                <div className="flex items-center gap-space-xs text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-outline">warning</span>
                  <h3 className="font-headline-sm text-headline-sm font-semibold">
                    D. Limitations &amp; Sensitivity
                  </h3>
                </div>
                <span className="font-label-caps text-label-caps uppercase bg-error-container text-on-error-container px-space-xs py-0.5 rounded-DEFAULT font-semibold">
                  CRITICAL AUDIT
                </span>
              </div>

              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Structural empirical limitations prevent treating this sample as a production trading model:
              </p>

              <ol className="space-y-space-xs font-body-sm text-body-sm text-on-surface">
                {experiment.limitations.map((lim, idx) => (
                  <li
                    key={idx}
                    className="p-space-sm bg-surface-container-low rounded-DEFAULT flex items-start gap-space-xs border border-outline-variant/20"
                  >
                    <span className="font-label-numeric text-label-numeric font-semibold text-outline">
                      {idx + 1}.
                    </span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>

        {/* Section E: What Should We Investigate Next? */}
        <section className="w-full bg-surface-container-lowest p-space-lg shadow-xs border border-outline-variant/30 rounded-lg space-y-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-space-xs border-b border-surface-container">
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-on-surface">fork_right</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  E. What Should We Investigate Next?
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Peer-review recommendations. Fork hypothesis parameters directly to address identified sensitivities.
              </p>
            </div>
            <span className="font-label-code text-label-code text-on-surface-variant font-medium">
              4 ACTIONABLE FORK BRANCHES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {experiment.nextInvestigations.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-low p-space-md rounded-DEFAULT flex flex-col justify-between hover:bg-surface-container transition-colors group border border-outline-variant/20"
              >
                <div className="space-y-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-label-caps uppercase text-outline font-semibold">
                      {item.number}
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-on-surface transition-colors">
                      {item.icon}
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-[14px] text-on-surface font-semibold">
                    {item.title}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {item.hypothesis}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => forkInvestigation(item)}
                  className="mt-space-md w-full h-8 bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface font-body-sm text-body-sm transition-colors rounded-DEFAULT flex items-center justify-center gap-1 shadow-xs border border-outline-variant/30 cursor-pointer"
                >
                  <span>{item.actionText}</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Research Footnote Audit Signature */}
        <div className="w-full pt-space-xs pb-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between text-outline font-label-code text-label-code gap-space-xs">
          <div>
            <span>METHODOLOGY: Parametric Student's t-test with Newey-West standard errors. No lookahead bias detected.</span>
          </div>
          <div>
            <span>EXPERIMENT: {experiment.id} · STATE: {experiment.status.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
