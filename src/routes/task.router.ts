import { Router } from "express"
import { TaskController } from "../controllers/task.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

export default class TaskRouter {
    private route: Router
    private taskController: TaskController

    constructor(){
        this.route = Router()
        this.taskController = new TaskController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllTaskController } = this.taskController

        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllTaskController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}