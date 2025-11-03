// src/controllers/packages/scanPackagesController.js

import db from '../../config/db.js';

export const scanPackagesController = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'A valid package ID is required.' });
  }

  try {
    // 1) Uppdatera paketets status
    const { rows } = await db.query(
      `UPDATE packages
         SET status = 'SCANNED',
             updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Package not found.' });
    }

    const pkg = rows[0];

    return res.status(200).json({
      message: 'Package scanned successfully',
      package: pkg,
    });
  } catch (err) {
    next(err);
  }
};
