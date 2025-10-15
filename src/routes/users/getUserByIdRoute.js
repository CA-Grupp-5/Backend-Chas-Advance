import express from 'express';
import { getUserByIdController } from '../../controllers/users/getUserByIdController.js';

const router = express.Router();

router.get('/auth/user/:id', getUserByIdController);

export default router;
