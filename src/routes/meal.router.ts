import { Router } from "express"
import { MealController } from "../controllers/meal.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { mealSchema } from "../validators/meal.validator"
import { templateIdParamSchema } from "../validators/template.validator"

export default class MealRouter {
    private route: Router
    private mealController: MealController

    constructor(){
        this.route = Router()
        this.mealController = new MealController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllMealController, hardDeleteMealByIdController, postCreateMealController, getMealTotalContextController, exportMealController } = this.mealController

        this.route.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllMealController)
        this.route.get("/export", verifyAuthToken, authorizeRole(["user"]), exportMealController)
        this.route.get("/:context/total", verifyAuthToken, authorizeRole(["admin","user"]), getMealTotalContextController)
        this.route.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(mealSchema), postCreateMealController)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteMealByIdController)
    }

    public getRouter = (): Router => this.route
}