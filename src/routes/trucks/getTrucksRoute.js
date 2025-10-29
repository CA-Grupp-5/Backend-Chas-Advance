//getTruckRoute.js
import { Router } from 'express';
import { listTrucks } from '../../controllers/trucks/getTrucks.controller.js';

const router = Router();

/**
 * @swagger
 * /trucks:
 *   get:
 *     summary: Retrieves a list of trucks
 *     description: Returns an array of trucks. Each truck may include the current driver_position (lat/lng/ts) if available.
 *     tags:
 *       - Trucks
 *     responses:
 *       200:
 *         description: Successfully retrieved list of trucks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trucks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       license_plate:
 *                         type: string
 *                         example: ABC123
 *                       status:
 *                         type: string
 *                         example: ACTIVE
 *                       driver_id:
 *                         type: integer
 *                         nullable: true
 *                         example: 2
 *                       driver_name:
 *                         type: string
 *                         nullable: true
 *                         example: "Jane Doe"
 *                       driver_position:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           lat:
 *                             type: number
 *                             example: 59.334591
 *                           lng:
 *                             type: number
 *                             example: 18.06324
 *                           ts:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-10-29T10:35:00Z"
 *       404:
 *         description: Could not find any trucks
 *       500:
 *         description: Internal server error
 */

router.get('/trucks', listTrucks); // => GET /trucks

export default router;
