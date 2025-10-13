import express from 'express';

const router = express.Router();

router.get('/notifications', getNotificationsController);

export default router;
