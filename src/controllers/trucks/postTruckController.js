import pool from '../../config/db.js';

/**
 * POST /trucks
 * Body:
 * {
 *   "license_plate": "ABC123",
 *   "driver_id": 1,           // valfritt
 *   "status": "ACTIVE"        // valfritt
 * }
 */
export const postTruckController = async (req, res, next) => {
  const { license_plate, driver_id, status } = req.body;

  // --- Enkel validering ---
  if (!license_plate) {
    return res.status(400).json({
      message: 'license_plate är obligatoriskt.',
    });
  }

  try {
    const query = `
      INSERT INTO "license_plate" (license_plate, driver_id, status)
      VALUES ($1, $2, $3)
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
