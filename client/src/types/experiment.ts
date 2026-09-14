export type WorkflowPhase = 'ask' | 'clarify' | 'define' | 'test' | 'learn' | 'report';

export type AssumptionId = 'card1' | 'card2' | 'card3' | 'card4';

export interface AssumptionOption {
  id: string;
  label: string;
  description: string;
  meta?: string;
  isAiSuggested?: boolean;
  sampleCount?: string;
}

export interface AssumptionItem {
  id: AssumptionId;
  code: string;
  title: string;
  originalUserInput: string;
  aiSuggestion: string;
  confirmedValue: string;
  selectedOptionId: string;
  isConfirmed: boolean;
  statisticalRationale: string;
  options: AssumptionOption[];
  customValue?: string;
}

export interface AuditLogEvent {
  id: string;
  signalDate?: string;
  entryDate?: string;
  entryPrice: number;
  exitDate?: string;
  exitPrice: number;
  grossReturn?: number;
  netReturn?: number;
  timestamp: string;
  date: string;
  triggerCondition: string;
  dropPct: number;
  grossReturnPct: number;
  netReturnPct: number;
  status: 'VALIDATED';
  lookaheadCheck: 'ZERO_BIAS';
}

export interface DistributionBin {
  range: string;
  min: number;
  max: number;
  count: number;
  heightPct: number;
  isPositive: boolean;
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

export interface ExperimentResults {
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
  evidenceLevel?: 'Moderate Evidence' | 'Weak Evidence' | 'Preliminary Sample' | string;
  conclusion?: string;
}

export interface NextInvestigation {
  id: string;
  number: string;
  title: string;
  query: string;
  icon: string;
  hypothesis: string;
  actionText: string;
}

export interface ResearchExperiment {
  id: string;
  specHash: string;
  title: string;
  originalQuestion: string;
  question?: string; // alias
  status: 'draft' | 'running' | 'completed';
  market: string;
  datasetName: string;
  dataPeriod: string;
  totalTradingSessions: number;

  // Single Canonical Experiment State
  threshold: number;             // e.g. 0.05
  thresholdConfirmed: boolean;
  entryTiming: string;           // "T+1_OPEN"
  entryTimingConfirmed: boolean;
  holdingDays: number;           // 5
  holdingDaysConfirmed: boolean;
  transactionCost: number;       // 0.001
  transactionCostConfirmed: boolean;

  // Legacy & Display Fields
  triggerThresholdPct: number;   // 5.0
  entryProtocol: string;
  holdingHorizonDays: number;    // 5
  exitProtocol: string;
  transactionCostPct: number;    // 0.10
  positionSizing: string;
  overlappingHandling: string;
  assumptions: Record<AssumptionId, AssumptionItem>;
  results: ExperimentResults;
  auditLogs: AuditLogEvent[];
  limitations: string[];
  nextInvestigations: NextInvestigation[];
}
