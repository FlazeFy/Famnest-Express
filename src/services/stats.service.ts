import { FamilyRepository } from "../repositories/family.repository"
import { FamilyMemberRepository } from "../repositories/family_member.repository"
import { MealRepository } from "../repositories/meal.repository"
import { ScheduleRepository } from "../repositories/schedule.repository"

export class StatsService {
    private familyRepo: FamilyRepository
    private scheduleRepo: ScheduleRepository
    private familyMemberRepo: FamilyMemberRepository
    private mealRepo: MealRepository

    constructor(){
        this.familyRepo = new FamilyRepository()
        this.familyMemberRepo = new FamilyMemberRepository()
        this.scheduleRepo = new ScheduleRepository()
        this.mealRepo = new MealRepository()
    }

    public getFamilyDashboardService = async (userId: string, now: Date) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) throw { code: 404, message: 'Family not found' }

        const res: any = {}
        // Repo : Find next activity
        res['next_schedule'] = await this.scheduleRepo.findNearestScheduleRepo(family.id, now)

        // Repo : Find family member
        const familyMembers = await this.familyMemberRepo.findFamilyMemberByFamilyIdRepo(null, null, family.id, null)
        res['total_family_member'] = familyMembers.total

        // Repo : Find next meal
        res['next_meal'] = await this.mealRepo.findNearestMealRepo(family.id, now)

        return res
    }
}