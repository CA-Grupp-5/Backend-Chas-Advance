import express from 'express';
import { getUserByIdController } from '../../controllers/users/getUserByIdController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Returns user data for a specific user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Invalid user ID provided
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/auth/users/:id', getUserByIdController);

export default router;
