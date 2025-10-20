//getTrucksRoute.js
import db from '../../config/db.js';

export const listTrucks = async (req, res, next) => {
  try {
    const sql = `
      SELECT 
      lp.id, 
      lp.license_plate, 
      lp.status,
      u.id AS driver_id, 
      u.name AS driver_name
      FROM license_plate lp
      LEFT JOIN users u ON u.id = lp.driver_id
      ORDER BY lp.id DESC
    `;
    const { rows } = await db.query(sql);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'No trucks found'});
    }
    res.status(200).json({ trucks: rows });
  } catch (err) {
    next(err);
  }
};