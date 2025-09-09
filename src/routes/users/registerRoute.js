import express from 'express';
import dotenv from 'dotenv';
import { registerService } from '../../services/users/registerService.js';

dotenv.config();

const router = express.Router();

router.post('/auth/register', registerService);

export default router;
