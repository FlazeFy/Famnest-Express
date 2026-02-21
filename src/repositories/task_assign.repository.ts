import { prisma } from '../configs/prisma'

export class TaskAssignRepository {
    public deleteTaskAssignByTaskIdRepo = async (family_id: string, task_id: string) => {
        return await prisma.task_assign.deleteMany({
            where: { 
                task_id, task: { family_id } 
            }
        })
    }      

    public findTaskProgressPerMember = async (familyId: string) => {
        // ORM
        const tasks = await prisma.task.findMany({
            where: { family_id: familyId },
            select: {
                status: true,
                task_assigns: {
                    select: { 
                        assign_to: true,
                        assignee: {
                            select: { username: true }
                        }
                    }
                }
            }
        })

        // Mapping per user and separated by status
        const res: Record<string, {pending: number, in_progress: number, completed: number}> = {}
        for (const task of tasks) {
            for (const assign of task.task_assigns) {
                const username = assign.assignee.username
                if (!res[username]){
                    res[username] = {
                        pending: 0,
                        in_progress: 0,
                        completed: 0
                    }

                    res[username][task.status]++
                }
            }
        }

        return Object.entries(res).map(([username, counts]) => ({
            username, ...counts
        }))
    }
}
  