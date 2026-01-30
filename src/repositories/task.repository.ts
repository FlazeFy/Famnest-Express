import { prisma } from '../configs/prisma'

export class TaskRepository {
    public findRandomTaskHasFamilyMember = async () => {
        const whereClause = {
            family: {
                family_members: { some: {} },
            },
        }
      
        const count = await prisma.task.count({ where: whereClause })
        if (count === 0) return null
      
        const skip = Math.floor(Math.random() * count)
    
        return prisma.task.findFirst({
            where: whereClause,
            skip,
            orderBy: { id: "asc" },
            select: {
                id: true,
                created_by: true,
                task_assigns: {
                    select: {
                        assign_to: true,
                    },
                },
            },
        })
    }      

    public findAllTaskRepo = async (page: number, limit: number, familyId: string | null) => {
        const skip = (page - 1) * limit
        const whereClause = familyId ? { family_id: familyId } : undefined

        const [data, total] = await Promise.all([
            prisma.task.findMany({
                where: whereClause,
                skip,
                take: limit,
                select: {
                    id: true, task_title: true, task_desc: true, status: true, due_date: true, created_at: true, updated_at: true, start_date: true, tags: true,
                    task_assigns: {
                        select: {
                            assign_desc: true, assignee: {
                                select: { username: true }
                            }
                        }
                    } 
                },
                orderBy: [
                    { start_date: "asc" },
                    { due_date: "asc" },
                ]
            }),
            prisma.task.count(),
        ])

        return { data, total }
    }

    public findIncomingTaskRepo = async (page: number, limit: number, familyId: string | null, currentDate: string) => {
        const skip = (page - 1) * limit
        const baseDate = new Date(currentDate)
        const hour = 24
        const nHour = new Date(baseDate.getTime() + hour * 60 * 60 * 1000)
      
        const whereClause: any = {
            ...(familyId ? { family_id: familyId } : {}),
            OR: [
                { start_date: { gte: baseDate, lte: nHour } },
                { start_date: null }
            ]
        }
      
        const [data, total] = await Promise.all([
            prisma.task.findMany({
                where: whereClause,
                skip,
                take: limit,
                select: {
                    id: true, task_title: true, task_desc: true, status: true, due_date: true, created_at: true, updated_at: true, start_date: true,
                    task_assigns: {
                        select: {
                            assign_desc: true, assignee: { 
                                select: { username: true } 
                            }
                        }
                    }
                },
                orderBy: [
                    { start_date: { sort: "asc", nulls: "last" } },
                    { due_date: "asc" }
                ]
            }),
            prisma.task.count({ where: whereClause })
        ])
      
        return { data, total }
    }      
}
  