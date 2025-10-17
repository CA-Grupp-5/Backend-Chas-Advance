import express from 'express';
import { getLogsController } from '../../controllers/sensors/getLogsController.js';

const router = express.Router();

router.get('/packages/:id/logs', getLogsController);

export default router;
