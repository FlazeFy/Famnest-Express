import { NextFunction, Request, Response } from "express"
import { FamilySleepTimeService } from "../services/family_sleep_time.service"
import { extractUserFromAuthHeader } from "../utils/auth.util"

export class FamilySleepTimeController {
    private familySleepTimeService: FamilySleepTimeService

    constructor(){
        this.familySleepTimeService = new FamilySleepTimeService()
    }

    public getFamilySleepTimeController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get user id
            const { userId, role } = extractUserFromAuthHeader(req.headers.authorization)
    
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
}