import { Router } from "express"
import { StatsController } from "../controllers/stats.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

export default class StatsRouter {
    private route: Router
    private statsController: StatsController

    constructor(){
        this.route = Router()
        this.statsController = new StatsController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getFamilyDashboardController } = this.statsController

        this.route.get("/family/dashboard", verifyAuthToken, authorizeRole(["user"]), getFamilyDashboardController)
    }

    public getRouter = (): Router => this.route
}