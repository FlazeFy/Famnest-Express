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

        /**
         * @openapi
         * /api/v1/meals:
         *   get:
         *     summary: Get meal list
         *     tags: [Meal]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: Get meal successful
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message: { type: string, example: Get meal successful }
         *                 data:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       id: { type: string, format: uuid, example: fc5e2d1f-02cc-404f-8f16-d932d58ff4f1 }
         *                       meal_name: { type: string, example: Peruvian Avocado Oil Soup }
         *                       meal_desc: { type: string, nullable: true, example: Our golden rabbit, slow-cooked to perfection. }
         *                       meal_day: { type: string, example: mon }
         *                       meal_time: { type: string, example: breakfast }
         *                       prepare_by: { type: string, example: Ann Rogahn }
         */
        this.route.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllMealController)

        this.route.get("/export", verifyAuthToken, authorizeRole(["user"]), exportMealController)

        /**
         * @openapi
         * /api/v1/meals/{context}/total:
         *   get:
         *     summary: Get total meals grouped by context
         *     tags: [Meal]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: context
         *         required: true
         *         schema:
         *           type: string
         *           example: meal_time
         *         description: Group context for meal total (example meal_time)
         *     responses:
         *       200:
         *         description: Get meal total context successful
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message: { type: string, example: Get meal total context successful }
         *                 data:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       meal_time: { type: string, example: dinner }
         *                       total: { type: integer, example: 17 }
         */
        this.route.get("/:context/total", verifyAuthToken, authorizeRole(["admin","user"]), getMealTotalContextController)
        
        this.route.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(mealSchema), postCreateMealController)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteMealByIdController)
    }

    public getRouter = (): Router => this.route
}