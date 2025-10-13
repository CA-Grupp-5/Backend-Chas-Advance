import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/packages/:id/logs', getLogsController);

export default router;
