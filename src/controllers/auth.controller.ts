import { NextFunction, Request, Response } from "express"
import { AdminService } from "../services/admin.service"
import { AuthService } from "../services/auth.service"
import { UserService } from "../services/user.service"
import { extractUserFromLocals } from "../utils/auth.util"

export class AuthController {
    private authService: AuthService
    private adminService: AdminService
    private userService: UserService

    constructor(){
        this.authService = new AuthService()
        this.adminService = new AdminService()
        this.userService = new UserService()
    }

    public postLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Body
            const { email, password } = req.body

            // Service : Login
            const result = await this.authService.loginService(email, password)
            if (!result) throw { code: 401, message: "Invalid email or password" }

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

            if (!refreshToken) throw { code: 401, message: "Refresh token required" }

            // Service : Refresh token
            const result = await this.authService.refreshTokenService(refreshToken)
            if (!result) throw { code: 401, message: "Invalid refresh token" }

            // Success response
            return res.status(200).json({
                message: "Token refreshed successfully",
                data: result,
            })
        } catch (error: any) {
            next(error)
        }
    }

    public getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get user id
            const { userId, role } = extractUserFromLocals(res)
            let result 
    
            switch (role) {
                case "user":
                    // Service : Get user by id
                    result = await this.userService.getUserByIdService(userId)
                    break;
                case "admin":
                    // Service : Get admin by id
                    result = await this.adminService.getAdminByIdService(userId)
                    break;
                default:
                    throw { code: 409, message: "Role not valid" }
            }
    
            if (!result) throw { code: 404, message: "User not found" }
            const { password, ...finalRes } = result
    
            // Success response
            res.status(200).json({
                message: "Get user successful",
                data: finalRes
            })
        } catch (error: any) {
            next(error)
        }
    }
}