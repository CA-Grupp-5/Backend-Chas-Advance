import express from 'express';
import { updateUserController } from '../../controllers/users/updateUserController.js';

const router = express.Router();

router.put('/auth/update/:id', updateUserController);

export default router;
