//getTruckRoute.js
import { Router } from 'express';
import { listTrucks } from '../../controllers/trucks/getTrucks.controller.js';

const router = Router();

/**
 * @swagger
 * /trucks:
 *   get:
 *     summary: Retrieves a list of trucks
 *     tags:
 *       - Trucks
 *     responses:
 *       200:
 *         description: Successfully retrieved list of trucks
 *       404:
 *         description: Could not find any trucks
 *       500:
 *         description: Internal server error
 */
router.get('/trucks', listTrucks); // => GET /trucks

export default router;
