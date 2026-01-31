import { NextFunction, Request, Response } from "express"
import { FamilyMemberService } from "../services/family_member.service"
import { extractUserFromAuthHeader } from "../utils/auth.util"

export class FamilyMemberController {
    private familyMemberService: FamilyMemberService

    constructor(){
        this.familyMemberService = new FamilyMemberService()
    }

    public getAllFamilyMemberController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 14
    
            // Get user id
            const { userId, role } = extractUserFromAuthHeader(req.headers.authorization)
    
            // Service : Get all family member
            const result = await this.familyMemberService.getAllFamilyMemberService(page, limit, userId)
            if (!result) throw { code: 404, message: "Family member not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get family member successful",
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