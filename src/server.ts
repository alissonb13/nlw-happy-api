import express from 'express';
import { getRepository } from 'typeorm';

import './database/connection';
import Orphanage from './models/orphanage';

const app = express();

app.use(express.json());

app.post('/orphanages', async (request, response) => {
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
});

app.listen(3333);