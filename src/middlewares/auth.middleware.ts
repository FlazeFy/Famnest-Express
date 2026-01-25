import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            throw { message: "Token not exist" }
        }

        const decript = jwt.verify(token, process.env.SECRET || "secret")
        res.locals.decript = decript

        next()
    } catch (error) {
        next(error)
    }
}