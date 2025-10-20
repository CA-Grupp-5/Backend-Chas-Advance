import express from 'express';
import { deletePackageController } from '../../controllers/packages/deletePackageController.js';

const router = express.Router();

/**
 * @swagger
 * /api/packages/{id}:
 *   delete:
 *     summary: Delete a package
 *     description: Deletes a package by ID. Related child records are automatically removed due to cascade delete.
 *     tags:
 *       - Packages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The package ID
 *     responses:
 *       200:
 *         description: Package deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package deleted successfully
 *                 package:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     status:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid package ID
 *       404:
 *         description: Package not found
 *       500:
 *         description: Internal server error
 */
router.delete('/packages/:id', deletePackageController);

export default router;
