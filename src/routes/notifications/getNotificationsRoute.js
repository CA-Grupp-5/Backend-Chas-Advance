import express from 'express';
import pool from '../../config/db.js';
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API endpoints for managing notifications
 */

/**
 * @swagger
 * /notifications/{userId}:
 *   get:
 *     summary: Get all notifications for a specific user
 *     description: Fetches all notifications associated with a user, sorted by most recent first.
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve notifications for.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully fetched notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 12
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   package_id:
 *                     type: integer
 *                     example: 5
 *                   notification_type:
 *                     type: string
 *                     example: "temperature_alert"
 *                   message:
 *                     type: string
 *                     example: "Temperature exceeded safe limit of 8°C"
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-25T14:30:00Z"
 *             examples:
 *               success:
 *                 summary: Example response
 *                 value:
 *                   - id: 1
 *                     user_id: 2
 *                     package_id: 15
 *                     notification_type: "humidity_warning"
 *                     message: "Humidity dropped below 30%"
 *                     timestamp: "2025-10-25T10:15:00Z"
 *                   - id: 2
 *                     user_id: 2
 *                     package_id: 18
 *                     notification_type: "temperature_alert"
 *                     message: "Temperature exceeded safe range (12°C)"
 *                     timestamp: "2025-10-25T11:45:00Z"
 *       404:
 *         description: User has no notifications
 *       500:
 *         description: Internal server error
 */

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY timestamp DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

export default router;
