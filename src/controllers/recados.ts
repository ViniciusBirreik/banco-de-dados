import { Request, Response } from "express";

import { RecadosService } from "../service/recados";
import { HttpError } from "../error";
import { defaultErrorMessage, HttpIternalErrorCode } from "../constants";

export default class RecadosController {
    async index(request: Request, response: Response){
        const service = new RecadosService()
        try {    
            const recados = await service.find()

            return response.json(recados.map(recado => {
                return {
                    id: recado.id,
                    descricao: recado.descricao.toUpperCase(),
                    detalhes: recado.detalhes.toUpperCase()
                }
            }))
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpIternalErrorCode)
        }
    }
    
    async show(request: Request, response: Response){
        const { id } = request.params
        const service = new RecadosService()
        
        try {
            const recados = await service.findOne(parseInt(id))

            return response.json({
                id: recados?.id,
                descricao: recados?.descricao.toUpperCase(),
                detalhes: recados?.detalhes.toUpperCase()
            })
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpIternalErrorCode)
        }
    }

    async store(request: Request, response: Response){
        const { descricao, detalhes} = request.body
        
        const service = new RecadosService()
        
        try {
            const recados = service.create({
                descricao: descricao,
                detalhes: detalhes
            })
            return response.json(recados)
        } catch (error){
            throw new HttpError(defaultErrorMessage, HttpIternalErrorCode)
        }
    }

    async update(request: Request, response: Response){
        const { id } = request.params
        const { descricao, detalhes } = request.body
        const service = new RecadosService()
        
        try {
            const recados = service.update({
                id: parseInt(id),
                descricao: descricao,
                detalhes: detalhes
            })
        
            return response.json(recados)
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpIternalErrorCode)
        }
    }

    async delete(request: Request, response: Response){
        const { id } = request.params
        const service = new RecadosService()
        
        try {    
            service.delete(parseInt(id))

            return response.status(204)
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpIternalErrorCode)
        }
    }
}