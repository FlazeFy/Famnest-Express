import { genSalt, hash } from "bcrypt"
import jwt from "jsonwebtoken"

interface JwtPayload {
    id: string
    role?: string
}

export const hashPassword = async (password: string) => {
    const salt = await genSalt(10)

    return await hash(password, salt)
}

export const extractUserFromLocals = (res: any) => {
    const user = res.locals.decrypt
    if (!user) throw { code: 401, message: "Unauthorized" }

    const payload = user as JwtPayload

    return {
        userId: payload.id,
        role: payload.role ?? null,
    }
}