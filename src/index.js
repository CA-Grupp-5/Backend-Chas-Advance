// src/index.js
import app from './config/server.js';    // ✅ Import the configured Express app
import logger from './utilities/logger.js';  // ✅ Import the logger

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
