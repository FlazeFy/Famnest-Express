import { prisma } from '../configs/prisma'

export class CashFlowRepository {
    public findAllCashFlowRepo = async (page: number, limit: number, familyId: string | null) => {
        const skip = (page - 1) * limit
        const whereClause = familyId ?{
            user: {
                family_members: {
                    some: { family_id: familyId }
                }
            }
        } : undefined

        const [data, total] = await Promise.all([
            prisma.cash_flow.findMany({
                where: whereClause,
                skip,
                take: limit,
                select: {
                    id: true, flow_type: true, flow_context: true, flow_desc: true, flow_category: true, flow_amount: true, tags: true, created_at: true, updated_at: true,
                    user: {
                        select: {
                            id: true, username: true
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
            map.set(
                key, (map.get(key) ?? 0) + cashFlow.flow_amount
            )
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
}
  