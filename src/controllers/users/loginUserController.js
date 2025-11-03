import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../config/db.js';
import dotenv from 'dotenv';
import logger from '../../utilities/logger.js';

dotenv.config();

export const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;

  logger.info(`Login attempt for email: ${email}`);

  if (!email || !password) {
    logger.warn('Login failed: missing email or password');
    return res.status(400).json({
      message: 'Email and password are required to login.',
    });
  }

  const userResult = await db.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required to login.',
    });
  }

  try {
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    const user = userResult.rows[0];

    if (!user) {
      logger.warn(`Login failed: email not found (${email})`);
      return res.status(401).json({ message: 'Invalid email.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      logger.warn(`Login failed: invalid password for user ${email}`);
      return res.status(401).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info(`User logged in successfully: ${email} (role: ${user.role})`);

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    logger.error(`Login error for ${req.body.email}: ${error.message}`, {
      stack: error.stack,
    });
    next(error);
  }
};
