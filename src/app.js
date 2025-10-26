// src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import logger, { stream } from './utilities/logger.js';
import { swaggerUi, swaggerSpec } from './utilities/swaggerConfig.js';

// Load environment variables
dotenv.config();

// ====== Import Routes ======
import sensorRoutes from './routes/sensor-logs/sensorRoutes.js';
import userRoutes from './routes/users/userRoutes.js';
import packageRoutes from './routes/packages/packagesRoutes.js'
import { errorHandler } from './middleware/errorHandler.js';
import notificationsRoute from './routes/notifications/getNotificationsRoute.js';
import postNotificationsRoute from './routes/notifications/postNotificationsRoute.js';
// import trucksListRoutes from './routes/trucks/getTrucksRoute.js';
// import truckPackagesRoutes from './routes/trucks/getTruckPackagesRoute.js';
// import postPackagesRoute from './routes/packages/postPackagesRoute.js';
// import postTruckRoute from './routes/trucks/postTruckRoute.js';
import packageRoutes from './routes/packages/packagesRoutes.js';
import truckRoutes from './routes/trucks/truckRoutes.js';

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
app.use(packageRoutes)
app.use('/notifications', notificationsRoute);
app.use('/notifications', postNotificationsRoute);
// // Health
// app.get('/health', (req, res) => res.json({ ok: true }));
app.use(truckRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
