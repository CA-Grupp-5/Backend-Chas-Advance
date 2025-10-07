// src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger, { stream } from './utilities/logger.js';

// ROUTES (relative from src/app.js)
import trucksListRoutes from './routes/trucks/getTrucks.js';
import truckPackagesRoutes from './routes/trucks/getTruckPackages.js';
// import packagesRoutes from './routes/packages/getPackagesRoute.js';  // Add later if needed

const app = express();

// ====== Global Middleware ======
app.use(express.json());
app.use(cors());

// Morgan -> Winston stream
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, { stream }));

// ====== Health check route ======
app.get('/health', (_req, res) => {
  logger.info('Health check OK');
  res.json({ ok: true });
});

// ====== Mount routes ======
app.use('/trucks', trucksListRoutes);       // GET /trucks
app.use('/trucks', truckPackagesRoutes);    // GET /trucks/:id/packages

// ====== 404 handler ======
app.use((req, res) => {
  logger.warn(`404 - Not Found - ${req.originalUrl}`);
  res.status(404).json({ message: 'Not found' });
});

// ====== Central error handler ======
app.use((err, req, res, _next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    { stack: err.stack }
  );

  res.status(err.status || 500).json({
    message: 'Server error',
    detail: err.message,
  });
});

export default app;
