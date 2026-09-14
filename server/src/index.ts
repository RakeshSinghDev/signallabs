import express from 'express';
import cors from 'cors';
import experimentRoutes from './routes/experimentRoutes.js';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const DEFAULT_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://client-kappa-one-50.vercel.app',
];

const envOrigins = [process.env.CLIENT_URL, process.env.CLIENT_ORIGIN]
  .filter((val): val is string => Boolean(val))
  .flatMap((val) => val.split(',').map((origin) => origin.trim().replace(/\/+$/, '')))
  .filter(Boolean);

const CLIENT_ORIGINS = Array.from(new Set([...DEFAULT_ORIGINS, ...envOrigins]));

// Configure CORS for local development and production
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin) {
      return callback(null, true);
    }
    const normalizedOrigin = origin.replace(/\/+$/, '');
    if (CLIENT_ORIGINS.includes(normalizedOrigin)) {
      return callback(null, true);
    }
    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

// Mount API routes
app.use('/api', experimentRoutes);

// Global 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'API route not found.',
    },
  });
});

// Structured error handling middleware (e.g. JSON parse errors)
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'Malformed JSON payload.',
      },
    });
    return;
  }
  const message = err instanceof Error ? err.message : 'Internal server error.';
  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`[SignalLab Backend] Server running on http://localhost:${PORT}`);
  console.log(`[SignalLab Backend] Allowed CORS Origins: ${CLIENT_ORIGINS.join(', ')}`);
});

export default app;
