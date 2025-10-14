import express from 'express';
import { postPackagesController } from '../../controllers/packages/postPackagesController.js';

const router = express.Router();

// POST /packages
router.post('/packages', postPackagesController);

export default router;
