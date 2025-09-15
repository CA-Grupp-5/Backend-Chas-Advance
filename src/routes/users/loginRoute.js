import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/auth/login', loginController);

export default router;
