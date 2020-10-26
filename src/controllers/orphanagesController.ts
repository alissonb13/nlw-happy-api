import { Request, Response } from 'express';
import Orphanage from '../models/orphanage';
import { getRepository } from 'typeorm';

export default {
    async index(request: Request, response: Response) {
        const repository = getRepository(Orphanage);

        const orphanages = await repository.find();

        return response
                .status(200)
                .json(orphanages);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const repository = getRepository(Orphanage);

        const orphanage = await repository.findOneOrFail(id);

        return response
                .status(200)
                .json(orphanage);
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
    
        const orphanage = repository.create({
            name,
            latitude,
            longitude,
            about, 
            instructions,
            opening_hours,
            open_on_weekends
        });
    
        await repository.save(orphanage);
    
        return response
                .status(201)
                .json(orphanage);
    }
}