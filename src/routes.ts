import {Router} from 'express';
import { OrphanageController } from './controllers/OrphanagesController';

const router = Router();

const orphanageController = new OrphanageController

router.post("/orphanages", orphanageController.create);

export default router