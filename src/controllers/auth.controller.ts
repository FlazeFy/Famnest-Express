import { NextFunction, Request, Response } from "express"
import { AuthService } from "../services/auth.service"

export class AuthController {
    private authService: AuthService

    constructor(){
        this.authService = new AuthService()
    }

    public postLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Body
            const { email, password } = req.body

            // Service : Login
            const result = await this.authService.loginService(email, password)
            if (!result) {
                return res.status(401).json({
                    message: "Invalid email or password",
                })
            }

            // Success response
            return res.status(200).json({
                message: "Login successful",
                data: result,
            })
        } catch (error: any) {
            next(error)
        }
    }
}