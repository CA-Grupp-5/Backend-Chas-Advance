import express from 'express';
import { getAllUsersController } from '../../controllers/users/getAllUsersController.js';

const router = express.Router();

router.get('/auth/users', getAllUsersController);

export default router;
