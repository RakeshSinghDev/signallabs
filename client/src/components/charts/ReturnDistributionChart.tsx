import React, { useState } from 'react';
import { DistributionBin } from '../../types/experiment';

interface ReturnDistributionChartProps {
  bins: DistributionBin[];
  mean: number;
  median: number;
  sampleSize: number;
  kurtosis?: number;
  skewness?: number;
  stdDev?: number;
}

export const ReturnDistributionChart: React.FC<ReturnDistributionChartProps> = ({
  bins,
  mean,
  median,
  sampleSize,
  kurtosis = 4.82,
  skewness = 1.14,
  stdDev = 3.65
}) => {
  const [hoveredBin, setHoveredBin] = useState<DistributionBin | null>(null);

  return (
    <div className="w-full bg-[#F8FAFC] p-5 rounded-2xl border border-[#E5EAF1]">
      <div className="relative w-full h-72">
        {/* Horizontal Gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
          <div className="w-full h-px bg-[#E5EAF1]"></div>
          <div className="w-full h-px bg-[#E5EAF1]"></div>
          <div className="w-full h-px bg-[#E5EAF1]"></div>
          <div className="w-full h-px bg-[#E5EAF1]"></div>
          <div className="w-full h-px bg-[#E5EAF1]"></div>
        </div>

        {/* Hover detail tooltip */}
        {hoveredBin && (
          <div className="absolute top-2 right-2 z-30 bg-white border border-[#E5EAF1] shadow-md p-2.5 rounded-xl text-xs pointer-events-none">
            <div className="font-bold text-[#111111]">{hoveredBin.range}</div>
            <div className="text-[#667085] flex gap-2 mt-0.5">
              <span>Count: <strong className="text-[#111111]">{hoveredBin.count}</strong></span>
              <span>Share: <strong className="text-[#111111]">{((hoveredBin.count / sampleSize) * 100).toFixed(1)}%</strong></span>
            </div>
          </div>
        )}

        {/* Vertical Reference Markers */}
        {/* Zero Baseline Line: ~40% across scale */}
        <div className="absolute top-0 bottom-6 left-[40%] w-px bg-[#667085] pointer-events-none z-10">
          <div className="absolute -top-1 -translate-x-1/2 text-[10px] font-mono bg-[#E5EAF1] px-1.5 py-0.2 text-[#111111] rounded-md font-semibold">
            0.00%
          </div>
        </div>

        {/* Median Marker: ~42.5% */}
        <div className="absolute top-4 bottom-6 left-[42.5%] w-px bg-[#111111] pointer-events-none z-10">
          <div className="absolute top-0 -translate-x-1/2 text-[10px] font-mono bg-[#111111] text-white px-1.5 py-0.2 rounded-md font-semibold whitespace-nowrap">
            P50: +{median.toFixed(2)}%
          </div>
        </div>

        {/* Mean Marker: ~45.9% */}
        <div className="absolute top-8 bottom-6 left-[45.9%] w-px bg-[#08B878] pointer-events-none z-10">
          <div className="absolute top-0 -translate-x-1/2 text-[10px] font-mono bg-[#08B878] text-white px-1.5 py-0.2 rounded-md font-bold whitespace-nowrap">
            μ: +{mean.toFixed(2)}%
          </div>
        </div>

        {/* Histogram Bars (Discrete empirical bins) */}
        <div className="absolute inset-x-0 bottom-6 top-6 flex items-end justify-between gap-1 px-2 z-0">
          {bins.map((bin, index) => {
            return (
              <div
                key={index}
                className={`flex-1 transition-all rounded-t-md cursor-pointer ${
                  bin.isPositive
                    ? 'bg-[#2879F2] hover:bg-[#1C65D4]'
                    : 'bg-[#CBD6E6] hover:bg-[#A9BCDA]'
                }`}
                style={{ height: `${bin.heightPct}%` }}
                onMouseEnter={() => setHoveredBin(bin)}
                onMouseLeave={() => setHoveredBin(null)}
                title={`${bin.range}: ${bin.count} occurrences`}
              />
            );
          })}
        </div>

        {/* Kernel Density Overlay SVG */}
        <svg
          className="absolute inset-0 w-full h-[calc(100%-1.5rem)] pointer-events-none z-20 overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 1000 200"
        >
          <path
            className="text-[#111111]/60"
            d="M 10,192 C 100,186 200,165 300,110 C 370,60 410,24 450,20 C 500,28 550,75 650,135 C 750,165 880,185 990,192"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        {/* X-Axis Tick Labels */}
        <div className="absolute bottom-0 inset-x-0 h-6 flex justify-between items-center px-1 font-mono text-[10px] text-[#667085] select-none">
          <span>-10%</span>
          <span>-7.5%</span>
          <span>-5.0%</span>
          <span>-2.5%</span>
          <span className="text-[#111111] font-bold">0.0%</span>
          <span>+2.5%</span>
          <span>+5.0%</span>
          <span>+7.5%</span>
          <span>+10.0%</span>
          <span>+12.5%</span>
          <span>+15.0%</span>
        </div>
      </div>

      {/* Numerical Moments Metadata */}
      <div className="mt-3 pt-2.5 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-[#667085] gap-2 border-t border-[#E5EAF1]">
        <div className="flex items-center gap-3 flex-wrap">
          <span>
            Kurtosis: <strong className="text-[#111111]">{kurtosis}</strong>
          </span>
          <span>•</span>
          <span>
            Skewness: <strong className="text-[#111111]">+{skewness}</strong>
          </span>
          <span>•</span>
          <span>
            Standard Deviation: <strong className="text-[#111111]">{stdDev}%</strong>
          </span>
        </div>
        <span className="text-[#667085] text-[11px]">Across {sampleSize} qualifying events</span>
      </div>
    </div>
  );
};
