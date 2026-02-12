import { NextFunction, Request, Response } from "express"
import { ScheduleService } from "../services/schedule.service"
import { extractUserFromLocals } from "../utils/auth.util"

export class ScheduleController {
    private scheduleService: ScheduleService

    constructor(){
        this.scheduleService = new ScheduleService()
    }

    public getScheduleTotalContextController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Params
            const context = req.params.context as string

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Get schedule total context
            const result = await this.scheduleService.getScheduleTotalContextService(context, role === "user" ? userId : null)
            if (!result) throw { code: 404, message: "Schedule not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get schedule total context successful",
                data: result
            })
        } catch (error: any) {
            next(error)
        }
    }
}