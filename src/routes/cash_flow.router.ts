import { Router } from "express"
import { CashFlowController } from "../controllers/cash_flow.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

export default class CashFlowRouter {
    private route: Router
    private cashFlowController: CashFlowController

    constructor(){
        this.route = Router()
        this.cashFlowController = new CashFlowController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getTotalDailyCashFlowController, getAllCashFlowController, hardDeleteCashFlowByIdController } = this.cashFlowController

        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllCashFlowController)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(["user"]), hardDeleteCashFlowByIdController)
        this.route.get("/total", verifyAuthToken, authorizeRole(["admin","user"]), getTotalDailyCashFlowController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}