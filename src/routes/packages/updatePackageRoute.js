import express from 'express';
import { updatePackagesController } from '../../controllers/packages/updatePackagesController.js';

const router = express.Router();

/**
 * @swagger
 * /packages/{id}:
 *   put:
 *     summary: Update a package
 *     description: Update one or more fields of a package. All fields are optional, but at least one must be provided.
 *     tags:
 *       - Packages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender_id:
 *                 type: integer
 *               receiver_id:
 *                 type: integer
 *               current_location:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: "IN_TRANSIT"
 *               assigned_truck_id:
 *                 type: integer
 *               expected_temperature_min:
 *                 type: number
 *               expected_temperature_max:
 *                 type: number
 *               expected_humidity_min:
 *                 type: number
 *               expected_humidity_max:
 *                 type: number
 *     responses:
 *       200:
 *         description: Package updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package updated successfully
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
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid ID or invalid/missing fields
 *       404:
 *         description: Package not found
 *       500:
 *         description: Internal server error
 */
router.put('/packages/:id', updatePackagesController);

export default router;
