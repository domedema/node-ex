import express from 'express';
import 'express-async-errors';
import { initCorsMiddleware } from '../lib/middleware/cors';

import { validationErrorMiddleware } from '../lib/middleware/validation';

import planetsRoutes from './routes/planets';



const app = express();

app.use(express.json());

app.use(initCorsMiddleware())

app.use('/planets', planetsRoutes)

app.use(validationErrorMiddleware);

export default app;

app.post('/planets', validate({ body: planetSchema }), async (req, res) => {
    const planetData: PlanetData = req.body;

    const planet = await prisma.planet.create({
        data: planetData
    })

    res.status(201).json(planet);
});

app.put('/planets/:id(\\d+)', validate({ body: planetSchema }), async (req, res, next) => {
    const planetData: PlanetData = req.body;
    const planetId = Number(req.params.id);

    try {
        const planet = await prisma.planet.update({
            where: { id: planetId },
            data: planetData
        })
        res.status(200).json(planet);
    } catch (error) {
        res.status(404);
        next(`Cannot PUT /planets/${planetId}`)
    }
});

app.delete('/planets/:id(\\d+)', async (req, res, next) => {;
    const planetId = Number(req.params.id);

    try {
        const planet = await prisma.planet.delete({
            where: { id: planetId }
        })
        res.status(204).end();
    } catch (error) {
        res.status(404);
        next(`Cannot DELETE /planets/${planetId}`)
    }
});

app.use(validationErrorMiddleware);

export default app;