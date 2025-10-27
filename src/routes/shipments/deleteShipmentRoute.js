import express from 'express';
import { deleteShipmentController } from '../../controllers/shipments/deleteShipmentController.js';

const router = express.Router();

router.delete('/shipments/:id', deleteShipmentController);

export default router;
