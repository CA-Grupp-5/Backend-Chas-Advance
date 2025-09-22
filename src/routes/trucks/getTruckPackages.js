import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/trucks/:id/packages', getTruckPackagesController);

export default router;
