import express from 'express';
import dotenv from 'dotenv';
// eventuella token

// import getLogs from './getLogs.js  ';
import postLogs from './postLogs.js';

dotenv.config();

const router = express.Router();

// router.use(getLogs);
router.use(postLogs);

export default router;
