import pool from '../../config/db.js';

/**
 * POST /packages
 * Body:
 * {
 *   "sender_id": 1,
 *   "receiver_id": 2,
 *   "current_location": "Stockholm",
 *   "status": "CREATED",
 *   "assigned_truck_id": 3,
 *   "expected_temperature_min": 2.5,
 *   "expected_temperature_max": 8.0,
 *   "expected_humidity_min": 30,
 *   "expected_humidity_max": 60
 * }
 */
export const postPackagesController = async (req, res, next) => {
  const {
    sender_id,
    receiver_id,
    current_location,
    status,
    assigned_truck_id,
    expected_temperature_min,
    expected_temperature_max,
    expected_humidity_min,
    expected_humidity_max,
  } = req.body;

  // --- Enkel validering ---
  // if (!sender_id || !receiver_id) {
  //   return res
  //     .status(400)
  //     .json({ message: 'sender_id och receiver_id är obligatoriska.' });
  // }

  try {
    const query = `
      INSERT INTO "packages" (
        sender_id,
        receiver_id,
        current_location,
        status,
        assigned_truck_id,
        expected_temperature_min,
        expected_temperature_max,
        expected_humidity_min,
        expected_humidity_max,
        created_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())
      RETURNING *;
    `;

    const values = [
      sender_id,
      receiver_id,
      current_location ?? null,
      status ?? 'CREATED',
      assigned_truck_id ?? null,
      expected_temperature_min ?? null,
      expected_temperature_max ?? null,
      expected_humidity_min ?? null,
      expected_humidity_max ?? null,
    ];

    // kör query
    const { rows } = await pool.query(query, values);

    if (!rows || rows.length === 0) {
      return res
        .status(500)
        .json({ message: 'Misslyckades med att skapa paketet.' });
    }

    res.status(201).json({
      message: 'Paket skapat!',
      package: rows[0],
    });
  } catch (error) {
    console.error('Fel vid skapande av paket:', error);
    next(error);
  }
};