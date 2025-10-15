import express from 'express';
import { deleteUserController } from '../../controllers/users/deleteUserController.js';

const router = express.Router();

router.delete('/auth/delete', deleteUserController);

export default router;
