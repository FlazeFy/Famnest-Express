import { NextFunction, Request, Response } from "express"
import { FeedbackService } from "../services/feedback.service"
import { extractUserFromAuthHeader } from "../utils/auth.util"

export class FeedbackController {
    private feedbackService: FeedbackService

    constructor(){
        this.feedbackService = new FeedbackService()
    }

    public getAllFeedbackController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 14

            // Get user id
            const { userId, role } = extractUserFromAuthHeader(req.headers.authorization)
            if (!role){
                return res.status(404).json({
                    message: "Role not valid"
                })
            }
    
            // Service : Get all feedback
            const result = await this.feedbackService.getAllFeedbackService(page, limit, role)
            if (!result) {
                return res.status(404).json({
                    message: "Feedback not found"
                })
            }
    
            // Success response
            res.status(200).json({
                message: "Get feedback successful",
                data: result.data,
                meta: {
                    page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
                },
            })
        } catch (error: any) {
            next(error)
        }
    }

    public getRandomFeedbackController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const limit = Number(req.query.limit) || 3
    
            // Service : Get random feedback
            const result = await this.feedbackService.getRandomFeedbackService(limit)
            if (!result) {
                return res.status(404).json({
                    message: "Feedback not found"
                })
            }
    
            // Success response
            res.status(200).json({
                message: "Get feedback successful",
                data: result,
            })
        } catch (error: any) {
            next(error)
        }
    }
}