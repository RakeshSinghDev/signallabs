import { ResearchExperiment, DistributionBin, AuditLogEvent } from '../types/experiment';

export const CANONICAL_DISTRIBUTION_BINS: DistributionBin[] = [
  { range: '-10% to -9%', min: -10, max: -9, count: 8, heightPct: 4, isPositive: false },
  { range: '-9% to -8%', min: -9, max: -8, count: 13, heightPct: 6, isPositive: false },
  { range: '-8% to -7%', min: -8, max: -7, count: 22, heightPct: 10, isPositive: false },
  { range: '-7% to -6%', min: -7, max: -6, count: 32, heightPct: 15, isPositive: false },
  { range: '-6% to -5%', min: -6, max: -5, count: 48, heightPct: 22, isPositive: false },
  { range: '-5% to -4%', min: -5, max: -4, count: 76, heightPct: 36, isPositive: false },
  { range: '-4% to -3%', min: -4, max: -3, count: 109, heightPct: 51, isPositive: false },
  { range: '-3% to -2%', min: -3, max: -2, count: 139, heightPct: 65, isPositive: false },
  { range: '-2% to -1%', min: -2, max: -1, count: 165, heightPct: 77, isPositive: false },
  { range: '-1% to 0%', min: -1, max: 0, count: 184, heightPct: 86, isPositive: false },
  // Crossover to positive (Sum: 1,046)
  { range: '0% to +1%', min: 0, max: 1, count: 214, heightPct: 100, isPositive: true },
  { range: '+1% to +2%', min: 1, max: 2, count: 196, heightPct: 92, isPositive: true },
  { range: '+2% to +3%', min: 2, max: 3, count: 160, heightPct: 75, isPositive: true },
  { range: '+3% to +4%', min: 3, max: 4, count: 122, heightPct: 57, isPositive: true },
  { range: '+4% to +5%', min: 4, max: 5, count: 89, heightPct: 42, isPositive: true },
  { range: '+5% to +6%', min: 5, max: 6, count: 62, heightPct: 29, isPositive: true },
  { range: '+6% to +7%', min: 6, max: 7, count: 49, heightPct: 23, isPositive: true },
  { range: '+7% to +8%', min: 7, max: 8, count: 40, heightPct: 19, isPositive: true },
  { range: '+8% to +9%', min: 8, max: 9, count: 31, heightPct: 14, isPositive: true },
  { range: '+9% to +10%', min: 9, max: 10, count: 27, heightPct: 13, isPositive: true },
  { range: '+10% to +11%', min: 10, max: 11, count: 20, heightPct: 9, isPositive: true },
  { range: '+11% to +12%', min: 11, max: 12, count: 13, heightPct: 6, isPositive: true },
  { range: '+12% to +13%', min: 12, max: 13, count: 11, heightPct: 5, isPositive: true },
  { range: '+13% to +14%', min: 13, max: 14, count: 7, heightPct: 3, isPositive: true },
  { range: '+14% to +15%', min: 14, max: 15, count: 5, heightPct: 2, isPositive: true },
];

export const CANONICAL_AUDIT_LOGS: AuditLogEvent[] = [
  {
    id: 'EVT-2020-03-23',
    timestamp: '2020-03-24 09:15:00 IST',
    date: '23-Mar-2020',
    triggerCondition: 'Close Δ = -12.98% (Lower circuit)',
    dropPct: -12.98,
    entryPrice: 7848.30,
    exitPrice: 8660.25,
    grossReturnPct: 10.35,
    netReturnPct: 10.25,
    status: 'VALIDATED',
    lookaheadCheck: 'ZERO_BIAS'
  },
  {
    id: 'EVT-2020-03-12',
    timestamp: '2020-03-13 09:15:00 IST',
    date: '12-Mar-2020',
    triggerCondition: 'Close Δ = -8.30% (Global shock)',
    dropPct: -8.30,
    entryPrice: 9107.60,
    exitPrice: 9671.60,
    grossReturnPct: 6.19,
    netReturnPct: 6.09,
    status: 'VALIDATED',
    lookaheadCheck: 'ZERO_BIAS'
  },
  {
    id: 'EVT-2020-05-04',
    timestamp: '2020-05-05 09:15:00 IST',
    date: '04-May-2020',
    triggerCondition: 'Close Δ = -5.74% (Post-extension)',
    dropPct: -5.74,
    entryPrice: 9429.40,
    exitPrice: 9199.05,
    grossReturnPct: -2.44,
    netReturnPct: -2.54,
    status: 'VALIDATED',
    lookaheadCheck: 'ZERO_BIAS'
  },
  {
    id: 'EVT-2022-02-24',
    timestamp: '2022-02-25 09:15:00 IST',
    date: '24-Feb-2022',
    triggerCondition: 'Close Δ = -5.02% (Geopolitical shock)',
    dropPct: -5.02,
    entryPrice: 16515.65,
    exitPrice: 16793.90,
    grossReturnPct: 1.68,
    netReturnPct: 1.58,
    status: 'VALIDATED',
    lookaheadCheck: 'ZERO_BIAS'
  },
  {
    id: 'EVT-2024-06-04',
    timestamp: '2024-06-05 09:15:00 IST',
    date: '04-Jun-2024',
    triggerCondition: 'Close Δ = -5.93% (Election outcome day)',
    dropPct: -5.93,
    entryPrice: 22128.30,
    exitPrice: 23263.90,
    grossReturnPct: 5.13,
    netReturnPct: 5.03,
    status: 'VALIDATED',
    lookaheadCheck: 'ZERO_BIAS'
  }
];

export const INITIAL_CANONICAL_EXPERIMENT: ResearchExperiment = {
  id: 'EXP-2025-0842',
  specHash: '0x9b4a17ef',
  title: 'Does buying NIFTY after a sharp fall work?',
  originalQuestion: 'Does buying NIFTY after a sharp fall work?',
  status: 'draft',
  market: 'NIFTY 50',
  datasetName: 'Prototype Historical Dataset (NIFTY 50 2018–2025)',
  dataPeriod: '2018-01-01 → 2025-01-31',
  totalTradingSessions: 1849,
  // Single Canonical Experiment State
  threshold: 0.05,
  thresholdConfirmed: false,
  entryTiming: 'T+1_OPEN',
  entryTimingConfirmed: false,
  holdingDays: 5,
  holdingDaysConfirmed: false,
  transactionCost: 0.001,
  transactionCostConfirmed: true,
  // Display & legacy fields
  triggerThresholdPct: 5.0,
  entryProtocol: 'Next trading session open (T+1 @ 09:15 IST)',
  holdingHorizonDays: 5,
  exitProtocol: '5th trading session close (T+5 @ 15:30 IST)',
  transactionCostPct: 0.10,
  positionSizing: '100% Fixed Nominal, Unleveled',
  overlappingHandling: 'FIFO Event Isolation / Non-Overlapping Treatment',
  assumptions: {
    card1: {
      id: 'card1',
      code: 'AMBIGUITY_01',
      title: 'What constitutes a “sharp fall”?',
      originalUserInput: 'sharp fall',
      aiSuggestion: '5% decline in 1 trading day',
      confirmedValue: '5% decline in 1 trading day',
      selectedOptionId: 'B',
      isConfirmed: false,
      statisticalRationale: 'Why this assumption: A 5% one-day decline provides a clear, relatively infrequent event definition for this prototype experiment. The threshold can be changed later through sensitivity testing.',
      options: [
        {
          id: 'A',
          label: '3% decline in 1 trading day',
          description: 'Frequent shock threshold; captures moderate market pullbacks.',
          meta: 'SENSITIVITY OPTION',
          sampleCount: '24 events in sample'
        },
        {
          id: 'B',
          label: '5% decline in 1 trading day',
          description: 'Larger one-day drop; captures rare liquidation events in the historical dataset.',
          meta: 'BASELINE PRESET',
          isAiSuggested: true,
          sampleCount: '16 events in sample'
        },
        {
          id: 'C',
          label: '5% decline over 3 trading days',
          description: 'Multi-day decline; tests whether spreading the drop across multiple days changes the outcome.',
          meta: 'MULTI-DAY RULE',
          sampleCount: 'Multi-day drop'
        },
        {
          id: 'D',
          label: 'Custom Quantitative Rule',
          description: 'User specified custom percentage threshold and lookback.',
          meta: 'USER DEFINED'
        }
      ]
    },
    card2: {
      id: 'card2',
      code: 'AMBIGUITY_02',
      title: 'When should the trade entry occur?',
      originalUserInput: 'buying after',
      aiSuggestion: 'Next market session open (T+1 @ 09:15 IST)',
      confirmedValue: 'Next market session open (T+1 @ 09:15 IST)',
      selectedOptionId: 'B',
      isConfirmed: false,
      statisticalRationale: 'Executing at same-day close (15:30 IST) creates lookahead bias in algorithmic systems, as the day’s total drop is only deterministic after trading halts. Next market open (09:15 IST) reflects realistic execution without lookahead bias.',
      options: [
        {
          id: 'A',
          label: 'Same-day market close (15:25 - 15:30 IST)',
          description: 'Requires continuous intraday monitoring; sensitive to closing auction slippage.',
          meta: 'SAME-DAY CLOSE'
        },
        {
          id: 'B',
          label: 'Next market session open (T+1 at 09:15 IST)',
          description: "Next-session execution rule. Uses the following trading session's open price.",
          meta: 'NEXT-SESSION OPEN',
          isAiSuggested: true
        },
        {
          id: 'C',
          label: 'Custom Execution Protocol',
          description: 'Limit order or volume-weighted average price (VWAP) execution rule.',
          meta: 'CUSTOM PROTOCOL'
        }
      ]
    },
    card3: {
      id: 'card3',
      code: 'AMBIGUITY_03',
      title: 'How long should the position be held? (Holding Horizon)',
      originalUserInput: 'unspecified / does it work?',
      aiSuggestion: '5 trading days',
      confirmedValue: '5 trading days',
      selectedOptionId: '5',
      isConfirmed: false,
      statisticalRationale: 'Short-horizon liquidity shocks in NIFTY index constituents demonstrate maximum mean-reversion alpha within 3 to 7 trading days. Holding beyond 10 days transitions into macroeconomic drift exposure.',
      options: [
        {
          id: '1',
          label: '1 trading day',
          description: 'Overnight bounce capture.',
          meta: '(Intraday/Overnight)'
        },
        {
          id: '3',
          label: '3 trading days',
          description: 'Fast rebound swing test.',
          meta: '(Fast rebound)'
        },
        {
          id: '5',
          label: '5 trading days',
          description: 'Weekly mean reversion cycle apex.',
          meta: 'DEFAULT 5-DAY',
          isAiSuggested: true
        },
        {
          id: '10',
          label: '10 trading days',
          description: 'Bi-weekly extended horizon.',
          meta: '(Bi-weekly)'
        },
        {
          id: 'custom',
          label: 'Custom Horizon',
          description: 'Arbitrary trading days specification.',
          meta: 'CUSTOM SESSIONS'
        }
      ]
    },
    card4: {
      id: 'card4',
      code: 'PRESET_04',
      title: 'Historical Timeframe & Data Quality Baseline',
      originalUserInput: 'NIFTY',
      aiSuggestion: '2018-01-01 → 2025-01-31 (7 Years) · 0.10% Round-trip Cost',
      confirmedValue: '2018-01-01 → 2025-01-31 (7 Years) · 0.10% Round-trip Cost',
      selectedOptionId: 'default',
      isConfirmed: true,
      statisticalRationale: 'Provides a multi-regime sample spanning the COVID-19 liquidity shock, post-pandemic expansion, 2022 inflationary tightening, and 2024 trends.',
      options: [
        {
          id: 'default',
          label: '2018-01-01 → 2025-01-31 (Prototype Dataset · 1,849 Daily Sessions) · 0.10% Friction',
          description: 'Daily index prices with estimated round-trip brokerage and taxes deducted.',
          meta: 'CONFIRMED DEFAULT',
          isAiSuggested: true
        }
      ]
    }
  },
  results: {
    sampleSize: 16,
    averageGrossReturn: 1.60,
    medianReturn: 1.68,
    winRate: 62.5,
    winningTrades: 10,
    losingTrades: 6,
    averageNetReturn: 1.50,
    evidenceLevel: 'Not Statistically Significant (p = 0.503)',
    conclusion: 'The observed positive average return (+1.50% net) across 16 qualifying events is not statistically significant at the 5% level (p = 0.503, t = 0.67). A positive average return does not prove the hypothesis.',
    pValue: '0.503',
    tStatistic: 0.67,
    kurtosis: 3.52,
    skewness: 0.43,
    standardDeviation: 4.09,
    maxAdverseExcursion: -3.15,
    sharpeRatio: 0.41,
    distributionBins: CANONICAL_DISTRIBUTION_BINS,
    regimes: {
      bull: { observations: 2, percentage: 12.5, winRate: 100.0, averageNetReturn: 3.31 },
      bear: { observations: 14, percentage: 87.5, winRate: 57.1, averageNetReturn: 1.24 },
    }
  },
  auditLogs: CANONICAL_AUDIT_LOGS,
  limitations: [
    'No predictive guarantee: Historical performance does not guarantee future execution outcomes.',
    'Arbitrary cut-off: Results depend heavily on the chosen 5% single-day decline threshold.',
    'Execution friction: Real-world retail slippage during panic gap-down opens frequently exceeds modeled 0.05% baseline.',
    'Regime clustering: Over 40% of positive sample alpha was compressed within the March–May 2020 liquidity shock.',
    'Further sensitivity testing is required to verify if edge survives multi-day drawdowns or trend changes.'
  ],
  nextInvestigations: [
    {
      id: 'fork-threshold',
      number: 'EXPERIMENT 01',
      title: 'Threshold Sensitivity',
      query: 'Does buying NIFTY after 3%, 7%, and 10% drops work?',
      icon: 'tune',
      hypothesis: 'Does the edge survive at 3%, 7%, and 10% decline cutoffs, or is 5% a curve-fitted artifact?',
      actionText: 'Fork & test thresholds'
    },
    {
      id: 'fork-regime',
      number: 'EXPERIMENT 02',
      title: 'Market Regime Conditioning',
      query: 'Does NIFTY mean reversion work in bear markets below the 200 DMA?',
      icon: 'filter_alt',
      hypothesis: 'Does performance diverge under macro Bear regimes? Condition by 200-day moving average filter.',
      actionText: 'Add regime filter'
    },
    {
      id: 'fork-decay',
      number: 'EXPERIMENT 03',
      title: 'Holding Horizon Decay',
      query: 'How does NIFTY post-fall returns decay over 1, 3, 10, and 20 days?',
      icon: 'date_range',
      hypothesis: 'Examine alpha half-life across 1, 3, 10, and 20-day holding terms to detect reversal peaks.',
      actionText: 'Run holding curve'
    },
    {
      id: 'fork-friction',
      number: 'EXPERIMENT 04',
      title: 'Cost & Friction Stress',
      query: 'Does NIFTY post-fall bounce survive 0.25% - 0.50% transaction costs?',
      icon: 'payments',
      hypothesis: 'Test whether statistical alpha persists under stressed institutional costs (0.25% - 0.50%).',
      actionText: 'Test cost sensitivity'
    }
  ]
};
