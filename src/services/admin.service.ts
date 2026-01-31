import { AdminRepository } from "../repositories/admin.repository"

export class AdminService {
    private adminRepo: AdminRepository

    constructor(){
        this.adminRepo = new AdminRepository()
    }

    public getAdminByIdService = async (id: string) => {
        // Repo : Find admin by id
        return await this.adminRepo.findAdminByIdRepo(id)
    }
}