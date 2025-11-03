import express from 'express';
import { postLogsController } from '../../controllers/sensors/postLogsController.js';

const router = express.Router();

/**
 * @swagger
 * /packages/{id}/logs:
 *   post:
 *     summary: Add sensor log for a package
 *     description: Records temperature and humidity readings for a package and creates notifications if values exceed expected ranges
 *     tags:
 *       - Sensors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - temperature
 *               - humidity
 *             properties:
 *               temperature:
 *                 type: number
 *                 example: 10
 *                 description: Temperature in Celsius
 *               humidity:
 *                 type: number
 *                 example: 80
 *                 description: Humidity percentage
 *     responses:
 *       200:
 *         description: Sensor log added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sensor log added successfully.
 *                 log:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     package_id:
 *                       type: integer
 *                     temperature:
 *                       type: number
 *                     humidity:
 *                       type: number
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                 notificationsCreated:
 *                   type: integer
 *                   example: 2
 *                 details:
 *                   type: array
 *                   items:
 *                     oneOf:
 *                       - type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: THRESHOLD_BREACH
 *                           message:
 *                             type: string
 *                             example: Temperature (10°C) out of expected range [15°C - 25°C]
 *                       - type: string
 *                         example: All readings within expected range.
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Temperature and humidity are required.
 *       404:
 *         description: Package not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package not found.
 *       500:
 *         description: Server error
 */
router.post('/packages/:id/logs', postLogsController);

export default router;
