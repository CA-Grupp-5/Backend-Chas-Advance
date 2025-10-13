import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get(
  '/packages/:id',
  authorizeRoles(admin, user),
  getPackagesByIdController
);

export default router;
