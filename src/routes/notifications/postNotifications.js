import express from 'express';

const router = express.Router();

router.post('/notifications', postNotificationsController);

export default router;
