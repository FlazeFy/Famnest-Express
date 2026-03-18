import { Router } from "express"
import { FamilySleepTimeController } from "../controllers/family_sleep_time.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { familySleepTimeSchema } from "../validators/family_sleep_time"

export default class FamilySleepTimeRouter {
    private route: Router
    private familySleepTimeController: FamilySleepTimeController

    constructor(){
        this.route = Router()
        this.familySleepTimeController = new FamilySleepTimeController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getFamilySleepTimeController, hardDeleteSleepTimeByIdController, postCreateSleepTimeByIdController } = this.familySleepTimeController

        this.route.get("/", verifyAuthToken, authorizeRole(["user"]), getFamilySleepTimeController)
        this.route.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(familySleepTimeSchema), postCreateSleepTimeByIdController)
        this.route.delete("/", verifyAuthToken, authorizeRole(["user"]), hardDeleteSleepTimeByIdController)
    }

    public getRouter = (): Router => this.route
}