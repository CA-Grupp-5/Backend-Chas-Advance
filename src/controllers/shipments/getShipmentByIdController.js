import db from '../../config/db.js';

export const getShipmentByIdController = async (req, res, next) => {
  const shipmentId = req.params.id;

  if (!shipmentId || isNaN(shipmentId)) {
    return res.status(400).json({
      message: 'A valid shipment ID is required.',
    });
  }

  try {
    const result = await db.query('SELECT * FROM shipments WHERE id = $1', [
      shipmentId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Shipment not found.',
      });
    }

    res.status(200).json({
      message: 'Shipment retrieved successfully',
      shipment: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};
