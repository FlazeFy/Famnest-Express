import { NextFunction, Request, Response } from "express"
import { AllergicService } from "../services/allergic.service"
import { validate as isUuid } from "uuid"
import { extractUserFromAuthHeader } from "../utils/auth.util"

export class AllergicController {
    private allergicService: AllergicService

    constructor(){
        this.allergicService = new AllergicService()
    }

    public getAllAllergic = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 14

            // Get user id
            const { userId, role } = extractUserFromAuthHeader(req.headers.authorization)
    
            // Service : Get all allergic
            const result = await this.allergicService.getAllAllergicService(page, limit, role === "user" ? userId : null)
            if (!result) {
                return res.status(404).json({
                    message: "Allergic not found"
                })
            }
    
            // Success response
            res.status(200).json({
                message: "Get allergic successful",
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