import db from '../../config/db.js';

export const getAllUsersController = async (req, res, next) => {
  try {
    const result = await db.query('SELECT id, name, email, role FROM users');

    if (!result || result.rows.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
