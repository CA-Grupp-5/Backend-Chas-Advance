// src/utilities/logger.js
import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// Custom log format for console
const consoleFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json() // files will be JSON (structured)
  ),
  transports: [
    // Errors -> error.log
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    // All logs -> combined.log
    new transports.File({ filename: path.join(logDir, 'combined.log') }),
  ],
  exitOnError: false,
});

// Add colored, human-readable console output for non-production
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(format.colorize(), format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), consoleFormat)
  }));
}

// Stream for morgan to use
export const stream = {
  write: (message) => {
    // morgan adds a newline at the end — trim it
    logger.info(message.trim());
  }
};

export default logger;
