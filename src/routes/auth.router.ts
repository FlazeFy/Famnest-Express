import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { authSchema } from "../validators/auth.validator"

export default class AuthRouter {
    private route: Router
    private authController: AuthController

    constructor(){
        this.route = Router()
        this.authController = new AuthController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { postLogin, getRefreshToken, getMyProfile } = this.authController

        this.route.post("/login", validateBodyMiddleware(authSchema), postLogin)
        this.route.get("/refresh", verifyAuthToken, authorizeRole(["admin","user"]), getRefreshToken)
        this.route.get("/profile", verifyAuthToken, authorizeRole(["admin","user"]), getMyProfile)
    }

    public getRouter = (): Router => this.route
}