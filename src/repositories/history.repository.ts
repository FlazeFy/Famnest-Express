import { prisma } from '../configs/prisma'

export class HistoryRepository {
    public findAllHistoryRepo = async (page: number, limit: number, userId: string | null) => {
        const skip = (page - 1) * limit
    
        const [data, total] = await Promise.all([
            prisma.history.findMany({
                skip,
                take: limit,
                where: userId ? { created_by: userId } : undefined,
                orderBy: {
                    created_at: "desc",
                },
            }),
            prisma.history.count({
                where: userId ? { created_by: userId } : undefined,
            }),
        ])
    
        return { data, total }
    }
}
  