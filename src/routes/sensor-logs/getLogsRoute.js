import express from 'express';
import { getLogsController } from '../../controllers/sensors/getLogsController.js';

const router = express.Router();

/**
 * @swagger
 * /packages/{id}/logs:
 *   get:
 *     summary: Fetch sensor logs for a package
 *     description: Retrieves sensor logs associated with a specific package ID.
 *     tags:
 *       - Sensor Logs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID for the package to fetch logs for.
 *     responses:
 *       200:
 *         description: Sensor logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sensor logs retrieved successfully
 *                 logs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       package_id:
 *                         type: integer
 *                       temperature:
 *                         type: number
 *                       humidity:
 *                         type: number
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid package ID or no logs found
 *       500:
 *         description: Internt serverfel
 */
router.get('/packages/:id/logs', getLogsController);

export default router;
