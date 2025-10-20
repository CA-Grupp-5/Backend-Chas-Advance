import db from '../../config/db.js';

export const getUserByIdController = async (req, res, next) => {
  const userId = parseInt(req.params.id);

  if (!userId || isNaN(userId)) {
    return res.status(400).json({
      message: 'A valid user ID is required.',
    });
  }

  try {
    const result = await db.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [userId]
    );

    if (!result || result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(result.rows[0]);
  } catch {
    next(error);
  }
};
