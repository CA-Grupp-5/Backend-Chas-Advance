// src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger, { stream } from './utilities/logger.js';
import { swaggerUi, swaggerSpec } from '../swaggerConfig.js';

// Load environment variables
dotenv.config();

// ====== Import Routes ======
import sensorRoutes from './routes/sensor-logs/sensorRoutes.js';
import userRoutes from './routes/users/userRoutesRoute.js';
import packageRoutes from './routes/packages/packageRoutes.js';

const app = express();

// ====== Global Middleware ======
app.use(express.json());
app.use(cors());

// ====== Morgan (HTTP Logger) with Winston stream ======
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, { stream }));

// ====== Health Check Route ======
app.get('/health', (_req, res) => {
  logger.info('Health check OK');
  res.json({ ok: true });
});

// ====== Basic Routes ======
app.get('/', (req, res) => res.send('API is running...'));

// ====== Mount Routes ======
app.use(userRoutes);
app.use(sensorRoutes);
app.use(packageRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ====== 404 Handler ======
app.use((req, res) => {
  logger.warn(`404 - Not Found - ${req.originalUrl}`);
  res.status(404).json({ message: 'Not found' });
});

// ====== Central Error Handler ======
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
