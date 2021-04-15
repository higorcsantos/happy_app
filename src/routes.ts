import {Router} from 'express';
import { OrphanageController } from './controllers/OrphanagesController';

const router = Router();

const orphanageController = new OrphanageController

router.post("/orphanages", orphanageController.create);
router.get("/orphanages", orphanageController.index);
router.get("/orphanages/:id",orphanageController.show);
router.delete("/orphanages/:id", orphanageController.delete);

export default router