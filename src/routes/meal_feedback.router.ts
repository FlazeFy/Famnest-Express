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
        
        /**
         * @openapi
         * /api/v1/meal_feedbacks/stats/last:
         *   get:
         *     summary: Get last meal feedback statistics
         *     tags: [Meal Feedback]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: Get meal feedback successful
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message: { type: string, example: Get meal feedback successful }
         *                 data:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       meal_name: { type: string, example: Chicken Fajitas }
         *                       prepare_by: { type: string, example: Ann Rogahn }
         *                       avg_meal_rate: { type: number, format: float, example: 3 }
         */
        this.route.get("/stats/last", verifyAuthToken, authorizeRole(["user"]), getLastMealFeedbackController)
    }

    public getRouter = (): Router => this.route
}