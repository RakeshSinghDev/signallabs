import { DistributionBin } from '../types/experiment.js';

export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / values.length).toFixed(4));
}

export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return parseFloat(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(4));
  }
  return parseFloat(sorted[mid].toFixed(4));
}

export function calculateStdDev(values: number[], mean?: number): number {
  if (values.length <= 1) return 0;
  const m = mean !== undefined ? mean : calculateMean(values);
  const variance = values.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / (values.length - 1);
  return parseFloat(Math.sqrt(variance).toFixed(4));
}

export function calculateStandardError(stdDev: number, n: number): number {
  if (n <= 1) return 0;
  return parseFloat((stdDev / Math.sqrt(n)).toFixed(4));
}

export function calculateSkewness(values: number[], mean?: number, stdDev?: number): number {
  const n = values.length;
  if (n < 3) return 0;
  const m = mean !== undefined ? mean : calculateMean(values);
  const s = stdDev !== undefined ? stdDev : calculateStdDev(values, m);
  if (s === 0) return 0;

  const m3 = values.reduce((acc, val) => acc + Math.pow((val - m) / s, 3), 0);
  const skew = (n / ((n - 1) * (n - 2))) * m3;
  return parseFloat(skew.toFixed(2));
}

export function calculateKurtosis(values: number[], mean?: number, stdDev?: number): number {
  const n = values.length;
  if (n < 4) return 0;
  const m = mean !== undefined ? mean : calculateMean(values);
  const s = stdDev !== undefined ? stdDev : calculateStdDev(values, m);
  if (s === 0) return 0;

  const m4 = values.reduce((acc, val) => acc + Math.pow((val - m) / s, 4), 0);
  const factor1 = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
  const factor2 = (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
  const excessKurt = factor1 * m4 - factor2;
  // Report standard Pearson kurtosis (excess + 3)
  const kurt = excessKurt + 3;
  return parseFloat(kurt.toFixed(2));
}

export function calculateTStatistic(mean: number, stdDev: number, n: number): number {
  if (n <= 1 || stdDev === 0) return 0;
  const standardError = stdDev / Math.sqrt(n);
  return parseFloat((mean / standardError).toFixed(2));
}

export function calculatePValue(t: number, df: number): string {
  if (df <= 0) return '1.000';
  const absT = Math.abs(t);
  if (absT > 3.8 || absT > 3.29) return '< 0.001';

  // Abramowitz and Stegun approximation for standard normal CDF
  const z = absT;
  const tNorm = 1 / (1 + 0.2316419 * z);
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const phi = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
  const cdf = 1 - phi * (b1 * tNorm + b2 * Math.pow(tNorm, 2) + b3 * Math.pow(tNorm, 3) + b4 * Math.pow(tNorm, 4) + b5 * Math.pow(tNorm, 5));
  const pVal = 2 * (1 - cdf);

  if (pVal < 0.001) return '< 0.001';
  return pVal.toFixed(3);
}

export function calculateDistributionBins(returnsPct: number[]): DistributionBin[] {
  const binDefs: { range: string; min: number; max: number; isPositive: boolean }[] = [
    { range: '-10% to -9%', min: -10, max: -9, isPositive: false },
    { range: '-9% to -8%', min: -9, max: -8, isPositive: false },
    { range: '-8% to -7%', min: -8, max: -7, isPositive: false },
    { range: '-7% to -6%', min: -7, max: -6, isPositive: false },
    { range: '-6% to -5%', min: -6, max: -5, isPositive: false },
    { range: '-5% to -4%', min: -5, max: -4, isPositive: false },
    { range: '-4% to -3%', min: -4, max: -3, isPositive: false },
    { range: '-3% to -2%', min: -3, max: -2, isPositive: false },
    { range: '-2% to -1%', min: -2, max: -1, isPositive: false },
    { range: '-1% to 0%', min: -1, max: 0, isPositive: false },
    { range: '0% to +1%', min: 0, max: 1, isPositive: true },
    { range: '+1% to +2%', min: 1, max: 2, isPositive: true },
    { range: '+2% to +3%', min: 2, max: 3, isPositive: true },
    { range: '+3% to +4%', min: 3, max: 4, isPositive: true },
    { range: '+4% to +5%', min: 4, max: 5, isPositive: true },
    { range: '+5% to +6%', min: 5, max: 6, isPositive: true },
    { range: '+6% to +7%', min: 6, max: 7, isPositive: true },
    { range: '+7% to +8%', min: 7, max: 8, isPositive: true },
    { range: '+8% to +9%', min: 8, max: 9, isPositive: true },
    { range: '+9% to +10%', min: 9, max: 10, isPositive: true },
    { range: '+10% to +11%', min: 10, max: 11, isPositive: true },
    { range: '+11% to +12%', min: 11, max: 12, isPositive: true },
    { range: '+12% to +13%', min: 12, max: 13, isPositive: true },
    { range: '+13% to +14%', min: 13, max: 14, isPositive: true },
    { range: '+14% to +15%', min: 14, max: 15, isPositive: true },
  ];

  const counts = binDefs.map(() => 0);

  for (const r of returnsPct) {
    let placed = false;
    for (let i = 0; i < binDefs.length; i++) {
      const b = binDefs[i];
      if (i === 0 && r < b.min) {
        counts[0]++;
        placed = true;
        break;
      }
      if (i === binDefs.length - 1 && r >= b.min) {
        counts[i]++;
        placed = true;
        break;
      }
      if (r >= b.min && r < b.max) {
        counts[i]++;
        placed = true;
        break;
      }
    }
    if (!placed && r >= binDefs[binDefs.length - 1].max) {
      counts[binDefs.length - 1]++;
    }
  }

  const maxCount = Math.max(...counts, 1);

  return binDefs.map((def, i) => ({
    range: def.range,
    min: def.min,
    max: def.max,
    count: counts[i],
    heightPct: Math.round((counts[i] / maxCount) * 100),
    isPositive: def.isPositive,
  }));
}
