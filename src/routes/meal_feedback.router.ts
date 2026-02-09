import { Router } from "express"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { MealFeedbackController } from "../controllers/meal_feedback.controller"

export default class MealFeedbackRouter {
    private route: Router
    private mealFeedbackController: MealFeedbackController

    constructor(){
        this.route = Router()
        this.mealFeedbackController = new MealFeedbackController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllMealFeedbackByMealIdController } = this.mealFeedbackController

        this.route.get("/:meal_id", verifyAuthToken, authorizeRole(["user"]), getAllMealFeedbackByMealIdController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}