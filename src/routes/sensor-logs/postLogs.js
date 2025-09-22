import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/packages/:id/logs', postLogsController);

export default router;
