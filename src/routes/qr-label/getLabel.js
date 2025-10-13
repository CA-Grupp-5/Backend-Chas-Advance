import express from 'express';

const router = express.Router();

router.get('/packages/:id/label', getLabelController);

export default router;
