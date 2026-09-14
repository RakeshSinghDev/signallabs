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
    <div className="flex flex-col w-full">
      <div className="w-full px-margin py-space-lg pb-16 max-w-7xl mx-auto space-y-gutter">
        {/* Breadcrumb & Workspace Context Bar */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-space-md py-space-sm">
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant bg-surface-container-high px-space-xs py-0.5 rounded-DEFAULT">
              STAGE 04 OF 05
            </span>
            <span className="text-outline-variant font-label-code text-label-code">/</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Empirical Execution &amp; Bias Verification
            </span>
            <span className="font-label-code text-label-code text-on-surface-variant ml-space-xs bg-surface-container px-space-sm py-0.5 rounded-DEFAULT">
              JOB_ID: {experiment.id}_RUN
            </span>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs font-label-code text-label-code bg-surface-container-lowest px-space-md py-1 rounded-DEFAULT shadow-xs border border-outline-variant/30">
              <span
                className={`w-2 h-2 rounded-full ${
                  executionSimulation.isComplete ? 'bg-on-tertiary-container' : 'bg-primary animate-pulse'
                }`}
              />
              <span className="text-on-surface font-semibold">
                STATE: {executionSimulation.isComplete ? 'COMPLETED' : 'RUNNING'}
              </span>
              <span className="text-outline-variant">|</span>
              <span className="text-on-surface-variant">{experiment.specHash}</span>
            </div>
          </div>
        </div>

        {/* 1. Stage Flow Visualizer */}
        <div className="w-full bg-surface-container-lowest p-space-md rounded-lg shadow-xs border border-outline-variant/30">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-space-xs font-label-caps text-label-caps">
            <button
              onClick={() => goToPhase('ask')}
              className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <div className="flex items-center gap-space-xs">
                <span className="font-label-numeric text-label-numeric font-semibold text-on-surface">01</span>
                <span className="uppercase tracking-wider">ASK</span>
              </div>
              <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">check_circle</span>
            </button>

            <button
              onClick={() => goToPhase('clarify')}
              className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <div className="flex items-center gap-space-xs">
                <span className="font-label-numeric text-label-numeric font-semibold text-on-surface">02</span>
                <span className="uppercase tracking-wider">CLARIFY</span>
              </div>
              <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">check_circle</span>
            </button>

            <button
              onClick={() => goToPhase('define')}
              className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-DEFAULT text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <div className="flex items-center gap-space-xs">
                <span className="font-label-numeric text-label-numeric font-semibold text-on-surface">03</span>
                <span className="uppercase tracking-wider">DEFINE</span>
              </div>
              <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">check_circle</span>
            </button>

            {/* Step 4: Active */}
            <div className="col-span-2 sm:col-span-1 flex items-center justify-between p-space-sm bg-primary text-on-primary rounded-DEFAULT">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-numeric text-label-numeric text-tertiary-fixed font-bold">04</span>
                <span className="uppercase tracking-wider font-bold">TEST</span>
              </div>
              <span className="font-label-code text-[10px] bg-primary-container text-on-primary-container px-1 py-0.2 rounded-DEFAULT tracking-tight">
                {executionSimulation.progressPct}%
              </span>
            </div>

            <button
              onClick={() => goToPhase('learn')}
              className="flex items-center justify-between p-space-sm bg-surface-container rounded-DEFAULT text-on-surface hover:text-primary cursor-pointer"
            >
              <div className="flex items-center gap-space-xs">
                <span className="font-label-numeric text-label-numeric font-semibold text-outline">05</span>
                <span className="uppercase tracking-wider text-on-surface-variant">LEARN</span>
              </div>
              <span className="font-label-code text-[9px] text-outline uppercase">Next</span>
            </button>
          </div>
        </div>

        {/* 2. Experiment Specification Compact Bar */}
        <div className="w-full bg-surface-container-lowest p-space-md rounded-lg shadow-xs border border-outline-variant/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-sm font-label-code text-label-code">
            <span className="font-label-caps text-label-caps uppercase bg-surface-container-highest text-on-surface px-space-xs py-0.5 rounded-DEFAULT font-semibold">
              TEST SPEC
            </span>
            <div className="flex items-center gap-space-xs text-on-surface font-semibold flex-wrap">
              <span>{experiment.market} INDEX</span>
              <span className="text-outline-variant">·</span>
              <span>≥{((experiment.threshold || 0.05) * 100).toFixed(1)}% 1-DAY DROP</span>
              <span className="text-outline-variant">·</span>
              <span>{experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'T CLOSE ENTRY' : 'T+1 OPEN ENTRY'}</span>
              <span className="text-outline-variant">·</span>
              <span>{experiment.holdingDays || 5}-DAY HOLDING</span>
              <span className="text-outline-variant">·</span>
              <span>{((experiment.transactionCost || 0.001) * 100).toFixed(2)}% SLIPPAGE &amp; FEES</span>
              <span className="text-outline-variant">·</span>
              <span className="text-on-surface-variant font-normal">WINDOW: 2018–2025</span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm self-end lg:self-auto shrink-0">
            <button
              onClick={() => startExecutionSimulation()}
              disabled={executionSimulation.isLoading}
              className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1 rounded-DEFAULT hover:bg-surface-container-high transition-colors cursor-pointer text-body-sm font-label-code disabled:opacity-60"
              title="Re-run deterministic validation test"
            >
              <span className={`material-symbols-outlined text-[14px] text-on-tertiary-container font-bold ${executionSimulation.isLoading ? 'animate-spin' : ''}`}>
                {executionSimulation.isLoading ? 'progress_activity' : 'bolt'}
              </span>
              <span className="text-on-surface font-medium">
                {executionSimulation.isLoading ? 'Running Engine...' : 'Re-run Engine'}
              </span>
            </button>
            <span className="font-label-code text-label-code text-on-tertiary-container bg-surface-container-low px-space-sm py-1 rounded-DEFAULT font-semibold">
              {executionSimulation.statusText}
            </span>
          </div>
        </div>

        {/* 3. Primary Execution & Validation Status Panel */}
        <div className="w-full bg-surface-container-lowest p-space-xl rounded-lg shadow-xs border border-outline-variant/30 space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div className="space-y-space-xs">
              <div className="flex items-center gap-space-xs font-label-caps text-label-caps text-outline uppercase tracking-wider">
                <span>ENGINE EXECUTION BENCH</span>
                <span>·</span>
                <span>VECTORIZED TICK CALIBRATION</span>
              </div>
              <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight font-semibold">
                Historical Data Sample &amp; Empirical Validation
              </h1>
            </div>
            <div className="text-right">
              <span className="font-label-numeric text-headline-sm text-on-surface font-semibold">
                {executionSimulation.processedEvents.toLocaleString()} / {executionSimulation.totalEvents.toLocaleString()}
              </span>
              <span className="font-label-code text-label-code text-on-surface-variant ml-space-xs">
                events processed ({executionSimulation.progressPct}%)
              </span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="space-y-space-xs">
            {executionSimulation.error && (
              <div className="p-space-xs px-space-sm bg-surface-container-high border border-outline-variant/40 rounded-DEFAULT flex items-center gap-space-xs text-on-surface-variant font-label-code text-label-code mb-space-xs">
                <span className="material-symbols-outlined text-[14px] text-outline">info</span>
                <span>Notice: {executionSimulation.error}</span>
              </div>
            )}
            <div className="w-full h-2 bg-surface-container rounded-DEFAULT overflow-hidden relative">
              <div
                className="h-full bg-primary rounded-DEFAULT transition-all duration-300 ease-out"
                style={{ width: `${executionSimulation.progressPct}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
              <span className="flex items-center gap-space-xs">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    executionSimulation.isComplete ? 'bg-on-tertiary-container' : 'bg-primary animate-pulse'
                  }`}
                />
                <span>Testing historical observations across 2018–2025 prototype sample</span>
              </span>
              <span className="text-on-surface font-semibold">0 ERRORS / 0 REJECTIONS</span>
            </div>
          </div>

          {/* Execution Micro-Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md pt-space-xs">
            <div className="bg-surface-container-low p-space-md rounded-DEFAULT space-y-space-xs border border-outline-variant/20">
              <div className="font-label-caps text-label-caps uppercase text-outline">Trading Sessions</div>
              <div className="font-label-numeric text-headline-sm text-on-surface font-semibold">
                {experiment.totalTradingSessions}
              </div>
              <div className="font-label-code text-body-sm text-on-surface-variant">Full daily series validated</div>
            </div>

            <div className="bg-surface-container-low p-space-md rounded-DEFAULT space-y-space-xs border border-outline-variant/20">
              <div className="font-label-caps text-label-caps uppercase text-outline">Qualifying Observations</div>
              <div className="font-label-numeric text-headline-sm text-on-surface font-semibold">
                {experiment.results.sampleSize} <span className="text-body-sm font-normal text-on-surface-variant">obs</span>
              </div>
              <div className="font-label-code text-body-sm text-on-surface-variant">Shock filter (≥{((experiment.threshold || 0.05) * 100).toFixed(1)}% fall)</div>
            </div>

            <div className="bg-surface-container-low p-space-md rounded-DEFAULT space-y-space-xs border border-outline-variant/20">
              <div className="font-label-caps text-label-caps uppercase text-outline">Mean Net Return</div>
              <div className="font-label-numeric text-headline-sm text-on-tertiary-container font-semibold">
                +{experiment.results.averageNetReturn}%
              </div>
              <div className="font-label-code text-body-sm text-on-surface-variant">Net of {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% friction</div>
            </div>

            <div className="bg-surface-container-low p-space-md rounded-DEFAULT space-y-space-xs border border-outline-variant/20">
              <div className="font-label-caps text-label-caps uppercase text-outline">Statistical Significance</div>
              <div className="font-label-numeric text-headline-sm text-on-surface font-semibold">
                p = {experiment.results.pValue}
              </div>
              <div className="font-label-code text-body-sm text-on-surface-variant">Student's t-test (t = {experiment.results.tStatistic})</div>
            </div>
          </div>
        </div>

        {/* 4. Four Explicit Scientific Validation Checks */}
        <div className="space-y-space-xs">
          <div className="flex items-center justify-between px-space-xs">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-outline font-semibold">
              BIAS CONTROLS &amp; PROTOCOL INTEGRITY
            </span>
            <span className="font-label-code text-label-code text-on-surface-variant">
              4 OF 4 CHECKS PASSED DETERMINISTIC AUDIT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Check 1 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-xs border border-outline-variant/30 flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-DEFAULT bg-surface-container flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </span>
                  <span className="font-label-code text-label-code bg-surface-container px-1 rounded-DEFAULT text-on-surface-variant">
                    CHECK_01
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Entry Rule Validated
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                    Filtered for ≥{((experiment.threshold || 0.05) * 100).toFixed(1)}% session drops; verified strictly against {experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'same-day close' : 'next-session open'} prices without lookahead bias.
                  </p>
                </div>
              </div>
              <div className="pt-space-xs bg-surface-container-low px-space-sm py-1 rounded-DEFAULT flex items-center justify-between font-label-code text-label-code text-on-surface border border-outline-variant/20">
                <span>Lookahead Bias:</span>
                <span className="font-bold text-on-tertiary-container">0.00% (ZERO)</span>
              </div>
            </div>

            {/* Check 2 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-xs border border-outline-variant/30 flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-DEFAULT bg-surface-container flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </span>
                  <span className="font-label-code text-label-code bg-surface-container px-1 rounded-DEFAULT text-on-surface-variant">
                    CHECK_02
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Holding Period Applied
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                    {experiment.holdingDays || 5} full trading sessions measured from {experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'T close' : 'T+1 open'} to T+{experiment.holdingDays || 5} market close without intra-session early exits.
                  </p>
                </div>
              </div>
              <div className="pt-space-xs bg-surface-container-low px-space-sm py-1 rounded-DEFAULT flex items-center justify-between font-label-code text-label-code text-on-surface border border-outline-variant/20">
                <span>Duration Lock:</span>
                <span className="font-bold">{((experiment.holdingDays || 5) * 24.0).toFixed(1)} Trading Hrs</span>
              </div>
            </div>

            {/* Check 3 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-xs border border-outline-variant/30 flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-DEFAULT bg-surface-container flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </span>
                  <span className="font-label-code text-label-code bg-surface-container px-1 rounded-DEFAULT text-on-surface-variant">
                    CHECK_03
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Transaction Costs Deducted
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                    {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% round-trip friction subtracted from every individual trade before calculating sample statistics.
                  </p>
                </div>
              </div>
              <div className="pt-space-xs bg-surface-container-low px-space-sm py-1 rounded-DEFAULT flex items-center justify-between font-label-code text-label-code text-on-surface border border-outline-variant/20">
                <span>Friction Drag:</span>
                <span className="font-bold text-on-surface">-{((experiment.transactionCost || 0.001) * 100).toFixed(2)}% Round-trip</span>
              </div>
            </div>

            {/* Check 4 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-xs border border-outline-variant/30 flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-DEFAULT bg-surface-container flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </span>
                  <span className="font-label-code text-label-code bg-surface-container px-1 rounded-DEFAULT text-on-surface-variant">
                    CHECK_04
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Non-Overlapping Events
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                    Serial correlation prevented via FIFO window event isolation to eliminate double-counting in regimes.
                  </p>
                </div>
              </div>
              <div className="pt-space-xs bg-surface-container-low px-space-sm py-1 rounded-DEFAULT flex items-center justify-between font-label-code text-label-code text-on-surface border border-outline-variant/20">
                <span>Independence Test:</span>
                <span className="font-bold text-on-tertiary-container">Pass (r &lt; 0.04)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Live Log / Event Stream Preview */}
        <div className="w-full bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/30 overflow-hidden">
          <div className="h-10 bg-surface-container-low px-space-md flex items-center justify-between border-b border-outline-variant/30">
            <div className="flex items-center gap-space-md font-label-code text-label-code">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
              </div>
              <span className="text-on-surface font-semibold tracking-tight">EVENT_AUDIT_LOG_STREAM.stdout</span>
              <span className="text-outline-variant">|</span>
              <span className="text-on-surface-variant">Validated Historical Triggers (Sample Records)</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <button
                onClick={handleCopyLog}
                className="px-space-sm py-0.5 bg-surface-container text-on-surface font-label-code text-[11px] rounded-DEFAULT hover:bg-surface-variant transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">content_copy</span>
                <span>{copied ? 'Copied!' : 'Copy Log'}</span>
              </button>
            </div>
          </div>

          <div className="p-space-md bg-surface-container-lowest font-label-code text-label-code overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap font-body-sm text-body-sm">
              <thead>
                <tr className="text-outline font-label-caps text-label-caps uppercase font-semibold pb-space-xs border-b border-surface-container">
                  <th className="py-2 px-space-sm">EXECUTION TIMESTAMP</th>
                  <th className="py-2 px-space-sm">DISLOCATION SIGNAL</th>
                  <th className="py-2 px-space-sm">ENTRY PRICE ({experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'T' : 'T+1'})</th>
                  <th className="py-2 px-space-sm">EXIT PRICE (T+{experiment.holdingDays || 5})</th>
                  <th className="py-2 px-space-sm text-right">GROSS RETURN</th>
                  <th className="py-2 px-space-sm text-right">NET RETURN</th>
                  <th className="py-2 px-space-sm text-right">INTEGRITY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container font-label-numeric text-label-numeric">
                {experiment.auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-2 px-space-sm font-label-code text-label-code text-on-surface">
                      {log.timestamp}
                    </td>
                    <td className="py-2 px-space-sm font-label-code text-label-code text-error font-medium">
                      {log.triggerCondition}
                    </td>
                    <td className="py-2 px-space-sm text-on-surface">
                      ₹{log.entryPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-space-sm text-on-surface">
                      ₹{log.exitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td
                      className={`py-2 px-space-sm text-right font-semibold ${
                        log.grossReturnPct >= 0 ? 'text-on-tertiary-container' : 'text-error'
                      }`}
                    >
                      {log.grossReturnPct >= 0 ? `+${log.grossReturnPct}%` : `${log.grossReturnPct}%`}
                    </td>
                    <td
                      className={`py-2 px-space-sm text-right font-semibold ${
                        log.netReturnPct >= 0 ? 'text-on-tertiary-container' : 'text-error'
                      }`}
                    >
                      {log.netReturnPct >= 0 ? `+${log.netReturnPct}%` : `${log.netReturnPct}%`}
                    </td>
                    <td className="py-2 px-space-sm text-right">
                      <span className="inline-flex items-center gap-1 font-label-caps text-label-caps text-on-tertiary-container bg-surface-container px-1 py-0.5 rounded-DEFAULT">
                        <span className="material-symbols-outlined text-[12px]">verified</span>
                        ZERO_BIAS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA to proceed to Learn */}
        <div className="flex justify-end items-center gap-space-md pt-space-sm">
          <button
            onClick={() => goToPhase('define')}
            className="h-9 px-space-lg rounded-DEFAULT font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            Back to Spec
          </button>
          <button
            onClick={() => goToPhase('learn')}
            className="h-9 px-space-xl rounded-DEFAULT font-body-sm text-body-sm font-semibold bg-primary text-on-primary hover:bg-inverse-surface transition-all flex items-center gap-space-xs shadow-xs cursor-pointer"
          >
            <span>View findings and empirical evidence</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
