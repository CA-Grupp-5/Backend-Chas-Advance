import db from '../../config/db.js';

export const postShipmentController = async (req, res, next) => {
  const packageId = req.params.id;

  if (!packageId || isNaN(packageId)) {
    return res.status(400).json({
      message: 'A valid package ID is required.',
    });
  }

  const { tracking_code } = req.body;

  if (!tracking_code) {
    return res.status(400).json({
      message: 'Tracking code and printed status are required.',
    });
  }

  try {
    const packageExists = await db.query(
      'SELECT * FROM packages WHERE id = $1',
      [packageId]
    );

    if (packageExists.rows.length === 0) {
      return res.status(404).json({
        message: 'Package not found.',
      });
    }

    if (packageExists.rows.length > 1) {
      return res.status(400).json({
        message: 'Shipment for this package already exists.',
      });
    }

    const result = await db.query(
      `INSERT INTO shipments (package_id, tracking_code, printed, created_at)
             VALUES ($1, $2, NOW(), NOW()) RETURNING *`,
      [packageId, tracking_code]
    );

    const insertedShipment = result.rows[0];

    if (!insertedShipment) {
      return res.status(500).json({ message: 'Failed to insert shipment.' });
    }

    res.status(200).json({
      message: 'Shipment created successfully',
      shipment: insertedShipment,
    });
  } catch (error) {
    next(error);
  }
};
