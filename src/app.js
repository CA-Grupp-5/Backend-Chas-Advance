// src/app.js
import express from 'express';
import { swaggerUi, swaggerSpec } from '../swaggerConfig.js';
import sensorRoutes from './routes/sensor-logs/sensorRoutes.js';
import userRoutes from './routes/users/userRoutes.js';
import packageRoutes from './routes/packages/packagesRoutes.js'
import { errorHandler } from './middleware/errorHandler.js';
// import trucksListRoutes from './routes/trucks/getTrucksRoute.js';
// import truckPackagesRoutes from './routes/trucks/getTruckPackagesRoute.js';
// import postPackagesRoute from './routes/packages/postPackagesRoute.js';
// import postTruckRoute from './routes/trucks/postTruckRoute.js';

const app = express();

// Global middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(userRoutes);
app.use(sensorRoutes);
app.use(packageRoutes)
// // Health
// app.get('/health', (req, res) => res.json({ ok: true }));

// // Mounta routes (notera att route-filerna INTE har '/trucks' i sina paths)
// app.use('/trucks', trucksListRoutes); // GET /trucks
// app.use('/trucks', truckPackagesRoutes); // GET /trucks/:id/packages

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
