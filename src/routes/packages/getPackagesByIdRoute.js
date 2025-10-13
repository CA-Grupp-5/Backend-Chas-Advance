import express from 'express';

const router = express.Router();

router.get(
  '/packages/:id',
  authorizeRoles(admin, user),
  getPackagesByIdController
);

export default router;
