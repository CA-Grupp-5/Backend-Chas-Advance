// src/app.js
import express from 'express';

import sensorRoutes from './routes/sensor-logs/sensorRoutes.js';
import registerRoute from './routes/users/registerRoute.js';
import loginRoute from './routes/users/loginRoute.js';

// // ROUTES (relativt från src/app.js)
// import trucksListRoutes from './routes/trucks/getTrucks.js';
// import truckPackagesRoutes from './routes/trucks/getTruckPackages.js';
// import packagesRoutes from './routes/packages/getPackagesRoute.js'  // fler när du vill

const app = express();

// Global middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world again!');
});

app.get('/home', (req, res) => {
  res.send('API is running...');
});

app.use(registerRoute);
app.use(loginRoute);
app.use(sensorRoutes);

// // Health
// app.get('/health', (req, res) => res.json({ ok: true }));

// // Mounta routes (notera att route-filerna INTE har '/trucks' i sina paths)
// app.use('/trucks', trucksListRoutes); // GET /trucks
// app.use('/trucks', truckPackagesRoutes); // GET /trucks/:id/packages

export default app;
