import express from 'express';
import { getAllShipmentsController } from '../../controllers/shipments/getAllShipmentsController.js';

const router = express.Router();

router.get('/shipments', getAllShipmentsController);

export default router;
