import express from 'express';
import { getPackagesByIdController } from '../../controllers/packages/getPackagesByIdController.js';

const router = express.Router();

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Get a package by ID
 *     description: Retrieve a specific package by its ID, including sender and receiver names.
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
 *         description: Package retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package retrieved successfully
 *                 package:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     sender_id:
 *                       type: integer
 *                     receiver_id:
 *                       type: integer
 *                     status:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     sender_name:
 *                       type: string
 *                     receiver_name:
 *                       type: string
 *       400:
 *         description: Invalid package ID
 *       404:
 *         description: Package not found
 *       500:
 *         description: Internal server error
 */
router.get('/packages/:id', getPackagesByIdController);

export default router;
