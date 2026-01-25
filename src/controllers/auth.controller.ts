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

    public getRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Auth header
            const authHeader = req.headers.authorization
            const refreshToken = authHeader?.split(" ")[1]

            if (!refreshToken) {
                return res.status(400).json({
                    message: "Refresh token required",
                })
            }

            // Service : Refresh token
            const result = await this.authService.refreshTokenService(refreshToken)
            if (!result) {
                return res.status(401).json({
                    message: "Invalid refresh token",
                })
            }

            // Success response
            return res.status(200).json({
                message: "Token refreshed successfully",
                data: result,
            })
        } catch (error: any) {
            next(error)
        }
    }
}