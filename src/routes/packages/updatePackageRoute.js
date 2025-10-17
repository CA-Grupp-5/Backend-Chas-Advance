import express from 'express';
import { updatePackagesController } from '../../controllers/packages/updatePackagesController.js';

const router = express.Router();

router.put('/packages/:id', updatePackagesController);

export default router;