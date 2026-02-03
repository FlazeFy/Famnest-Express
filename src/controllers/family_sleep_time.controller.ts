import { NextFunction, Request, Response } from "express"
import { FamilySleepTimeService } from "../services/family_sleep_time.service"
import { extractUserFromLocals } from "../utils/auth.util"

export class FamilySleepTimeController {
    private familySleepTimeService: FamilySleepTimeService

    constructor(){
        this.familySleepTimeService = new FamilySleepTimeService()
    }

    public getFamilySleepTimeController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Get family sleep time
            const result = await this.familySleepTimeService.getFamilySleepTimeService(userId)
            if (!result) throw { code: 404, message: "Family sleep time not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get family sleep time successful",
                data: result
            })
        } catch (error: any) {
            next(error)
        }
    }

    public postCreateSleepTimeByIdController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Request body
            const { hour_start, hour_end } = req.body

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Create sleep time
            const result = await this.familySleepTimeService.createFamilySleepTimeService(userId, hour_start, hour_end)
            if (!result) throw { code: 500, message: "Something went wrong" }
    
            // Success response
            return res.status(201).json({
                message: "Sleep time created",
                data: result
            })
        } catch (error: any) {
            next(error)
        }
    }

    public hardDeleteSleepTimeByIdController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Hard delete sleep time
            const result = await this.familySleepTimeService.hardDeleteFamilySleepTimeService(userId)
            if (!result || result.count === 0) throw { code: 404, message: "Sleep time not found" }
    
            // Success response
            return res.status(200).json({
                message: "Delete sleep time successful"
            })
        } catch (error: any) {
            next(error)
        }
    }
}