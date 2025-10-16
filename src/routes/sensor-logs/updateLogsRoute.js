import express from 'express';
import { updateLogsController } from '../../controllers/sensors/updateLogsController.js';

const router = express.Router();

router.put('/packages/:id/logs', updateLogsController);

export default router;
