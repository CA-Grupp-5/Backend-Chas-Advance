// src/config/server.js
import express from 'express';
import pool from './db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger, { stream } from '../utilities/logger.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Morgan → Winston
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, { stream }));

// --- ROUTES ---

// GET all users
app.get('/users', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    logger.info('Fetched all users');
    res.json(result.rows);
  } catch (err) {
    logger.error('Error fetching all users', { error: err.message });
    next(err);
  }
});

// GET user by ID
app.get('/users/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    logger.info(`Fetched user with id: ${id}`);
    res.json(result.rows[0]);
  } catch (err) {
    logger.error(`Error fetching user with id: ${id}`, { error: err.message });
    next(err);
  }
});

// CREATE user
app.post('/users', async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    logger.info(`Created user: ${email}`);
    res.json(result.rows[0]);
  } catch (err) {
    logger.error(`Error creating user ${email}`, { error: err.message });
    next(err);
  }
});

// UPDATE user
app.put('/users/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *',
      [name, email, id]
    );
    logger.info(`Updated user ${id}`);
    res.json(result.rows[0]);
  } catch (err) {
    logger.error(`Error updating user ${id}`, { error: err.message });
    next(err);
  }
});

// DELETE user
app.delete('/users/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    logger.info(`Deleted user ${id}`);
    res.send('User deleted');
  } catch (err) {
    logger.error(`Error deleting user ${id}`, { error: err.message });
    next(err);
  }
});

// --- ERROR HANDLER (must be last middleware) ---
app.use((err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    { stack: err.stack }
  );

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// ✅ Export app (so index.js can start it)
export default app;
