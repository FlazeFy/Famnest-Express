import { FamilyRepository } from "../repositories/family.repository"
import { TaskRepository } from "../repositories/task.repository"
import { TaskAssignRepository } from "../repositories/task_assign.repository"

export class TaskService {
    private taskRepo: TaskRepository
    private familyRepo: FamilyRepository
    private taskAssignRepo: TaskAssignRepository

    constructor(){
        this.taskRepo = new TaskRepository()
        this.familyRepo = new FamilyRepository()
        this.taskAssignRepo = new TaskAssignRepository()
    }

    public getAllTaskService = async (page: number, limit: number, userId: string | null) => {
        let familyId: string | null =  null

        if (userId) {
            // Repo : Find family id by user id
            const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
            if (!family) return null

            familyId = family.id
        }

        // Repo : Find all task
        const res = await this.taskRepo.findAllTaskRepo(page, limit, familyId)
        if (!res || res.data.length === 0) return null
    
        return res
    }

    public getTotalDailyTaskService = async (userId: string | null, currentDate: string) => {
        let familyId: string | null =  null

        if (userId) {
            // Repo : Find family id by user id
            const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
            if (!family) return null

            familyId = family.id
        }

        // Repo : Sum task per day
        return await this.taskRepo.sumTaskLastWeekRepo(familyId, currentDate)
    }

    public getIncomingTaskService = async (page: number, limit: number, userId: string | null, currentDate: string) => {
        let familyId: string | null =  null

        if (userId){
            // Repo : Find family id by user id
            const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
            if (!family) return null

            familyId = family.id
        }

        // Repo : Find all task
        const res = await this.taskRepo.findIncomingTaskRepo(page, limit, familyId, currentDate)
        if (!res || res.data.length === 0) return null
    
        return res
    }

    public hardDeleteTaskByIdService = async (userId: string, taskId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) return null

        // Repo : Delete task assign by task id
        await this.taskAssignRepo.deleteTaskAssignByTaskIdRepo(family.id, taskId)

        // Repo : Delete task by id
        try {
            console.log(`${family.id}, ${taskId}`)
            return await this.taskRepo.deleteTaskByIdRepo(family.id, taskId)
        } catch (error: any) {
            if (error.code === "P2025") return null
            throw error
        }
    }
}