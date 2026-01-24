import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"

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

        this.route.post("/login", postLogin)
    }

    public getRouter = (): Router => {
        return this.route
    }
}