import pool from '../../config/db.js';

/**
 * POST /trucks
 * Body:
 * {
 *   "license_plate": "ABC123",
 *   "driver_id": 1,           // valfritt
 *   "status": "ACTIVE"        // valfritt
 *   "driver_position": {
 *      "lat": 59.334591,
 *      "lng": 18.06324,
 *      "ts": 2025-10-29T10:35:00Z"
 *   }
 * }
 */
export const postTruckController = async (req, res, next) => {
  const { license_plate, driver_id, status, driver_position } = req.body;

  // --- Enkel validering ---
  if (!license_plate) {
    return res.status(400).json({
      message: 'license_plate är obligatoriskt.',
    });
  }

  let driverPosValue = null;
  if (driver_position !== undefined && driver_position !== null) {
    if (
      typeof driver_position !== 'object' ||
      driver_position.lat === undefined ||
      driver_position.lng === undefined ||
      Number.isNaN(Number(driver_position.at)) ||
      Number.isNaN(Number(driver_position.lng))
    ) {
      return res.status(400).json({
        message: 'driver_position måste vara ett objekt {lat:number, lng: number, ts?:string} eller null.'
      });
    }
    driverPosValue = driver_position;
  }

  try {
    const query = `
      INSERT INTO "license_plate" (license_plate, driver_id, status, driver_position)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [license_plate, driver_id ?? null, status ?? 'ACTIVE'];

    const { rows } = await pool.query(query, values);

    if (!rows || rows.length === 0) {
      return res.status(500).json({
        message: 'Misslyckades med att skapa truck.',
      });
    }

    res.status(200).json({
      message: 'Truck skapad!',
      truck: rows[0],
    });
  } catch (error) {
    console.error('Fel vid skapande av truck:', error);

    // Specifik felhantering för foreign key
    if (error.code === '23503') {
      return res.status(400).json({
        message: 'Ogiltigt driver_id – användaren finns inte i "Users".',
        detail: error.detail,
      });
    }

    next(error);
  }
};
