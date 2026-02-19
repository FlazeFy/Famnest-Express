import { FamilyRepository } from "../repositories/family.repository"
import { MultiRepository } from "../repositories/multi.repository"
import { TaskRepository } from "../repositories/task.repository"
import { TaskAssignRepository } from "../repositories/task_assign.repository"
import { exportToCSV } from "../utils/converter"

export class TaskService {
    private multiRepo: MultiRepository
    private taskRepo: TaskRepository
    private familyRepo: FamilyRepository
    private taskAssignRepo: TaskAssignRepository

    constructor(){
        this.multiRepo = new MultiRepository()
        this.taskRepo = new TaskRepository()
        this.familyRepo = new FamilyRepository()
        this.taskAssignRepo = new TaskAssignRepository()
    }

    public getAllTaskService = async (page: number, limit: number, userId: string | null, search: string | null, status: string | null) => {
        let familyId: string | null =  null

        if (userId) {
            // Repo : Find family id by user id
            const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
            if (!family) throw { code: 404, message: 'Family not found' }

            familyId = family.id
        }

        // Repo : Find all task
        const res = await this.taskRepo.findAllTaskRepo(page, limit, familyId, search, status)
        if (!res || res.data.length === 0) return null
    
        return res
    }

    public getTotalDailyTaskService = async (userId: string | null, currentDate: string) => {
        let familyId: string | null =  null

        if (userId) {
            // Repo : Find family id by user id
            const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
            if (!family) throw { code: 404, message: 'Family not found' }

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
            if (!family) throw { code: 404, message: 'Family not found' }

            familyId = family.id
        }

        // Repo : Find all task
        const res = await this.taskRepo.findIncomingTaskRepo(page, limit, familyId, currentDate)
        if (!res || res.data.length === 0) return null
    
        return res
    }

    public getTaskTotalContextService = async (context: string, userId: string | null) => {
        // Repo : Find task context total
        const res = await this.multiRepo.getContextTotalStats(context, userId, 'task')
        if (!res || res.length === 0) return null
    
        return res
    }

    public hardDeleteTaskByIdService = async (userId: string, taskId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) throw { code: 404, message: 'Family not found' }

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

    public exportAllTaskService = async (userId: string) => {
        // Repo : Find family id by user id
        const family = await this.familyRepo.findFamilyByUserIdRepo(userId)
        if (!family) throw { code: 404, message: 'Family not found' }

        // Repo : Find all task
        const res = await this.taskRepo.findAllTaskExportRepo(family.id)
        if (!res || res.length === 0) return null

        // Remap for nested object
        const mapped = res.map(task => ({
            task_title: task.task_title,
            task_desc: task.task_desc,
            status: task.status,
            start_date: task.start_date,
            due_date: task.due_date,
            tags: task.tags?.join(', '),
            created_at: task.created_at,
            ...(userId ? {} : { 'user.username': task.user?.username }),
            assignees: task.task_assigns?.map(a => a.assignee.username).join(', ')
        }))

        // Dataset headers
        const fields = userId ? ['task_title','task_desc','status','start_date','due_date','tags','created_at','assignees']
            : ['task_title','task_desc','status','start_date','due_date','tags','created_at','user.username','assignees']

        return exportToCSV(mapped, fields)
    }
}