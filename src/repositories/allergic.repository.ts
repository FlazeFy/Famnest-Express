import { prisma } from '../configs/prisma'
import { v4 as uuidv4 } from 'uuid'

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

    public findAllergicByIdRepo = async (id: string, userId: string | null) => {
        return prisma.allergic.findFirst({
            where: { id, ...(userId ? { created_by: userId } : {}) }
        })
    }

    public findAllergicByContextAndUserIdRepo = async (allergic_context: string, userId: string) => {
        return prisma.allergic.findFirst({
            where: { allergic_context, created_by: userId }
        })
    }
      
    public deleteAllergicByIdRepo = async (id: string, userId: string | null) => {
        return prisma.allergic.deleteMany({
            where: { id, ...(userId ? { created_by: userId } : {}) }
        })
    }

    public createAllergicRepo = async (allergic_context: string, allergic_desc: string, userId: string) => {
        return prisma.allergic.create({
            data: {
                id: uuidv4(), allergic_context, allergic_desc, created_at: new Date(), created_by: userId,
            },
        })
    }
}
  