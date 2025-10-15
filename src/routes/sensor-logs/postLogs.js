import express from 'express';
import { postLogsController } from '../../controllers/sensors/postLogsController.js';

const router = express.Router();

router.post('/packages/:id/logs', postLogsController);

export default router;
