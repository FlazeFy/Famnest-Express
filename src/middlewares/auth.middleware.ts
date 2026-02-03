import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) throw { code: 401, message: "Token not exist" }

        const decrypt = jwt.verify(token, process.env.SECRET || "secret")
        res.locals.decrypt = decrypt

        next()
    } catch (error: any) {
        if (error.name === "JsonWebTokenError") return next({ code: 401, message: "Token is not valid" })
        if (error.name === "TokenExpiredError") return next({ code: 401, message: "Token expired" })
        
        next(error)
    }
}

export const authorizeRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = res.locals.decrypt as { id: number; role: string };

            if (!user) throw { code: 401, message: "Unauthorized" }
            if (!roles.includes(user.role)) throw { code: 403, message: "Your role is not authorized" }

            next()
        } catch (error) {
            next(error)
        }
    }
}