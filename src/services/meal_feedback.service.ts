import { FamilyRepository } from "../repositories/family.repository"
import { MealRepository } from "../repositories/meal.repository"
import { MealFeedbackRepository } from "../repositories/meal_feedback.repository"

export class MealFeedbackService {
    private mealRepo: MealRepository
    private familyRepo: FamilyRepository
    private mealFeedbackRepo: MealFeedbackRepository

    constructor(){
        this.mealRepo = new MealRepository()
        this.familyRepo = new FamilyRepository()
        this.mealFeedbackRepo = new MealFeedbackRepository()
    }

    public getAllMealFeedbackByMealIdService = async (page: number, limit: number, userId: string, mealId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) throw { code: 404, message: 'Family not found' }

        // Repo : Find meal by id
        const isExist = await this.mealRepo.findMealByIdRepo(family.id, mealId)
        if (!isExist) throw { code: 404, message: 'Meal not found' }

        // Repo : Find all meal feedback by meal id
        const res = await this.mealFeedbackRepo.findMealFeedbackByMealIdRepo(page, limit, mealId, family.id)
        if (!res || res.data.length === 0) return null
    
        return res
    }

    public getLastMealFeedbackService = async (userId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) throw { code: 404, message: 'Family not found' }

        // Repo : Find last meal feedback
        const res = await this.mealFeedbackRepo.findLastMealFeedbackRepo(family.id)
        if (!res) return null
    
        return res
    }
}