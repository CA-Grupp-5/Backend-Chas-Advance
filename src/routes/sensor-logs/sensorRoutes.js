import express from 'express';

import getLogsRoute from './getLogs.js  ';
import postLogsRoute from './postLogs.js';
import deleteLogsRoute from './deleteLogsRoute.js';
import updateLogsRoute from './updateLogsRoute.js';

const router = express.Router();

router.use(getLogsRoute);
router.use(postLogsRoute);
router.use(deleteLogsRoute);
router.use(updateLogsRoute);

export default router;
