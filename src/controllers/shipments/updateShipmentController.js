import db from '../../config/db.js';

export const updateShipmentController = async (req, res, next) => {
  const shipmentId = req.params.id;

  // Update either the tracking code if it's faulty or update the printed status
  const { tracking_code, printed } = req.body;

  if (!shipmentId || isNaN(shipmentId)) {
    return res.status(400).json({
      message: 'A valid shipment ID is required to update.',
    });
  }

  if (!tracking_code && !printed) {
    return res.status(400).json({
      message:
        'At least one field (tracking_code, printed) is required to update.',
    });
  }

  if (printed !== undefined && typeof printed !== 'boolean') {
    return res.status(400).json({
      message: 'Printed field must be a boolean value.',
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

    const updates = [];
    const values = [];
    let valueIndex = 1;

    if (tracking_code !== undefined) {
      updates.push(`tracking_code = $${valueIndex++}`);
      values.push(tracking_code);
    }

    const printedValue = printed ? 'NOW()' : null;

    if (printed !== undefined) {
      updates.push(`printed = $${valueIndex++}`);
      values.push(printedValue);
    }

    values.push(shipmentId);

    if (updates.length === 0) {
      return res.status(400).json({
        message: 'No valid fields provided for update.',
      });
    }

    const updateQuery = `
    UPDATE shipments
    SET ${updates.join(', ')}
    WHERE id = $${valueIndex}
    RETURNING *`;

    const result = await db.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(500).json({ message: 'Failed to update shipment.' });
    }

    res.status(200).json({
      message: 'Shipment updated successfully',
      shipment: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};
