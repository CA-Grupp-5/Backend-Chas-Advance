//getTruckRoute.js
import { Router } from 'express';
import { listTrucks } from '../../controllers/trucks/getTrucks.controller.js';

const router = Router();

router.get('/trucks', listTrucks);  // => GET /trucks

export default router;
