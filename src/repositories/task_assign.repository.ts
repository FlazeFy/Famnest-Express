import { prisma } from '../configs/prisma'

export class TaskAssignRepository {
    public deleteTaskAssignByTaskIdRepo = async (family_id: string, task_id: string) => {
        return await prisma.task_assign.deleteMany({
            where: { 
                task_id,
                task: { family_id } 
            }
        })
    }      
}
  