import { Router } from "express"
import { CashFlowController } from "../controllers/cash_flow.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { templateIdParamSchema } from "../validators/template.validator"
import { validateParamMiddleware } from "../middlewares/validator.middleware"

export default class CashFlowRouter {
    private route: Router
    private cashFlowController: CashFlowController

    constructor(){
        this.route = Router()
        this.cashFlowController = new CashFlowController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getTotalDailyCashFlowController, getAllCashFlowController, getTotalCashFlowPerCategoryController, hardDeleteCashFlowByIdController } = this.cashFlowController

        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllCashFlowController)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteCashFlowByIdController)
        this.route.get("/total", verifyAuthToken, authorizeRole(["admin","user"]), getTotalDailyCashFlowController)
        this.route.get("/by_category", verifyAuthToken, authorizeRole(["user"]), getTotalCashFlowPerCategoryController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}