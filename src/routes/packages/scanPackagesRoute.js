import express from 'express';
import { scanPackagesController } from '../../controllers/packages/scanPackagesController.js';

const router = express.Router();

// POST /packages/:id/scan (ingen auth för Postman-test)
router.post('/packages/:id/scan', scanPackagesController);

export default router;
