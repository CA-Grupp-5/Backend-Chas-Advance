// src/controllers/packages/scanPackagesController.js
// "Skanna" ett paket = uppdatera status till SCANNED och sätt updated_at.
// Hålls medvetet enkel för att testa i Postman.
// (Vill du även skapa en shipment med tracking_code – se kommenterad del nedan.)

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

    // --- (Valfritt) skapa shipment om du vill när paket skannas ---
    // const trackingCode = `TRK-${Date.now()}-${id}`;
    // await db.query(
    //   `INSERT INTO shipments (package_id, tracking_code, printed, created_at)
    //    VALUES ($1, $2, false, NOW())
    //    ON CONFLICT (package_id) DO NOTHING`, // om du har unik constraint på package_id
    //   [id, trackingCode]
    // );

    return res.status(200).json({
      message: 'Package scanned successfully',
      package: pkg,
      // tracking_code: trackingCode, // om du skapar shipment
    });
  } catch (err) {
    next(err);
  }
};
