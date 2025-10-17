import { Router } from 'express';
import getPackagesRoute from './getPackagesRoute.js';
import getPackagesByIdRoute from './getPackagesByIdRoute.js';
import postPackagesRoute from './postPackagesRoute.js';
import deletePackageRoute from './deletePackageRoute.js';
import scanPackagesRoute from './scanPackagesRoute.js';

const router = Router();

router.use(getPackagesRoute);
router.use(getPackagesByIdRoute);
router.use(postPackagesRoute);
router.use(deletePackageRoute);
router.use(scanPackagesRoute);

export default router;
