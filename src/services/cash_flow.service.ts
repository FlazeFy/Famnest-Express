import { FamilyRepository } from "../repositories/family.repository"
import { CashFlowRepository } from "../repositories/cash_flow.repository"

export class CashFlowService {
    private cashFlowRepo: CashFlowRepository
    private familyRepo: FamilyRepository

    constructor(){
        this.cashFlowRepo = new CashFlowRepository()
        this.familyRepo = new FamilyRepository()
    }

    public getAllCashFlowService = async (page: number, limit: number, userId: string | null) => {
        let familyId: string | null =  null

        if (userId) {
            // Repo : Find family id by user id
            const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
            if (!family) return null

            familyId = family.id
        }

        // Repo : Find all cash flow
        const res = await this.cashFlowRepo.findAllCashFlowRepo(page, limit, familyId)
        if (!res || res.data.length === 0) return null
    
        return res
    }

    public getTotalDailyCashFlowService = async (userId: string | null, currentDate: string) => {
        let familyId: string | null =  null

        if (userId) {
            // Repo : Find family id by user id
            const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
            if (!family) return null

            familyId = family.id
        }

        // Repo : Sum cash flow per day
        return await this.cashFlowRepo.sumCashFlowLastWeekRepo(familyId, currentDate)
    }
}