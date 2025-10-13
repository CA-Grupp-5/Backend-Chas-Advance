import express from 'express';

const router = express.Router();

router.get('/packages/:id', getPackagesByIdController);

export default router;
