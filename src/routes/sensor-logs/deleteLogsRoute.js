import express from 'express';
import { deleteLogsController } from '../../controllers/sensors/deleteLogsController.js';

const router = express.Router();

/**
 * @swagger
 *
 * /packages/{id}/logs:
 *   delete:
 *     summary: Delete sensor logs for a package
 *     description: Removes all sensor logs associated with a specific package ID.
 *     tags:
 *       - Sensor Logs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID for the package whose logs are to be deleted.
 *     responses:
 *       200:
 *         description: LOgs deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logs deleted successfully.
 *       400:
 *         description: Invalid package ID
 *       404:
 *         description: Package not found or no logs found for the specified package
 *       500:
 *         description: Internal server error
 */
router.delete('/packages/:id/logs', deleteLogsController);

export default router;
