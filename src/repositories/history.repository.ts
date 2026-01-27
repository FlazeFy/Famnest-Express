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
  