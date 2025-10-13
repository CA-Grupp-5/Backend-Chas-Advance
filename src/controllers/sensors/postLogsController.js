import db from '../../config/db.js';

export const postLogsController = async (req, res, next) => {
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

  if (!temperature || !humidity) {
    return res.status(400).json({
      message: 'Temperature and humidity are required.',
    });
  }

  try {
    const result = await db.query(
      `INSERT INTO sensors (package_id, temperature, humidity, timestamp)
             VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [packageId, temperature, humidity]
    );

    const insertedLog = result.rows[0];

    if (!insertedLog) {
      return res.status(500).json({ message: 'Failed to insert sensor log.' });
    }

    res.status(201).json({
      message: 'Sensor logs added successfully',
      logs: insertedLog,
    });
  } catch (error) {
    next(error);
  }
};
