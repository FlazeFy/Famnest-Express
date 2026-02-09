import { prisma } from '../configs/prisma'

export class TaskRepository {
    public findRandomTaskHasFamilyMemberRepo = async () => {
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

    public findAllTaskRepo = async (page: number, limit: number, familyId: string | null, search: string | null, status: string | null) => {
        const skip = (page - 1) * limit
        const whereClause: any = {}

        if (familyId) {
            whereClause.user = {
                family_members: {
                    some: { family_id: familyId }
                }
            }
        }
        if (status) whereClause.status = status
        if (search) {
            whereClause.OR = [
                { task_title: { contains: search, mode: "insensitive" } },
                { task_desc: { contains: search, mode: "insensitive" } }
            ]
        }

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
            prisma.task.count({
                where: whereClause
            }),
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
    
    public sumTaskLastWeekRepo = async (familyId: string | null, currentDate: string) => {
        const nDays = 7
        const endDate = new Date(currentDate)
        endDate.setHours(23, 59, 59, 999)
        const startDate = new Date(endDate)
        startDate.setDate(startDate.getDate() - (nDays - 1))
        startDate.setHours(0, 0, 0, 0)

        const tasks = await prisma.task.findMany({
            where: {
                ...(familyId ? { family_id: familyId } : {}),
                start_date: {
                    not: null,
                    gte: startDate,
                    lte: endDate
                }
            },
            select: {
                start_date: true
            }
        })

        const map = new Map<string, number>()

        // Aggregate
        for (const task of tasks) {
            if (!task.start_date) continue
            const key = task.start_date.toISOString().slice(0, 10)
            map.set(key, (map.get(key) ?? 0) + 1)
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

    public deleteTaskByIdRepo = async (family_id: string, id: string) => {
        return await prisma.task.delete({
            where: { 
                id, family_id
            }
        })
    }
}
  