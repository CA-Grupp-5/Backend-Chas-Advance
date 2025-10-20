import express from 'express';
import { updateUserController } from '../../controllers/users/updateUserController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/users/{id}:
 *   put:
 *     summary: Update user information
 *     description: Updates one or more fields for a specific user (name, email, password, or role).
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Invalid user ID or no valid fields provided
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/auth/users/:id', updateUserController);

export default router;
