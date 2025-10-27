import express from 'express';
import { getAllShipmentsController } from '../../controllers/shipments/getAllShipmentsController.js';

const router = express.Router();

/**
 * @swagger
 * /shipments:
 *   get:
 *     summary: Get all shipments
 *     description: Retrieves a list of all shipments from the database, ordered by creation date.
 *     tags: [Shipments]
 *     responses:
 *       200:
 *         description: Shipments retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shipments retrieved successfully
 *                 shipments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: No shipments found in the database.
 *       500:
 *         description: Server error while retrieving shipments.
 */
router.get('/shipments', getAllShipmentsController);

export default router;
