import { Router } from "express"
import { AllergicController } from "../controllers/allergic.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

export default class AllergicRouter {
    private route: Router
    private allergicController: AllergicController

    constructor(){
        this.route = Router()
        this.allergicController = new AllergicController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllAllergic } = this.allergicController

        this.route.get("/", getAllAllergic)
    }

    public getRouter = (): Router => {
        return this.route
    }
}