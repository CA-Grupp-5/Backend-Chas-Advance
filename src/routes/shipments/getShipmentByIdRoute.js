import express from 'express';
import { getShipmentByIdController } from '../../controllers/shipments/getShipmentByIdController.js';

export const router = express.Router();

/**
 * @swagger
 * /shipments/{id}:
 *   get:
 *     summary: Get a shipment by ID
 *     description: Retrieves a specific shipment from the database using its ID.
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the shipment to retrieve
 *     responses:
 *       200:
 *         description: Shipment retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shipment retrieved successfully
 *                 shipment:
 *                   $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Invalid shipment ID provided.
 *       404:
 *         description: Shipment not found.
 *       500:
 *         description: Server error while retrieving the shipment.
 */
router.get('/shipments/:id', getShipmentByIdController);

export default router;
