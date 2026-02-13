import { Router } from "express"
import { TaskController } from "../controllers/task.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { templateIdParamSchema } from "../validators/template.validator"
import { validateParamMiddleware } from "../middlewares/validator.middleware"

export default class TaskRouter {
    private route: Router
    private taskController: TaskController

    constructor(){
        this.route = Router()
        this.taskController = new TaskController()
        this.initializeRoute()
    }

    private initializeRoute = () => {
        const { getAllTaskController, getIncomingTaskController, hardDeleteTaskByIdController, getTotalDailyTaskController, getTaskTotalContextController, exportTaskController } = this.taskController

        this.route.get("/", verifyAuthToken, authorizeRole(["admin","user"]), getAllTaskController)
        this.route.get("/export", verifyAuthToken, authorizeRole(["admin","user"]), exportTaskController)
        this.route.get("/:context/total", verifyAuthToken, authorizeRole(["admin","user"]), getTaskTotalContextController)
        this.route.get("/total", verifyAuthToken, authorizeRole(["admin","user"]), getTotalDailyTaskController)
        this.route.get("/incoming", verifyAuthToken, authorizeRole(["admin","user"]), getIncomingTaskController)
        this.route.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteTaskByIdController)
    }

    public getRouter = (): Router => {
        return this.route
    }
}