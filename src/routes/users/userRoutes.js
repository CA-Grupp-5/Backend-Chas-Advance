import express from 'express';
import registerRoute from './routes/users/registerRoute.js';
import loginRoute from './routes/users/loginRoute.js';
import updateUserRoute from './routes/users/updateUserRoute.js';
import deleteUserRoute from './routes/users/deleteUserRoute.js';
import getAllUsersRoute from './routes/users/getAllUsersRoute.js';
import getUserByIdRoute from './routes/users/getUserByIdRoute.js';

const router = express.Router();

router.use(registerRoute);
router.use(loginRoute);
router.use(updateUserRoute);
router.use(deleteUserRoute);
router.use(getAllUsersRoute);
router.use(getUserByIdRoute);

export default router;
