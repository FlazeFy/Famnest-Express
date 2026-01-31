import { FamilyRepository } from "../repositories/family.repository"
import { FamilyMemberRepository } from "../repositories/family_member.repository"
import { UserRepository } from "../repositories/user.repository"

export class UserService {
    private userRepo: UserRepository
    private familyRepo: FamilyRepository
    private familyMemberRepo: FamilyMemberRepository

    constructor(){
        this.userRepo = new UserRepository()
        this.familyRepo = new FamilyRepository()
        this.familyMemberRepo = new FamilyMemberRepository()
    }

    public getUserByIdService = async (id: string) => {
        // Repo : Find user by id
        let user = await this.userRepo.findUserByIdRepo(id)
        if (!user) return null 

        // Repo : Find family by user id
        const family = await this.familyRepo.findFamilyByUserId(id)

        // Repo : Find family member by family id
        let familyWithMembers = null
        if (family) {
            const familyMember = await this.familyMemberRepo.findFamilyMemberByFamilyId(null, null, family.id)
            familyWithMembers = { ...family, familyMember }
        }

        return { ...user, family: familyWithMembers }
    }
}