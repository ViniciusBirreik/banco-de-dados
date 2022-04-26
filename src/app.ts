import cors from 'cors'
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

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
        this.errors()
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

    private errors() {
        this.#express.use((error: HttpError, request: Request, response: Response, next: NextFunction) => {
            return response.status(error.status).json({
                mensagem: error.message
            })
        })
    }
    private routers() {
        const recadosRoutes = new RecadosRoutes().init()
        this.#express.use(recadosRoutes)
    }

    private async database() {
        await Database.getInstance();
    }
};