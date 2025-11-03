import db from '../../config/db.js';
import { createNotification } from '../notifications/createNotificationController.js';

export const postLogsController = async (req, res, next) => {
  const packageId = req.params.id;

  if (!packageId || isNaN(packageId)) {
    return res.status(400).json({
      message: 'A valid package ID is required.',
    });
  }

  const { temperature, humidity } = req.body;

  if (temperature == null || humidity == null) {
    return res.status(400).json({
      message: 'Temperature and humidity are required.',
    });
  }

  try {
    // 1️⃣ Get package info including expected min/max ranges
    const pkgResult = await db.query(
      `SELECT 
         sender_id AS user_id,
         expected_temperature_min,
         expected_temperature_max,
         expected_humidity_min,
         expected_humidity_max
       FROM packages
       WHERE id = $1`,
      [packageId]
    );

    if (pkgResult.rows.length === 0) {
      return res.status(404).json({ message: 'Package not found.' });
    }

    const pkg = pkgResult.rows[0];

    // 2️⃣ Insert the new sensor log
    const result = await db.query(
      `INSERT INTO sensors (package_id, temperature, humidity, timestamp)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [packageId, temperature, humidity]
    );

    const insertedLog = result.rows[0];
    if (!insertedLog) {
      return res.status(500).json({ message: 'Failed to insert sensor log.' });
    }

    // 3️⃣ Compare readings with expected ranges
    const notifications = [];

    if (temperature > pkg.expected_temperature_max || temperature < pkg.expected_temperature_min) {
      notifications.push({
        type: 'THRESHOLD_BREACH',
        message: `Temperature (${temperature}°C) out of expected range [${pkg.expected_temperature_min}°C - ${pkg.expected_temperature_max}°C]`,
      });
    }

    if (humidity > pkg.expected_humidity_max || humidity < pkg.expected_humidity_min) {
      notifications.push({
        type: 'THRESHOLD_BREACH',
        message: `Humidity (${humidity}%) out of expected range [${pkg.expected_humidity_min}% - ${pkg.expected_humidity_max}%]`,
      });
    }

    // 4️⃣ Create notifications in the DB if needed
    for (const note of notifications) {
      await createNotification(pkg.user_id, packageId, note.type, note.message);
    }

    // 5️⃣ Send the response
    res.status(200).json({
      message: 'Sensor log added successfully.',
      log: insertedLog,
      notificationsCreated: notifications.length,
      details: notifications.length > 0 ? notifications : ['All readings within expected range.'],
    });
  } catch (error) {
    console.error('Error in postLogsController:', error);
    next(error);
  }
};