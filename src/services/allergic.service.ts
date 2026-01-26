import { AllergicRepository } from "../repositories/allergic.repository"

export class AllergicService {
    private allergicRepo: AllergicRepository

    constructor(){
        this.allergicRepo = new AllergicRepository()
    }

    public getAllAllergicService = async (page: number, limit: number, userId: string | null) => {
        // Repo : Find all allergic
        const res = await this.allergicRepo.findAllAllergicRepo(page, limit, userId)
        if (!res || res.data.length === 0) {
            return null
        }
    
        return res
    }
}