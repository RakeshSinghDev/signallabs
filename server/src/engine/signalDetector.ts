import { DailyBar } from '../types/experiment.js';

export interface DetectedSignal {
  barIndex: number;
  date: string;
  previousClose: number;
  triggerClose: number;
  declineMagnitude: number; // e.g. -0.052 for -5.2%
}

/**
 * Scans historical daily bars for single-session declines equal to or exceeding the threshold.
 * Condition: close[t] / close[t-1] - 1 <= -threshold
 */
export function detectSignals(bars: DailyBar[], threshold: number): DetectedSignal[] {
  const signals: DetectedSignal[] = [];

  for (let i = 1; i < bars.length; i++) {
    const prevClose = bars[i - 1].close;
    const currClose = bars[i].close;
    const sessionReturn = (currClose / prevClose) - 1;

    // Check if return <= -threshold (e.g. -0.052 <= -0.05)
    if (sessionReturn <= -threshold) {
      signals.push({
        barIndex: i,
        date: bars[i].date,
        previousClose: prevClose,
        triggerClose: currClose,
        declineMagnitude: sessionReturn,
      });
    }
  }

  return signals;
}
