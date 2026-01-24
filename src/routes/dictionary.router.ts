import { Router } from "express"
import { DictionaryController } from "../controllers/dictionary.controller"

export default class DictionaryRouter {
    private route: Router
    private dictionaryController: DictionaryController

    constructor(){
        this.route = Router()
        this.dictionaryController = new DictionaryController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllDictionary } = this.dictionaryController

        this.route.get("/", getAllDictionary)
    }

    public getRouter = (): Router => {
        return this.route
    }
}