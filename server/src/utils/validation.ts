import { ExperimentRunRequest } from '../types/experiment.js';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  normalized?: {
    market: string;
    threshold: number;
    entryTiming: string;
    holdingDays: number;
    transactionCost: number;
  };
}

export function validateExperimentRequest(body: unknown): ValidationResult {
  const errors: string[] = [];

  if (!body || typeof body !== 'object') {
    return {
      isValid: false,
      errors: ['Request body must be a valid JSON object.'],
    };
  }

  const req = body as Partial<ExperimentRunRequest>;

  // Market validation
  if (!req.market || typeof req.market !== 'string') {
    errors.push('market is required and must be a string.');
  } else if (req.market.trim() !== 'NIFTY 50') {
    errors.push(`Unsupported market "${req.market}". Prototype only supports "NIFTY 50".`);
  }

  // Threshold validation (e.g. 0.05 for 5%)
  if (req.threshold === undefined || req.threshold === null || typeof req.threshold !== 'number') {
    errors.push('threshold is required and must be a number.');
  } else if (isNaN(req.threshold) || req.threshold <= 0 || req.threshold > 0.50) {
    errors.push('threshold must be a positive number up to 0.50 (e.g. 0.05 for 5%).');
  }

  // Entry timing validation (accepts entryTiming or entry)
  const entryTiming = req.entryTiming || req.entry;
  if (!entryTiming || typeof entryTiming !== 'string') {
    errors.push('entryTiming (or entry) is required and must be a string.');
  } else if (entryTiming !== 'T+1_OPEN') {
    errors.push(`Unsupported entryTiming "${entryTiming}". Prototype supports "T+1_OPEN".`);
  }

  // Holding period validation
  if (req.holdingDays === undefined || req.holdingDays === null || typeof req.holdingDays !== 'number') {
    errors.push('holdingDays is required and must be an integer.');
  } else if (!Number.isInteger(req.holdingDays) || req.holdingDays < 1 || req.holdingDays > 60) {
    errors.push('holdingDays must be an integer between 1 and 60 trading days.');
  }

  // Transaction cost validation (accepts transactionCost or roundTripCost)
  const transactionCost = req.transactionCost !== undefined ? req.transactionCost : req.roundTripCost;
  if (transactionCost === undefined || transactionCost === null || typeof transactionCost !== 'number') {
    errors.push('transactionCost (or roundTripCost) is required and must be a number.');
  } else if (isNaN(transactionCost) || transactionCost < 0 || transactionCost > 0.05) {
    errors.push('transactionCost must be between 0 and 0.05 (0% to 5%).');
  }

  return {
    isValid: errors.length === 0,
    errors,
    normalized: errors.length === 0
      ? {
          market: req.market!.trim(),
          threshold: req.threshold!,
          entryTiming: entryTiming!,
          holdingDays: req.holdingDays!,
          transactionCost: transactionCost!,
        }
      : undefined,
  };
}
