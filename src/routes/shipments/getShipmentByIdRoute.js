import express from 'express';
import { getShipmentByIdController } from '../../controllers/shipments/getShipmentByIdController.js';

export const router = express.Router();

router.get('/shipments/:id', getShipmentByIdController);

export default router;
