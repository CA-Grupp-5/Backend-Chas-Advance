//putTruckRoute.js
import express from 'express';
import { updateTruckController } from '../../controllers/trucks/updateTruckController.js';

const router = express.Router();

router.put('/trucks/:id', updateTruckController);

export default router;