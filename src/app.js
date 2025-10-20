// src/app.js
import express from 'express';
import { swaggerUi, swaggerSpec } from '../swaggerConfig.js';
import sensorRoutes from './routes/sensor-logs/sensorRoutes.js';
import userRoutes from './routes/users/userRoutes.js';
import packageRoutes from './routes/packages/packagesRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Global middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(userRoutes);
app.use(sensorRoutes);
app.use(packageRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
