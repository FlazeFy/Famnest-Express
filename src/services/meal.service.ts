import { DayName, MealTime } from "../generated/prisma/enums"
import { FamilyRepository } from "../repositories/family.repository"
import { MealRepository } from "../repositories/meal.repository"
import { MealPrepareByRepository } from "../repositories/meal_prepare_by.repository"

export class MealService {
    private mealRepo: MealRepository
    private mealPrepareByRepo: MealPrepareByRepository
    private familyRepo: FamilyRepository

    constructor(){
        this.mealRepo = new MealRepository()
        this.familyRepo = new FamilyRepository()
        this.mealPrepareByRepo = new MealPrepareByRepository()
    }

    public getAllMealService = async (userId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) return null

        // Repo : Find all meal
        const res = await this.mealRepo.findAllMealByFamilyIdRepo(family.id)
        if (!res || res.length === 0) return null
    
        return res
    }

    public postCreateMealService = async (meal_name: string, meal_desc: string | null, meal_time: string, meal_day: string, userId: string) => {
        const dayEnum = DayName[meal_day as keyof typeof DayName]
        const timeEnum = MealTime[meal_time as keyof typeof MealTime]
        
        if (!dayEnum) throw { code: 400, message: 'Invalid day_name' }
        if (!timeEnum) throw { code: 400, message: 'Invalid time' }

        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) throw { code: 404, message: 'Family not found' }
        
        // Repo : Find meal by meal name and user id
        const isExist = await this.mealRepo.findMealByNameDayTimeFamilyIdRepo(meal_name, dayEnum, timeEnum, family.id)
        if (isExist) throw { code: 409, message: 'Meal is already exist' }
        
        // Repo : Create meal
        return await this.mealRepo.createMealRepo(meal_name, meal_desc, dayEnum, timeEnum, family.id, userId)
    }

    public hardDeleteMealByIdService = async (userId: string, mealId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) return null

        // Repo : Delete meal prepare by by meal id
        await this.mealPrepareByRepo.deleteMealPrepareByByMealIdRepo(family.id, mealId)

        // Repo : Delete meal by id
        try {
            console.log(`${family.id}, ${mealId}`)
            return await this.mealRepo.deleteMealByIdRepo(family.id, mealId)
        } catch (error: any) {
            if (error.code === "P2025") return null
            throw error
        }
    }
}