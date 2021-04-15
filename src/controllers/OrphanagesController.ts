import {Request,response,Response} from 'express'
import { getCustomRepository, getRepository } from 'typeorm';
import { Orphanage } from '../models/Orphanage';
import { OrphanageRepository } from '../repositories/OrphanagesRepository';
import { OrphanagesView } from '../views/OrphanagesView';
import * as Yup from 'yup';

const orphanagesView = new OrphanagesView
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


        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean(),
            images: Yup.array(
              Yup.object().shape({
                path: Yup.string().required(),
              })
            ).required().min(1),
          });
          
          await schema.validate(data, {
            abortEarly: false,
          });
        
        const orphanage = orphanagesRepository.create(data);

        await orphanagesRepository.save(orphanage);

        return res.status(201).json(orphanage);

    }
    async index(req: Request, res: Response){
        const orphanagesRepository = getCustomRepository(OrphanageRepository);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });
        return res.status(200).json(orphanagesView.renderMany(orphanages));

    }
    async show(req: Request, res: Response){
        const { id } = req.params;

        const orphanageRepository = getCustomRepository(OrphanageRepository);

        const orphanage = await orphanageRepository.findOneOrFail(id,{relations: ['images']});

        return res.status(200).json(orphanagesView.render(orphanage))

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