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
        const { getAllTaskController, getIncomingTaskController, hardDeleteTaskByIdController, getTotalDailyTaskController } = this.taskController

        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllTaskController)
        this.route.get("/total", verifyAuthToken, authorizeRole(["admin","user"]), getTotalDailyTaskController)
        this.route.get("/incoming", verifyAuthToken, authorizeRole(["admin","user"]), getIncomingTaskController)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(["user"]), hardDeleteTaskByIdController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}