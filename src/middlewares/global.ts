import { Request, Response, NextFunction } from 'express'

export const logMiddleware = (request: Request, reponse: Response, next: NextFunction) => {
    const  { ip, method } = request
    
    next()
}