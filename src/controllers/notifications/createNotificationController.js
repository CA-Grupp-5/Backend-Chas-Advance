import db from '../../config/db.js';

export const createNotification = async (userId, packageId, type, message) => {
  try {
    const query = `
      INSERT INTO notifications (user_id, package_id, notification_type, message, timestamp)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *;
    `;
    const result = await db.query(query, [userId, packageId, type, message]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating notification:', error.message);
    throw error;
  }
};
