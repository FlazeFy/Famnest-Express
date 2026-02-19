import { DayName, MealTime } from "../generated/prisma/enums"
import { FamilyRepository } from "../repositories/family.repository"
import { FamilyMemberRepository } from "../repositories/family_member.repository"
import { MealRepository } from "../repositories/meal.repository"
import { MealPrepareByRepository } from "../repositories/meal_prepare_by.repository"
import { MultiRepository } from "../repositories/multi.repository"
import { announcementEmailTemplate } from "../templates/announcement.template"
import { exportToCSV } from "../utils/converter"
import { sendEmail } from "../utils/mailer.util"

export class MealService {
    private multiRepo: MultiRepository
    private mealRepo: MealRepository
    private mealPrepareByRepo: MealPrepareByRepository
    private familyRepo: FamilyRepository
    private familyMemberRepo: FamilyMemberRepository

    constructor(){
        this.multiRepo = new MultiRepository()
        this.mealRepo = new MealRepository()
        this.familyRepo = new FamilyRepository()
        this.mealPrepareByRepo = new MealPrepareByRepository()
        this.familyMemberRepo = new FamilyMemberRepository()
    }

    public getAllMealService = async (userId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) throw { code: 404, message: 'Family not found' }

        // Repo : Find all meal
        const res = await this.mealRepo.findAllMealByFamilyIdRepo(family.id)
        if (!res || res.length === 0) return null
    
        return res
    }

    public getMealTotalContextService = async (context: string, userId: string | null) => {
        // Repo : Find meal context total
        const res = await this.multiRepo.getContextTotalStats(context, userId, 'meal')
        if (!res || res.length === 0) return null
    
        return res
    }

    public postCreateMealService = async (meal_name: string, meal_desc: string | null, meal_time: string, meal_day: string, userId: string, meal_prepare_by: string[]) => {
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

        // Repo : Find family member social contact
        const contact = await this.familyMemberRepo.findFamilyMemberContactRepo(family.id)
        if (contact) {
            for (const dt of contact) {
                // Broadcast email
                await sendEmail(
                    dt.user.email, "New Meal Schedule",
                    announcementEmailTemplate(
                        dt.user.username,
                        `Yay! 🎉 "${meal_name}" is on the menu for ${meal_time} every ${meal_day}.<br>Don't forget to check the family schedule!`
                    )
                )  
            }
        }
        
        // Repo : Create meal
        const meal = await this.mealRepo.createMealRepo(meal_name, meal_desc, dayEnum, timeEnum, family.id, userId)

        // Repo : Create meal prepare by
        for (const dt of meal_prepare_by) {
            await this.mealPrepareByRepo.createMealPrepareByRepo(meal.id, dt, userId)
        }

        return meal
    }

    public hardDeleteMealByIdService = async (userId: string, mealId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) throw { code: 404, message: 'Family not found' }

        // Repo : Delete meal prepare by by meal id
        await this.mealPrepareByRepo.deleteMealPrepareByByMealIdRepo(family.id, mealId)

        // Repo : Delete meal by id
        try {
            return await this.mealRepo.deleteMealByIdRepo(family.id, mealId)
        } catch (error: any) {
            if (error.code === "P2025") return null
            throw error
        }
    }

    public exportAllMealService = async (userId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) throw { code: 404, message: 'Family not found' }

        // Repo : Find all meal
        const res = await this.mealRepo.findAllMealExportRepo(family.id)
        if (!res || res.length === 0) return null

        // Remap for nested object
        const mapped = res.map(item => ({
            meal_name: item.meal_name,
            meal_desc: item.meal_desc,
            meal_day: item.meal_day,
            meal_time: item.meal_time,
            prepares: item.meal_prepare_bys?.map(p => p.user_prepare.username).join(', '),
            created_at: item.created_at
        }))

        // Dataset headers
        const fields = ['meal_name','meal_desc','meal_day','meal_time','prepares','created_at']

        return exportToCSV(mapped, fields)
    }
}