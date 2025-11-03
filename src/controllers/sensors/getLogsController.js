import db from '../../config/db.js';

export const getLogsController = async (req, res, next) => {
  const packageId = req.params.id;

  if (!packageId || isNaN(packageId)) {
    return res.status(400).json({
      message: 'A valid package ID is required.',
    });
  }

  try {
    const packageExists = await db.query(
      'SELECT * FROM packages WHERE id = $1',
      [packageId]
    );

    if (packageExists.rows.length === 0) {
      return res.status(404).json({
        message: 'Package not found.',
      });
    }
    const result = await db.query(
      `SELECT * FROM sensors WHERE package_id = $1 ORDER BY timestamp DESC`,
      [packageId]
    );

    if (!result || result.rows.length === 0) {
      return res
        .status(400)
        .json({ message: 'No sensor logs found for this package.' });
    }

    res.status(200).json({
      message: 'Sensor logs retrieved successfully',
      logs: result.rows,
    });
  } catch (error) {
    next(error);
  }
};
