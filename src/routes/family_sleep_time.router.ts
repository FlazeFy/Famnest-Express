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
        const { getFamilySleepTimeController, hardDeleteSleepTimeByIdController } = this.familySleepTimeController

        this.route.get("/", verifyAuthToken, authorizeRole(["user"]), getFamilySleepTimeController)
        this.route.delete("/", verifyAuthToken, authorizeRole(["user"]), hardDeleteSleepTimeByIdController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}