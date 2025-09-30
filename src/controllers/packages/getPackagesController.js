import db from '../../config/db.js';

export const getPackagesByIdController = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({
        message: 'A valid user ID is required.',
      });
    }

    const packageResult = await db.query(
      'SELECT * FROM packages WHERE user_id = $1',
      [userId]
    );

    const packages = packageResult.rows;

    if (packages.length === 0) {
      return res
        .status(404)
        .json({ message: 'No packages found for this user.' });
    }

    res.status(200).json({
      message: 'Packages retrieved successfully',
      packages,
    });
  } catch (error) {
    next(error);
  }
};
