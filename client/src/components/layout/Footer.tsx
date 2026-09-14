import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full h-10 bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] border-t border-outline-variant/30 fixed bottom-0 left-0 right-0 z-40">
      <div className="w-full h-full px-margin flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
        <div className="flex items-center gap-space-md truncate max-w-4xl">
          <span className="font-label-caps text-label-caps px-space-xs py-0.5 bg-surface-container text-on-surface uppercase rounded-DEFAULT shrink-0 font-semibold">
            COMPLIANCE
          </span>
          <span className="truncate font-body-sm text-body-sm text-on-surface-variant">
            SignalLab is a statistical hypothesis testing &amp; research platform. Historical performance analysis is for empirical research purposes only and does not constitute investment advice.
          </span>
        </div>
        <div className="flex items-center gap-space-lg shrink-0">
          <div className="flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
            <span>Engine: v2.4 (Deterministic)</span>
          </div>
          <span className="font-label-caps text-label-caps px-space-xs py-0.5 bg-surface-container text-on-surface-variant uppercase rounded-DEFAULT font-semibold">
            PROTOTYPE SAMPLE DATASET
          </span>
        </div>
      </div>
    </footer>
  );
};
