import { AdminRepository } from "../repositories/admin.repository"

export class AdminService {
    private adminRepo: AdminRepository

    constructor(){
        this.adminRepo = new AdminRepository()
    }

    // Repo : Find admin by id
    public getAdminByIdService = async (id: string) => await this.adminRepo.findAdminByIdRepo(id)
}