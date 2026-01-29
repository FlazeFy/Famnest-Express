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
        const authRouter = new AuthRouter()
        this.app.use("/api/v1/dictionaries", dictionaryRouter.getRouter())
        this.app.use("/api/v1/auths", authRouter.getRouter())
        this.app.use("/api/v1/allergics", allergicRouter.getRouter())
        this.app.use("/api/v1/histories", historyRouter.getRouter())
        this.app.use("/api/v1/feedbacks", feedbackRouter.getRouter())
        this.app.use("/api/v1/questions", questionRouter.getRouter())
        this.app.use("/api/v1/meals", mealRouter.getRouter())
    }

    // Error handling
    private errorHandler = () => {
        this.app.use((err: any, req: Request, res: Response, next:NextFunction) => {
            console.log(err)
            res.status(err.rc || 500).send(err)
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