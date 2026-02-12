import { MultiRepository } from "../repositories/multi.repository"

export class ScheduleService {
    private multiRepo: MultiRepository

    constructor(){
        this.multiRepo = new MultiRepository()
    }

    public getScheduleTotalContextService = async (context: string, userId: string | null) => {
        // Repo : Find schedule context total
        const res = await this.multiRepo.getContextTotalStats(context, userId, 'schedule')
        if (!res || res.length === 0) return null
    
        return res
    }
}