import express from 'express';
import { updateShipmentController } from '../../controllers/shipments/updateShipmentController.js';

const router = express.Router();

router.put('/shipments/:id', updateShipmentController);

export default router;
