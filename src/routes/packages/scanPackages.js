import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/packages/:id/scan', scanPackagesController);

export default router;
