// src/controllers/packages/updatePackagesController.js

import pool from '../../config/db.js';

export const updatePackagesController = async (req, res, next) => {
  // 1) Validera att id i URL är ett giltigt tal
  const packageId = Number(req.params.id);
  if (!packageId) {
    return res.status(400).json({ message: 'A valid package ID is required.' });
  }

  // 2) Definiera vilka fält som är tillåtna att uppdatera
  const allowed = [
    'sender_id',
    'receiver_id',
    'current_location',
    'status',
    'assigned_truck_id',
    'expected_temperature_min',
    'expected_temperature_max',
    'expected_humidity_min',
    'expected_humidity_max',
  ];

  // 3) Bygg dynamiskt SET-del + värdelista
  const updates = [];
  const values = [];
  let valueIndex = 1;

  // Använd hasOwnProperty så att man kan sätta fält till null (t.ex. assigned_truck_id = null)
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      updates.push(`${key} = $${valueIndex++}`);
      values.push(req.body[key]);
    }
  }

  // 4) Om inga giltiga fält skickades → be om minst ett
  if (updates.length === 0) {
    return res.status(400).json({
      message:
        'Provide at least one valid field to update (sender_id, receiver_id, current_location, status, assigned_truck_id, expected_temperature_min/max, expected_humidity_min/max).',
    });
  }

  // 5) Lägg till tidsstämpel alltid
  updates.push('updated_at = NOW()');

  // 6) Lägg till id som sista parameter till WHERE
  values.push(packageId);

  // 7) Bygg SQL – WHERE använder $<sista param-index>
  const sql = `
    UPDATE packages
       SET ${updates.join(', ')}
     WHERE id = $${values.length}
     RETURNING *;
  `;

  try {
    // 8) Kör frågan
    const { rows } = await pool.query(sql, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Package not found.' });
    }

    return res.status(200).json({
      message: 'Package updated successfully',
      package: rows[0],
    });
  } catch (error) {
    // 9) Vanliga fel: 23503 = FK, 22P02 = typfel
    if (error.code === '23503') {
      const detail = error.detail || '';
      let field = 'foreign key';
      if (detail.includes('(sender_id)')) field = 'sender_id';
      if (detail.includes('(receiver_id)')) field = 'receiver_id';
      if (detail.includes('(assigned_truck_id)')) field = 'assigned_truck_id';
      return res.status(400).json({
        message: `Invalid ${field} – referenced row does not exist.`,
        detail,
      });
    }
    if (error.code === '22P02') {
      return res.status(400).json({
        message:
          'Invalid value type for one or more fields (check numbers/strings).',
        detail: error.message,
      });
    }
    next(error);
  }
};
