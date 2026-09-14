import React, { useState } from 'react';
import { useExperiment } from '../../state/ExperimentContext';
import { RECENT_EXPERIMENTS, RESEARCH_SEEDS } from '../../data/mockDataset';

export const ResearchHome: React.FC = () => {
  const { experiment, updateQuestion, goToPhase } = useExperiment();
  const [query, setQuery] = useState(experiment.originalQuestion);
  const [filter, setFilter] = useState<'all' | 'active' | 'templates'>('all');

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
    if (filter === 'active') return exp.status === 'Active';
    if (filter === 'templates') return exp.status === 'Template';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Friendly Context Sub-Bar */}
      <div className="w-full bg-white/70 backdrop-blur-sm border-b border-[#E5EAF1] py-3 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#2879F2] font-semibold text-xs">
              Step 1 of 5
            </span>
            <span className="text-[#667085] font-medium">Ask: Start with an intuitive market question</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#667085]">
            <span className="w-2 h-2 rounded-full bg-[#08B878]"></span>
            <span>Sample Dataset: NIFTY 50 (2018–2025)</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* Main Hero Input Card */}
        <section className="w-full bg-white rounded-2xl shadow-sm border border-[#E5EAF1] p-8 sm:p-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F6FA] text-[#2879F2] text-xs font-semibold mb-4 border border-[#E5EAF1]">
            <span className="w-2 h-2 rounded-full bg-[#2879F2]"></span>
            <span>Market Hypothesis Testing</span>
          </div>

          <h1 className="text-3xl sm:text-4xl text-[#111111] font-bold tracking-tight max-w-2xl">
            What do you want to investigate?
          </h1>
          <p className="text-base text-[#667085] mt-3 max-w-xl leading-relaxed">
            Start with a market question. It doesn't need to be perfectly defined yet — type it the way you'd explain it to a friend. We'll help clarify and test it.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-8 flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Does buying NIFTY after a sharp fall work?"
                className="w-full h-13 px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5EAF1] text-[#111111] placeholder:text-[#667085]/60 text-base focus:outline-none focus:border-[#2879F2] focus:bg-white transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="h-13 px-6 rounded-xl bg-[#111111] text-white text-base font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm shrink-0 cursor-pointer"
            >
              <span>Start research</span>
              <span className="text-lg">→</span>
            </button>
          </form>

          {/* Seed Prompts / Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-[#667085]">
            <span className="text-xs text-[#667085] font-medium mr-1">
              Sample questions:
            </span>
            {RESEARCH_SEEDS.map((seed, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSeedClick(seed.query)}
                className="px-3 py-1 rounded-full bg-[#F3F6FA] hover:bg-[#E8F1FD] hover:text-[#2879F2] transition-colors text-xs font-medium text-[#667085] border border-[#E5EAF1] cursor-pointer"
              >
                {seed.label}
              </button>
            ))}
          </div>
        </section>

        {/* Example Research Ideas Section */}
        <section className="w-full flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3 px-1">
            <div>
              <h2 className="text-xl text-[#111111] font-bold tracking-tight">
                Example Research Ideas
              </h2>
              <p className="text-sm text-[#667085] mt-0.5">
                Explore pre-formulated templates or continue our active study.
              </p>
            </div>

            <div className="flex items-center bg-white p-1 rounded-xl border border-[#E5EAF1] text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all font-medium ${
                  filter === 'all'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#667085] hover:text-[#111111]'
                }`}
              >
                All (4)
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 rounded-lg transition-all font-medium ${
                  filter === 'active'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#667085] hover:text-[#111111]'
                }`}
              >
                Active (1)
              </button>
              <button
                onClick={() => setFilter('templates')}
                className={`px-3 py-1 rounded-lg transition-all font-medium ${
                  filter === 'templates'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#667085] hover:text-[#111111]'
                }`}
              >
                Templates (3)
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="w-full bg-white rounded-2xl shadow-sm border border-[#E5EAF1] overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#667085] text-xs font-semibold border-b border-[#E5EAF1] h-10">
                    <th className="py-2.5 px-4">Study / Idea Name</th>
                    <th className="py-2.5 px-4">Market</th>
                    <th className="py-2.5 px-4">Type</th>
                    <th className="py-2.5 px-4 text-right">Sample</th>
                    <th className="py-2.5 px-4 text-right">Return</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 text-right pr-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF1]">
                  {filteredExperiments.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#111111]">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              row.status === 'Active' ? 'bg-[#08B878]' : 'bg-[#667085]'
                            }`}
                          />
                          <span>{row.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#667085] font-medium">
                        {row.market}
                      </td>
                      <td className="py-3.5 px-4 text-[#667085]">
                        {row.hypothesisType}
                      </td>
                      <td className="py-3.5 px-4 text-right text-[#111111] font-mono text-xs">
                        {row.observations}
                      </td>
                      <td
                        className={`py-3.5 px-4 text-right font-semibold text-xs ${
                          row.netReturn.startsWith('+') ? 'text-[#08B878]' : 'text-[#667085]'
                        }`}
                      >
                        {row.netReturn}{' '}
                        {row.netReturn !== '—' && (
                          <span className="text-[#667085] font-normal">({row.holdingDays})</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            row.status === 'Active'
                              ? 'bg-[#E6F8F1] text-[#08B878]'
                              : 'bg-[#F3F6FA] text-[#667085]'
                          }`}
                        >
                          {row.status === 'Active' ? 'Live Prototype' : 'Template'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right pr-6">
                        <button
                          onClick={() => {
                            if (row.status === 'Active') {
                              updateQuestion('Does buying NIFTY after a sharp fall work?');
                              goToPhase('learn');
                            } else {
                              const seed = RESEARCH_SEEDS.find(s => row.name.includes(s.label) || s.label.includes(row.market));
                              const newQ = seed ? seed.query : `Does buying ${row.market} produce a statistical edge?`;
                              setQuery(newQ);
                              updateQuestion(newQ);
                              goToPhase('clarify');
                            }
                          }}
                          className="text-[#2879F2] hover:underline font-semibold text-xs cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>{row.actionText}</span>
                          <span>→</span>
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
