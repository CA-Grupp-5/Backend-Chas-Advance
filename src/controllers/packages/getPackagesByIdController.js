// src/controllers/packages/getPackagesByIdController.js
import db from '../../config/db.js';

export const getPackagesByIdController = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'A valid package ID is required.' });
  }

  try {
    const sql = `
      SELECT
        p.*,
        us.name AS sender_name,
        ur.name AS receiver_name,
        lp.driver_position
      FROM packages p
      LEFT JOIN users us ON us.id = p.sender_id
      LEFT JOIN users ur ON ur.id = p.receiver_id
      LEFT JOIN license_plate lp ON lp.id = p.assigned_truck_id
      WHERE p.id = $1
      LIMIT 1
    `;
    const { rows } = await db.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Package not found.' });
    }
    return res.status(200).json({
      message: 'Package retrieved successfully',
      package: rows[0],
    });
  } catch (err) {
    next(err);
  }
};
