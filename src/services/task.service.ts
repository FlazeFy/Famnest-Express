import { FamilyRepository } from "../repositories/family.repository"
import { TaskRepository } from "../repositories/task.repository"

export class TaskService {
    private taskRepo: TaskRepository
    private familyRepo: FamilyRepository

    constructor(){
        this.taskRepo = new TaskRepository()
        this.familyRepo = new FamilyRepository()
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
}