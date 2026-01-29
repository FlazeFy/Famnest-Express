import { FamilyRepository } from "../repositories/family.repository"
import { MealRepository } from "../repositories/meal.repository"

export class MealService {
    private mealRepo: MealRepository
    private familyRepo: FamilyRepository

    constructor(){
        this.mealRepo = new MealRepository()
        this.familyRepo = new FamilyRepository()
    }

    public getAllMealService = async (userId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserId(userId)
        if (!family) return null

        // Repo : Find all meal
        const res = await this.mealRepo.findAllMealByFamilyIdRepo(family.id)
        if (!res || res.length === 0) return null
    
        return res
    }
}