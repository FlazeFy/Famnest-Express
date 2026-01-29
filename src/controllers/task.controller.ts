import { NextFunction, Request, Response } from "express"
import { TaskService } from "../services/task.service"
import { extractUserFromAuthHeader } from "../utils/auth.util"

export class TaskController {
    private taskService: TaskService

    constructor(){
        this.taskService = new TaskService()
    }

    public getAllTaskController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 14

            // Get user id
            const { userId, role } = extractUserFromAuthHeader(req.headers.authorization)
    
            // Service : Get all task
            const result = await this.taskService.getAllTaskService(page, limit, role === "user" ? userId : null)
            if (!result) throw { code: 404, message: "Task not found" }
    
            // Success response
            res.status(200).json({
                message: "Get task successful",
                data: result.data,
                meta: {
                    page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
                },
            })
        } catch (error: any) {
            next(error)
        }
    }
}