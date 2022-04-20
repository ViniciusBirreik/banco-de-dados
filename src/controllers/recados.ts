import { Request, Response } from "express";

import { Recados } from "../database/entities/Recados";

export default class RecadosController {
    async index(request: Request, response: Response){
        return response.json(await Recados.find())
    }
    
    async show(request: Request, response: Response){
        const { id } = request.params

        return response.json(await Recados.findOne(id))
    }

    async store(request: Request, response: Response){
        const { descricao, detalhes} = request.body
        
        return response.json( await new Recados(descricao, detalhes).save())
    }

    async update(request: Request, response: Response){
        const { id } = request.params
        const { descricao, detalhes } = request.body
        const recados = await Recados.findOne(id)

        if (recados){
            recados.descricao = descricao
            recados.detalhes = detalhes
            recados.save()
        }else{
            return response.status(404).json({
                mensagem: 'Recado não encontrado'
            })
        }

        return response.json(recados)
    }

    async delete(request: Request, response: Response){
        const { id } = request.params

        await Recados.delete(id)

        return response.sendStatus(204)

    }
}