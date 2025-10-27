import express from 'express';

import postShipmentRoute from './postShipmentRoute.js';
import getShipmentByIdRoute from './getShipmentByIdRoute.js';
import getAllShipmentsRoute from './getAllShipmentsRoute.js';
import deleteShipmentRoute from './deleteShipmentRoute.js';
import updateShipmentRoute from './updateShipmentRoute.js';

const router = express.Router();

router.use(postShipmentRoute);
router.use(getShipmentByIdRoute);
router.use(getAllShipmentsRoute);
router.use(deleteShipmentRoute);
router.use(updateShipmentRoute);

export default router;
