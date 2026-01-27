import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { FamilyMemberRepository } from "../repositories/family_member.repository"
import { TaskRepository } from "../repositories/task.repository"

class TaskAssignFactory {
    private familyMemberRepository: FamilyMemberRepository
    private taskRepository: TaskRepository

    constructor(){
        this.familyMemberRepository = new FamilyMemberRepository()
        this.taskRepository = new TaskRepository()
    }

    public create = async () => {
        // Get random task from repo
        const task = await this.taskRepository.findRandomTaskHasFamilyMember()
        if (!task) throw new Error("No task available to assign")

        const assignedUserIds = task.task_assigns.map(a => a.assign_to)
        let assignedTo: string | null = null
        if (faker.datatype.boolean(0.75) && !assignedUserIds.includes(task.created_by)) {
            assignedTo = task.created_by
        } else {
            // Get random family member from repo
            const member = await this.familyMemberRepository.findFamilyMemberTaskAssignable(task.created_by, task.id)
            // If no one left to assign just skip
            if (!member) return null

            assignedTo = member.user_id
        }

        return prisma.task_assign.create({
            data: {
                id: faker.string.uuid(),
                task: { connect: { id: task.id } },
                creator: { connect: { id: task.created_by } },
                assignee: { connect: { id: assignedTo } },
                assign_desc: faker.datatype.boolean() ? faker.lorem.sentence() : null,
                created_at: faker.date.past({ years: 1 }),
            },
        })
    }

    public createMany = async (count: number) => {
        for (let i = 0; i < count; i++) {
            await this.create()
        }
    }
}

export default TaskAssignFactory
