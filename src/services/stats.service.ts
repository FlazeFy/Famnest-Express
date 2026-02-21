import { CashFlowRepository } from "../repositories/cash_flow.repository"
import { EventRepository } from "../repositories/event.repository"
import { FamilyRepository } from "../repositories/family.repository"
import { FamilyMemberRepository } from "../repositories/family_member.repository"
import { FamilySleepTimeRepository } from "../repositories/family_sleep_time.repository"
import { MealRepository } from "../repositories/meal.repository"
import { ScheduleRepository } from "../repositories/schedule.repository"

export class StatsService {
    private familyRepo: FamilyRepository
    private scheduleRepo: ScheduleRepository
    private familyMemberRepo: FamilyMemberRepository
    private mealRepo: MealRepository
    private familySleepTimeRepo: FamilySleepTimeRepository
    private cashFlowRepo: CashFlowRepository
    private eventRepo: EventRepository

    constructor(){
        this.familyRepo = new FamilyRepository()
        this.familyMemberRepo = new FamilyMemberRepository()
        this.scheduleRepo = new ScheduleRepository()
        this.mealRepo = new MealRepository()
        this.familySleepTimeRepo = new FamilySleepTimeRepository()
        this.cashFlowRepo = new CashFlowRepository()
        this.eventRepo = new EventRepository()
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

        // Repo : Find family sleep time
        res['family_sleep_time'] = await this.familySleepTimeRepo.findFamilySleepTimeByFamilyIdRepo(family.id)

        // Repo : Count family assets
        res['family_assets'] = await this.cashFlowRepo.countFamilyAsset(family.id)

        // Repo : Find next event
        res['next_event'] = await this.eventRepo.findNearestEventRepo(family.id, now)

        return res
    }
}