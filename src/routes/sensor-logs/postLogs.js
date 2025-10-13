import express from 'express';
import dotenv from 'dotenv';
import { postLogsController } from '../../controllers/sensors/postLogsController.js';

dotenv.config();

const router = express.Router();

router.post('/packages/:id/logs', postLogsController);

export default router;
