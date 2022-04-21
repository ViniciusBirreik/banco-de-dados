import { Request, Response } from "express";

import { RecadosService } from "../service/recados";

export default class RecadosController {
    async index(request: Request, response: Response){
        
    }
    
    async show(request: Request, response: Response){
        const { id } = request.params

    }

    async store(request: Request, response: Response){
        const { descricao, detalhes} = request.body
        
    }

    async update(request: Request, response: Response){
        const { id } = request.params
        const { descricao, detalhes } = request.body
    }

    async delete(request: Request, response: Response){
        const { id } = request.params
        
    }
}