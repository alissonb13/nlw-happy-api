import { Request, Response } from 'express';
import Orphanage from '../models/orphanage';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';

export default {
    async index(request: Request, response: Response) {
        const repository = getRepository(Orphanage);

        const orphanages = await repository.find({ relations: ['images'] });

        return response
                .status(200)
                .json(orphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const repository = getRepository(Orphanage);

        const orphanage = await repository.findOneOrFail(id, { relations: ['images'] });

        return response
                .status(200)
                .json(orphanageView.render(orphanage));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about, 
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        var repository = getRepository(Orphanage);
    
        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename };
        });

        const orphanage = repository.create({
            name,
            latitude,
            longitude,
            about, 
            instructions,
            opening_hours,
            open_on_weekends,
            images: images
        });
    
        await repository.save(orphanage);
    
        return response
                .status(201)
                .json(orphanage);
    }
}