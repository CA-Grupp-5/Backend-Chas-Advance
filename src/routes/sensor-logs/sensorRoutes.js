import express from 'express';
// eventuella token

// import getLogs from './getLogs.js  ';
import postLogs from './postLogs.js';

const router = express.Router();

// router.use(getLogs);
router.use(postLogs);

export default router;
