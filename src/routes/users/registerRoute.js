import express from 'express';
import { registerController } from '../../controllers/users/registerController.js';

const router = express.Router();

router.post('/auth/register', registerController);

export default router;
