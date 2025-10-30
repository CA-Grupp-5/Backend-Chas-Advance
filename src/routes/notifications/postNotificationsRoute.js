import express from 'express';
import { createNotification } from '../../controllers/notifications/createNotificationController.js';

const router = express.Router();
/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     description: Creates and stores a new notification for a specific user and package.
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - package_id
 *               - notification_type
 *               - message
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               package_id:
 *                 type: integer
 *                 example: 10
 *               notification_type:
 *                 type: string
 *                 example: "temperature_alert"
 *               message:
 *                 type: string
 *                 example: "Temperature exceeded safe limit of 8°C"
 *           examples:
 *             temperature_alert:
 *               summary: Temperature warning example
 *               value:
 *                 user_id: 1
 *                 package_id: 10
 *                 notification_type: "temperature_alert"
 *                 message: "Temperature exceeded safe limit of 8°C"
 *             humidity_warning:
 *               summary: Humidity warning example
 *               value:
 *                 user_id: 3
 *                 package_id: 8
 *                 notification_type: "humidity_warning"
 *                 message: "Humidity dropped below 30%"
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 42
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 package_id:
 *                   type: integer
 *                   example: 10
 *                 notification_type:
 *                   type: string
 *                   example: "temperature_alert"
 *                 message:
 *                   type: string
 *                   example: "Temperature exceeded safe limit of 8°C"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-25T15:00:00Z"
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
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
