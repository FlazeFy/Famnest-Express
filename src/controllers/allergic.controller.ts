import { NextFunction, Request, Response } from "express"
import { AllergicService } from "../services/allergic.service"
import { validate as isUuid } from "uuid"
import { extractUserFromLocals } from "../utils/auth.util"

export class AllergicController {
    private allergicService: AllergicService

    constructor(){
        this.allergicService = new AllergicService()
    }

    public getAllAllergicController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 14

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Get all allergic
            const result = await this.allergicService.getAllAllergicService(page, limit, role === "user" ? userId : null)
            if (!result) throw { code: 404, message: "Allergic not found" }
    
            // Success response
            return res.status(200).json({
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

    public postCreateAllergic = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Request body
            const { allergic_context, allergic_desc } = req.body
    
            // Get user id
            const { userId } = extractUserFromLocals(res)
    
            // Service : Create allergic
            const result = await this.allergicService.postCreateAllergicService(allergic_context, allergic_desc, userId)
            if (!result) throw { code: 500, message: "Something went wrong" }
    
            // Success response
            return res.status(201).json({
                message: "Allergic created"
            })
        } catch (error: any) {
            next(error)
        }
    }

    public hardDeleteAllergicByIdController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Param
            const id = req.params.id as string

            // Validate : UUID
            if (!isUuid(id)) throw { code: 400, message: "Invalid UUID format" }

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Hard delete allergic by id
            const result = await this.allergicService.hardDeleteAllergicByIdService(id, role === "user" ? userId : null)
            if (!result) throw { code: 404, message: "Allergic not found" }
    
            // Success response
            return res.status(200).json({
                message: "Delete allergic successful",
                data: result,
            })
        } catch (error: any) {
            next(error)
        }
    }
}