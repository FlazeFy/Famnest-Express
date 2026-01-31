import { FamilyRepository } from "../repositories/family.repository"
import { FamilySleepTimeRepository } from "../repositories/family_sleep_time.repository"

export class FamilySleepTimeService {
    private familySleepTimeRepo: FamilySleepTimeRepository
    private familyRepo: FamilyRepository

    constructor(){
        this.familySleepTimeRepo = new FamilySleepTimeRepository()
        this.familyRepo = new FamilyRepository()
    }

    public getFamilySleepTimeService = async (userId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) return null

        // Repo : Find family sleep time
        return await this.familySleepTimeRepo.findFamilySleepTimeByFamilyIdRepo(family.id)
    }

    public hardDeleteFamilySleepTimeService = async (userId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) return null

        // Repo : Delete family sleep time
        return await this.familySleepTimeRepo.deleteFamilySleepTimeByFamilyIdRepo(family.id)
    }
}