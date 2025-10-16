import express from 'express';
import { deleteLogsController } from '../../controllers/sensors/deleteLogsController.js';

const router = express.Router();

router.delete('/packages/:id/logs', deleteLogsController);

export default router;
