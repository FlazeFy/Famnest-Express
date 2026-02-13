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

        // Dataset headers
        const fields = userId ? ['history_context', 'history_type', 'created_at'] : ['history_context', 'history_type', 'created_at', 'user.username']
    
        return exportToCSV(res, fields)
    }

    public hardDeleteHistoryByIdService = async (id: string, created_by: string) => {
        // Repo : Find history by id
        const history = await this.historyRepo.findHistoryByIdRepo(id, created_by)
        if (!history) return null
    
        // Repo : Delete history by id
        await this.historyRepo.hardDeleteHistoryByIdRepo(id, created_by)
    
        return history
    }

    public hardDeleteAllHistoryService = async (created_by: string) => {
        // Repo : Delete history by id
        return await this.historyRepo.hardDeleteHistoryByIdRepo(null, created_by)
    }
}