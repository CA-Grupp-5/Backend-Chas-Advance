import express from 'express';
import { getPackagesByIdController } from '../../controllers/packages/getPackagesByIdController.js';

const router = express.Router();

/**
 * @swagger
 * /packages/{id}:
 *   get:
 *     summary: Get a package by ID
 *     description: Retrieve a specific package by its ID, including sender and receiver names.
 *     tags:
 *       - Packages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The package ID
 *     responses:
 *       200:
 *         description: Package retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package retrieved successfully
 *                 package:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     sender_id:
 *                       type: integer
 *                     receiver_id:
 *                       type: integer
 *                     status:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     sender_name:
 *                       type: string
 *                     receiver_name:
 *                       type: string
 *                     current_temperature:
 *                       type: number
 *                       nullable: true
 *                     current_humidity:
 *                       type: number
 *                       nullable: true
 *                     last_sensor_at:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                     driver_position:
 *                       type: object
 *                       nullable: true
 *                       description: Live position of the truck transporting the package
 *                       properties:
 *                         lat:
 *                           type: number
 *                           example: 59.334591
 *                         lng:
 *                           type: number
 *                           example: 18.06324
 *                         ts:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-10-29T12:00:00Z"
 *       400:
 *         description: Invalid package ID
 *       404:
 *         description: Package not found
 *       500:
 *         description: Internal server error
 */
router.get('/packages/:id', getPackagesByIdController);

export default router;
