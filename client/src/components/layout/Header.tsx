import React from 'react';
import { useExperiment } from '../../state/ExperimentContext';
import { WorkflowPhase } from '../../types/experiment';

export const Header: React.FC = () => {
  const { currentPhase, goToPhase } = useExperiment();

  const steps: { id: WorkflowPhase; num: string; label: string }[] = [
    { id: 'ask', num: '01', label: 'Ask' },
    { id: 'clarify', num: '02', label: 'Clarify' },
    { id: 'define', num: '03', label: 'Define' },
    { id: 'test', num: '04', label: 'Test' },
    { id: 'learn', num: '05', label: 'Learn' },
  ];

  const getStepStatus = (stepId: WorkflowPhase) => {
    const order: WorkflowPhase[] = ['ask', 'clarify', 'define', 'test', 'learn', 'report'];
    const currentIndex = order.indexOf(currentPhase === 'report' ? 'learn' : currentPhase);
    const stepIndex = order.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-[#E5EAF1]">
      <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => goToPhase('ask')} 
            className="flex items-center gap-2.5 text-left hover:opacity-90 transition-opacity"
            title="Return to Research Home"
          >
            <div className="w-8 h-8 bg-[#2879F2] rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-[#111111] leading-none tracking-tight">
                SignalLab
              </span>
              <span className="text-[11px] text-[#667085] font-medium leading-tight mt-0.5">
                Financial Research Simple
              </span>
            </div>
          </button>
        </div>

        {/* Center: Clean Stepper Pills */}
        <nav className="flex items-center bg-[#F3F6FA] p-1 rounded-xl border border-[#E5EAF1]/60">
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            const isCurrent = currentPhase === step.id || (currentPhase === 'report' && step.id === 'learn');

            return (
              <button
                key={step.id}
                onClick={() => goToPhase(step.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isCurrent
                    ? 'bg-white text-[#2879F2] font-semibold shadow-sm'
                    : status === 'completed'
                    ? 'text-[#08B878] hover:bg-white/60'
                    : 'text-[#667085] hover:text-[#111111] hover:bg-white/40'
                }`}
              >
                {status === 'completed' && !isCurrent ? (
                  <span className="w-4 h-4 rounded-full bg-[#E6F8F1] text-[#08B878] flex items-center justify-center text-[10px] font-bold">✓</span>
                ) : (
                  <span className={`text-[11px] font-mono ${isCurrent ? 'text-[#2879F2]' : 'text-[#667085]'}`}>{step.num}</span>
                )}
                <span>{step.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Link to Report / Audit */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => goToPhase('report')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              currentPhase === 'report'
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white text-[#667085] hover:text-[#111111] border-[#E5EAF1] hover:border-gray-300'
            }`}
          >
            Full Report
          </button>
        </div>
      </div>
    </header>
  );
};
