import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: 'ChasAdvance123098',
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // Azure PSQL kräver SSL
});

// async function test() {
//   try {
//     const res = await pool.query('SELECT NOW()');
//     console.log(res.rows);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     pool.end();
//   }
// }

// test();

export default pool;
