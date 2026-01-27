import { AllergicRepository } from "../repositories/allergic.repository"

export class AllergicService {
    private allergicRepo: AllergicRepository

    constructor(){
        this.allergicRepo = new AllergicRepository()
    }

    public getAllAllergicService = async (page: number, limit: number, userId: string | null) => {
        // Repo : Find all allergic
        const res = await this.allergicRepo.findAllAllergicRepo(page, limit, userId)
        if (!res || res.data.length === 0) return null
    
        return res
    }

    public hardDeleteAllergicByIdService = async (id: string, userId: string | null) => {
        // Repo : Check if allergic exist
        const allergic = await this.allergicRepo.findAllergicByIdRepo(id, userId)
        if (!allergic) return null
    
        // Repo : Delete by id
        await this.allergicRepo.deleteAllergicByIdRepo(id, userId)
    
        return allergic
    }
}