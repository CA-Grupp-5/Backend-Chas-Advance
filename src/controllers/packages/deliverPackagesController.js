import db from '../../config/db.js';

export const deliverPackagesController = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'A valid package ID is required.' });
  }

  try {
    // Tillåt endast IN_TRANSIT -> DELIVERED
    const sql = `
      UPDATE public.packages
         SET status = 'DELIVERED',
             updated_at = NOW(),
             delivered_at = NOW()
       WHERE id = $1
         AND status = 'IN_TRANSIT'
       RETURNING *;
    `;
    const { rows } = await db.query(sql, [id]);

    if (rows.length === 0) {
      const check = await db.query('SELECT status FROM public.packages WHERE id = $1', [id]);
      if (check.rowCount === 0) return res.status(404).json({ message: 'Package not found.' });
      return res.status(409).json({
        message: 'Invalid status transition',
        details: { current_status: check.rows[0].status, required_from: 'IN_TRANSIT', attempted_to: 'DELIVERED' },
      });
    }

    return res.status(200).json({ message: 'Package delivered', package: rows[0] });
  } catch (err) {
    next(err);
  }
};
