import db from '../../config/db.js';

export const deleteShipmentController = async (req, res, next) => {
  const shipmentId = req.params.id;

  if (!shipmentId || isNaN(shipmentId)) {
    return res.status(400).json({
      message: 'A valid shipment ID is required to delete.',
    });
  }

  try {
    const existingShipment = await db.query(
      'SELECT * FROM shipments WHERE id = $1',
      [shipmentId]
    );

    if (existingShipment.rows.length === 0) {
      return res.status(404).json({ message: 'Shipment not found.' });
    }

    await db.query('DELETE FROM shipments WHERE id = $1', [shipmentId]);

    res.status(200).json({
      message: 'Shipment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
