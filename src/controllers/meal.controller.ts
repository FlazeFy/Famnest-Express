import { NextFunction, Request, Response } from "express"
import { MealService } from "../services/meal.service"
import { extractUserFromLocals } from "../utils/auth.util"

export class MealController {
    private mealService: MealService

    constructor(){
        this.mealService = new MealService()
    }

    public getAllMealController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get user id
            const { userId } = extractUserFromLocals(res)
    
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

    public getMealTotalContextController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Params
            const context = req.params.context as string

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Get meal total context
            const result = await this.mealService.getMealTotalContextService(context, role === "user" ? userId : null)
            if (!result) throw { code: 404, message: "Meal not found" }
    
            // Success response
            return res.status(200).json({
                message: "Get meal total context successful",
                data: result
            })
        } catch (error: any) {
            next(error)
        }
    }

    public postCreateMealController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Request body
            const { meal_name, meal_desc, meal_time, meal_day, meal_prepare_by } = req.body
    
            // Get user id
            const { userId } = extractUserFromLocals(res)
    
            // Service : Create meal
            const result = await this.mealService.postCreateMealService(meal_name, meal_desc, meal_time, meal_day, userId, meal_prepare_by)
            if (!result) throw { code: 500, message: "Something went wrong" }
    
            // Success response
            return res.status(201).json({
                message: "Meal created"
            })
        } catch (error: any) {
            next(error)
        }
    }

    public hardDeleteMealByIdController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Params
            const id = req.params.id as string

            // Get user id
            const { userId, role } = extractUserFromLocals(res)
    
            // Service : Hard delete meal
            const result = await this.mealService.hardDeleteMealByIdService(userId, id)
            if (!result) throw { code: 404, message: "Meal not found" }
    
            // Success response
            return res.status(200).json({
                message: "Delete meal successful"
            })
        } catch (error: any) {
            next(error)
        }
    }

    // Export dataset controller
    public exportMealController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get user id
            const { userId } = extractUserFromLocals(res)
    
            // Service : Export meal as CSV
            const result = await this.mealService.exportAllMealService(userId)
            if (!result) throw { code: 404, message: "Meal not found" }
    
            // Success response
            res.header('Content-Type','text/csv')
            res.attachment(`meal_export.csv`)
            return res.send(result)
        } catch (error: any) {
            next(error)
        }
    }
}