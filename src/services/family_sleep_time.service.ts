import { FamilyRepository } from "../repositories/family.repository"
import { FamilyMemberRepository } from "../repositories/family_member.repository"
import { FamilySleepTimeRepository } from "../repositories/family_sleep_time.repository"
import { announcementEmailTemplate } from "../templates/announcement.template"
import { sendEmail } from "../utils/mailer.util"

export class FamilySleepTimeService {
    private familySleepTimeRepo: FamilySleepTimeRepository
    private familyRepo: FamilyRepository
    private familyMemberRepo: FamilyMemberRepository

    constructor(){
        this.familySleepTimeRepo = new FamilySleepTimeRepository()
        this.familyRepo = new FamilyRepository()
        this.familyMemberRepo = new FamilyMemberRepository()
    }

    public createFamilySleepTimeService = async (userId: string, hour_start: string, hour_end: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) throw { code: 404, message: 'Family not found' }

        // Repo : Create family sleep time
        const res = await this.familySleepTimeRepo.createFamilySleepTimeRepo(userId, family.id, hour_start, hour_end)
        if (!res) return null

        // Repo : Find family member social contact
        const contact = await this.familyMemberRepo.findFamilyMemberContactRepo(family.id)
        if (contact) {
            for (const dt of contact) {
                // Broadcast email
                await sendEmail(
                    dt.user.email, "New Sleep Time Schedule",
                    announcementEmailTemplate(
                        dt.user.username,
                        `Your family has set a shared sleep time from ${hour_start} to ${hour_end}. 🌙<br>Let's all get some good rest together!`
                    )
                )  
            }
        }
        
        return res
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
        if (!family) throw { code: 404, message: 'Family not found' }

        // Repo : Delete family sleep time
        return await this.familySleepTimeRepo.deleteFamilySleepTimeByFamilyIdRepo(family.id)
    }
}