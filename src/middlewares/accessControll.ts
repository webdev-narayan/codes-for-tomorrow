
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { verifyJWT } from '../utils/jwtHandler.ts';
import User from '../models/User.ts';
export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const token = verifyJWT(req)
        if (token?.error) {
            return res.status(403).send(token)
        }
        const user = await User.findByPk(token.id)
        if (user?.id === token?.id) {
            next()
        } else {
            return res.status(403).send({ error: "Your are not authorized to access this route" })
        }

    } catch (error) {
        return res.status(500).send(error)
    }
}