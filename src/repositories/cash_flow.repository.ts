import { prisma } from '../configs/prisma'
import { CashFlowCategory } from '../generated/prisma/enums'
import { dayKey, dayLabel, getLast7Days, getLast7Months, monthKey, monthLabel } from '../utils/generator.util'

export class CashFlowRepository {
    public findAllCashFlowRepo = async (page: number, limit: number, familyId: string | null, search: string | null, category: string | null, type: string | null) => {
        const skip = (page - 1) * limit
        const whereClause: any = {}

        if (familyId) {
            whereClause.user = {
                family_members: {
                    some: { family_id: familyId }
                }
            }
        }
        if (category) whereClause.flow_category = category
        if (type) whereClause.flow_type = type
        if (search) {
            whereClause.OR = [
                { flow_context: { contains: search, mode: "insensitive" } },
                { flow_desc: { contains: search, mode: "insensitive" } }
            ]
        }

        const [data, total] = await Promise.all([
            prisma.cash_flow.findMany({
                where: whereClause,
                skip,
                take: limit,
                select: {
                    id: true, flow_type: true, flow_context: true, flow_desc: true, flow_category: true, flow_amount: true, tags: true, created_at: true, updated_at: true,
                    user: {
                        select: {
                            id: true, username: true, fullname: true
                        }
                    }
                },
                orderBy: { created_at: "desc" }
            }),
            prisma.cash_flow.count({ 
                where: whereClause
            }),
        ])

        return { data, total }
    }

    public sumCashFlowLastWeekRepo = async (familyId: string | null, currentDate: string) => {
        const nDays = 7
        const endDate = new Date(currentDate)
        endDate.setHours(23, 59, 59, 999)
        const startDate = new Date(endDate)
        startDate.setDate(startDate.getDate() - (nDays - 1))
        startDate.setHours(0, 0, 0, 0)

        const cashFlows = await prisma.cash_flow.findMany({
            where: {
                ...(familyId
                        ? {
                            user: {
                                family_members: {
                                    some: { family_id: familyId }
                                }
                            }
                        }
                    : {}),
                created_at: {
                    gte: startDate,
                    lte: endDate
                }
            },
            select: {
                created_at: true,
                flow_amount: true
            }
        })
        
        const map = new Map<string, number>()

        // Aggregate
        for (const cashFlow of cashFlows) {
            const key = cashFlow.created_at.toISOString().slice(0, 10)
            map.set(key, (map.get(key) ?? 0) + cashFlow.flow_amount)
        }

        const data: { context: string; total: number }[] = []
        let total = 0

        // Ensure all days exist
        for (let i = 0; i < nDays; i++) {
            const d = new Date(endDate)
            d.setDate(endDate.getDate() - i)

            const key = d.toISOString().slice(0, 10)
            const count = map.get(key) ?? 0

            total += count

            data.push({
                context: d.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit'
                }),
                total: count
            })
        }

        return { data, total, average: Number((total / nDays).toFixed(2)) }
    } 

    public sumCashFlowForEveryMemberRepo = async (familyId: string, flowCategory: CashFlowCategory) => {
        const isIncome = flowCategory === CashFlowCategory.income
    
        // Set date range
        const ranges = isIncome ? getLast7Months() : getLast7Days()
        const keys = ranges.map(isIncome ? monthKey : dayKey)
        const categories = ranges.map(isIncome ? monthLabel : dayLabel)
    
        const startDate = ranges[0]
        const endDate = new Date()
        endDate.setHours(23, 59, 59, 999)
    
        // Query
        const rows = await prisma.cash_flow.findMany({
            where: {
                flow_category: isIncome ? CashFlowCategory.income : CashFlowCategory.spending,
                created_at: {
                    gte: startDate,
                    lte: endDate,
                },
                user: {
                    family_members: {
                        some: { family_id: familyId },
                    },
                },
            },
            select: {
                flow_amount: true,
                created_at: true,
                user: { select: { fullname: true } },
            },
        })
    
        const map: Record<string, Record<string, number>> = {}
    
        for (const row of rows) {
            const key = (isIncome ? monthKey : dayKey)(row.created_at)
            if (!keys.includes(key)) continue
    
            // Group by fullname
            const name = row.user.fullname
            map[name] ??= Object.fromEntries(keys.map(k => [k, 0]))
            map[name][key] += row.flow_amount
        }
    
        // Put with label
        return {
            categories,
            series: Object.entries(map).map(([context, values]) => ({
                name: context,
                data: keys.map(k => values[k]),
            })),
        }
    }

    public sumCashFlowByCategoryRepo = async (familyId: string) => {
        const data = await prisma.cash_flow.groupBy({
            by: ['flow_category'],
            _sum: { flow_amount: true },
            where: {
                user: {
                    family_members: {
                        some: { family_id: familyId },
                    },
                },
            },
        })
        
        return data.map(item => ({
            context: item.flow_category,
            total: item._sum.flow_amount ?? 0,
        }))
    }

    public findAllCashFlowExportRepo = async (userId: string | null) => {
        const where = userId ? { created_by: userId } : {}
        return prisma.cash_flow.findMany({
            where,
            orderBy: {
                created_at: 'desc'
            },
            select: {
                flow_type: true, flow_context: true, flow_desc: true, flow_category: true, flow_amount: true, tags: true, created_at: true,
                user: !userId ? {
                    select: { username: true }
                } : {}
            }
        })
    }

    public deleteCashFlowByIdRepo = async (id: string, created_by: string) => {
        return await prisma.cash_flow.delete({
            where: { id, created_by }
        })
    }
}
  