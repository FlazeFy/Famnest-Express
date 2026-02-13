import { FamilyRepository } from "../repositories/family.repository"
import { CashFlowRepository } from "../repositories/cash_flow.repository"
import { exportToCSV, formatDateTime } from "../utils/converter"
import { CashFlowCategory, CashFlowType } from "../generated/prisma/enums"

export class CashFlowService {
    private cashFlowRepo: CashFlowRepository
    private familyRepo: FamilyRepository

    constructor(){
        this.cashFlowRepo = new CashFlowRepository()
        this.familyRepo = new FamilyRepository()
    }

    public getAllCashFlowService = async (page: number, limit: number, userId: string | null, search: string | null, category: string | null, type: string | null) => {
        let familyId: string | null =  null

        if (userId) {
            // Repo : Find family id by user id
            const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
            if (!family) return null

            familyId = family.id
        }

        // Repo : Find all cash flow
        const res = await this.cashFlowRepo.findAllCashFlowRepo(page, limit, familyId, search, category, type)
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

    public getTotalCashFlowPerCategoryService = async (userId: string) => {
        let familyId: string 

        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) return null

        familyId = family.id

        // Repo : Sum cash flow per day
        const income = await this.cashFlowRepo.sumCashFlowForEveryMemberRepo(familyId, CashFlowCategory.income)
        const spending = await this.cashFlowRepo.sumCashFlowForEveryMemberRepo(familyId, CashFlowCategory.spending)
        const comparison = await this.cashFlowRepo.sumCashFlowByCategoryRepo(familyId)
        
        return { income, spending, comparison }
    }

    public hardDeleteCashFlowByIdService = async (id: string, userId: string) => {
        // Repo : Delete cash flow by id
        try {
            return await this.cashFlowRepo.deleteCashFlowByIdRepo(id, userId)
        } catch (error: any) {
            if (error.code === "P2025") return null
            throw error
        }
    }

    public exportAllCashFlowService = async (userId: string | null) => {
        // Repo : Find all cash flow
        const res = await this.cashFlowRepo.findAllCashFlowExportRepo(userId)
        if (!res || res.length === 0) return null

        // Remap for nested object
        const mapped = res.map(item => ({
            flow_type: item.flow_type,
            flow_context: item.flow_context,
            flow_desc: item.flow_desc,
            flow_category: item.flow_category,
            flow_amount: item.flow_amount,
            tags: item.tags?.join(', '),
            created_at: item.created_at,
            ...(userId ? {} : { created_by_username: item.user?.username })
        }))
    
        // Dataset headers
        const fields = userId ? ['flow_type','flow_context','flow_desc','flow_category','flow_amount','tags','created_at']
            : ['flow_type','flow_context','flow_desc','flow_category','flow_amount','tags','created_at','created_by_username']
    
        return exportToCSV(mapped, fields)
    }
}