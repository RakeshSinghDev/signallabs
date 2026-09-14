import React, { useState } from 'react';
import { useExperiment } from '../../state/ExperimentContext';
import { RECENT_EXPERIMENTS, RESEARCH_SEEDS } from '../../data/mockDataset';

export const ResearchHome: React.FC = () => {
  const { experiment, updateQuestion, goToPhase } = useExperiment();
  const [query, setQuery] = useState(experiment.originalQuestion);
  const [filter, setFilter] = useState<'all' | 'completed' | 'drafts'>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    updateQuestion(query);
    goToPhase('clarify');
  };

  const handleSeedClick = (seedQuery: string) => {
    setQuery(seedQuery);
    updateQuestion(seedQuery);
  };

  const filteredExperiments = RECENT_EXPERIMENTS.filter(exp => {
    if (filter === 'completed') return exp.status === 'Completed';
    if (filter === 'drafts') return exp.status === 'Draft';
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Active Stage Indicator Sub-Bar */}
      <div className="w-full bg-surface-container-lowest shadow-xs py-space-xs px-margin border-b border-outline-variant/30">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-space-md text-on-surface-variant font-label-code text-label-code">
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-space-xs text-on-surface font-semibold bg-surface-container px-space-sm py-0.5 rounded-DEFAULT">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface">ACTIVE PHASE:</span>
              <span className="font-label-numeric text-label-numeric text-on-surface">01. ASK</span>
            </span>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface-variant font-body-sm text-body-sm">
              Intuitive hypothesis capture &amp; formal scoping
            </span>
          </div>
          <div className="flex items-center gap-space-lg font-label-caps text-label-caps text-outline">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
              ENGINE: DETERMINISTIC_V2.4
            </span>
            <span>PROTOTYPE DATA: 2018–2025</span>
            <span className="text-on-surface font-label-code text-label-code">STATUS: SYNCHRONIZED</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-margin py-space-xl pb-16 flex flex-col gap-8">
        {/* Centered High-Focus Hypothesis Query Engine */}
        <section className="w-full pt-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 bg-surface-container rounded-DEFAULT mb-space-md">
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
            <span className="font-label-caps text-label-caps tracking-widest text-on-surface-variant uppercase font-semibold">
              EMPIRICAL HYPOTHESIS TESTING
            </span>
          </div>

          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight max-w-3xl mb-space-sm font-semibold">
            What do you want to investigate?
          </h1>

          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-space-xl leading-relaxed">
            Turn an intuitive market observation into an empirically testable research experiment with explicit assumptions, structural friction modeling, and historical validation.
          </p>

          {/* Institutional Query Input Box */}
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-3xl bg-surface-container-lowest rounded-xl shadow-md p-space-md transition-all border border-outline-variant/40"
          >
            <div className="flex flex-col gap-space-sm">
              <div className="relative w-full text-left">
                <label htmlFor="hypothesis-query-input" className="sr-only">
                  Research Question
                </label>
                <textarea
                  id="hypothesis-query-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent resize-none font-body-lg text-body-lg text-on-surface placeholder:text-outline focus:outline-none py-space-xs px-space-xs leading-relaxed"
                  rows={2}
                  placeholder="e.g. Does buying NIFTY after a sharp fall work?"
                />
              </div>

              {/* Accessory & Action Strip */}
              <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs bg-surface-container-low rounded-lg p-space-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 rounded-DEFAULT shadow-xs font-label-code text-label-code text-on-surface font-medium border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">show_chart</span>
                    NIFTY 50 (NSE)
                  </span>
                  <span className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 rounded-DEFAULT shadow-xs font-label-code text-label-code text-on-surface-variant border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    EOD (7y)
                  </span>
                  <span className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 rounded-DEFAULT shadow-xs font-label-caps text-label-caps text-outline uppercase tracking-wider border border-outline-variant/30">
                    [AI-HYPOTHESIS SUGGESTION]
                  </span>
                </div>

                <div className="flex items-center gap-space-sm ml-auto">
                  <span className="hidden sm:inline-flex items-center gap-0.5 px-space-xs py-0.5 bg-surface-container rounded-DEFAULT font-label-code text-label-code text-outline">
                    <span>↵</span>
                    <span>Enter</span>
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-space-xs bg-primary hover:bg-inverse-surface text-on-primary font-body-sm text-body-sm font-medium px-space-lg py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Start research</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Prompt Seeds */}
          <div className="mt-space-md flex flex-wrap items-center justify-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
            <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider mr-1">
              Sample seeds:
            </span>
            {RESEARCH_SEEDS.map((seed, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-outline-variant">·</span>}
                <button
                  type="button"
                  onClick={() => handleSeedClick(seed.query)}
                  className="hover:text-on-surface hover:underline transition-colors font-label-code text-label-code text-on-surface-variant bg-surface-container-low px-space-xs py-0.5 rounded-DEFAULT"
                >
                  {seed.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Recent Empirical Experiments Table Section */}
        <section className="w-full flex flex-col gap-space-sm mt-4">
          <div className="flex flex-wrap items-end justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-space-xs mb-0.5">
                <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">LAB LOGS</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="font-label-code text-label-code text-on-surface-variant">SERIES 084–087</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold">
                Recent Research Experiments
              </h2>
            </div>

            <div className="flex items-center gap-space-xs">
              <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg text-on-surface-variant font-label-code text-label-code">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-space-sm py-0.5 rounded-DEFAULT transition-all ${
                    filter === 'all'
                      ? 'bg-surface-container-lowest text-on-surface font-medium shadow-xs'
                      : 'hover:text-on-surface'
                  }`}
                >
                  All (4)
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-space-sm py-0.5 rounded-DEFAULT transition-all ${
                    filter === 'completed'
                      ? 'bg-surface-container-lowest text-on-surface font-medium shadow-xs'
                      : 'hover:text-on-surface'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter('drafts')}
                  className={`px-space-sm py-0.5 rounded-DEFAULT transition-all ${
                    filter === 'drafts'
                      ? 'bg-surface-container-lowest text-on-surface font-medium shadow-xs'
                      : 'hover:text-on-surface'
                  }`}
                >
                  Drafts
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant/30 overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead>
                  <tr className="bg-surface-container-low text-outline font-label-caps text-label-caps uppercase tracking-wider h-8">
                    <th className="py-1 px-space-md font-semibold">Experiment Name</th>
                    <th className="py-1 px-space-md font-semibold">Market / Asset</th>
                    <th className="py-1 px-space-md font-semibold">Hypothesis Type</th>
                    <th className="py-1 px-space-md font-semibold">Status</th>
                    <th className="py-1 px-space-md font-semibold text-right">Observations</th>
                    <th className="py-1 px-space-md font-semibold text-right">Sample Return (Net)</th>
                    <th className="py-1 px-space-md font-semibold">Last Modified</th>
                    <th className="py-1 px-space-md font-semibold text-right pr-space-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container font-body-md text-body-md">
                  {filteredExperiments.map((row) => (
                    <tr key={row.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="py-2.5 px-space-md font-medium text-on-surface min-w-[260px]">
                        <div className="flex items-center gap-space-sm">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              row.status === 'Completed' ? 'bg-primary' : 'bg-outline'
                            }`}
                          />
                          <span className="truncate font-semibold">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-space-md font-label-code text-label-code text-on-surface whitespace-nowrap">
                        {row.market}
                      </td>
                      <td className="py-2.5 px-space-md text-on-surface-variant whitespace-nowrap font-label-code text-label-code">
                        {row.hypothesisType}
                      </td>
                      <td className="py-2.5 px-space-md whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-DEFAULT bg-surface-container text-on-surface font-label-caps text-label-caps uppercase font-semibold">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              row.status === 'Completed' ? 'bg-on-tertiary-container' : 'bg-outline'
                            }`}
                          />
                          {row.status === 'Completed' ? 'Completed' : 'Draft · Assumptions pending'}
                        </span>
                      </td>
                      <td className="py-2.5 px-space-md text-right font-label-numeric text-label-numeric text-on-surface whitespace-nowrap">
                        {row.observations}
                      </td>
                      <td
                        className={`py-2.5 px-space-md text-right font-label-numeric text-label-numeric whitespace-nowrap font-semibold ${
                          row.netReturn.startsWith('+') ? 'text-on-tertiary-container' : 'text-outline'
                        }`}
                      >
                        {row.netReturn}{' '}
                        {row.netReturn !== '—' && (
                          <span className="text-outline font-normal text-body-sm">({row.holdingDays})</span>
                        )}
                      </td>
                      <td className="py-2.5 px-space-md font-label-code text-label-code text-on-surface-variant whitespace-nowrap">
                        {row.lastModified}
                      </td>
                      <td className="py-2.5 px-space-md text-right pr-space-lg whitespace-nowrap">
                        <button
                          onClick={() => {
                            if (row.canResume) {
                              goToPhase('clarify');
                            } else {
                              goToPhase('learn');
                            }
                          }}
                          className="inline-flex items-center gap-0.5 text-on-surface hover:underline font-body-sm text-body-sm font-semibold cursor-pointer"
                        >
                          <span>{row.actionText}</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
