import db from '../../config/db.js';

export const deleteUserController = async (req, res, next) => {
  const userId = parseInt(req.params.id);

  if (!userId || isNaN(userId)) {
    return res.status(400).json({
      message: 'A valid user ID is required.',
    });
  }

  try {
    const result = await db.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [userId]
    );

    if (!result || result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'User deleted successfully',
      user: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};
