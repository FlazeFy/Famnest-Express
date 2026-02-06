import { prisma } from '../configs/prisma'

export class HistoryRepository {
    public findAllHistoryRepo = async (page: number, limit: number, userId: string | null) => {
        const skip = (page - 1) * limit
        const whereClause = userId ? { created_by: userId } : {}

        const [data, total] = await Promise.all([
            prisma.history.findMany({
                skip,
                take: limit,
                where: whereClause,
                orderBy: { created_at: "desc" },
            }),
            prisma.history.count({ where: whereClause }),
        ])

        return { data, total }
    }

    public findAllHistoryExportRepo = async (userId: string | null) => {
        const where = userId ? { created_by: userId } : {}
        return prisma.history.findMany({
            where,
            orderBy: {
                created_at: 'desc'
            },
            select: {
                history_type: true, history_context: true, created_at: true,
                user: !userId ? {
                    select: { username: true }
                } : {}
            }
        })
    }

    public hardDeleteHistoryByIdRepo = async (id: string, userId: string) => {
        return prisma.history.deleteMany({
            where: { id, created_by: userId},
        })
    }

    public findHistoryByIdRepo = async (id: string, userId: string) => {
        return prisma.history.findUnique({
            where: { id, created_by: userId },
        })
    }
}
  