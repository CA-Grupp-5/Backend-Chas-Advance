import express from 'express';
import { postShipmentController } from '../../controllers/shipments/postShipmentController.js';

const router = express.Router();

/**
 * @swagger
 * /shipments/{id}:
 *   post:
 *     summary: Create a new shipment for a package
 *     description: Creates a new shipment associated with a specific package ID.
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The package ID for which to create the shipment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tracking_code
 *               - printed
 *             properties:
 *               tracking_code:
 *                 type: string
 *                 example: "ABC123456789SE"
 *               printed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Shipment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shipment created successfully
 *                 shipment:
 *                   $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Invalid input or shipment already exists for this package.
 *       404:
 *         description: Package not found.
 *       500:
 *         description: Server error while creating the shipment.
 */
router.post('/packages/:id/shipment', postShipmentController);

export default router;
