import { Request, Response, NextFunction } from 'express'

import { HttpBadRequestCode, invalidField } from '../constants'
import { HttpError } from '../error'

export const recadosValidateMidleware = (request: Request, rsponse: Response, next: NextFunction) => {
    const { descricao, detalhes } = request.body

    if(descricao.length < 3 || descricao.length > 255) {
        throw new HttpError(invalidField('descricao'), HttpBadRequestCode)
    }

    if(detalhes.length < 3 || detalhes.length > 255) {
        throw new HttpError(invalidField('detalhes'), HttpBadRequestCode)
    }

    next()
}

