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
