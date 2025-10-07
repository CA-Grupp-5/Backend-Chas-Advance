import express from 'express';
import { postTruckController } from '../../controllers/trucks/postTruckController.js';

const router = express.Router();

// POST /trucks
router.post('/trucks', postTruckController);

export default router;
