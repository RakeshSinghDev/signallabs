import React, { useState } from 'react';
import { useExperiment } from '../../state/ExperimentContext';

export const ClarifyAmbiguity: React.FC = () => {
  const {
    experiment,
    updateQuestion,
    selectAssumptionOption,
    toggleConfirmAssumption,
    resetAssumptionsToDefault,
    confirmedCount,
    totalAmbiguities,
    goToPhase
  } = useExperiment();

  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(experiment.originalQuestion);
  const [customThreshold, setCustomThreshold] = useState('-4.5');
  const [customDays, setCustomDays] = useState('2');
  const [customHolding, setCustomHolding] = useState('21');

  const card1 = experiment.assumptions.card1;
  const card2 = experiment.assumptions.card2;
  const card3 = experiment.assumptions.card3;

  const handleQuestionSave = () => {
    updateQuestion(editedQuestion);
    setIsEditingQuestion(false);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Secondary Protocol Sub-bar / Stage & Breadcrumb Line */}
      <section className="w-full bg-surface-container-lowest px-margin py-space-md shadow-xs border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          {/* Session Path & Progress Indicator */}
          <div className="flex items-center gap-space-md text-on-surface-variant font-label-code text-label-code">
            <span className="text-outline uppercase tracking-wider font-label-caps text-label-caps">WORKSPACE</span>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold">{experiment.id}</span>
            <span className="text-outline-variant">/</span>
            <span className="bg-surface-container px-space-xs py-0.5 text-on-surface font-label-code text-label-code rounded-DEFAULT">
              SEMANTIC_DECONSTRUCT
            </span>
          </div>

          {/* Stage Micro-Status Bar */}
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-xs font-label-caps text-label-caps">
              <span className="w-4 h-4 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                <span className="material-symbols-outlined text-[11px] font-bold">check</span>
              </span>
              <span className="text-on-surface font-medium">1. ASK</span>
            </div>
            <span className="h-2 w-px bg-outline-variant"></span>
            <div className="flex items-center gap-space-xs font-label-caps text-label-caps bg-surface-container-high px-space-sm py-1 rounded-DEFAULT shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-on-surface font-semibold">2. CLARIFY</span>
              <span className="ml-space-xs bg-primary text-on-primary px-1.5 py-0.2 rounded-DEFAULT text-[9px] tracking-normal font-label-code">
                3 AMBIGUITIES FOUND
              </span>
            </div>
            <span className="h-2 w-px bg-outline-variant"></span>
            <div className="flex items-center gap-space-xs font-label-caps text-label-caps text-outline">
              <span>3. DEFINE</span>
            </div>
            <span className="h-2 w-px bg-outline-variant"></span>
            <div className="flex items-center gap-space-xs font-label-caps text-label-caps text-outline">
              <span>4. TEST</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Research Canvas Body */}
      <div className="max-w-7xl mx-auto w-full px-margin py-space-xl pb-28 space-y-space-xl">
        {/* User Natural Language Query Display Card */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-outline-variant/30 space-y-space-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-md">
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant bg-surface-container px-space-xs py-0.5 rounded-DEFAULT font-semibold">
                ORIGINAL NATURAL LANGUAGE PROMPT
              </span>
              <span className="font-label-code text-label-code text-outline">HASH: {experiment.specHash}</span>
            </div>
            <button
              onClick={() => setIsEditingQuestion(!isEditingQuestion)}
              className="font-body-sm text-body-sm text-secondary hover:text-on-surface transition-colors flex items-center gap-1 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">edit</span>
              {isEditingQuestion ? 'Cancel' : 'Edit Question'}
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pt-space-xs">
            {isEditingQuestion ? (
              <div className="flex items-center gap-space-sm w-full">
                <input
                  type="text"
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-1.5 rounded-DEFAULT font-headline-sm text-on-surface outline-none border border-outline-variant focus:border-primary"
                />
                <button
                  onClick={handleQuestionSave}
                  className="px-3 py-1.5 bg-primary text-on-primary font-body-sm rounded-DEFAULT whitespace-nowrap"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="font-headline-md text-headline-md text-on-surface tracking-tight font-medium pl-space-xs">
                “{experiment.originalQuestion}”
              </div>
            )}
            <div className="flex items-center gap-space-md text-on-surface-variant font-label-code text-label-code shrink-0">
              <span className="px-space-sm py-0.5 bg-surface-container-low rounded-DEFAULT">NIFTY 50 INDEX</span>
              <span className="px-space-sm py-0.5 bg-surface-container-low rounded-DEFAULT">DAILY TIME-SERIES</span>
            </div>
          </div>
        </div>

        {/* Ambiguity Deconstruction Banner */}
        <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg shadow-xs border border-outline-variant/30">
          <div className="space-y-1">
            <div className="flex items-center gap-space-sm">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <h1 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                A few parameters need explicit definition before we can formulate the experiment.
              </h1>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Quantitative hypothesis testing requires mathematically unambiguous rules for triggering events, exact order dispatch timing, and investment horizons. Review or adjust AI inferred parameters below.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-space-md bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-xs border border-outline-variant/30">
            <div className="text-right">
              <div className="font-label-caps text-label-caps uppercase text-on-surface-variant">Deterministic Audit</div>
              <div className="font-label-code text-label-code font-semibold text-on-surface">
                {confirmedCount} of {totalAmbiguities} explicitly confirmed
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">tune</span>
          </div>
        </div>

        {/* Ambiguity Resolution Panel Grid */}
        <div className="grid grid-cols-1 gap-space-xl">
          {/* ITEM 1: What counts as a sharp fall? */}
          <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant/30 p-space-lg transition-all space-y-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-code text-label-code text-outline font-semibold">AMBIGUITY 01</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  What constitutes a “sharp fall”?
                </h2>
              </div>
              <div className="flex items-center gap-space-sm">
                <span
                  className={`font-label-caps text-label-caps px-space-sm py-0.5 rounded-DEFAULT flex items-center font-semibold ${
                    card1.isConfirmed
                      ? 'bg-surface-container-lowest text-on-surface border border-primary'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      card1.isConfirmed ? 'bg-on-tertiary-container' : 'bg-outline'
                    }`}
                  />
                  {card1.isConfirmed ? 'CONFIRMED BY USER' : 'NEEDS CONFIRMATION · AI REC: OPTION B'}
                </span>

                <button
                  onClick={() => toggleConfirmAssumption('card1')}
                  className={`px-space-md py-space-xs rounded-DEFAULT font-label-caps text-label-caps uppercase flex items-center transition-colors cursor-pointer ${
                    card1.isConfirmed
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                  }`}
                  type="button"
                >
                  {card1.isConfirmed ? (
                    <>
                      <span className="material-symbols-outlined text-[14px] mr-1">check</span>
                      Confirmed
                    </>
                  ) : (
                    'Confirm Assumption'
                  )}
                </button>
              </div>
            </div>

            {/* AI Semantic Rationale */}
            <div className="bg-surface-container-low p-space-md rounded-lg flex items-start gap-space-md text-on-surface-variant font-body-sm text-body-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-outline text-[16px] mt-0.5">psychology</span>
              <div className="space-y-0.5">
                <span className="font-semibold text-on-surface">Why this assumption: </span>
                <span>A 5% one-day decline provides a clear, relatively infrequent event definition for this prototype experiment. The threshold can be changed later through sensitivity testing.</span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md pt-space-xs">
              {card1.options.map((opt) => {
                const isSelected = card1.selectedOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => selectAssumptionOption('card1', opt.id)}
                    className={`cursor-pointer p-space-md rounded-lg transition-all flex flex-col justify-between space-y-space-md border ${
                      isSelected
                        ? 'bg-surface-container-highest text-on-surface border-primary shadow-xs'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low border-outline-variant/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-space-xs">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-primary' : 'bg-outline-variant'
                          }`}
                        />
                        <span className="font-label-caps text-label-caps uppercase font-semibold text-on-surface">
                          Option {opt.id}
                        </span>
                      </div>
                      {opt.isAiSuggested ? (
                        <span className="font-label-caps text-[9px] bg-primary text-on-primary px-1.5 py-0.2 rounded-DEFAULT tracking-wider font-semibold">
                          AI SUGGESTED
                        </span>
                      ) : opt.sampleCount ? (
                        <span className="font-label-code text-label-code text-on-surface-variant bg-surface-container px-1 py-0.5 rounded-DEFAULT">
                          {opt.sampleCount}
                        </span>
                      ) : (
                        <span className="font-label-code text-label-code text-outline">{opt.meta}</span>
                      )}
                    </div>

                    <div>
                      <div className="font-body-md text-body-md font-medium text-on-surface">{opt.label}</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{opt.description}</div>
                    </div>

                    {opt.id === 'D' ? (
                      <div className="mt-space-xs flex items-center gap-space-xs" onClick={(e) => e.stopPropagation()}>
                        <input
                          className="w-16 h-7 bg-surface-container-lowest text-on-surface px-space-xs font-label-numeric text-label-numeric text-right rounded-DEFAULT outline-none border border-outline-variant shadow-xs"
                          type="text"
                          value={customThreshold}
                          onChange={(e) => setCustomThreshold(e.target.value)}
                        />
                        <span className="font-label-code text-label-code text-on-surface-variant">% in</span>
                        <input
                          className="w-10 h-7 bg-surface-container-lowest text-on-surface px-space-xs font-label-numeric text-label-numeric text-center rounded-DEFAULT outline-none border border-outline-variant shadow-xs"
                          type="text"
                          value={customDays}
                          onChange={(e) => setCustomDays(e.target.value)}
                        />
                        <span className="font-label-code text-label-code text-on-surface-variant">days</span>
                      </div>
                    ) : (
                      <div className="font-label-code text-label-code text-outline pt-space-xs flex justify-between items-center">
                        <span>{opt.meta}</span>
                        {isSelected && (
                          <span className="font-semibold text-primary font-label-caps text-label-caps">
                            ACTIVE SELECTION
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Inline Historical Sparkline */}
            <div className="pt-space-xs flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-low px-space-md py-space-sm rounded-lg border border-outline-variant/30">
              <div className="flex items-center gap-space-md font-label-code text-label-code text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-primary"></span>Historical NIFTY Trigger Distribution
                </span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">Observed Sample: {experiment.totalTradingSessions.toLocaleString()} Sessions ({experiment.dataPeriod})</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="text-on-surface-variant" fill="none" height="20" viewBox="0 0 140 20" width="140">
                  <path d="M0 18 Q 30 18 50 16 T 80 12 T 110 5 T 140 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <line stroke="#ba1a1a" strokeDasharray="2 2" strokeWidth="1.5" x1="90" x2="90" y1="0" y2="20" />
                  <circle cx="90" cy="10" fill="#ba1a1a" r="2.5" />
                </svg>
                <span className="font-label-code text-label-code text-error ml-1">-{((experiment.threshold || 0.05) * 100).toFixed(1)}% threshold</span>
              </div>
            </div>
          </div>

          {/* ITEM 2: When should trade entry occur? */}
          <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant/30 p-space-lg transition-all space-y-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-code text-label-code text-outline font-semibold">AMBIGUITY 02</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  When should the trade entry occur?
                </h2>
              </div>
              <div className="flex items-center gap-space-sm">
                <span
                  className={`font-label-caps text-label-caps px-space-sm py-0.5 rounded-DEFAULT flex items-center font-semibold ${
                    card2.isConfirmed
                      ? 'bg-surface-container-lowest text-on-surface border border-primary'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      card2.isConfirmed ? 'bg-on-tertiary-container' : 'bg-outline'
                    }`}
                  />
                  {card2.isConfirmed ? 'CONFIRMED BY USER' : 'NEEDS CONFIRMATION · AI REC: NEXT OPEN'}
                </span>

                <button
                  onClick={() => toggleConfirmAssumption('card2')}
                  className={`px-space-md py-space-xs rounded-DEFAULT font-label-caps text-label-caps uppercase flex items-center transition-colors cursor-pointer ${
                    card2.isConfirmed
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                  }`}
                  type="button"
                >
                  {card2.isConfirmed ? (
                    <>
                      <span className="material-symbols-outlined text-[14px] mr-1">check</span>
                      Confirmed
                    </>
                  ) : (
                    'Confirm Assumption'
                  )}
                </button>
              </div>
            </div>

            {/* AI Semantic Rationale */}
            <div className="bg-surface-container-low p-space-md rounded-lg flex items-start gap-space-md text-on-surface-variant font-body-sm text-body-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-outline text-[16px] mt-0.5">psychology</span>
              <div className="space-y-0.5">
                <span className="font-semibold text-on-surface">Execution Rationale: </span>
                <span>{card2.statisticalRationale}</span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
              {card2.options.map((opt) => {
                const isSelected = card2.selectedOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => selectAssumptionOption('card2', opt.id)}
                    className={`cursor-pointer p-space-md rounded-lg transition-all flex flex-col justify-between space-y-space-md border ${
                      isSelected
                        ? 'bg-surface-container-highest text-on-surface border-primary shadow-xs'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low border-outline-variant/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-space-xs">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-primary' : 'bg-outline-variant'
                          }`}
                        />
                        <span className="font-label-caps text-label-caps uppercase font-semibold text-on-surface">
                          Mode {opt.id}
                        </span>
                      </div>
                      {opt.isAiSuggested ? (
                        <span className="font-label-caps text-[9px] bg-primary text-on-primary px-1.5 py-0.2 rounded-DEFAULT tracking-wider font-semibold">
                          AI SUGGESTED
                        </span>
                      ) : (
                        <span className="font-label-code text-label-code text-outline">{opt.meta}</span>
                      )}
                    </div>

                    <div>
                      <div className="font-body-md text-body-md font-medium text-on-surface">{opt.label}</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{opt.description}</div>
                    </div>

                    <div className="font-label-code text-label-code text-outline pt-space-xs flex justify-between items-center">
                      <span>{opt.meta}</span>
                      {isSelected && (
                        <span className="font-semibold text-primary font-label-caps text-label-caps">
                          ACTIVE SELECTION
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ITEM 3: How long should we hold the position? */}
          <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant/30 p-space-lg transition-all space-y-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-code text-label-code text-outline font-semibold">AMBIGUITY 03</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  How long should the position be held? (Holding Horizon)
                </h2>
              </div>
              <div className="flex items-center gap-space-sm">
                <span
                  className={`font-label-caps text-label-caps px-space-sm py-0.5 rounded-DEFAULT flex items-center font-semibold ${
                    card3.isConfirmed
                      ? 'bg-surface-container-lowest text-on-surface border border-primary'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      card3.isConfirmed ? 'bg-on-tertiary-container' : 'bg-outline'
                    }`}
                  />
                  {card3.isConfirmed ? 'CONFIRMED BY USER' : 'NEEDS CONFIRMATION · AI REC: 5 SESSIONS'}
                </span>

                <button
                  onClick={() => toggleConfirmAssumption('card3')}
                  className={`px-space-md py-space-xs rounded-DEFAULT font-label-caps text-label-caps uppercase flex items-center transition-colors cursor-pointer ${
                    card3.isConfirmed
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                  }`}
                  type="button"
                >
                  {card3.isConfirmed ? (
                    <>
                      <span className="material-symbols-outlined text-[14px] mr-1">check</span>
                      Confirmed
                    </>
                  ) : (
                    'Confirm Assumption'
                  )}
                </button>
              </div>
            </div>

            {/* AI Semantic Rationale */}
            <div className="bg-surface-container-low p-space-md rounded-lg flex items-start gap-space-md text-on-surface-variant font-body-sm text-body-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-outline text-[16px] mt-0.5">psychology</span>
              <div className="space-y-0.5">
                <span className="font-semibold text-on-surface">Empirical Horizon Rationale: </span>
                <span>{card3.statisticalRationale}</span>
              </div>
            </div>

            {/* Horizontal Radio Pills */}
            <div className="space-y-space-md pt-space-xs">
              <div className="flex flex-wrap items-center gap-space-sm">
                {card3.options.map((opt) => {
                  const isSelected = card3.selectedOptionId === opt.id;
                  if (opt.id === 'custom') {
                    return (
                      <div
                        key={opt.id}
                        className="h-9 px-space-md rounded-DEFAULT bg-surface-container-low flex items-center gap-space-xs shadow-xs border border-outline-variant/30"
                      >
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Custom:</span>
                        <input
                          className="w-12 h-6 bg-surface-container-lowest text-on-surface px-1 text-center font-label-numeric text-label-numeric rounded-DEFAULT outline-none border border-outline-variant focus:ring-1 focus:ring-primary shadow-xs"
                          placeholder="21"
                          type="number"
                          value={customHolding}
                          onChange={(e) => setCustomHolding(e.target.value)}
                        />
                        <span className="font-label-code text-label-code text-on-surface-variant">sessions</span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => selectAssumptionOption('card3', opt.id)}
                      className={`h-9 px-space-lg rounded-DEFAULT font-body-sm text-body-sm flex items-center gap-space-xs transition-all shadow-xs border cursor-pointer ${
                        isSelected
                          ? 'bg-surface-container-highest text-on-surface font-semibold border-primary'
                          : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low border-outline-variant/40'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-primary' : 'bg-outline-variant'
                        }`}
                      />
                      <span>{opt.label}</span>
                      {opt.isAiSuggested && (
                        <span className="font-label-caps text-[9px] bg-primary text-on-primary px-1.5 py-0.2 rounded-DEFAULT tracking-wider ml-1 font-semibold">
                          AI SUGGESTED
                        </span>
                      )}
                      <span className="font-label-code text-label-code text-outline ml-1">{opt.meta}</span>
                    </button>
                  );
                })}
              </div>

              {/* Alpha Decay Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md pt-space-xs">
                <div className="p-space-sm bg-surface-container-low rounded-lg border border-outline-variant/20">
                  <div className="font-label-caps text-label-caps uppercase text-outline">Expected Win Rate (5D)</div>
                  <div className="font-label-numeric text-label-numeric text-on-surface font-semibold text-headline-sm mt-0.5">
                    {experiment.results.winRate}%
                  </div>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-lg border border-outline-variant/20">
                  <div className="font-label-caps text-label-caps uppercase text-outline">Avg Net Return</div>
                  <div className="font-label-numeric text-label-numeric text-on-tertiary-container font-semibold text-headline-sm mt-0.5">
                    +{experiment.results.averageNetReturn}%
                  </div>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-lg border border-outline-variant/20">
                  <div className="font-label-caps text-label-caps uppercase text-outline">Max Adverse Excursion</div>
                  <div className="font-label-numeric text-label-numeric text-error font-semibold text-headline-sm mt-0.5">
                    {experiment.results.maxAdverseExcursion}%
                  </div>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-lg border border-outline-variant/20">
                  <div className="font-label-caps text-label-caps uppercase text-outline">Sharpe Benchmark</div>
                  <div className="font-label-numeric text-label-numeric text-on-surface font-semibold text-headline-sm mt-0.5">
                    {experiment.results.sharpeRatio} SR
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 4: Test period & Historical dataset (Pre-set Baseline) */}
          <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant/30 p-space-lg space-y-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-code text-label-code text-outline font-semibold">PRE-SET 04</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Historical Timeframe &amp; Data Quality Baseline
                </h2>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="font-label-caps text-label-caps px-space-sm py-0.5 rounded-DEFAULT bg-surface-container-lowest text-on-surface font-semibold flex items-center shadow-xs border border-outline-variant/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container mr-1.5"></span>
                  CONFIRMED DEFAULT
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md bg-surface-container-low p-space-md rounded-lg text-body-sm text-on-surface-variant border border-outline-variant/20">
              <div className="space-y-1">
                <div className="font-label-caps text-label-caps uppercase text-outline">Observation Window</div>
                <div className="font-label-code text-label-code text-on-surface font-semibold">
                  {experiment.dataPeriod} (7 Years)
                </div>
                <div>Spans COVID-19 shock, 2022 rate hike cycles, 2024 breakout.</div>
              </div>
              <div className="space-y-1">
                <div className="font-label-caps text-label-caps uppercase text-outline">Asset Architecture</div>
                <div className="font-label-code text-label-code text-on-surface font-semibold">
                  {experiment.market} Total Returns (NSE_EOD_TR)
                </div>
                <div>Adjusted for split, bonus, and dividend reinvestment.</div>
              </div>
              <div className="space-y-1">
                <div className="font-label-caps text-label-caps uppercase text-outline">Friction &amp; Slippage Baseline</div>
                <div className="font-label-code text-label-code text-on-surface font-semibold">
                  0.10% Round-trip Cost included
                </div>
                <div>STT, exchange fees, and conservative impact spread models applied.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulated Mathematical Translation Spec */}
        <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant/30 p-space-lg space-y-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[18px] text-primary">compare_arrows</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Formulated Mathematical Translation Spec
              </h3>
            </div>
            <span className="font-label-code text-label-code text-on-surface-variant">
              READY FOR INGESTION ENGINE
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps uppercase">
                  <th className="py-space-sm px-space-md">Colloquial Term (User)</th>
                  <th className="py-space-sm px-space-md">Deterministic Parameter (SignalLab)</th>
                  <th className="py-space-sm px-space-md">Mathematical Representation</th>
                  <th className="py-space-sm px-space-md text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                <tr className="hover:bg-surface-container-low/50">
                  <td className="py-space-md px-space-md font-medium text-on-surface">“Sharp fall”</td>
                  <td className="py-space-md px-space-md text-on-surface">{card1.confirmedValue}</td>
                  <td className="py-space-md px-space-md font-label-code text-label-code text-on-surface-variant">
                    Close[t] / Close[t-1] - 1.0 ≤ -0.05
                  </td>
                  <td className="py-space-md px-space-md text-right font-label-caps text-label-caps text-on-surface font-semibold">
                    {card1.isConfirmed ? 'USER CONFIRMED' : 'AI PROPOSED'}
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50">
                  <td className="py-space-md px-space-md font-medium text-on-surface">“Buying NIFTY”</td>
                  <td className="py-space-md px-space-md text-on-surface">{card2.confirmedValue}</td>
                  <td className="py-space-md px-space-md font-label-code text-label-code text-on-surface-variant">
                    Order.Execute(Type=MOO, Bar=T+1, Asset=NIFTY)
                  </td>
                  <td className="py-space-md px-space-md text-right font-label-caps text-label-caps text-on-surface font-semibold">
                    {card2.isConfirmed ? 'USER CONFIRMED' : 'AI PROPOSED'}
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50">
                  <td className="py-space-md px-space-md font-medium text-on-surface">“Does it work?”</td>
                  <td className="py-space-md px-space-md text-on-surface">{card3.confirmedValue} holding horizon</td>
                  <td className="py-space-md px-space-md font-label-code text-label-code text-on-surface-variant">
                    ΔP = Close[T+5] - Open[T+1]; Sharpe &gt; 0.8
                  </td>
                  <td className="py-space-md px-space-md text-right font-label-caps text-label-caps text-on-surface font-semibold">
                    {card3.isConfirmed ? 'USER CONFIRMED' : 'AI PROPOSED'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Control Dock (Sticky above compliance footer) */}
      <div className="fixed bottom-10 left-0 right-0 z-30 bg-surface-container-lowest shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-outline-variant/30 px-margin py-space-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-space-md">
          {/* Status Feedback */}
          <div className="flex items-center text-body-sm text-body-sm text-on-surface-variant">
            <span
              className={`w-2 h-2 rounded-full mr-2 shrink-0 ${
                confirmedCount === 3 ? 'bg-on-tertiary-container' : 'bg-outline'
              }`}
            />
            {confirmedCount === 3 ? (
              <span>All 3 assumptions confirmed. Ready to review specification.</span>
            ) : (
              <span>
                <strong className="font-semibold text-on-surface">
                  {3 - confirmedCount} {3 - confirmedCount === 1 ? 'assumption needs' : 'assumptions need'}
                </strong>{' '}
                your confirmation
              </span>
            )}
          </div>

          {/* Interactive Actions */}
          <div className="flex items-center gap-space-md w-full sm:w-auto justify-end">
            <button
              onClick={resetAssumptionsToDefault}
              className="h-8 px-space-lg rounded-DEFAULT font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
              type="button"
            >
              Reset to Defaults
            </button>
            <button
              onClick={() => goToPhase('define')}
              className="h-8 px-space-xl rounded-DEFAULT font-body-sm text-body-sm font-medium bg-primary text-on-primary hover:bg-inverse-surface transition-all flex items-center gap-space-xs shadow-xs cursor-pointer"
              type="button"
            >
              <span>Review Experiment Specification</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
