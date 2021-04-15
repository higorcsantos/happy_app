import {Request,response,Response} from 'express'
import { getCustomRepository, getRepository } from 'typeorm';
import { Orphanage } from '../models/Orphanage';
import { OrphanageRepository } from '../repositories/OrphanagesRepository';

class OrphanageController{
    async create(req: Request,res: Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;
        const orphanagesRepository = getRepository(Orphanage);

        const requestImage = req.files as Express.Multer.File[];

        const images = requestImage.map(image => {
            return {path: image.filename}
        })


        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });

        await orphanagesRepository.save(orphanage);

        return res.status(201).json(orphanage);

    }
    async index(req: Request, res: Response){
        const orphanagesRepository = getCustomRepository(OrphanageRepository);
        const orphanages = await orphanagesRepository.find();
        return res.status(200).json(orphanages);

    }
    async show(req: Request, res: Response){
        const { id } = req.params;

        const orphanageRepository = getCustomRepository(OrphanageRepository);

        const orphanage = await orphanageRepository.findOneOrFail(id);

        return res.status(200).json(orphanage)

    }
    async delete(req: Request, res: Response){
        const { id } = req.params;

        const orphanageRepository = getCustomRepository(OrphanageRepository);

        const orphanage = await orphanageRepository.findOne(id);

        if(!orphanage){
            return res.status(400).json({message: "Orfanato não existe"});
        }

        await orphanageRepository.delete(id);

        return res.json({message: "Orfanato deletado com sucesso"})
    }
}

export {OrphanageController}