import db from '../../config/db.js';

export const postShipmentController = async (req, res, next) => {
  const packageId = req.params.id;

  if (!packageId || isNaN(packageId)) {
    return res.status(400).json({
      message: 'A valid package ID is required.',
    });
  }

  const { tracking_code, printed } = req.body;

  if (!tracking_code || printed === undefined) {
    return res.status(400).json({
      message: 'Tracking code and printed status are required.',
    });
  }

  try {
    const packageExists = await db.query(
      'SELECT EXISTS (SELECT 1 FROM packages WHERE id = $1)',
      [packageId]
    );

    if (!packageExists.rows[0].exists) {
      return res.status(404).json({
        message: 'Package not found.',
      });
    }

    const shipmentExists = await db.query(
      'SELECT EXISTS (SELECT 1 FROM shipments WHERE package_id = $1)',
      [packageId]
    );

    if (shipmentExists.rows[0].exists) {
      return res.status(400).json({
        message: 'Shipment for this package already exists.',
      });
    }

    const printedValue = printed ? 'NOW()' : 'NULL';

    const result = await db.query(
      `INSERT INTO shipments (package_id, tracking_code, printed, created_at)
             VALUES ($1, $2, ${printedValue}, NOW()) RETURNING *`,
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
