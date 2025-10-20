// src/server.js
import dotenv from 'dotenv';
import app from './app.js';
import logger from './utilities/logger.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(
    `🚀 Dev server running on http://localhost:${PORT} in ${
      process.env.NODE_ENV || 'development'
    } mode`
  );
  console.log(
    `Server is running on http://g5app-ctepc9hrehedf2fw.swedencentral-01.azurewebsites.net`
  );
  console.log(`Dev server is running on http://localhost:${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});
