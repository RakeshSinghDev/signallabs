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
  const [customThreshold, setCustomThreshold] = useState('4.5');
  const [thresholdError, setThresholdError] = useState<string | null>(null);
  const [customDays, setCustomDays] = useState('2');
  const [customHolding, setCustomHolding] = useState('21');

  const card1 = experiment.assumptions.card1;
  const card2 = experiment.assumptions.card2;
  const card3 = experiment.assumptions.card3;

  const isMultiThreshold = /3%.*7%.*10%/i.test(experiment.originalQuestion) ||
    (experiment.originalQuestion.includes('3%') && experiment.originalQuestion.includes('7%') && experiment.originalQuestion.includes('10%'));

  const handleCustomThresholdChange = (val: string) => {
    setCustomThreshold(val);
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) {
      setThresholdError('Enter a positive decline percentage.');
    } else {
      setThresholdError(null);
      selectAssumptionOption('card1', 'D', val);
    }
  };

  const handleConfirmCard1 = () => {
    if (card1.selectedOptionId === 'D') {
      const num = parseFloat(customThreshold);
      if (isNaN(num) || num <= 0) {
        setThresholdError('Enter a positive decline percentage.');
        return;
      }
    }
    toggleConfirmAssumption('card1');
  };

  const handleQuestionSave = () => {
    updateQuestion(editedQuestion);
    setIsEditingQuestion(false);
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Top Context Sub-bar */}
      <div className="w-full bg-white/70 backdrop-blur-sm border-b border-[#E5EAF1] py-3 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#2879F2] font-semibold text-xs">
              Step 2 of 5
            </span>
            <span className="text-[#667085] font-medium">Clarify: Turn intuitive words into measurable rules</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#667085]">
            <span className="w-2 h-2 rounded-full bg-[#08B878]"></span>
            <span>Study ID: {experiment.id}</span>
          </div>
        </div>
      </div>

      {/* Main Research Canvas Body */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        {/* User Natural Language Query Display Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E5EAF1] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#2879F2] uppercase tracking-wider">
                YOUR QUESTION
              </span>
            </div>
            <button
              onClick={() => setIsEditingQuestion(!isEditingQuestion)}
              className="text-xs font-medium text-[#2879F2] hover:underline flex items-center gap-1 cursor-pointer"
              type="button"
            >
              {isEditingQuestion ? 'Cancel' : 'Edit Question'}
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
            {isEditingQuestion ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  className="w-full bg-[#F8FAFC] px-3 py-2 rounded-xl text-lg font-medium text-[#111111] outline-none border border-[#E5EAF1] focus:border-[#2879F2] focus:bg-white"
                />
                <button
                  onClick={handleQuestionSave}
                  className="px-4 py-2 bg-[#111111] text-white text-sm font-semibold rounded-xl whitespace-nowrap hover:bg-black"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="text-xl sm:text-2xl text-[#111111] font-bold tracking-tight">
                “{experiment.originalQuestion}”
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-[#667085] shrink-0">
              <span className="px-2.5 py-1 bg-[#F3F6FA] rounded-lg font-medium">NIFTY 50 Index</span>
              <span className="px-2.5 py-1 bg-[#F3F6FA] rounded-lg">Daily History</span>
            </div>
          </div>
        </div>

        {/* Ambiguity Deconstruction Banner */}
        <div className="bg-white p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm border border-[#E5EAF1]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2879F2]"></span>
              <h1 className="text-lg text-[#111111] font-bold tracking-tight">
                {isMultiThreshold
                  ? 'Your question specifies drop thresholds (3%, 7%, 10%). Next, confirm execution & holding rules.'
                  : 'Your question leaves three important details to define.'}
              </h1>
            </div>
            <p className="text-sm text-[#667085] max-w-3xl leading-relaxed">
              {isMultiThreshold
                ? 'We recognized your requested 3%, 7%, and 10% decline thresholds. To run the test, we need rules for: (1) baseline threshold selection, (2) trade entry timing, and (3) holding duration and costs.'
                : 'To test this idea scientifically, we need exact rules for: (1) what counts as a sharp fall, (2) when we would buy, and (3) how long we stay invested. Review our suggested starting points below or choose another option.'}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3 bg-[#F8FAFC] px-4 py-2.5 rounded-xl border border-[#E5EAF1]">
            <div className="text-right">
              <div className="text-[11px] font-medium text-[#667085] uppercase tracking-wider">Review Progress</div>
              <div className="text-sm font-bold text-[#111111]">
                {confirmedCount} of {totalAmbiguities} confirmed
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#2879F2]"></span>
          </div>
        </div>

        {/* Ambiguity Resolution Panel Grid */}
        <div className="space-y-6">
          {/* ITEM 1: What counts as a sharp fall? */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF1] p-6 sm:p-8 transition-all space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F3F6FA] text-[#667085]">CHOICE 1 OF 3</span>
                <h2 className="text-xl text-[#111111] font-bold">
                  What counts as a “sharp fall”?
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] text-xs font-medium">
                  Trigger Condition
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center ${
                    card1.isConfirmed
                      ? 'bg-[#E6F8F1] text-[#08B878]'
                      : 'bg-[#F3F6FA] text-[#667085]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      card1.isConfirmed ? 'bg-[#08B878]' : 'bg-[#667085]'
                    }`}
                  />
                  {card1.isConfirmed ? 'CONFIRMED BY YOU' : 'NEEDS CONFIRMATION · SUGGESTION: OPTION B'}
                </span>

                <button
                  onClick={handleConfirmCard1}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    card1.isConfirmed
                      ? 'bg-[#08B878] text-white shadow-xs'
                      : 'bg-[#111111] text-white hover:bg-black'
                  }`}
                  type="button"
                >
                  {card1.isConfirmed ? '✓ Confirmed' : 'Confirm Choice'}
                </button>
              </div>
            </div>

            {/* AI Semantic Rationale */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl flex items-start gap-3 text-xs text-[#667085] border border-[#E5EAF1]">
              <span className="text-[#2879F2] text-sm mt-0.5">💡</span>
              <div className="space-y-0.5 leading-relaxed">
                <span className="font-semibold text-[#111111]">
                  {isMultiThreshold ? 'Recognized from question: ' : 'Why this assumption: '}
                </span>
                <span>
                  {isMultiThreshold
                    ? 'You specified 3%, 7%, and 10% drops in your question. Option A (3%) tests your first threshold, or you can run the baseline 5% test and compare across the multi-threshold ladder.'
                    : 'A 5% one-day decline provides a clear, relatively infrequent event definition for this prototype experiment. The threshold can be changed later through sensitivity testing.'}
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {card1.options.map((opt) => {
                const isSelected = card1.selectedOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => selectAssumptionOption('card1', opt.id)}
                    className={`cursor-pointer p-4 rounded-xl transition-all flex flex-col justify-between space-y-3 border ${
                      isSelected
                        ? 'bg-[#E8F1FD] text-[#111111] border-2 border-[#2879F2] shadow-sm'
                        : 'bg-[#F8FAFC] text-[#667085] hover:bg-white border-[#E5EAF1]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-[#2879F2]' : 'bg-[#667085]/40'
                          }`}
                        />
                        <span className="text-xs uppercase font-bold text-[#111111]">
                          Option {opt.id}
                        </span>
                      </div>
                      {opt.isAiSuggested ? (
                        <span className="text-[10px] bg-[#2879F2] text-white px-2 py-0.5 rounded-full font-bold tracking-wider">
                          SUGGESTED
                        </span>
                      ) : opt.sampleCount ? (
                        <span className="text-[11px] font-mono text-[#667085] bg-white px-1.5 py-0.5 rounded-md border border-[#E5EAF1]">
                          {opt.sampleCount}
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#667085]">{opt.meta}</span>
                      )}
                    </div>

                    <div>
                      <div className="text-sm font-bold text-[#111111]">{opt.label}</div>
                      <div className="text-xs text-[#667085] mt-1 leading-normal">{opt.description}</div>
                    </div>

                    {opt.id === 'D' ? (
                      <div className="mt-1 flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          <input
                            className={`w-16 h-7 bg-white text-[#111111] px-2 text-xs font-bold text-right rounded-lg outline-none border ${
                              thresholdError ? 'border-[#FF4A2D]' : 'border-[#E5EAF1]'
                            } shadow-xs`}
                            type="text"
                            value={customThreshold}
                            onChange={(e) => handleCustomThresholdChange(e.target.value)}
                          />
                          <span className="text-xs text-[#667085] font-medium">% in</span>
                          <input
                            className="w-10 h-7 bg-white text-[#111111] px-1 text-xs font-bold text-center rounded-lg outline-none border border-[#E5EAF1] shadow-xs"
                            type="text"
                            value={customDays}
                            onChange={(e) => setCustomDays(e.target.value)}
                          />
                          <span className="text-xs text-[#667085]">days</span>
                        </div>
                        {thresholdError && (
                          <div className="text-[#FF4A2D] text-[11px] font-medium">
                            {thresholdError}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-[11px] text-[#667085] pt-1 flex justify-between items-center">
                        <span>{opt.meta}</span>
                        {isSelected && (
                          <span className="font-bold text-[#2879F2] text-[10px] tracking-wider">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#F8FAFC] px-4 py-2.5 rounded-xl border border-[#E5EAF1]">
              <div className="flex items-center gap-2 text-xs text-[#667085]">
                <span className="w-2 h-2 rounded-sm bg-[#2879F2]"></span>
                <span className="font-medium text-[#111111]">Historical NIFTY Trigger Distribution</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">Observed Sample: {experiment.totalTradingSessions.toLocaleString()} Sessions ({experiment.dataPeriod})</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#FF4A2D]">-{((experiment.threshold || 0.05) * 100).toFixed(1)}% threshold</span>
              </div>
            </div>
          </div>

          {/* ITEM 2: When should trade entry occur? */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF1] p-6 sm:p-8 transition-all space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F3F6FA] text-[#667085]">CHOICE 2 OF 3</span>
                <h2 className="text-xl text-[#111111] font-bold">
                  When would we buy?
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] text-xs font-medium">
                  Trade Entry Rule
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center ${
                    card2.isConfirmed
                      ? 'bg-[#E6F8F1] text-[#08B878]'
                      : 'bg-[#F3F6FA] text-[#667085]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      card2.isConfirmed ? 'bg-[#08B878]' : 'bg-[#667085]'
                    }`}
                  />
                  {card2.isConfirmed ? 'CONFIRMED BY YOU' : 'NEEDS CONFIRMATION · SUGGESTION: NEXT OPEN'}
                </span>

                <button
                  onClick={() => toggleConfirmAssumption('card2')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    card2.isConfirmed
                      ? 'bg-[#08B878] text-white shadow-xs'
                      : 'bg-[#111111] text-white hover:bg-black'
                  }`}
                  type="button"
                >
                  {card2.isConfirmed ? '✓ Confirmed' : 'Confirm Choice'}
                </button>
              </div>
            </div>

            {/* AI Semantic Rationale */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl flex items-start gap-3 text-xs text-[#667085] border border-[#E5EAF1]">
              <span className="text-[#2879F2] text-sm mt-0.5">💡</span>
              <div className="space-y-0.5 leading-relaxed">
                <span className="font-semibold text-[#111111]">Why this assumption: </span>
                <span>{card2.statisticalRationale}</span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {card2.options.map((opt) => {
                const isSelected = card2.selectedOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => selectAssumptionOption('card2', opt.id)}
                    className={`cursor-pointer p-4 rounded-xl transition-all flex flex-col justify-between space-y-3 border ${
                      isSelected
                        ? 'bg-[#E8F1FD] text-[#111111] border-2 border-[#2879F2] shadow-sm'
                        : 'bg-[#F8FAFC] text-[#667085] hover:bg-white border-[#E5EAF1]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-[#2879F2]' : 'bg-[#667085]/40'
                          }`}
                        />
                        <span className="text-xs uppercase font-bold text-[#111111]">
                          Option {opt.id}
                        </span>
                      </div>
                      {opt.isAiSuggested ? (
                        <span className="text-[10px] bg-[#2879F2] text-white px-2 py-0.5 rounded-full font-bold tracking-wider">
                          SUGGESTED
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#667085]">{opt.meta}</span>
                      )}
                    </div>

                    <div>
                      <div className="text-sm font-bold text-[#111111]">{opt.label}</div>
                      <div className="text-xs text-[#667085] mt-1 leading-normal">{opt.description}</div>
                    </div>

                    <div className="text-[11px] text-[#667085] pt-1 flex justify-between items-center">
                      <span>{opt.meta}</span>
                      {isSelected && (
                        <span className="font-bold text-[#2879F2] text-[10px] tracking-wider">
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
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF1] p-6 sm:p-8 transition-all space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F3F6FA] text-[#667085]">CHOICE 3 OF 3</span>
                <h2 className="text-xl text-[#111111] font-bold">
                  How long should we stay invested?
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] text-xs font-medium">
                  Holding Period
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center ${
                    card3.isConfirmed
                      ? 'bg-[#E6F8F1] text-[#08B878]'
                      : 'bg-[#F3F6FA] text-[#667085]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      card3.isConfirmed ? 'bg-[#08B878]' : 'bg-[#667085]'
                    }`}
                  />
                  {card3.isConfirmed ? 'CONFIRMED BY YOU' : 'NEEDS CONFIRMATION · SUGGESTION: 5 SESSIONS'}
                </span>

                <button
                  onClick={() => toggleConfirmAssumption('card3')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    card3.isConfirmed
                      ? 'bg-[#08B878] text-white shadow-xs'
                      : 'bg-[#111111] text-white hover:bg-black'
                  }`}
                  type="button"
                >
                  {card3.isConfirmed ? '✓ Confirmed' : 'Confirm Choice'}
                </button>
              </div>
            </div>

            {/* AI Semantic Rationale */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl flex items-start gap-3 text-xs text-[#667085] border border-[#E5EAF1]">
              <span className="text-[#2879F2] text-sm mt-0.5">💡</span>
              <div className="space-y-0.5 leading-relaxed">
                <span className="font-semibold text-[#111111]">Why this assumption: </span>
                <span>{card3.statisticalRationale}</span>
              </div>
            </div>

            {/* Horizontal Radio Pills */}
            <div className="space-y-4 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                {card3.options.map((opt) => {
                  const isSelected = card3.selectedOptionId === opt.id;
                  if (opt.id === 'custom') {
                    return (
                      <div
                        key={opt.id}
                        className="h-10 px-3 rounded-xl bg-[#F8FAFC] flex items-center gap-1.5 border border-[#E5EAF1]"
                      >
                        <span className="text-xs text-[#667085]">Custom:</span>
                        <input
                          className="w-12 h-6 bg-white text-[#111111] px-1 text-center text-xs font-bold rounded-md outline-none border border-[#E5EAF1] focus:ring-1 focus:ring-[#2879F2]"
                          placeholder="21"
                          type="number"
                          value={customHolding}
                          onChange={(e) => setCustomHolding(e.target.value)}
                        />
                        <span className="text-xs text-[#667085]">sessions</span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => selectAssumptionOption('card3', opt.id)}
                      className={`h-10 px-4 rounded-xl text-xs flex items-center gap-2 transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#E8F1FD] text-[#111111] font-bold border-2 border-[#2879F2] shadow-sm'
                          : 'bg-[#F8FAFC] text-[#667085] hover:bg-white border-[#E5EAF1]'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-[#2879F2]' : 'bg-[#667085]/40'
                        }`}
                      />
                      <span>{opt.label}</span>
                      {opt.isAiSuggested && (
                        <span className="text-[10px] bg-[#2879F2] text-white px-2 py-0.5 rounded-full font-bold ml-1">
                          SUGGESTED
                        </span>
                      )}
                      <span className="text-[#667085] text-[11px] ml-1">{opt.meta}</span>
                    </button>
                  );
                })}
              </div>

              {/* Alpha Decay Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                  <div className="text-[11px] uppercase font-semibold text-[#667085]">Win Rate (5 Days)</div>
                  <div className="text-lg font-bold text-[#111111] mt-0.5">
                    {experiment.results.winRate}%
                  </div>
                </div>
                <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                  <div className="text-[11px] uppercase font-semibold text-[#667085]">Avg Net Return</div>
                  <div className="text-lg font-bold text-[#08B878] mt-0.5">
                    +{experiment.results.averageNetReturn}%
                  </div>
                </div>
                <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                  <div className="text-[11px] uppercase font-semibold text-[#667085]">Deepest Intraday Dip</div>
                  <div className="text-lg font-bold text-[#FF4A2D] mt-0.5">
                    {experiment.results.maxAdverseExcursion}%
                  </div>
                </div>
                <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                  <div className="text-[11px] uppercase font-semibold text-[#667085]">Risk-Adjusted Ratio</div>
                  <div className="text-lg font-bold text-[#111111] mt-0.5">
                    {experiment.results.sharpeRatio} Sharpe
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 4: Test period & Historical dataset (Pre-set Baseline) */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF1] p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F3F6FA] text-[#667085]">STUDY DEFAULTS</span>
                <h2 className="text-xl text-[#111111] font-bold">
                  What timeframe and trading costs are included?
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F3F6FA] text-[#667085] text-xs font-medium">
                  Dataset Baseline
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-[#E6F8F1] text-[#08B878] font-semibold flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#08B878] mr-1.5"></span>
                  STANDARD DEFAULTS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#F8FAFC] p-4 rounded-xl text-xs text-[#667085] border border-[#E5EAF1]">
              <div className="space-y-1">
                <div className="text-[11px] font-semibold uppercase text-[#667085]">Observation Window</div>
                <div className="text-sm font-bold text-[#111111]">
                  {experiment.dataPeriod} (7 Years)
                </div>
                <div>Spans COVID-19 shock, 2022 rate hike cycles, 2024 breakout.</div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-semibold uppercase text-[#667085]">Market Asset</div>
                <div className="text-sm font-bold text-[#111111]">
                  {experiment.market} Index (Price Return)
                </div>
                <div>NSE daily price history across 50 index constituents.</div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-semibold uppercase text-[#667085]">Trading Cost Baseline</div>
                <div className="text-sm font-bold text-[#111111]">
                  0.10% Round-trip Cost included
                </div>
                <div>STT, exchange fees, and estimated execution slippage subtracted.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary: How Your Question Translates Into Rules */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF1] p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2879F2]"></span>
              <h3 className="text-lg text-[#111111] font-bold">
                Summary of Experiment Rules
              </h3>
            </div>
            <span className="text-xs text-[#667085]">
              Ready to formulate experiment plan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] text-[#667085] text-xs font-semibold border-b border-[#E5EAF1] h-9">
                  <th className="py-2 px-4">What You Asked</th>
                  <th className="py-2 px-4">Clear Rule for Experiment</th>
                  <th className="py-2 px-4">Exact Calculation Rule</th>
                  <th className="py-2 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF1]">
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-semibold text-[#111111]">“Sharp fall”</td>
                  <td className="py-3 px-4 text-[#111111]">{card1.confirmedValue}</td>
                  <td className="py-3 px-4 font-mono text-xs text-[#667085]">
                    Close[t] / Close[t-1] - 1.0 ≤ -0.05
                  </td>
                  <td className="py-3 px-4 text-right text-xs font-semibold">
                    <span className={`px-2.5 py-0.5 rounded-full ${card1.isConfirmed ? 'bg-[#E6F8F1] text-[#08B878]' : 'bg-[#F3F6FA] text-[#667085]'}`}>
                      {card1.isConfirmed ? 'CONFIRMED' : 'SUGGESTED'}
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-semibold text-[#111111]">“Buying NIFTY”</td>
                  <td className="py-3 px-4 text-[#111111]">{card2.confirmedValue}</td>
                  <td className="py-3 px-4 font-mono text-xs text-[#667085]">
                    Order.Execute(Type=MOO, Bar=T+1, Asset=NIFTY)
                  </td>
                  <td className="py-3 px-4 text-right text-xs font-semibold">
                    <span className={`px-2.5 py-0.5 rounded-full ${card2.isConfirmed ? 'bg-[#E6F8F1] text-[#08B878]' : 'bg-[#F3F6FA] text-[#667085]'}`}>
                      {card2.isConfirmed ? 'CONFIRMED' : 'SUGGESTED'}
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-semibold text-[#111111]">“Does it work?”</td>
                  <td className="py-3 px-4 text-[#111111]">{card3.confirmedValue} holding horizon</td>
                  <td className="py-3 px-4 font-mono text-xs text-[#667085]">
                    ΔP = Close[T+5] - Open[T+1]; Net Return &gt; 0%
                  </td>
                  <td className="py-3 px-4 text-right text-xs font-semibold">
                    <span className={`px-2.5 py-0.5 rounded-full ${card3.isConfirmed ? 'bg-[#E6F8F1] text-[#08B878]' : 'bg-[#F3F6FA] text-[#667085]'}`}>
                      {card3.isConfirmed ? 'CONFIRMED' : 'SUGGESTED'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Control Dock */}
      <div className="fixed bottom-11 left-0 right-0 z-30 bg-white/95 backdrop-blur-md shadow-lg border-t border-[#E5EAF1] px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Status Feedback */}
          <div className="flex items-center text-sm text-[#667085]">
            <span
              className={`w-2.5 h-2.5 rounded-full mr-2 shrink-0 ${
                confirmedCount === 3 ? 'bg-[#08B878]' : 'bg-[#2879F2]'
              }`}
            />
            {confirmedCount === 3 ? (
              <span className="font-medium text-[#111111]">All 3 assumptions confirmed. Ready to review specification.</span>
            ) : (
              <span>
                <strong className="font-semibold text-[#111111]">
                  {3 - confirmedCount} {3 - confirmedCount === 1 ? 'assumption needs' : 'assumptions need'}
                </strong>{' '}
                your confirmation
              </span>
            )}
          </div>

          {/* Interactive Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={resetAssumptionsToDefault}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#667085] hover:text-[#111111] hover:bg-[#F3F6FA] transition-colors cursor-pointer"
              type="button"
            >
              Reset to Defaults
            </button>
            <button
              onClick={() => goToPhase('define')}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#111111] text-white hover:bg-black transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              type="button"
            >
              <span>Review Experiment Plan</span>
              <span className="text-base">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
