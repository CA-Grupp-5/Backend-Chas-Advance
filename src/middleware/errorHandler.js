import logger from '../utilities/logger.js';

export const notFoundHandler = (req, res) => {
  logger.warn(`404 - Not Found: ${req.originalUrl}`);
  res.status(404).json({ message: 'Resource not found' });
};

export const errorHandler = (err, req, res, _next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  res.status(err.status || 500).json({
    message: 'Server Error',
    error: err.message,
  });
};
