import { HistoryRepository } from "../repositories/history.repository"

export class HistoryService {
    private historyRepo: HistoryRepository

    constructor(){
        this.historyRepo = new HistoryRepository()
    }

    public getAllHistoryService = async (page: number, limit: number, userId: string | null) => {
        // Repo : Find all history
        const res = await this.historyRepo.findAllHistoryRepo(page, limit, userId)
        if (!res || res.data.length === 0) return null
    
        return res
    }

    public hardDeleteHistoryByIdService = async (id: string, created_by: string) => {
        // Repo : Find history by id
        const history = await this.historyRepo.findHistoryByIdRepo(id, created_by)
        if (!history) return null
    
        // Repo : Delete history by id
        await this.historyRepo.hardDeleteHistoryByIdRepo(id, created_by)
    
        return history
    }
}