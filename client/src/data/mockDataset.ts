export interface RecentExperimentRow {
  id: string;
  name: string;
  market: string;
  hypothesisType: string;
  status: 'Completed' | 'Draft' | 'Running';
  observations: string;
  netReturn: string;
  holdingDays: string;
  lastModified: string;
  actionText: string;
  canResume?: boolean;
}

export const RECENT_EXPERIMENTS: RecentExperimentRow[] = [
  {
    id: 'EXP-2025-0842',
    name: 'NIFTY mean reversion after large declines',
    market: 'NIFTY 50',
    hypothesisType: 'Mean Reversion',
    status: 'Completed',
    observations: '1,842 obs',
    netReturn: '+0.52%',
    holdingDays: '5d',
    lastModified: '2 hours ago',
    actionText: 'View findings'
  },
  {
    id: 'EXP-2025-0841',
    name: 'Bank NIFTY gap-down recovery',
    market: 'BANKNIFTY',
    hypothesisType: 'Gap Fill',
    status: 'Draft',
    observations: '—',
    netReturn: '—',
    holdingDays: '3d',
    lastModified: 'Yesterday',
    actionText: 'Resume',
    canResume: true
  },
  {
    id: 'EXP-2025-0839',
    name: 'India VIX spike > 20% reversal',
    market: 'INDIA VIX',
    hypothesisType: 'Volatility',
    status: 'Completed',
    observations: '412 obs',
    netReturn: '+1.18%',
    holdingDays: '10d',
    lastModified: '3 days ago',
    actionText: 'View findings'
  },
  {
    id: 'EXP-2025-0835',
    name: 'NIFTY 200-DMA pullback test',
    market: 'NIFTY 50',
    hypothesisType: 'Trend Pullback',
    status: 'Completed',
    observations: '624 obs',
    netReturn: '+0.84%',
    holdingDays: '5d',
    lastModified: '5 days ago',
    actionText: 'View findings'
  }
];

export const RESEARCH_SEEDS = [
  { label: 'NIFTY 3-day momentum breakdown', query: 'Does entering NIFTY after 3 consecutive down closes produce a statistical edge over 5 sessions?' },
  { label: 'Bank NIFTY gap-down recovery', query: 'Bank NIFTY gap-down recovery probability in high IV regime' },
  { label: 'Post-budget volatility compression', query: 'Post-budget volatility compression and index mean reversion' },
  { label: 'India VIX spike > 20% reversal', query: 'Does buying NIFTY when India VIX spikes over 20% in one day yield positive returns?' }
];
