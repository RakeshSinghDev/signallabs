export interface RecentExperimentRow {
  id: string;
  name: string;
  market: string;
  hypothesisType: string;
  status: 'Active' | 'Template';
  observations: string;
  netReturn: string;
  holdingDays: string;
  lastModified: string;
  actionText: string;
  canResume?: boolean;
}

export const RECENT_EXPERIMENTS: RecentExperimentRow[] = [
  {
    id: 'EXP-CANONICAL-01',
    name: 'NIFTY mean reversion after large declines (Active Study)',
    market: 'NIFTY 50',
    hypothesisType: 'Mean Reversion',
    status: 'Active',
    observations: '16 events (1,849 days)',
    netReturn: '+1.50%',
    holdingDays: '5d',
    lastModified: 'Active study',
    actionText: 'View findings'
  },
  {
    id: 'EXAMPLE-02',
    name: 'Bank NIFTY gap-down recovery (Example Template)',
    market: 'BANKNIFTY',
    hypothesisType: 'Gap Fill',
    status: 'Template',
    observations: 'Template only',
    netReturn: '—',
    holdingDays: '3d',
    lastModified: 'Template',
    actionText: 'Use template',
    canResume: true
  },
  {
    id: 'EXAMPLE-03',
    name: 'India VIX spike > 20% reversal (Example Template)',
    market: 'INDIA VIX',
    hypothesisType: 'Volatility',
    status: 'Template',
    observations: 'Template only',
    netReturn: '—',
    holdingDays: '10d',
    lastModified: 'Template',
    actionText: 'Use template',
    canResume: true
  },
  {
    id: 'EXAMPLE-04',
    name: 'NIFTY 200-DMA pullback test (Example Template)',
    market: 'NIFTY 50',
    hypothesisType: 'Trend Pullback',
    status: 'Template',
    observations: 'Template only',
    netReturn: '—',
    holdingDays: '5d',
    lastModified: 'Template',
    actionText: 'Use template',
    canResume: true
  }
];

export const RESEARCH_SEEDS = [
  { label: 'NIFTY 3-day momentum breakdown', query: 'Does entering NIFTY after 3 consecutive down closes produce a statistical edge over 5 sessions?' },
  { label: 'Bank NIFTY gap-down recovery', query: 'Bank NIFTY gap-down recovery probability in high IV regime' },
  { label: 'Post-budget volatility compression', query: 'Post-budget volatility compression and index mean reversion' },
  { label: 'India VIX spike > 20% reversal', query: 'Does buying NIFTY when India VIX spikes over 20% in one day yield positive returns?' }
];
