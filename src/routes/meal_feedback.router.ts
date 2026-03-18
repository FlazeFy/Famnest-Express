import { Router } from "express"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { MealFeedbackController } from "../controllers/meal_feedback.controller"
import { validateParamMiddleware } from "../middlewares/validator.middleware"
import { mealIdParamSchema } from "../validators/meal.validator"

export default class MealFeedbackRouter {
    private route: Router
    private mealFeedbackController: MealFeedbackController

    constructor(){
        this.route = Router()
        this.mealFeedbackController = new MealFeedbackController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllMealFeedbackByMealIdController, getLastMealFeedbackController } = this.mealFeedbackController

        this.route.get("/:meal_id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(mealIdParamSchema), getAllMealFeedbackByMealIdController)
        this.route.get("/stats/last", verifyAuthToken, authorizeRole(["user"]), getLastMealFeedbackController)
    }

    public getRouter = (): Router => this.route
}