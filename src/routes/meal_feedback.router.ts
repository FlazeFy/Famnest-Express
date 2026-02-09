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
        const { getAllMealFeedbackByMealIdController, getLastMealFeedbackController } = this.mealFeedbackController

        this.route.get("/:meal_id", verifyAuthToken, authorizeRole(["user"]), getAllMealFeedbackByMealIdController)
        this.route.get("/stats/last", verifyAuthToken, authorizeRole(["user"]), getLastMealFeedbackController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}