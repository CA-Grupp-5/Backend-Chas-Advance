import express from 'express';
import { getAllUsersController } from '../../controllers/users/getAllUsersController.js';

const router = express.Router();
/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users with their basic information (id, name, email, role).
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   role:
 *                     type: string
 *                     example: admin
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */
router.get('/auth/users', getAllUsersController);

export default router;
