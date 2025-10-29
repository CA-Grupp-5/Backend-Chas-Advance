//postTruckRoute.js
import express from 'express';
import { postTruckController } from '../../controllers/trucks/postTruckController.js';

const router = express.Router();

/**
 * @swagger
 * /trucks:
 *   post:
 *     summary: Adds a new truck
 *     description: Adding a new truck to the system based on the provided data.
 *     tags:
 *       - Trucks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - license_plate
 *               - driver_id
 *               - status
 *             properties:
 *               license_plate:
 *                 type: string
 *                 example: abc123
 *               driver_id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: ACTIVE
 *               driver_position:
 *                 type: object
 *                 nullable: true
 *                 properties:
 *                   lat:
 *                     type: number
 *                     example: 59.334591
 *                   lng:
 *                     type: number
 *                     example: 18.06324
 *                   ts:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-29T10:35:00Z"
 *     responses:
 *       200:
 *         description: Successfully created truck
 *       400:
 *         description: Bad request - invalid or missing input data
 *       500:
 *         description: Internal server error
 */
router.post('/trucks', postTruckController);

export default router;
