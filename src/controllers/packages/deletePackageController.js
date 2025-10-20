import db from '../../config/db.js';

export const deletePackageController = async (req, res, next) => {
  const packageId = Number(req.params.id);
  if (!packageId) {
    return res.status(400).json({ message: 'A valid package ID is required.' });
  }
//Using delete on CASCADE that takes care of the child-tables in DB.
  try {
    const { rows } = await db.query(
      'DELETE FROM packages WHERE id = $1 RETURNING *',
      [packageId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Package not found.' });
    }

    res.status(200).json({
      message: 'Package deleted successfully',
      package: rows[0],
    });
  } catch (error) {
    next(error);
  }
};
