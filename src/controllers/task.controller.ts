import { NextFunction, Request, Response } from "express"
import { TaskService } from "../services/task.service"
import { extractUserFromLocals } from "../utils/auth.util"
import { formatDateTime } from "../utils/converter"

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
            const search = typeof req.query.search === 'string' ? req.query.search.trim() : null
            const status = typeof req.query.status === 'string' ? req.query.status.trim() : null

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Get all task
            const result = await this.taskService.getAllTaskService(page, limit, role === "user" ? userId : null, search, status !== 'all' ? status : null)
            if (!result) throw { code: 404, message: "Task not found" }
    
            // Success response
            return res.status(200).json({
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

    public getIncomingTaskController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 14
            const currentDate = typeof req.query.current_date === 'string' ? req.query.current_date.trim() : formatDateTime(new Date())

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Get all task
            const result = await this.taskService.getIncomingTaskService(page, limit, role === "user" ? userId : null, currentDate)
            if (!result) throw { code: 404, message: "Task not found" }
    
            // Success response
            return res.status(200).json({
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

    public getTotalDailyTaskController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const currentDate = typeof req.query.current_date === 'string' ? req.query.current_date.trim() : formatDateTime(new Date())

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Get all task
            const result = await this.taskService.getTotalDailyTaskService(role === "user" ? userId : null, currentDate)
            if (!result) throw { code: 404, message: "Task not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get task successful",
                data: result.data,
                total: result.total,
                average: result.average
            })
        } catch (error: any) {
            next(error)
        }
    }

    public hardDeleteTaskByIdController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Params
            const id = req.params.id as string

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Hard delete task
            const result = await this.taskService.hardDeleteTaskByIdService(userId, id)
            if (!result) throw { code: 404, message: "Task not found" }
    
            // Success response
            return res.status(200).json({
                message: "Delete task successful"
            })
        } catch (error: any) {
            next(error)
        }
    }

    public getTaskTotalContextController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Params
            const context = req.params.context as string

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Get task total context
            const result = await this.taskService.getTaskTotalContextService(context, role === "user" ? userId : null)
            if (!result) throw { code: 404, message: "Task not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get task total context successful",
                data: result
            })
        } catch (error: any) {
            next(error)
        }
    }
}