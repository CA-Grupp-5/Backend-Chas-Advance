import express from 'express';

// Ett fel va att säkvägen va förlångt in, därav ändring
import registerRoute from './registerRoute.js';
import loginRoute from './loginRoute.js';
import updateUserRoute from './updateUserRoute.js';
import deleteUserRoute from './deleteUserRoute.js';
import getAllUsersRoute from './getAllUsersRoute.js';
import getUserByIdRoute from './getUserByIdRoute.js';

const router = express.Router();

router.use(registerRoute);
router.use(loginRoute);
router.use(updateUserRoute);
router.use(deleteUserRoute);
router.use(getAllUsersRoute);
router.use(getUserByIdRoute);

export default router;
