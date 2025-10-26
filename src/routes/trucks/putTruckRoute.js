//putTruckRoute.js
import express from 'express';
import { updateTruckController } from '../../controllers/trucks/updateTruckController.js';

const router = express.Router();

/**
 * @swagger
 * /trucks/{id}:
 *   put:
 *     summary: Updates truck data
 *     description: Updates the information of a specific truck based on the provided ID.
 *     tags:
 *       - Trucks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the truck to update
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
 *         description: Successfully updated truck information
 *       400:
 *         description: Bad request - invalid or missing input data
 *       404:
 *         description: Truck not found
 *       500:
 *         description: Internal server error
 */
router.put('/trucks/:id', updateTruckController);

export default router;
