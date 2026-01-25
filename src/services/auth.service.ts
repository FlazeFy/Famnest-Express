import { compare } from "bcrypt"
import { createToken } from "../utils/token.util"
import { AdminRepository } from "../repositories/admin.repository"
import { UserRepository } from "../repositories/user.repository"

export class AuthService {
    private adminRepo: AdminRepository
    private userRepo: UserRepository

    constructor(){
        this.adminRepo = new AdminRepository()
        this.userRepo = new UserRepository()
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
                token
            }
        }
    
        return null
    }
}