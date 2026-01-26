import { prisma } from '../configs/prisma'

export class AllergicRepository {
    public findAllAllergicRepo = async (page: number, limit: number, userId: string | null) => {
        const skip = (page - 1) * limit
        const whereClause = userId ? { created_by: userId } : undefined

        const [data, total] = await Promise.all([
            prisma.allergic.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: {
                    allergic_context: "asc",
                }
            }),
            prisma.allergic.count(),
        ])

        return {data, total}
    }
}
  