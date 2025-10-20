import express from 'express';
import { deletePackageController } from '../../controllers/packages/deletePackageController.js';

const router = express.Router();

// DELETE /packages/:id
router.delete('/packages/:id', deletePackageController);

export default router;
