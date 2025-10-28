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
    // Package existence check from develop branch
    const packageExists = await db.query(
      'SELECT * FROM packages WHERE id = $1',
      [packageId]
    );

    if (packageExists.rows.length === 0) {
      return res.status(404).json({
        message: 'Package not found.',
      });
    }

    // Insert the sensor log
    const result = await db.query(
      `INSERT INTO sensors (package_id, temperature, humidity, timestamp)
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [packageId, temperature, humidity]
    );

    const insertedLog = result.rows[0];
    if (!insertedLog) {
      return res.status(500).json({ message: 'Failed to insert sensor log.' });
    }

    // Check for abnormal values and create notifications
    const notifications = [];

    // Safe ranges can be adjusted as needed
    if (temperature > 8 || temperature < 2) {
      notifications.push({
        type: 'Temperature Alert',
        message: `Temperature out of range: ${temperature}°C`,
      });
    }

    if (humidity > 80 || humidity < 20) {
      notifications.push({
        type: 'Humidity Alert',
        message: `Humidity out of range: ${humidity}%`,
      });
    }

    // Save notifications in DB if any
    for (const note of notifications) {
      await createNotification(
        1, // 🔹 replace with real user_id (e.g., from package owner)
        packageId,
        note.type,
        note.message
      );
    }

    // Return success - using develop branch's 200 status but with enhanced response
    res.status(200).json({
      message: 'Sensor logs added successfully',
      logs: insertedLog,
      notificationsCreated: notifications.length,
    });
  } catch (error) {
    next(error);
  }
};