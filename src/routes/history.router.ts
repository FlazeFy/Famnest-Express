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
        const { getAllHistoryController, hardDeleteHistoryByIdController, exportHistoryController, hardDeleteAllHistoryController } = this.historyController

        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllHistoryController)
        this.route.get("/export", verifyAuthToken, authorizeRole(["admin","user"]), exportHistoryController)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(["user"]), hardDeleteHistoryByIdController)
        this.route.delete("/", verifyAuthToken, authorizeRole(["user"]), hardDeleteAllHistoryController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}