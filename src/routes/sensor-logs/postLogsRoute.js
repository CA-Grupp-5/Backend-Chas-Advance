import express from 'express';
import { postLogsController } from '../../controllers/sensors/postLogsController.js';

const router = express.Router();

/**
 * @swagger
 * /packages/{id}/logs:
 *   post:
 *     summary: Post sensor logs for a package
 *     description: Posts sensor logs associated with a specific package ID from ESP.
 *     tags:
 *       - Sensor Logs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the package.
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
 *                 example: 20
 *               humidity:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: Sensor logs have been successfully added to the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sensor logs added successfully
 *                 logs:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     package_id:
 *                       type: integer
 *                       example: 1
 *                     temperature:
 *                       type: number
 *                       example: 20
 *                     humidity:
 *                       type: number
 *                       example: 50
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: '2023-10-01T12:00:00Z'
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: A valid package ID is required.
 *       500:
 *         description: Server error while adding sensor logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */
router.post('/packages/:id/logs', postLogsController);

export default router;
