import {Router} from 'express';
import { OrphanageController } from './controllers/OrphanagesController';
import multer from 'multer';
import uploadConfig from './config/upload';

const router = Router();
const upload = multer(uploadConfig);

const orphanageController = new OrphanageController

router.post("/orphanages",upload.array('images'), orphanageController.create);
router.get("/orphanages", orphanageController.index);
router.get("/orphanages/:id",orphanageController.show);
router.delete("/orphanages/:id", orphanageController.delete);

export default router