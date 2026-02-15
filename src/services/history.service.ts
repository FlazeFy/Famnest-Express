import { HistoryRepository } from "../repositories/history.repository"
import { exportToCSV } from "../utils/converter"

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

    public exportAllHistoryService = async (userId: string | null) => {
        // Repo : Find all history
        const res = await this.historyRepo.findAllHistoryExportRepo(userId)
        if (!res || res.length === 0) return null
    
        // Remap for nested object
        const mapped = res.map(item => ({
            history_context: item.history_context,
            history_type: item.history_type,
            created_at: item.created_at,
            ...(userId ? {} : { created_by_username: item.user?.username })
        }))
    
        // Dataset headers
        const fields = userId ? ['history_context','history_type','created_at'] : ['history_context','history_type','created_at','created_by_username']
    
        return exportToCSV(mapped, fields)
    }

    public hardDeleteHistoryByIdService = async (id: string, created_by: string) => {
        // Repo : Find history by id
        const history = await this.historyRepo.findHistoryByIdRepo(id, created_by)
        if (!history) return null
    
        // Repo : Delete history by id
        await this.historyRepo.hardDeleteHistoryByIdRepo(id, created_by)
    
        return history
    }

    // Repo : Delete history by id
    public hardDeleteAllHistoryService = async (created_by: string) => await this.historyRepo.hardDeleteHistoryByIdRepo(null, created_by)
}