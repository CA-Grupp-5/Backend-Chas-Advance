import express from 'express';
import { deleteTruckController } from '../../controllers/trucks/deleteTrucksController.js';
const router = express.Router();

/**
 * @swagger
 * /trucks/{id}:
 *   delete:
 *     summary: Deletes a specific truck
 *     description: Deletes the truck with the specified ID from the system.
 *     tags:
 *       - Trucks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the truck to delete
 *     responses:
 *       200:
 *         description: Successfully deleted truck
 *       400:
 *         description: Bad request - invalid truck ID provided
 *       404:
 *         description: Truck not found
 *       500:
 *         description: Internal server error
 */
router.delete('/trucks/:id', deleteTruckController);

export default router;
