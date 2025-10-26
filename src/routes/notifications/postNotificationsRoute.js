import express from 'express';
import { createNotification } from '../../controllers/notifications/createNotificationController.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { user_id, package_id, type, message } = req.body;

  try {
    const notification = await createNotification(user_id, package_id, type, message);
    res.status(201).json({
      message: 'Notification created successfully',
      notification,
    });
  } catch (error) {
    console.error('Error creating notification:', error.message);
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

export default router;
