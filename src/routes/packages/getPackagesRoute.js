import express from 'express';
import { getPackagesController } from '../../controllers/packages/getPackagesController.js';

const router = express.Router();

/**
 * @swagger
 * /api/packages:
 *   get:
 *     summary: Retrieve all packages
 *     description: Returns a list of up to 200 most recently created packages, including sender and receiver names.
 *     tags:
 *       - Packages
 *     responses:
 *       200:
 *         description: Packages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Packages retrieved successfully
 *                 packages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       sender_id:
 *                         type: integer
 *                       receiver_id:
 *                         type: integer
 *                       current_location:
 *                         type: string
 *                       status:
 *                         type: string
 *                         example: CREATED
 *                       assigned_truck_id:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       sender_name:
 *                         type: string
 *                       receiver_name:
 *                         type: string
 *       404:
 *         description: No packages found
 *       500:
 *         description: Internal server error
 */
router.get('/packages', getPackagesController);

export default router;
