// src/controllers/trucks/updateTruckController.js
// Uppdaterar en truck (PUT /trucks/:id) som partial update.
// Bygger UPDATE dynamiskt och hanterar vanliga DB-fel tydligt.

import pool from '../../config/db.js';

export const updateTruckController = async (req, res, next) => {
  // 1) Validera id från URL
  const truckId = Number(req.params.id);
  if (!truckId) {
    return res.status(400).json({ message: 'A valid truck ID is required.' });
  }

  // 2) Tillåtna fält att uppdatera
  const allowed = ['license_plate', 'driver_id', 'status'];

  // 3) SAMLAR SET-del och värden till parametrar ($1, $2, ...)
  const updates = [];
  const values = [];
  let i = 1;

  // --- license_plate (normaliseras till versaler) ---
  if (Object.prototype.hasOwnProperty.call(req.body, 'license_plate')) {
    const plate = String(req.body.license_plate || '').trim().toUpperCase();
    if (plate.length === 0) {
      return res.status(400).json({ message: 'license_plate may not be empty.' });
    }
    updates.push(`license_plate = $${i++}`);
    values.push(plate);
  }

  // --- status (validera mot whitelisted värden) ---
  if (Object.prototype.hasOwnProperty.call(req.body, 'status')) {
    const status = String(req.body.status || '').trim().toUpperCase();
    const allowedStatus = new Set(['ACTIVE', 'INACTIVE']);
    if (!allowedStatus.has(status)) {
      return res
        .status(400)
        .json({ message: 'Invalid status. Use ACTIVE or INACTIVE.' });
    }
    updates.push(`status = $${i++}`);
    values.push(status);
  }

  // --- driver_id (tillåt nummer eller null för att ta bort koppling) ---
  if (Object.prototype.hasOwnProperty.call(req.body, 'driver_id')) {
    const driverId = req.body.driver_id;

    if (driverId === null) {
      // explicit NULL: ingen parameter behövs
      updates.push('driver_id = NULL');
    } else {
      const num = Number(driverId);
      if (!num) {
        return res
          .status(400)
          .json({ message: 'driver_id must be a number or null.' });
      }
      updates.push(`driver_id = $${i++}`);
      values.push(num);
    }
  }

  if (Object.prototype.hasOwnProperty.call(req.body, 'driver_position')){
    const pos = req.body.driver_position;
    if (pos == null) {
      updateTruckController.push('driver_position = NULL');
    } else {
      if (
        typeof pos !== 'object' ||
        pos.lat === undefined ||
        pos.lng === undefined ||
        Number.isNaN(Number(pos.at)) ||
        Number.isNaN(Number(pos.lng))
      ) {
        return res.status(400).json({
          message: 'driver_position måste vara ett objekt {lat:number, lng:number, ts=:string}',
        });
      }
      updates.push('driver_position = $${i++}');
      values.push(pos);
    }
  }

  // Om inget giltigt fält skickades -> 400
  if (updates.length === 0) {
    return res.status(400).json({
      message:
        'Provide at least one field to update (license_plate, driver_id, status, driver_position).',
    });
  }


  // id till WHERE som sista parameter
  values.push(truckId);

  const sql = `
    UPDATE "license_plate"
       SET ${updates.join(', ')}
     WHERE id = $${values.length}
     RETURNING *;
  `;

  try {
    const { rows } = await pool.query(sql, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Truck not found.' });
    }

    return res.status(200).json({
      message: 'Truck updated successfully',
      truck: rows[0],
    });
  } catch (error) {
    // 23503 = FK-överträdelser (t.ex. driver_id pekar på user som inte finns)
    if (error.code === '23503') {
      return res.status(400).json({
        message: 'Invalid driver_id – referenced user does not exist.',
        detail: error.detail,
      });
    }
    // 23505 = unikhetsfel (t.ex. license_plate måste vara unikt)
    if (error.code === '23505') {
      return res.status(400).json({
        message: 'license_plate must be unique.',
        detail: error.detail,
      });
    }
    // 22P02 = typfel (t.ex. text där siffra förväntas)
    if (error.code === '22P02') {
      return res.status(400).json({
        message: 'Invalid value type for one or more fields.',
        detail: error.message,
      });
    }
    next(error);
  }
};
