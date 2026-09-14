import { Router } from 'express';
import { handleRunExperiment, handleHealthCheck } from '../controllers/experimentController.js';

const router = Router();

router.post('/experiments/run', handleRunExperiment);
router.get('/health', handleHealthCheck);

export default router;
