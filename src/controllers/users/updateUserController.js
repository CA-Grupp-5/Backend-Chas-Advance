import db from '../../config/db.js';
import bcrypt from 'bcryptjs';

export const updateUserController = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, role } = req.body;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({
      message: 'A valid user ID is required.',
    });
  }

  if (!name && !email && !password && !role) {
    return res.status(400).json({
      message:
        'At least one field (name, email, password, role) is required to update.',
    });
  }

  try {
    const existingUser = await db.query('SELECT * FROM users WHERE id = $1', [
      userId,
    ]);

    if (!existingUser || existingUser.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const updates = [];
    const values = [];
    let valueIndex = 1;

    if (name) {
      updates.push(`name = $${valueIndex++}`);
      values.push(name);
    }

    if (email) {
      updates.push(`email = $${valueIndex++}`);
      values.push(email);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push(`password_hash = $${valueIndex++}`);
      values.push(hashedPassword);
    }

    if (role) {
      updates.push(`role = $${valueIndex++}`);
      values.push(role);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        message: 'No valid fields provided for update.',
      });
    }

    values.push(userId);

    const updateQuery = `
        UPDATE users
        SET ${updates.join(', ')}
        WHERE id = $${valueIndex}
        RETURNING id, name, email, role`;

    const result = await db.query(updateQuery, values);

    if (!result || result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found after update.' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
