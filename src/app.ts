import express from 'express'
import cors from 'cors'

import Database from './database/connections/database';
import RecadosRoutes from './routers/recados';
import { logMiddleware } from './middlewares';
import { HttpError } from './error';


export default class Application {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    async init() {        
        this.config();
        this.middlewares();
        this.routers();
        await this.database();
    }

    start(port: number) {
        this.#express.listen(port, () => {
            console.log(`A aplicação está rodando na porta ${port}...`); 
        });
    }

    private config() {
        this.#express.use(express.json());
        this.#express.use(express.urlencoded({ extended: false }));
        this.#express.use(cors());
    }

    private middlewares() {
        this.#express.use(logMiddleware)
    }

    private routers() {
        const recadosRoutes = new RecadosRoutes().init()
        this.#express.use(recadosRoutes)
    }

    private async database() {
        await Database.getInstance();
    }
};