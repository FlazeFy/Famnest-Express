import { Router } from "express"
import { HistoryController } from "../controllers/history.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

export default class HistoryRouter {
    private route: Router
    private historyController: HistoryController

    constructor(){
        this.route = Router()
        this.historyController = new HistoryController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllHistoryController } = this.historyController

        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllHistoryController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}