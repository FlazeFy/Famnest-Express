import { FamilyRepository } from "../repositories/family.repository"
import { FamilyMemberRepository } from "../repositories/family_member.repository"

export class FamilyMemberService {
    private familyMemberRepo: FamilyMemberRepository
    private familyRepo: FamilyRepository

    constructor(){
        this.familyMemberRepo = new FamilyMemberRepository()
        this.familyRepo = new FamilyRepository()
    }

    public getAllFamilyMemberService = async (page: number, limit: number, userId: string, search: string | null) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) return null

        // Repo : Find all family member
        const res = await this.familyMemberRepo.findFamilyMemberByFamilyIdRepo(page, limit, family.id, search)
        if (!res || res.data.length === 0) return null
    
        return res
    }
}