import { Router } from "express"
import { MealController } from "../controllers/meal.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

export default class MealRouter {
    private route: Router
    private mealController: MealController

    constructor(){
        this.route = Router()
        this.mealController = new MealController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllMealController } = this.mealController

        this.route.get("/", verifyAuthToken, authorizeRole(["user"]), getAllMealController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}