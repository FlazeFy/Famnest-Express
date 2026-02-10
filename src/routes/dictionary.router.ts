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

        this.route.get("/", getAllDictionary)
        this.route.post("/", verifyAuthToken, authorizeRole(["admin"]), validateBodyMiddleware(dictionarySchema), postCreateDictionaryController)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(['admin']), validateParamMiddleware(templateIdParamSchema), hardDeleteDictionaryByIdController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}