import express from 'express';
import { deleteTruckController} from '../../controllers/trucks/deleteTrucksController.js'
const router = express.Router();

router.delete('/trucks/:id', deleteTruckController);

export default router;