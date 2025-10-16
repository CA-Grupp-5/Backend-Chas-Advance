import express from 'express';

const router = express.Router();

router.post('/packages/:id/scan', scanPackagesController);

export default router;
