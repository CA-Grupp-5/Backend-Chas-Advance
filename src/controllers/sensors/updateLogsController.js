import db from '../../config/db.js';
// import dotenv from 'dotenv';

// dotenv.config();

export const updateLogsController = async (req, res) => {
  const packageId = req.params.id;
  //   const apiKey = req.headers['x-api-key'];

  //   if (apiKey !== process.env.SENSOR_API_KEY) {
  //     return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  //   }

  if (!packageId || isNaN(packageId)) {
    return res.status(400).json({
      message: 'A valid package ID is required.',
    });
  }

  const { temperature, humidity } = req.body;

  if (!temperature && !humidity) {
    return res.status(400).json({
      message:
        'At least one field (temperature, humidity) is required to update.',
    });
  }

  try {
    const existingPackage = await db.query(
      'SELECT * FROM packages WHERE id = $1',
      [packageId]
    );
    if (!existingPackage || existingPackage.rows.length === 0) {
      return res.status(404).json({ message: 'Package not found.' });
    }

    const updates = [];
    const values = [];
    let valueIndex = 1;

    if (temperature) {
      updates.push(`temperature = $${valueIndex++}`);
      values.push(temperature);
    }

    if (humidity) {
      updates.push(`humidity = $${valueIndex++}`);
      values.push(humidity);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        message: 'No valid fields provided for update.',
      });
    }

    values.push(packageId);

    const updateQuery = `UPDATE sensors SET ${updates.join(
      ', '
    )} WHERE package_id = $${valueIndex} RETURNING *`;
    const updateResult = await db.query(updateQuery, values);

    if (updateResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: 'No logs found for the specified package.' });
    }

    res.status(200).json({
      message: 'Logs updated successfully.',
      logs: updateResult.rows[0],
    });
  } catch (error) {
    console.error('Error updating logs:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
