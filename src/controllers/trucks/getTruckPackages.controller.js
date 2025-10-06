import db from '../../config/db.js';

export const getTruckPackages = async (req, res, next) => {
  try {
    const truckId = Number(req.params.id);
    if ( !truckId || Number.isNaN(truckId) || truckId <= 0) {
      return res.status(400).json({ message: 'Valid truck id is required' });
    }

    const sql = `
      SELECT p.*,
             s.name AS sender_name,
             r.name AS receiver_name
      FROM "Packages" p
      LEFT JOIN "Users" s ON s.id = p.sender_id
      LEFT JOIN "Users" r ON r.id = p.receiver_id
      WHERE p.assigned_truck_id = $1
      ORDER BY p.created_at DESC
      LIMIT 100
    `;
    const { rows } = await db.query(sql, [truckId]);
    res.status(200).json({ packages: rows }); // 200 + ev. tom array
  } catch (err) {
    next(err);
  }
};
