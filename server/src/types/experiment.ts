export interface ExperimentRunRequest {
  market: string;              // e.g. "NIFTY 50"
  threshold: number;           // e.g. 0.05
  entryTiming?: string;        // e.g. "T+1_OPEN"
  entry?: string;              // alias for backwards compatibility
  holdingDays: number;         // e.g. 5
  transactionCost?: number;    // e.g. 0.001 (0.10%)
  roundTripCost?: number;      // alias for backwards compatibility
}

export interface DailyBar {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TradeEvent {
  id: string;
  signalDate: string;
  entryDate: string;
  entryPrice: number;
  exitDate: string;
  exitPrice: number;
  grossReturn: number;        // fractional, e.g. 0.0185
  netReturn: number;          // fractional, e.g. 0.0175
  // UI and audit helpers
  timestamp: string;
  date: string;
  triggerCondition: string;
  dropPct: number;
  grossReturnPct: number;     // percentage points, e.g. 1.85
  netReturnPct: number;       // percentage points, e.g. 1.75
  status: 'VALIDATED';
  lookaheadCheck: 'ZERO_BIAS';
  regime?: 'BULL' | 'BEAR';
}

export interface RegimeStats {
  observations: number;
  percentage: number;
  winRate: number;
  averageNetReturn: number;
}

export interface MarketRegimesBreakdown {
  bull: RegimeStats;
  bear: RegimeStats;
}

export interface DistributionBin {
  range: string;
  min: number;
  max: number;
  count: number;
  heightPct: number;
  isPositive: boolean;
}

export interface ExperimentResultsPayload {
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
  distributionBins: DistributionBin[];
  regimes?: MarketRegimesBreakdown;
}

export interface ExperimentRunResponse {
  success: boolean;
  experiment: {
    market: string;
    threshold: number;
    entryTiming: string;
    holdingDays: number;
    transactionCost: number;
  };
  results: ExperimentResultsPayload;
  events: TradeEvent[];
  regimes: MarketRegimesBreakdown;
  datasetInfo: {
    name: string;
    totalSessions: number;
    startDate: string;
    endDate: string;
  };
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
  skewness?: number;
  kurtosis?: number;
  maxAdverseExcursion?: number;
  sharpeRatio?: number;
  distributionBins: DistributionBin[];
  evidenceLevel: string;
  conclusion: string;
}

export interface StructuredApiError {
  error: {
    code: string;
    message: string;
    details?: string[];
  };
}
