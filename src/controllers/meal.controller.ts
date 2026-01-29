import { NextFunction, Request, Response } from "express"
import { MealService } from "../services/meal.service"
import { extractUserFromAuthHeader } from "../utils/auth.util"

export class MealController {
    private mealService: MealService

    constructor(){
        this.mealService = new MealService()
    }

    public getAllMealController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get user id
            const { userId } = extractUserFromAuthHeader(req.headers.authorization)
    
            // Service : Get all meal
            const result = await this.mealService.getAllMealService(userId)
            if (!result) throw { code: 404, message: "Meal not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get meal successful",
                data: result
            })
        } catch (error: any) {
            next(error)
        }
    }
}