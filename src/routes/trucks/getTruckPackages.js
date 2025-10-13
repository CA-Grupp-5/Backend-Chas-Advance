import { Router } from 'express';
import { getTruckPackages } from '../../controllers/trucks/getTruckPackages.controller.js';

const router = Router();

router.get('/trucks/:id/packages', getTruckPackages); // => GET /trucks/:id/packages

export default router;
