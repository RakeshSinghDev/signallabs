import { Request, Response } from 'express';
import { validateExperimentRequest } from '../utils/validation.js';
import { runExperimentService, loadHistoricalDataset } from '../services/experimentService.js';
import { ExperimentRunRequest } from '../types/experiment.js';

export function handleRunExperiment(req: Request, res: Response): void {
  try {
    const validation = validateExperimentRequest(req.body);

    if (!validation.isValid || !validation.normalized) {
      res.status(400).json({
        error: {
          code: 'INVALID_EXPERIMENT',
          message: 'Invalid experiment configuration provided.',
          details: validation.errors,
        },
      });
      return;
    }

    const experimentRequest: ExperimentRunRequest = validation.normalized;
    const response = runExperimentService(experimentRequest);

    res.status(200).json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message,
      },
    });
  }
}

export function handleHealthCheck(_req: Request, res: Response): void {
  try {
    const bars = loadHistoricalDataset();
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      dataset: {
        name: 'Prototype Sample Dataset (NIFTY 50 TR 2018–2025)',
        totalBars: bars.length,
        dateRange: `${bars[0]?.date} to ${bars[bars.length - 1]?.date}`,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Health check failed.';
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message,
      },
    });
  }
}
