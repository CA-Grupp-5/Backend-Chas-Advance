import express from 'express';
import { updateLogsController } from '../../controllers/sensors/updateLogsController.js';

const router = express.Router();

/**
 * @swagger
 * /packages/{id}/logs:
 *   put:
 *     summary: Update sensor logs for a package
 *     description: Updates temperature and/or humidity sensor logs associated with a specific package ID.
 *     tags:
 *       - Sensor Logs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID for the package whose logs are to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperature:
 *                 type: number
 *                 example: 20
 *               humidity:
 *                 type: number
 *                 example: 50
 *             required:
 *               - temperature or humidity
 *     responses:
 *       200:
 *         description: Sensor logs updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logs updated successfully.
 *                 logs:
 *                   type: object
 *                   properties:
 *                     package_id:
 *                       type: integer
 *                     temperature:
 *                       type: number
 *                     humidity:
 *                       type: number
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid package ID or invalid input data
 *       404:
 *         description: Package not found or no logs found for the specified package
 *       500:
 *         description: Internal server error
 */
router.put('/packages/:id/logs', updateLogsController);

export default router;
