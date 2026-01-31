import dotenv from "dotenv"
dotenv.config()
import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
import DictionaryRouter from "./routes/dictionary.router"
import AuthRouter from "./routes/auth.router"
import AllergicRouter from "./routes/allergic.router"
import HistoryRouter from "./routes/history.router"
import FeedbackRouter from "./routes/feedback.router"
import QuestionRouter from "./routes/question.router"
import MealRouter from "./routes/meal.router"
import TaskRouter from "./routes/task.router"
import { auditError } from "./utils/audit.util"
import FamilyMemberRouter from "./routes/family_member.router"

const PORT = process.env.PORT

class App {
    public app: Application

    constructor(){
        this.app = express()
        this.configure()
        this.router()
        this.errorHandler()
    }

    // Configure middleware
    private configure = () => {
        this.app.use(cors())
        this.app.use(express.json())
    }

    // Route configuration
    private router = () => {
        this.app.get("/", (req: Request, res: Response) => {
            res.status(200).send("<h1>Famnest API</h1>")
        })

        const dictionaryRouter = new DictionaryRouter()
        const allergicRouter = new AllergicRouter()
        const historyRouter = new HistoryRouter()
        const feedbackRouter = new FeedbackRouter()
        const questionRouter = new QuestionRouter()
        const mealRouter = new MealRouter()
        const taskRouter = new TaskRouter()
        const familyMemberRouter = new FamilyMemberRouter()
        const authRouter = new AuthRouter()
        this.app.use("/api/v1/dictionaries", dictionaryRouter.getRouter())
        this.app.use("/api/v1/auths", authRouter.getRouter())
        this.app.use("/api/v1/allergics", allergicRouter.getRouter())
        this.app.use("/api/v1/histories", historyRouter.getRouter())
        this.app.use("/api/v1/feedbacks", feedbackRouter.getRouter())
        this.app.use("/api/v1/questions", questionRouter.getRouter())
        this.app.use("/api/v1/meals", mealRouter.getRouter())
        this.app.use("/api/v1/tasks", taskRouter.getRouter())
        this.app.use("/api/v1/family_members", familyMemberRouter.getRouter())
    }

    // Error handling
    private errorHandler = () => {
        this.app.use((err: any, req: Request, res: Response, next:NextFunction) => {
            const statusCode = err.code || 500

            // Audit server error
            if (statusCode === 500) {
                auditError(err, req)

                res.status(500).json({
                    message: "Something went wrong",
                })
            }

            res.status(statusCode).json({
                message: err.message,
            })
        })
    }

    // Exec the App
    public startAPI = () => {
        this.app.listen(PORT, () => {
            console.log(`API Running at http://localhost:${PORT}`)
        })
    }
}

export default App