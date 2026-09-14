import { DailyBar, TradeEvent, MarketRegimesBreakdown, RegimeStats } from '../types/experiment.js';

/**
 * Classifies qualifying experiment events into Bull and Bear market regimes
 * using a lookahead-safe 200-day Simple Moving Average (SMA).
 *
 * Rules:
 * - Bull Regime: Signal date close > 200-day SMA
 * - Bear Regime: Signal date close <= 200-day SMA
 * - Lookahead-safe: The 200-day SMA is strictly calculated using bars[t-199 ... t] on or before the signal date.
 *   Future prices (t+1, etc.) are never referenced.
 */
export function analyzeRegimes(bars: DailyBar[], events: TradeEvent[]): MarketRegimesBreakdown {
  if (events.length === 0) {
    return {
      bull: { observations: 0, percentage: 0, winRate: 0, averageNetReturn: 0 },
      bear: { observations: 0, percentage: 0, winRate: 0, averageNetReturn: 0 },
    };
  }

  // Map each date to its exact bar index in the historical sequence
  const dateToIndex = new Map<string, number>();
  bars.forEach((bar, index) => {
    dateToIndex.set(bar.date, index);
  });

  const bullEvents: TradeEvent[] = [];
  const bearEvents: TradeEvent[] = [];

  for (const event of events) {
    const barIndex = dateToIndex.get(event.signalDate);
    if (barIndex === undefined) {
      continue;
    }

    // Compute 200-day SMA strictly on or before the signal date (bars[barIndex])
    // Lookback window: min index = Math.max(0, barIndex - 199), max index = barIndex
    const startIndex = Math.max(0, barIndex - 199);
    const windowLength = barIndex - startIndex + 1;

    let sumCloses = 0;
    for (let i = startIndex; i <= barIndex; i++) {
      sumCloses += bars[i].close;
    }
    const sma200 = sumCloses / windowLength;
    const signalClose = bars[barIndex].close;

    // Classification
    if (signalClose > sma200) {
      event.regime = 'BULL';
      bullEvents.push(event);
    } else {
      event.regime = 'BEAR';
      bearEvents.push(event);
    }
  }

  const totalEvents = events.length;

  function computeStats(subset: TradeEvent[]): RegimeStats {
    if (subset.length === 0) {
      return { observations: 0, percentage: 0, winRate: 0, averageNetReturn: 0 };
    }
    const wins = subset.filter(e => e.netReturnPct > 0).length;
    const sumNetReturn = subset.reduce((acc, e) => acc + e.netReturnPct, 0);

    return {
      observations: subset.length,
      percentage: parseFloat(((subset.length / totalEvents) * 100).toFixed(1)),
      winRate: parseFloat(((wins / subset.length) * 100).toFixed(1)),
      averageNetReturn: parseFloat((sumNetReturn / subset.length).toFixed(2)),
    };
  }

  return {
    bull: computeStats(bullEvents),
    bear: computeStats(bearEvents),
  };
}
