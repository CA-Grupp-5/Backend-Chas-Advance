import express from 'express';

import postShipmentRoute from './postShipmentRoute.js';
import getShipmentByIdRoute from './getShipmentByIdRoute.js';
import getAllShipmentsRoute from './getAllShipmentsRoute.js';

const router = express.Router();

router.use(postShipmentRoute);
router.use(getShipmentByIdRoute);
router.use(getAllShipmentsRoute);

export default router;
