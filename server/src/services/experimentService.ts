import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DailyBar, ExperimentRunRequest, ExperimentRunResponse } from '../types/experiment.js';
import { detectSignals } from '../engine/signalDetector.js';
import { simulateTrades } from '../engine/tradeSimulator.js';
import { analyzeRegimes } from '../engine/regimeAnalyzer.js';
import {
  calculateMean,
  calculateMedian,
  calculateStdDev,
  calculateStandardError,
  calculateSkewness,
  calculateKurtosis,
  calculateTStatistic,
  calculatePValue,
  calculateDistributionBins,
} from '../engine/statistics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedBars: DailyBar[] | null = null;

export function loadHistoricalDataset(): DailyBar[] {
  if (cachedBars) return cachedBars;

  let datasetPath = path.join(__dirname, '..', 'data', 'prototypeNiftyData.json');
  if (!fs.existsSync(datasetPath)) {
    datasetPath = path.join(__dirname, '..', '..', 'src', 'data', 'prototypeNiftyData.json');
  }
  if (!fs.existsSync(datasetPath)) {
    throw new Error(`Dataset file not found at ${datasetPath}`);
  }

  const raw = fs.readFileSync(datasetPath, 'utf-8');
  const parsed: DailyBar[] = JSON.parse(raw);
  parsed.sort((a, b) => a.date.localeCompare(b.date));
  cachedBars = parsed;
  return cachedBars;
}

export function runExperimentService(req: ExperimentRunRequest): ExperimentRunResponse {
  const bars = loadHistoricalDataset();
  const threshold = req.threshold;
  const holdingDays = req.holdingDays;
  const entryTiming = req.entryTiming || req.entry || 'T+1_OPEN';
  const transactionCost = req.transactionCost !== undefined ? req.transactionCost : (req.roundTripCost !== undefined ? req.roundTripCost : 0.001);

  // 1. Detect qualifying decline events
  const signals = detectSignals(bars, threshold);

  // 2. Simulate trade execution (T+1 entry, holdingDays exit, cost deduction)
  const events = simulateTrades(bars, signals, holdingDays, transactionCost);

  // 3. Classify events by market regime (Bull vs Bear based on 200 SMA on/before signal date)
  const regimes = analyzeRegimes(bars, events);

  const sampleSize = events.length;

  const experimentMeta = {
    market: req.market,
    threshold,
    entryTiming,
    holdingDays,
    transactionCost,
  };

  const datasetInfo = {
    name: 'Prototype Sample Dataset',
    totalSessions: bars.length,
    startDate: bars[0]?.date || '2018-01-02',
    endDate: bars[bars.length - 1]?.date || '2025-01-31',
  };

  if (sampleSize === 0) {
    const emptyResults = {
      sampleSize: 0,
      averageGrossReturn: 0,
      medianReturn: 0,
      winRate: 0,
      winningTrades: 0,
      losingTrades: 0,
      averageNetReturn: 0,
      standardDeviation: 0,
      standardError: 0,
      tStatistic: 0,
      pValue: '1.000',
      skewness: 0,
      kurtosis: 3.0,
      maxAdverseExcursion: 0,
      sharpeRatio: 0,
      distributionBins: calculateDistributionBins([]),
      regimes,
    };

    return {
      success: true,
      experiment: experimentMeta,
      results: emptyResults,
      events: [],
      datasetInfo,
      ...emptyResults,
      evidenceLevel: 'Weak Evidence',
      conclusion: 'No historical observations in the prototype dataset met the specified trigger threshold.',
    };
  }

  const grossReturns = events.map(e => e.grossReturnPct);
  const netReturns = events.map(e => e.netReturnPct);

  const avgGross = calculateMean(grossReturns);
  const avgNet = calculateMean(netReturns);
  const medianNet = calculateMedian(netReturns);
  const winningTrades = events.filter(e => e.netReturnPct > 0).length;
  const losingTrades = events.filter(e => e.netReturnPct <= 0).length;
  const winRate = parseFloat(((winningTrades / sampleSize) * 100).toFixed(1));
  const stdDev = calculateStdDev(netReturns, avgNet);
  const standardError = calculateStandardError(stdDev, sampleSize);
  const tStat = calculateTStatistic(avgNet, stdDev, sampleSize);
  const pVal = calculatePValue(tStat, sampleSize - 1);
  const skew = calculateSkewness(netReturns, avgNet, stdDev);
  const kurt = calculateKurtosis(netReturns, avgNet, stdDev);
  const distributionBins = calculateDistributionBins(netReturns);

  const sharpe = stdDev > 0
    ? parseFloat(((avgNet / stdDev) * Math.sqrt(252 / holdingDays)).toFixed(2))
    : 0;

  const minReturn = Math.min(...netReturns);

  const pValueNum = typeof pVal === 'number' ? pVal : parseFloat(String(pVal));
  const isSignificant = !isNaN(pValueNum) && pValueNum < 0.05;
  const evidenceLevel = isSignificant ? 'Statistically Significant (p < 0.05)' : 'Not Statistically Significant (p ≥ 0.05)';
  const formattedNet = (avgNet >= 0 ? '+' : '') + avgNet + '%';
  const conclusion = isSignificant
    ? `The observed return (${formattedNet}) across ${sampleSize} events is statistically significant at the 5% level (p = ${pVal}, t = ${tStat}).`
    : `The observed average net return (${formattedNet}) across ${sampleSize} events is not statistically significant at the 5% level (p = ${pVal}, t = ${tStat}). A positive average return does not prove the hypothesis.`;

  const resultsPayload = {
    sampleSize,
    averageGrossReturn: avgGross,
    medianReturn: medianNet,
    winRate,
    winningTrades,
    losingTrades,
    averageNetReturn: avgNet,
    standardDeviation: stdDev,
    standardError,
    tStatistic: tStat,
    pValue: pVal,
    skewness: skew,
    kurtosis: kurt,
    maxAdverseExcursion: parseFloat(minReturn.toFixed(2)),
    sharpeRatio: sharpe,
    distributionBins,
    regimes,
  };

  return {
    success: true,
    experiment: experimentMeta,
    results: resultsPayload,
    events,
    datasetInfo,
    ...resultsPayload,
    evidenceLevel,
    conclusion,
  };
}
