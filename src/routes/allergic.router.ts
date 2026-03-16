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

        /**
         * @openapi
         * /api/v1/allergics:
         *   get:
         *     summary: Get allergic list
         *     tags: [Allergic]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: Get allergic successful
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message: { type: string, example: Get allergic successful }
         *                 data:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       id: { type: string, format: uuid, example: 2fb929de-ba8b-43eb-a005-f279fc91f759 }
         *                       allergic_context: { type: string, example: bah }
         *                       allergic_desc: { type: string, example: Quibusdam adamo undique decens temptatio. }
         *                       created_by: { type: string, format: uuid, example: 623135dd-54f0-42c8-ae53-72ce57e813c8 }
         *                       created_at: { type: string, format: date-time, example: 2026-01-12T02:04:38.528Z }
         *                       updated_at: { type: string, format: date-time, example: 2026-02-08T18:10:49.767Z }
         *                 meta:
         *                   type: object
         *                   properties:
         *                     page: { type: integer, example: 1 }
         *                     limit: { type: integer, example: 14 }
         *                     total: { type: integer, example: 151 }
         *                     total_page: { type: integer, example: 11 }
         */
        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllAllergicController)
        this.route.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(allergicSchema), postCreateAllergic)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteAllergicByIdController)
    }

    public getRouter = (): Router => this.route
}