import { NextFunction, Request, Response } from "express"
import { HistoryService } from "../services/history.service"
import { extractUserFromLocals } from "../utils/auth.util"
import { validate as isUuid } from "uuid"

export class HistoryController {
    private historyService: HistoryService

    constructor(){
        this.historyService = new HistoryService()
    }

    public getAllHistoryController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 14
    
            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Get all history
            const result = await this.historyService.getAllHistoryService(page, limit, role === "user" ? userId : null)
            if (!result) throw { code: 404, message: "History not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get history successful",
                data: result.data,
                meta: {
                    page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
                },
            })
        } catch (error: any) {
            next(error)
        }
    }

    public hardDeleteHistoryByIdController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Param
            const { id } = req.params

            // Validate : UUID
            if (!isUuid(id)) throw { code: 400, message: "Invalid UUID format" }
    
            // Get user id
            const { userId } = extractUserFromLocals(res)
    
            // Service : Hard delete history by id
            const result = await this.historyService.hardDeleteHistoryByIdService(id as string, userId)
            if (!result) throw { code: 404, message: "History not found" }
    
            // Success response
            return res.status(200).json({
                message: "Delete history successful"
            })
        } catch (error: any) {
            next(error)
        }
    }

    public hardDeleteAllHistoryController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get user id
            const { userId } = extractUserFromLocals(res)
    
            // Service : Hard delete history by id
            const result = await this.historyService.hardDeleteAllHistoryService(userId)
            if (!result) throw { code: 404, message: "History not found" }
    
            // Success response
            return res.status(200).json({
                message: "Delete all history successful"
            })
        } catch (error: any) {
            next(error)
        }
    }

    // Export dataset controller
    public exportHistoryController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Export history as CSV
            const result = await this.historyService.exportAllHistoryService(role === "user" ? userId : null)
            if (!result) throw { code: 404, message: "History not found" }
    
            // Success response
            res.header('Content-Type','text/csv')
            res.attachment(`history_export${role === 'admin' ? '_all':''}.csv`)
            return res.send(result)
        } catch (error: any) {
            next(error)
        }
    }
}