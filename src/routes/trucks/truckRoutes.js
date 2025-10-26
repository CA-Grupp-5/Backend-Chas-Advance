// src/routes/trucks/truckRoutes.js
import { Router } from 'express';

import getTrucksRoute from './getTrucksRoute.js';
import getTruckPackagesRoute from './getTruckPackagesRoute.js';
import postTruckRoute from './postTruckRoute.js';
import putTruckRoute from './putTruckRoute.js';
import deleteTruckRoute from './deleteTruckRoute.js';

const router = Router();

// Viktigt: använd alltid routers här – INTE controllers
router.use(getTrucksRoute);
router.use(getTruckPackagesRoute);
router.use(postTruckRoute);
router.use(putTruckRoute);
router.use(deleteTruckRoute);

export default router;
