import express from 'express';
import dotenv from 'dotenv';
import { registerController } from '../../controllers/users/registerController.js';

dotenv.config();

const router = express.Router();

router.post('/auth/register', registerController);

export default router;
