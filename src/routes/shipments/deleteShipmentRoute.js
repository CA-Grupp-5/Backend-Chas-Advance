import express from 'express';
import { deleteShipmentController } from '../../controllers/shipments/deleteShipmentController.js';

const router = express.Router();

/**
 * @swagger
 * /shipments/{id}:
 *   delete:
 *     summary: Delete a shipment
 *     description: Deletes a shipment from the database by its ID.
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the shipment to delete
 *     responses:
 *       200:
 *         description: Shipment deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shipment deleted successfully
 *       400:
 *         description: Invalid shipment ID provided.
 *       404:
 *         description: Shipment not found.
 *       500:
 *         description: Server error while deleting the shipment.
 */
router.delete('/shipments/:id', deleteShipmentController);

export default router;
