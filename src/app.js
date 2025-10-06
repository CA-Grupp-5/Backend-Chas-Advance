// src/app.js
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

// import sensorRoutes from './routes/sensor-logs/sensorRoutes.js';

// // ROUTES (relativt från src/app.js)
// import trucksListRoutes from './routes/trucks/getTrucks.js';
// import truckPackagesRoutes from './routes/trucks/getTruckPackages.js';
// import packagesRoutes from './routes/packages/getPackagesRoute.js'  // fler när du vill

const app = express();

// Global middleware
app.use(express.json());

app.get('/home', (req, res) => {
  res.send('API is running...');
});

// app.use(sensorRoutes);

// // Health
// app.get('/health', (req, res) => res.json({ ok: true }));

// // Mounta routes (notera att route-filerna INTE har '/trucks' i sina paths)
// app.use('/trucks', trucksListRoutes); // GET /trucks
// app.use('/trucks', truckPackagesRoutes); // GET /trucks/:id/packages

export default app;
