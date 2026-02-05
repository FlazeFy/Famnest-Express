import { NextFunction, Request, Response } from "express"
import { CashFlowService } from "../services/cash_flow.service"
import { extractUserFromLocals } from "../utils/auth.util"
import { formatDateTime } from "../utils/converter"

export class CashFlowController {
    private cashFlowService: CashFlowService

    constructor(){
        this.cashFlowService = new CashFlowService()
    }

    public getAllCashFlowController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 14

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Get all cash flow
            const result = await this.cashFlowService.getAllCashFlowService(page, limit, role === "user" ? userId : null)
            if (!result) throw { code: 404, message: "Cash flow not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get cash flow successful",
                data: result.data,
                meta: {
                    page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
                },
            })
        } catch (error: any) {
            next(error)
        }
    }

    public getTotalDailyCashFlowController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const currentDate = typeof req.query.current_date === 'string' ? req.query.current_date.trim() : formatDateTime(new Date())

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Get all cash flow
            const result = await this.cashFlowService.getTotalDailyCashFlowService(role === "user" ? userId : null, currentDate)
            if (!result) throw { code: 404, message: "Cash flow not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get cash flow successful",
                data: result.data,
                total: result.total,
                average: result.average
            })
        } catch (error: any) {
            next(error)
        }
    }
}