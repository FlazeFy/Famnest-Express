import { UserRepository } from "../repositories/user.repository"

export class UserService {
    private userRepo: UserRepository

    constructor(){
        this.userRepo = new UserRepository()
    }

    public getUserByIdService = async (id: string) => {
        // Repo : Find user by id
        const res = await this.userRepo.findUserByIdRepo(id)
        if (!res) {
            return null
        }

        return res
    }
}