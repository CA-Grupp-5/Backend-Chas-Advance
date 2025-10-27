import express from 'express';
import { postShipmentController } from '../../controllers/shipments/postShipmentController.js';

const router = express.Router();

router.post('/packages/:id/shipment', postShipmentController);

export default router;
