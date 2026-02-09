import { NextFunction, Request, Response } from "express"
import { extractUserFromLocals } from "../utils/auth.util"
import { MealFeedbackService } from "../services/meal_feedback.service"

export class MealFeedbackController {
    private mealFeedbackService: MealFeedbackService

    constructor(){
        this.mealFeedbackService = new MealFeedbackService()
    }

    public getAllMealFeedbackByMealIdController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 14
            // Param
            const meal_id = req.params.meal_id as string
            // Get user id
            const { userId } = extractUserFromLocals(res)
    
            // Service : Get all meal
            const result = await this.mealFeedbackService.getAllMealFeedbackByMealIdService(page, limit, userId, meal_id)
            if (!result) throw { code: 404, message: "Meal feedback not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get meal feedback successful",
                data: result.data,
                meta: {
                    page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
                },
            })
        } catch (error: any) {
            next(error)
        }
    }

    public getLastMealFeedbackController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get user id
            const { userId } = extractUserFromLocals(res)
    
            // Service : Get last meal
            const result = await this.mealFeedbackService.getLastMealFeedbackService(userId)
            if (!result) throw { code: 404, message: "Meal feedback not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get meal feedback successful",
                data: result
            })
        } catch (error: any) {
            next(error)
        }
    }
}