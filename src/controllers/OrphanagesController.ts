import {Request,response,Response} from 'express'
import { getRepository } from 'typeorm';
import { Orphanage } from '../models/Orphanage';

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

        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        });

        await orphanagesRepository.save(orphanage);

        return res.status(201).json({message: "Orfanato criado com sucesso"});

    }
}

export {OrphanageController}