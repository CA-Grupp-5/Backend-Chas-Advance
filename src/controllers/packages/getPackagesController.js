// src/controllers/packages/getPackagesController.js
import db from '../../config/db.js';

export const getPackagesController = async (req, res, next) => {
  try {
    const sql = `
      SELECT
        p.*,
        s.name AS sender_name,
        r.name AS receiver_name
      FROM packages p
      LEFT JOIN users s ON s.id = p.sender_id
      LEFT JOIN users r ON r.id = p.receiver_id
      ORDER BY p.created_at DESC
      LIMIT 200
    `;
    const { rows } = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No packages found.' });
    }

    return res.status(200).json({
      message: 'Packages retrieved successfully',
      packages: rows,
    });
  } catch (err) {
    next(err);
  }
};
