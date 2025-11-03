import express from 'express';
import { scanPackagesController } from '../../controllers/packages/scanPackagesController.js';

const router = express.Router();

/**
 * @swagger
 * /packages/{id}/scan:
 *   post:
 *     summary: Mark a package as scanned
 *     description: Updates the status of a package to `SCANNED` and returns the updated package data.
 *     tags:
 *       - Packages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the package to scan
 *     responses:
 *       200:
 *         description: Package successfully marked as scanned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package scanned successfully
 *                 package:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 123
 *                     status:
 *                       type: string
 *                       example: SCANNED
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid or missing package ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: A valid package ID is required.
 *       404:
 *         description: Package not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/packages/:id/scan', scanPackagesController);

export default router;
