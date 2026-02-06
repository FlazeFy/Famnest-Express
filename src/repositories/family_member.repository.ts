import { prisma } from '../configs/prisma'

export class FamilyMemberRepository {
    public findFamilyMemberByFamilyIdRepo = async (page: number | null, limit: number | null, familyId: string, search?: string | null) => {
        const where: any = { family_id: familyId }
        if (search) {
            where.OR = [
                { family_relation: { contains: search, mode: "insensitive" } },
                { user: { username: { contains: search, mode: "insensitive" } } },
                { user: { fullname: { contains: search, mode: "insensitive" } } },
                { user: { email: { contains: search, mode: "insensitive" } } }
            ]
        }
      
        if (page && limit) {
            const skip = (page - 1) * limit
        
            const [data, total] = await Promise.all([
                prisma.family_member.findMany({
                    where,
                    skip,
                    take: limit,
                    select: {
                        id: true, family_relation: true,
                        user: {
                            omit: { deleted_at: true, password: true },
                        },
                    },
                    orderBy: { user: { fullname: "asc" } }
                }),
                prisma.family_member.count({ where })
            ])

            return { data, total }
        } else {
            const data = await prisma.family_member.findMany({
                where,
                orderBy: { user: { fullname: "asc" } },
                select: {
                    id: true, family_relation: true, user_id: true,
                    user: {
                        select: { username: true, fullname: true, email: true }
                    }
                }
            })
        
            return { data, total: data.length }
        }
    }

    public findFamilyMemberTaskAssignableRepo = async (familyOwnerId: string, taskId: string) => {
        return prisma.family_member.findFirst({
            where: {
                family: { created_by: familyOwnerId },
                user: {
                    task_assigns_assigned: {
                        none: { task_id: taskId },
                    },
                },
            },
            select: { user_id: true }
        })
    }   

    public findFamilyMemberMealAssignableRepo = async (familyOwnerId: string) => {
        return prisma.family_member.findFirst({
            where: {
                family: {
                    id: familyOwnerId,
                    meals: {
                        some: {},
                    },
                }
            },
            select: { user_id: true }
        })
    }  
    
    public findFamilyMemberContactRepo = async (familyId: string) => {
        return prisma.family_member.findMany({
            where: {
                family: { id: familyId }
            },
            select: { 
                user: {
                    select: { username: true, email: true }
                }
            }
        })
    }  
}
  