import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full h-11 bg-white border-t border-[#E5EAF1] fixed bottom-0 left-0 right-0 z-40">
      <div className="w-full max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between text-xs text-[#667085]">
        <div className="flex items-center gap-2 truncate max-w-2xl">
          <span className="font-semibold text-[#111111]">SignalLab</span>
          <span>•</span>
          <span className="truncate">
            Statistical hypothesis testing &amp; research prototype. Historical analysis for educational exploration only.
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#08B878]"></span>
            <span className="text-[#111111] font-medium">Dataset: NIFTY 50 (2018–2025)</span>
          </div>
          <span className="text-[#667085] hidden sm:inline">1,849 sessions analyzed</span>
        </div>
      </div>
    </footer>
  );
};
