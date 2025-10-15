import express from 'express';

const router = express.Router();

router.get('/packages/:id/logs', getLogsController);

export default router;
