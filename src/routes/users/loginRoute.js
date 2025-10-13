import express from 'express';
import { loginUserController } from '../../controllers/users/loginUserController.js';

const router = express.Router();

router.post('/auth/login', loginUserController);

export default router;
