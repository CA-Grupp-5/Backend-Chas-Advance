import express from 'express';

const router = express.Router();

router.get('/packages', getPackagesController);

export default router;
