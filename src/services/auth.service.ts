import { compare } from "bcrypt"
import { createToken } from "../utils/token.util"
import { AdminRepository } from "../repositories/admin.repository"
import { UserRepository } from "../repositories/user.repository"
import jwt from "jsonwebtoken"
import { FamilyRepository } from "../repositories/family.repository"
import { FamilyMemberRepository } from "../repositories/family_member.repository"

export class AuthService {
    private adminRepo: AdminRepository
    private userRepo: UserRepository
    private familyRepo: FamilyRepository
    private familyMemberRepo: FamilyMemberRepository

    constructor(){
        this.adminRepo = new AdminRepository()
        this.userRepo = new UserRepository()
        this.familyRepo = new FamilyRepository()
        this.familyMemberRepo = new FamilyMemberRepository()
    }

    private findFamilyByUserIdService = async (userId: string) => {
        // Repo : Find family by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)

        // Repo : Find family member by family id
        let familyWithMembers = null
        if (family) {
            const familyMember = await this.familyMemberRepo.findFamilyMemberByFamilyIdRepo(null, null, family.id)
            familyWithMembers = { ...family, familyMember }
        }

        return familyWithMembers
    }

    public loginService = async (email: string, password: string) => {
        // Repo : Check admin first
        const admin = await this.adminRepo.findAdminByEmailRepo(email)
        if (admin) {
            // Validate the password
            const validPassword = await compare(password, admin.password)
            if (!validPassword) return null
    
            // Generate auth token
            const token = createToken({ id: admin.id, role: "admin" })
            return {
                name: admin.username,
                email: admin.email,
                role: "admin",
                token,
            }
        }
    
        // Repo : Check user if not admin
        const user = await this.userRepo.findUserByEmailRepo(email)
        if (user) {
            // Validate the password
            const validPassword = await compare(password, user.password)
            if (!validPassword) return null
    
            // Generate auth token
            const token = createToken({ id: user.id, role: "user" })
            return {
                name: user.username,
                email: user.email,
                role: "user",
                token,
                family: await this.findFamilyByUserIdService(user.id)
            }
        }
    
        return null
    }

    public refreshTokenService = async (refreshToken: string) => {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.SECRET || "secret")
        if (typeof decoded === "string" || !("id" in decoded)) {
            return null
        }

        const id = decoded.id

        // Repo : Check admin first
        const admin = await this.adminRepo.findAdminByIdRepo(id)
        if (admin) {
            // Generate auth token
            const token = createToken({ id: id, role: "admin" }, "7d")
            return {
                name: admin.username,
                email: admin.email,
                role: "admin",
                token,
            }
        }

        // Repo : Check user if not admin
        const user = await this.userRepo.findUserByIdRepo(id)
        if (user) {
            // Generate auth token
            const token = createToken({ id: id, role: "user" }, "7d")
            return {
                name: user.username,
                email: user.email,
                role: "user",
                token,
                family: await this.findFamilyByUserIdService(user.id)
            }
        }

        return null
    }
}