import { Router } from "express"
import { ScheduleController } from "../controllers/schedule.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

export default class ScheduleRouter {
    private route: Router
    private scheduleController: ScheduleController

    constructor(){
        this.route = Router()
        this.scheduleController = new ScheduleController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getScheduleTotalContextController } = this.scheduleController

        this.route.get("/:context", verifyAuthToken, authorizeRole(["admin","user"]), getScheduleTotalContextController)
    }

    public getRouter = (): Router => this.route
}