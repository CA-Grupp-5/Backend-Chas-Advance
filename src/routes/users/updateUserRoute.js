import express from 'express';
import { updateUserController } from '../../controllers/users/updateUserController.js';

const router = express.Router();

router.put('/auth/update', updateUserController);

export default router;
