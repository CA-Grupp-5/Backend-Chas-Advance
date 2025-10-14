import db from '../../db/index.js';

export const deleteLogsController = async (req, res) => {
  const packageId = req.params.id;

  if (!packageId || isNaN(packageId)) {
    return res.status(400).json({
      message: 'A valid package ID is required.',
    });
  }

  try {
    const existingPackage = await db.query(
      'SELECT * FROM packages WHERE id = $1',
      [packageId]
    );

    if (!existingPackage || existingPackage.rows.length === 0) {
      return res.status(404).json({ message: 'Package not found.' });
    }

    const deleteResult = await db.query(
      'DELETE FROM sensors WHERE package_id = $1',
      [packageId]
    );

    if (deleteResult.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'No logs found for the specified package.' });
    }

    res.status(200).json({ message: 'Logs deleted successfully.' });
  } catch (error) {
    console.error('Error deleting logs:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
