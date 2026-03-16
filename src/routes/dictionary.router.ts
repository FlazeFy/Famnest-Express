import { Router } from "express"
import { DictionaryController } from "../controllers/dictionary.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { dictionarySchema } from "../validators/dictionary.validator"
import { templateIdParamSchema } from "../validators/template.validator"

export default class DictionaryRouter {
    private route: Router
    private dictionaryController: DictionaryController

    constructor(){
        this.route = Router()
        this.dictionaryController = new DictionaryController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllDictionary, hardDeleteDictionaryByIdController, postCreateDictionaryController } = this.dictionaryController

        /**
         * @openapi
         * /api/v1/dictionaries:
         *   get:
         *     summary: Get all dictionaries
         *     tags:
         *       - Dictionary
         *     responses:
         *       200:
         *         description: Get dictionary successful
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message: { type: string, example: Get dictionary successful }
         *                 data:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       id: { type: string, format: uuid, example: 76789fa3-f5c7-45b7-95f1-004f289daa78 }
         *                       dictionary_name: { type: string, example: appointment }
         *                       dictionary_type: { type: string, example: event_category }
         *                       dictionary_desc: { type: string, example: Personal or family appointment }
         *                       created_at: { type: string, format: date-time, example: 2025-03-11T20:48:16.748Z }
         *                 meta:
         *                   type: object
         *                   properties:
         *                     page: { type: integer, example: 1 }
         *                     limit: { type: integer, example: 14 }
         *                     total: { type: integer, example: 33 }
         *                     total_page: { type: integer, example: 3 }
         */
        this.route.get("/", getAllDictionary)
        this.route.post("/", verifyAuthToken, authorizeRole(["admin"]), validateBodyMiddleware(dictionarySchema), postCreateDictionaryController)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(['admin']), validateParamMiddleware(templateIdParamSchema), hardDeleteDictionaryByIdController)
    }

    public getRouter = (): Router => this.route
}