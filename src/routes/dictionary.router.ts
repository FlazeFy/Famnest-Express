import { Router } from "express"
import { DictionaryController } from "../controllers/dictionary.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

export default class DictionaryRouter {
    private route: Router
    private dictionaryController: DictionaryController

    constructor(){
        this.route = Router()
        this.dictionaryController = new DictionaryController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllDictionary, hardDeleteDictionaryByIdController } = this.dictionaryController

        this.route.get("/", getAllDictionary)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(['admin']), hardDeleteDictionaryByIdController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}