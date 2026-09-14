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
    <div className="w-full bg-surface-container-low p-space-md rounded-DEFAULT">
      <div className="relative w-full h-72">
        {/* Horizontal Gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
          <div className="w-full h-px bg-outline-variant"></div>
          <div className="w-full h-px bg-outline-variant"></div>
          <div className="w-full h-px bg-outline-variant"></div>
          <div className="w-full h-px bg-outline-variant"></div>
          <div className="w-full h-px bg-outline-variant"></div>
        </div>

        {/* Hover detail tooltip */}
        {hoveredBin && (
          <div className="absolute top-2 right-2 z-30 bg-surface-container-lowest border border-outline-variant shadow-md p-2 rounded-DEFAULT font-label-code text-label-code pointer-events-none">
            <div className="font-semibold text-on-surface">{hoveredBin.range}</div>
            <div className="text-on-surface-variant flex gap-2 mt-0.5">
              <span>Count: <strong className="text-on-surface">{hoveredBin.count}</strong></span>
              <span>Share: <strong className="text-on-surface">{((hoveredBin.count / sampleSize) * 100).toFixed(1)}%</strong></span>
            </div>
          </div>
        )}

        {/* Vertical Reference Markers */}
        {/* Zero Baseline Line: ~40% across scale */}
        <div className="absolute top-0 bottom-6 left-[40%] w-px bg-outline pointer-events-none z-10">
          <div className="absolute -top-1 -translate-x-1/2 font-label-code text-[10px] bg-surface-container-highest px-1 text-on-surface rounded-DEFAULT shadow-xs">
            0.00%
          </div>
        </div>

        {/* Median Marker: ~42.5% */}
        <div className="absolute top-4 bottom-6 left-[42.5%] w-px bg-on-surface pointer-events-none z-10">
          <div className="absolute top-0 -translate-x-1/2 font-label-code text-[10px] bg-on-surface text-on-primary px-1 rounded-DEFAULT shadow-xs whitespace-nowrap">
            P50: +{median.toFixed(2)}%
          </div>
        </div>

        {/* Mean Marker: ~45.9% */}
        <div className="absolute top-8 bottom-6 left-[45.9%] w-px bg-on-tertiary-container pointer-events-none z-10">
          <div className="absolute top-0 -translate-x-1/2 font-label-code text-[10px] bg-on-tertiary-container text-on-primary px-1 rounded-DEFAULT shadow-xs whitespace-nowrap">
            μ: +{mean.toFixed(2)}%
          </div>
        </div>

        {/* Histogram Bars (Discrete empirical bins) */}
        <div className="absolute inset-x-0 bottom-6 top-6 flex items-end justify-between gap-1 px-2 z-0">
          {bins.map((bin, index) => {
            return (
              <div
                key={index}
                className={`flex-1 transition-all rounded-t-DEFAULT cursor-pointer ${
                  bin.isPositive
                    ? 'bg-secondary-container hover:bg-primary-fixed'
                    : 'bg-surface-container-high hover:bg-surface-variant'
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
            className="text-on-surface/75"
            d="M 10,192 C 100,186 200,165 300,110 C 370,60 410,24 450,20 C 500,28 550,75 650,135 C 750,165 880,185 990,192"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>

        {/* X-Axis Tick Labels */}
        <div className="absolute bottom-0 inset-x-0 h-6 flex justify-between items-center px-1 font-label-code text-[11px] text-on-surface-variant select-none">
          <span>-10%</span>
          <span>-7.5%</span>
          <span>-5.0%</span>
          <span>-2.5%</span>
          <span className="text-on-surface font-semibold">0.0%</span>
          <span>+2.5%</span>
          <span>+5.0%</span>
          <span>+7.5%</span>
          <span>+10.0%</span>
          <span>+12.5%</span>
          <span>+15.0%</span>
        </div>
      </div>

      {/* Numerical Moments Metadata */}
      <div className="mt-space-sm pt-space-xs flex flex-col sm:flex-row justify-between items-start sm:items-center text-on-surface-variant font-label-code text-label-code gap-space-xs border-t border-outline-variant/30">
        <div className="flex items-center gap-space-md flex-wrap">
          <span>
            Kurtosis: <strong className="text-on-surface">{kurtosis} (Leptokurtic)</strong>
          </span>
          <span className="text-outline-variant">|</span>
          <span>
            Skewness: <strong className="text-on-surface">+{skewness} (Positive Tail)</strong>
          </span>
          <span className="text-outline-variant">|</span>
          <span>
            Standard Deviation: <strong className="text-on-surface">{stdDev}%</strong>
          </span>
        </div>
        <span className="text-outline">Calculated across 1,842 qualifying observations in prototype sample</span>
      </div>
    </div>
  );
};
