import { Router } from "express"
import { FamilySleepTimeController } from "../controllers/family_sleep_time.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

export default class FamilySleepTimeRouter {
    private route: Router
    private familySleepTimeController: FamilySleepTimeController

    constructor(){
        this.route = Router()
        this.familySleepTimeController = new FamilySleepTimeController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getFamilySleepTimeController } = this.familySleepTimeController

        this.route.get("/", verifyAuthToken, authorizeRole(["user"]), getFamilySleepTimeController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}