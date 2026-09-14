import React from 'react';
import { useExperiment } from '../../state/ExperimentContext';
import { WorkflowPhase } from '../../types/experiment';

export const Header: React.FC = () => {
  const { currentPhase, goToPhase, experiment } = useExperiment();

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30">
      <div className="h-20 w-full px-margin flex flex-col justify-between">
        {/* Top bar */}
        <div className="h-12 flex items-center justify-between">
          <div className="flex items-center gap-space-lg">
            {/* Logo */}
            <button 
              onClick={() => goToPhase('ask')} 
              className="flex items-center gap-space-md text-left hover:opacity-90 transition-opacity"
              title="Return to Research Home"
            >
              <div className="w-5 h-5 bg-primary rounded-DEFAULT flex items-center justify-center">
                <div className="w-2 h-2 bg-on-primary rounded-DEFAULT"></div>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold">
                SignalLab
              </span>
            </button>

            <div className="h-3 w-px bg-outline-variant"></div>

            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider bg-surface-container px-space-xs py-0.5 rounded-DEFAULT">
              RESEARCH WORKSPACE
            </span>

            <div className="hidden md:flex items-center gap-space-xs text-on-surface-variant font-label-code text-label-code">
              <span className="text-outline">/</span>
              <span className="font-medium text-on-surface">{experiment.id}</span>
            </div>
          </div>

          {/* Primary Navigation */}
          <div className="hidden sm:flex items-center gap-space-md">
            <nav className="flex items-center gap-space-xs bg-surface-container-low p-space-xs rounded-lg">
              <button
                onClick={() => goToPhase('ask')}
                className={`px-space-md py-space-xs rounded-DEFAULT transition-colors text-body-sm font-medium ${
                  currentPhase === 'ask'
                    ? 'bg-surface-container text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Research
              </button>
              <button
                onClick={() => goToPhase(currentPhase === 'ask' ? 'define' : currentPhase)}
                className={`px-space-md py-space-xs rounded-DEFAULT transition-colors text-body-sm font-medium ${
                  currentPhase !== 'ask'
                    ? 'bg-surface-container text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Experiments
              </button>
            </nav>

            {/* Contextual experiment views */}
            <div className="hidden md:flex items-center gap-space-xs border-l border-outline-variant/40 pl-space-md font-label-code text-label-code">
              <button
                onClick={() => goToPhase('define')}
                className={`px-space-sm py-1 rounded-DEFAULT transition-colors ${
                  currentPhase === 'define'
                    ? 'bg-surface-container text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Spec
              </button>
              <button
                onClick={() => goToPhase('learn')}
                className={`px-space-sm py-1 rounded-DEFAULT transition-colors flex items-center gap-1 ${
                  currentPhase === 'learn'
                    ? 'bg-surface-container text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>Findings</span>
                <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
              </button>
              <button
                onClick={() => goToPhase('report')}
                className={`px-space-sm py-1 rounded-DEFAULT transition-colors ${
                  currentPhase === 'report'
                    ? 'bg-surface-container text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Audit Report
              </button>
            </div>
          </div>

          {/* Right side telemetry & status */}
          <div className="flex items-center gap-space-lg">
            <div className="hidden lg:flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
              <span>PROTOTYPE DATA 2018–2025</span>
            </div>
            
            <button 
              onClick={() => goToPhase('report')}
              className="hidden md:flex items-center font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Audit Log
            </button>

            <div className="flex items-center gap-space-sm pl-space-xs">
              <div 
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-xs" 
                title="Active Researcher Session"
              >
                <span className="material-symbols-outlined text-on-primary text-[15px]">person</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stepper sub-bar */}
        <div className="h-8 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-space-xl min-w-max font-label-caps text-label-caps">
            {steps.map((step, idx) => {
              const status = getStepStatus(step.id);
              const isCurrent = currentPhase === step.id || (currentPhase === 'report' && step.id === 'learn');

              return (
                <React.Fragment key={step.id}>
                  {idx > 0 && <span className="text-outline-variant select-none">—</span>}
                  <button
                    onClick={() => goToPhase(step.id)}
                    className={`flex items-center gap-space-xs transition-all cursor-pointer rounded-DEFAULT px-1.5 py-0.5 ${
                      isCurrent
                        ? 'text-on-surface font-semibold bg-surface-container shadow-xs'
                        : status === 'completed'
                        ? 'text-on-surface hover:text-primary'
                        : 'text-outline hover:text-on-surface-variant'
                    }`}
                  >
                    <span className="font-label-numeric text-label-numeric">{step.num}</span>
                    <span className="uppercase tracking-wider">{step.label}</span>
                    {status === 'completed' && !isCurrent && (
                      <span className="w-1 h-1 rounded-full bg-on-tertiary-container ml-space-xs"></span>
                    )}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-space-md font-label-code text-label-code text-on-surface-variant">
            <span className="text-outline">SPEC:</span>
            <span className="font-medium text-on-surface">{experiment.title.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
