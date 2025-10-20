import express from 'express';
import { postPackagesController } from '../../controllers/packages/postPackagesController.js';

const router = express.Router();

/**
 * @swagger
 * /api/packages:
 *   post:
 *     summary: Create a new package
 *     description: Creates a new package with sender, receiver, and optional transport and environmental parameters.
 *     tags:
 *       - Packages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sender_id
 *               - receiver_id
 *             properties:
 *               sender_id:
 *                 type: integer
 *                 example: 1
 *               receiver_id:
 *                 type: integer
 *                 example: 2
 *               current_location:
 *                 type: string
 *                 example: "Stockholm Warehouse"
 *               status:
 *                 type: string
 *                 example: "CREATED"
 *               assigned_truck_id:
 *                 type: integer
 *                 example: 12
 *               expected_temperature_min:
 *                 type: number
 *                 example: 2.5
 *               expected_temperature_max:
 *                 type: number
 *                 example: 8.0
 *               expected_humidity_min:
 *                 type: number
 *                 example: 40
 *               expected_humidity_max:
 *                 type: number
 *                 example: 60
 *     responses:
 *       201:
 *         description: Package created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Paket skapat!
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
 *         description: Missing required fields (sender_id, receiver_id)
 *       500:
 *         description: Internal server error
 */
router.post('/packages', postPackagesController);

export default router;
