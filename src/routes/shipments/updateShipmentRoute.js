import express from 'express';
import { updateShipmentController } from '../../controllers/shipments/updateShipmentController.js';

const router = express.Router();

/**
 * @swagger
 * /shipments/{id}:
 *   put:
 *     summary: Update a shipment
 *     description: Updates the tracking code or printed status of an existing shipment.
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the shipment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tracking_code:
 *                 type: string
 *                 example: "XYZ987654321SE"
 *               printed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Shipment updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shipment updated successfully
 *                 shipment:
 *                   $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Invalid input or no valid fields provided for update.
 *       404:
 *         description: Shipment not found.
 *       500:
 *         description: Server error while updating the shipment.
 */
router.put('/shipments/:id', updateShipmentController);

export default router;
