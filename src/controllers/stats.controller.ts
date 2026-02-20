import { NextFunction, Request, Response } from "express"
import { extractUserFromLocals } from "../utils/auth.util"
import { StatsService } from "../services/stats.service"
import { formatDateTime } from "../utils/converter"

export class StatsController {
    private statsService: StatsService

    constructor(){
        this.statsService = new StatsService()
    }

    public getFamilyDashboardController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const now: Date = typeof req.query.current_date === 'string' ? new Date(req.query.current_date) : new Date()

            // Get user id
            const { userId } = extractUserFromLocals(res)
    
            // Service : Get family dashboard stats
            const result = await this.statsService.getFamilyDashboardService(userId, now)
            if (!result) throw { code: 404, message: "Stats not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get stats successful",
                data: result
            })
        } catch (error: any) {
            next(error)
        }
    }
}