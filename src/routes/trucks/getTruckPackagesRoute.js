//getTruckPackagesRoute.js
import { Router } from 'express';
import { getTruckPackages } from '../../controllers/trucks/getTruckPackages.controller.js';

const router = Router();

/**
 * @swagger
 * /trucks/{id}/packages:
 *   get:
 *     summary: Get packages assigned to a specific truck
 *     description: Retrieves all packages assigned to the truck with the specified ID.
 *     tags:
 *       - Trucks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the truck to retrieve packages for
 *     responses:
 *       200:
 *         description: Successfully retrieved packages
 *       400:
 *         description: Invalid truck ID provided
 *       500:
 *         description: Internal server error
 */
router.get('/trucks/:id/packages', getTruckPackages); // => GET /trucks/:id/packages

export default router;
