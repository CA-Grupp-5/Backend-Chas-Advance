import db from '../../config/db.js';

export const departPackagesController = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'A valid package ID is required.' });
  }

  try {
    // Tillåt endast SCANNED -> IN_TRANSIT
    const sql = `
      UPDATE public.packages
         SET status = 'IN_TRANSIT',
             updated_at = NOW()
       WHERE id = $1
         AND status = 'SCANNED'
       RETURNING *;
    `;
    const { rows } = await db.query(sql, [id]);

    if (rows.length === 0) {
      // Finns paketet men fel status?
      const check = await db.query('SELECT status FROM public.packages WHERE id = $1', [id]);
      if (check.rowCount === 0) return res.status(404).json({ message: 'Package not found.' });
      return res.status(409).json({
        message: 'Invalid status transition',
        details: { current_status: check.rows[0].status, required_from: 'SCANNED', attempted_to: 'IN_TRANSIT' },
      });
    }

    return res.status(200).json({ message: 'Package set to IN_TRANSIT', package: rows[0] });
  } catch (err) {
    next(err);
  }
};
