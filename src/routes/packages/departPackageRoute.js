import express from 'express';
import { departPackagesController } from '../../controllers/packages/departPackagesController.js';

const router = express.Router();

/**
 * @swagger
 * /packages/{id}/depart:
 *   post:
 *     summary: Sätt paket till IN_TRANSIT
 *     description: Växlar status från SCANNED till IN_TRANSIT för ett specifikt paket.
 *     tags:
 *       - Packages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Paketets ID
 *     responses:
 *       200:
 *         description: Paket satt till IN_TRANSIT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 package:
 *                   type: object
 *                   properties:
 *                     id: { type: integer }
 *                     sender_id: { type: integer }
 *                     receiver_id: { type: integer }
 *                     current_location: { type: string, nullable: true }
 *                     status: { type: string }
 *                     assigned_truck_id: { type: integer, nullable: true }
 *                     expected_temperature_min: { type: number, nullable: true }
 *                     expected_temperature_max: { type: number, nullable: true }
 *                     expected_humidity_min: { type: number, nullable: true }
 *                     expected_humidity_max: { type: number, nullable: true }
 *                     current_temperature: { type: number, nullable: true }
 *                     current_humidity: { type: number, nullable: true }
 *                     last_sensor_at:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Ogiltigt paket-ID
 *       404:
 *         description: Paketet hittades inte
 *       409:
 *         description: Ogiltig statusövergång (kräver att nuvarande status är SCANNED)
 *       500:
 *         description: Internt serverfel
 */
router.post('/packages/:id/depart', departPackagesController);

export default router;
