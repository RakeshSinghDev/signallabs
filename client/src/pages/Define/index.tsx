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
    <div className="flex flex-col w-full pb-16">
      {/* Top Context Sub-bar */}
      <div className="w-full bg-white/70 backdrop-blur-sm border-b border-[#E5EAF1] py-3 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#2879F2] font-semibold text-xs">
              Step 3 of 5
            </span>
            <span className="text-[#667085] font-medium">Define: 7 clear rules that govern the experiment</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#667085]">
            <span className="w-2 h-2 rounded-full bg-[#08B878]"></span>
            <span>All Rules Validated</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Experiment Summary Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E5EAF1]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#2879F2] uppercase tracking-wider">
                  EXPERIMENT BLUEPRINT
                </span>
                <span className="text-xs text-[#667085]">•</span>
                <span className="text-xs font-medium text-[#667085]">{experiment.market}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl text-[#111111] font-bold tracking-tight">
                Let's turn your question into a testable experiment.
              </h1>

              <p className="text-sm text-[#667085]">
                These 7 choices define exactly what we will test using 7 years of daily market history (2018–2025).
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => goToPhase('clarify')}
                className="px-4 py-2.5 rounded-xl border border-[#E5EAF1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#111111] transition-colors cursor-pointer"
                type="button"
              >
                Edit choices
              </button>

              <button
                onClick={handleRunExperiment}
                className="px-6 py-2.5 rounded-xl bg-[#111111] hover:bg-black text-white text-sm font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                type="button"
              >
                <span>Run this experiment</span>
                <span className="text-base">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hypothesis Statement Box */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2879F2]"></span>
            <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
              Hypothesis Under Test
            </span>
          </div>
          <p className="text-base text-[#111111] font-medium italic bg-[#F8FAFC] p-4 rounded-xl border border-[#E5EAF1] leading-relaxed">
            “Buying {experiment.market} after a ≥{((experiment.threshold || 0.05) * 100).toFixed(1)}% single-session decline yields positive net returns over a {experiment.holdingDays || 5}-trading-day holding horizon after trading costs.”
          </p>
        </div>

        {/* 7-Step Guided Research Plan (2 Columns Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Asset Universe */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3F6FA] text-[#111111] flex items-center justify-center text-xs font-bold font-mono">
                  1
                </span>
                <h3 className="text-base text-[#111111] font-bold">
                  What are we studying?
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] font-medium">
                Asset Universe
              </span>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between py-2 px-3 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <span className="text-xs text-[#667085]">Selected Asset</span>
                <span className="text-sm font-semibold text-[#111111]">{experiment.market} Index</span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                We're testing on the 50 largest publicly traded companies in India using historical daily price series.
              </p>
            </div>
          </div>

          {/* Card 2: Trigger Condition */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3F6FA] text-[#111111] flex items-center justify-center text-xs font-bold font-mono">
                  2
                </span>
                <h3 className="text-base text-[#111111] font-bold">
                  What counts as a sharp fall?
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] font-medium">
                Trigger Condition
              </span>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between py-2 px-3 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <span className="text-xs text-[#667085]">Decline Threshold</span>
                <span className="text-sm font-bold text-[#FF4A2D]">
                  Single-day drop ≥ {((experiment.threshold || 0.05) * 100).toFixed(1)}%
                </span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                An event triggers only when the index drops by at least {((experiment.threshold || 0.05) * 100).toFixed(1)}% from the previous day's close.
              </p>
            </div>
          </div>

          {/* Card 3: Trade Entry Rule */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3F6FA] text-[#111111] flex items-center justify-center text-xs font-bold font-mono">
                  3
                </span>
                <h3 className="text-base text-[#111111] font-bold">
                  When would we buy?
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] font-medium">
                Trade Entry Rule
              </span>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between py-2 px-3 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <span className="text-xs text-[#667085]">Execution Timing</span>
                <span className="text-sm font-semibold text-[#111111]">
                  {experiment.entryTiming === 'SAME_DAY_CLOSE' ? 'Same-Day Market Close (T)' : 'Next Session Open (T+1 Open)'}
                </span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                To be realistic and prevent using future data (look-ahead bias), we buy at the opening price of the next trading day.
              </p>
            </div>
          </div>

          {/* Card 4: Holding Period */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3F6FA] text-[#111111] flex items-center justify-center text-xs font-bold font-mono">
                  4
                </span>
                <h3 className="text-base text-[#111111] font-bold">
                  When would we sell?
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] font-medium">
                Holding Period
              </span>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between py-2 px-3 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <span className="text-xs text-[#667085]">Holding Duration</span>
                <span className="text-sm font-bold text-[#111111]">
                  {experiment.holdingDays || 5} Trading Days
                </span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                We hold the trade for exactly {experiment.holdingDays || 5} market sessions, exiting at the market close on day {experiment.holdingDays || 5}.
              </p>
            </div>
          </div>

          {/* Card 5: Trading Costs */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3F6FA] text-[#111111] flex items-center justify-center text-xs font-bold font-mono">
                  5
                </span>
                <h3 className="text-base text-[#111111] font-bold">
                  What does trading cost us?
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] font-medium">
                Trading Friction
              </span>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between py-2 px-3 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <span className="text-xs text-[#667085]">Round-Trip Cost</span>
                <span className="text-sm font-bold text-[#111111]">
                  {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% per trade
                </span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                Brokerage, STT taxes, exchange fees, and estimated execution slippage subtracted from each trade.
              </p>
            </div>
          </div>

          {/* Card 6: Historical Dataset */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3F6FA] text-[#111111] flex items-center justify-center text-xs font-bold font-mono">
                  6
                </span>
                <h3 className="text-base text-[#111111] font-bold">
                  Which history are we studying?
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] font-medium">
                Dataset Baseline
              </span>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between py-2 px-3 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <span className="text-xs text-[#667085]">Observation Window</span>
                <span className="text-sm font-semibold text-[#111111]">{experiment.dataPeriod} (7 Years)</span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                Over 7 years spanning major bull markets, the 2020 crash, rate-hike cycles, and recent market highs.
              </p>
            </div>
          </div>

          {/* Card 7: Evaluation Criteria (Full width on md) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3 md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3F6FA] text-[#111111] flex items-center justify-center text-xs font-bold font-mono">
                  7
                </span>
                <h3 className="text-base text-[#111111] font-bold">
                  How do we measure success?
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] font-medium">
                Evaluation Criteria
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="py-2 px-3 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <span className="text-xs text-[#667085] block">Average Net Return</span>
                <span className="text-sm font-bold text-[#08B878]">Average profit after costs</span>
              </div>
              <div className="py-2 px-3 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <span className="text-xs text-[#667085] block">Statistical Significance</span>
                <span className="text-sm font-bold text-[#2879F2]">Student's t-test (p &lt; 0.05)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assumption Provenance Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF1] overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2879F2]"></span>
              <h2 className="text-lg text-[#111111] font-bold">
                Assumption Provenance &amp; Verification
              </h2>
            </div>
            <span className="text-xs text-[#667085]">All 4 core rules confirmed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] text-[#667085] text-xs font-semibold border-b border-[#E5EAF1] h-9">
                  <th className="py-2 px-4">Rule / Parameter</th>
                  <th className="py-2 px-4">Configured Value</th>
                  <th className="py-2 px-4">Origin</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4 text-right pr-4">Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF1]">
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-semibold text-[#111111]">
                    Decline Trigger Threshold
                  </td>
                  <td className="py-3 px-4 font-bold text-[#111111]">
                    {card1.confirmedValue}
                  </td>
                  <td className="py-3 px-4 text-xs text-[#667085]">
                    {card1.isConfirmed ? 'User Confirmed' : 'Default'}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E6F8F1] text-[#08B878] text-xs font-semibold">
                      Locked
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right pr-4 font-mono text-xs text-[#667085]">
                    Deterministic
                  </td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-semibold text-[#111111]">
                    Execution Timing
                  </td>
                  <td className="py-3 px-4 font-bold text-[#111111]">
                    {card2.confirmedValue}
                  </td>
                  <td className="py-3 px-4 text-xs text-[#667085]">
                    {card2.isConfirmed ? 'User Confirmed' : 'Default'}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E6F8F1] text-[#08B878] text-xs font-semibold">
                      Locked
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right pr-4 font-mono text-xs text-[#667085]">
                    Deterministic
                  </td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-semibold text-[#111111]">
                    Holding Horizon Window
                  </td>
                  <td className="py-3 px-4 font-bold text-[#111111]">
                    {card3.confirmedValue}
                  </td>
                  <td className="py-3 px-4 text-xs text-[#667085]">
                    {card3.isConfirmed ? 'User Confirmed' : 'Default'}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E6F8F1] text-[#08B878] text-xs font-semibold">
                      Locked
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right pr-4 font-mono text-xs text-[#667085]">
                    Deterministic
                  </td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-semibold text-[#111111]">
                    Round-Trip Friction
                  </td>
                  <td className="py-3 px-4 font-bold text-[#111111]">
                    {((experiment.transactionCost || 0.001) * 100).toFixed(2)}% Round-trip
                  </td>
                  <td className="py-3 px-4 text-xs text-[#667085]">
                    System Baseline
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] text-xs font-semibold">
                      Standard
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right pr-4 font-mono text-xs text-[#667085]">
                    Deterministic
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
