import express from 'express';
import { getPackagesByIdController } from '../../controllers/packages/getPackagesByIdController.js';

const router = express.Router();

// GET /packages/:id (ingen auth för Postman-test)
router.get('/packages/:id', getPackagesByIdController);

export default router;
