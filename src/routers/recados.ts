import { Router } from 'express';

import { recadosValidateMidleware } from '../middlewares/recados'
import RecadosController from '../controllers/recados'

export default class RecadosRoutes {
    init() {
        const routes = Router();
        const controller = new RecadosController

        routes.get('/recados', controller.index);
        routes.get('/recados/:id', controller.show);
        routes.post('/recados', [recadosValidateMidleware], controller.store);
        routes.put('/recados/:id', [recadosValidateMidleware], controller.update);
        routes.delete('/recados/:id', controller.delete);

        return routes;
    }
}