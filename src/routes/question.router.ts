import { Router } from "express"
import { QuestionController } from "../controllers/question.controller"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { questionSchema } from "../validators/question.validator"

export default class QuestionRouter {
    private route: Router
    private questionController: QuestionController

    constructor(){
        this.route = Router()
        this.questionController = new QuestionController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { postQuestionController, getRandomAnsweredQuestionController } = this.questionController

        this.route.post("/", validateBodyMiddleware(questionSchema), postQuestionController)
        this.route.get("/random", getRandomAnsweredQuestionController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}