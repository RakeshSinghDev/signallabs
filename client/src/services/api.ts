import { AuditLogEvent, ResearchExperiment, MarketRegimesBreakdown } from '../types/experiment';

export interface BackendExperimentRequest {
  market: string;
  threshold: number;
  entryTiming: string;
  entry?: string;
  holdingDays: number;
  transactionCost: number;
  roundTripCost?: number;
}

export interface BackendExperimentResponse {
  success: boolean;
  experiment: {
    market: string;
    threshold: number;
    entryTiming: string;
    holdingDays: number;
    transactionCost: number;
  };
  results: {
    sampleSize: number;
    averageGrossReturn: number;
    medianReturn: number;
    winRate: number;
    winningTrades: number;
    losingTrades: number;
    averageNetReturn: number;
    standardDeviation: number;
    standardError?: number;
    tStatistic?: number;
    pValue?: number | string;
    skewness?: number;
    kurtosis?: number;
    maxAdverseExcursion?: number;
    sharpeRatio?: number;
    distributionBins: {
      range: string;
      min: number;
      max: number;
      count: number;
      heightPct: number;
      isPositive: boolean;
    }[];
    regimes?: MarketRegimesBreakdown;
  };
  events: AuditLogEvent[];
  regimes?: MarketRegimesBreakdown;
  // Top-level aliases for direct access
  sampleSize: number;
  averageGrossReturn: number;
  medianReturn: number;
  winRate: number;
  winningTrades: number;
  losingTrades: number;
  averageNetReturn: number;
  standardDeviation: number;
  standardError?: number;
  tStatistic?: number;
  pValue?: number | string;
  distributionBins: {
    range: string;
    min: number;
    max: number;
    count: number;
    heightPct: number;
    isPositive: boolean;
  }[];
  evidenceLevel: 'Moderate Evidence' | 'Weak Evidence';
  conclusion: string;
  kurtosis?: number;
  skewness?: number;
  maxAdverseExcursion?: number;
  sharpeRatio?: number;
  datasetInfo: {
    name: string;
    totalSessions: number;
    startDate: string;
    endDate: string;
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Executes an experiment against the SignalLab backend.
 * POST /api/experiments/run
 */
export async function runExperiment(
  req: BackendExperimentRequest
): Promise<BackendExperimentResponse> {
  const url = `${API_BASE_URL}/api/experiments/run`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message =
      errorBody?.error?.message ||
      (errorBody?.error?.details ? errorBody.error.details.join(' ') : null) ||
      `Server responded with HTTP ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data as BackendExperimentResponse;
}

// Alias for backwards compatibility
export const runExperimentOnBackend = runExperiment;

/**
 * Extracts numeric parameters from the single canonical experiment state to send to the backend.
 */
export function extractBackendParameters(experiment: ResearchExperiment): BackendExperimentRequest {
  const card1 = experiment.assumptions.card1;
  const card3 = experiment.assumptions.card3;

  // 1. Threshold (prefer experiment.threshold if set, fallback to card1)
  let threshold = experiment.threshold !== undefined ? experiment.threshold : 0.05;
  if (card1?.selectedOptionId === 'A') {
    threshold = 0.03;
  } else if (card1?.selectedOptionId === 'B' || card1?.selectedOptionId === 'C') {
    threshold = 0.05;
  } else if (card1?.selectedOptionId === 'D' && card1.customValue) {
    const parsed = parseFloat(card1.customValue);
    if (!isNaN(parsed) && parsed > 0) {
      threshold = parsed > 1 ? parsed / 100 : parsed;
    }
  }

  // 2. Entry mode (prefer experiment.entryTiming)
  const entryTiming = experiment.entryTiming || 'T+1_OPEN';

  // 3. Holding Days (prefer experiment.holdingDays)
  let holdingDays = experiment.holdingDays || 5;
  const hId = card3?.selectedOptionId;
  if (hId === '1' || hId === '3' || hId === '5' || hId === '10') {
    holdingDays = parseInt(hId, 10);
  } else if (card3?.customValue) {
    const parsed = parseInt(card3.customValue, 10);
    if (!isNaN(parsed) && parsed >= 1) {
      holdingDays = parsed;
    }
  }

  // 4. Transaction cost
  const transactionCost = experiment.transactionCost !== undefined
    ? experiment.transactionCost
    : (experiment.transactionCostPct > 0
        ? (experiment.transactionCostPct > 1 ? experiment.transactionCostPct / 10000 : experiment.transactionCostPct / 100)
        : 0.001);

  return {
    market: experiment.market || 'NIFTY 50',
    threshold,
    entryTiming,
    entry: entryTiming,
    holdingDays,
    transactionCost,
    roundTripCost: transactionCost,
  };
}
