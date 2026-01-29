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

        return {data, total}
    }
}
  