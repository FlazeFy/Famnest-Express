import { Router } from "express"
import { AllergicController } from "../controllers/allergic.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { allergicSchema } from "../validators/allergic.validator"
import { templateIdParamSchema } from "../validators/template.validator"

export default class AllergicRouter {
    private route: Router
    private allergicController: AllergicController

    constructor(){
        this.route = Router()
        this.allergicController = new AllergicController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllAllergicController, hardDeleteAllergicByIdController, postCreateAllergic } = this.allergicController

        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllAllergicController)
        this.route.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(allergicSchema), postCreateAllergic)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteAllergicByIdController)
    }

    public getRouter = (): Router => this.route
}