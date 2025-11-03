import db from '../../config/db.js';

export const getAllShipmentsController = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT * FROM shipments ORDER BY created_at DESC`
    );

    if (!result || result.rows.length === 0) {
      return res
        .status(400)
        .json({ message: 'No shipments found in the database.' });
    }

    res.status(200).json({
      message: 'Shipments retrieved successfully',
      shipments: result.rows,
    });
  } catch (error) {
    next(error);
  }
};
