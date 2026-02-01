import { Router } from "express"
import { FeedbackController } from "../controllers/feedback.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { feedbackSchema } from "../validators/feedback.validator"

export default class FeedbackRouter {
    private route: Router
    private feedbackController: FeedbackController

    constructor(){
        this.route = Router()
        this.feedbackController = new FeedbackController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllFeedbackController, getRandomFeedbackController, postCreateFeedbackController, hardDeleteFeedbackByIdController } = this.feedbackController

        this.route.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(feedbackSchema), postCreateFeedbackController)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(["admin"]), hardDeleteFeedbackByIdController)
        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllFeedbackController)
        this.route.get("/random", getRandomFeedbackController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}