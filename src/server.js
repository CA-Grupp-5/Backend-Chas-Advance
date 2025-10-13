// src/server.js
import 'dotenv/config';
import app from './app.js';
import logger from './utilities/logger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Log server start using Winston
  logger.info(`🚀 Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);

  // Also log environment variables for debugging (safe ones only)
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_SERVER:', process.env.DB_SERVER);
  console.log('DB_PORT:', process.env.DB_PORT);
});
