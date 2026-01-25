import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
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
        const { postLogin } = this.authController

        this.route.post("/login", validateBodyMiddleware(authSchema), postLogin)
    }

    public getRouter = (): Router => {
        return this.route
    }
}