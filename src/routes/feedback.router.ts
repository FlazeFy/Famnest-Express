import { Router } from "express"
import { FeedbackController } from "../controllers/feedback.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

export default class FeedbackRouter {
    private route: Router
    private feedbackController: FeedbackController

    constructor(){
        this.route = Router()
        this.feedbackController = new FeedbackController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllFeedbackController } = this.feedbackController

        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllFeedbackController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}