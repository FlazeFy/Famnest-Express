import { NextFunction, Request, Response } from "express"
import { HistoryService } from "../services/history.service"
import { extractUserFromAuthHeader } from "../utils/auth.util"

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
            const { userId, role } = extractUserFromAuthHeader(req.headers.authorization)
    
            // Service : Get all history
            const result = await this.historyService.getAllHistoryService(page, limit, role === "user" ? userId : null)
            if (!result) {
                return res.status(404).json({
                    message: "History not found"
                })
            }
    
            // Success response
            res.status(200).json({
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
}