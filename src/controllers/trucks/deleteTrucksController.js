import pool from '../../config/db.js';

export const deleteTruckController = async(req, res, next) => {
    const truckId = Number(req.params.id);
    if(!truckId || Number.isNaN(truckId) || truckId <= 0) {
        return res.status(400).json({ message: 'A valid truck ID is required.'});
    }

    try {
        const check = await pool.query(
            'SELECT id, license_plate, status, driver_id FROM license_plate WHERE id = $1',
            [truckId]
        );
        if(check.rows.length === 0) {
            return res.status(404).json({ message: 'truck not found.'});
        }
        const {rows} = await pool.query(
            'DELETE FROM license_plate WHERE id = $1 RETURNING id, license_plate, status, driver_id',
            [truckId]
        );
        return res.status(200).json({
            message: 'Truck deleted successfully..',
            truck: rows[0],
        });
    } catch (error){
        if(error.code === '22P02') {
            return res.status(400).json({
                message: 'invalid value type for truck ID.',
                detail: error.message,
            });
        }
        next(error);
    }
};