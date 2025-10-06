// src/app.js
import express from 'express';

// ROUTES (relativt från src/app.js)
import trucksListRoutes from './routes/trucks/getTrucks.js';
import truckPackagesRoutes from './routes/trucks/getTruckPackages.js';
// import packagesRoutes from './routes/packages/getPackagesRoute.js'  // fler när du vill

const app = express();

// Global middleware
app.use(express.json());

// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

// Mounta routes (notera att route-filerna INTE har '/trucks' i sina paths)
app.use('/trucks', trucksListRoutes);       // GET /trucks
app.use('/trucks', truckPackagesRoutes);    // GET /trucks/:id/packages

// 404
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// Central error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: 'Server error', detail: err.message });
});

export default app;
