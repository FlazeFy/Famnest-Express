import { Router } from "express"
import { FeedbackController } from "../controllers/feedback.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { feedbackSchema } from "../validators/feedback.validator"
import { templateIdParamSchema } from "../validators/template.validator"

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
        this.route.delete("/:id", verifyAuthToken, authorizeRole(["admin"]), validateParamMiddleware(templateIdParamSchema), hardDeleteFeedbackByIdController)
        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllFeedbackController)
        /**
         * @openapi
         * /api/v1/feedbacks/random:
         *   get:
         *     summary: Get random feedbacks
         *     tags:
         *       - Feedback
         *     responses:
         *       200:
         *         description: Get feedback successful
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message: { type: string, example: Get feedback successful }
         *                 data:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       feedback_body: { type: string, example: Bibo spoliatio trepide trado aer nulla delinquo audentia cuius quisquam. }
         *                       feedback_rate: { type: integer, example: 4 }
         *                       user:
         *                         type: object
         *                         properties:
         *                           username: { type: string, example: flazefy }
         */
        this.route.get("/random", getRandomFeedbackController)
    }

    public getRouter = (): Router => this.route
}