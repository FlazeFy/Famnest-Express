import { prisma } from '../configs/prisma'

export class TaskRepository {
    public findRandomTaskHasFamilyMember = async () => {
        const whereClause = {
            family: {
                family_members: { some: {} },
            },
        }
      
        const count = await prisma.task.count({ where: whereClause })
        if (count === 0) throw new Error("No task found with at least one family member")
      
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
}
  