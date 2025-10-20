import express from 'express';
import { getPackagesController } from '../../controllers/packages/getPackagesController.js';

const router = express.Router();

// GET /packages
router.get('/packages', getPackagesController);

export default router;
