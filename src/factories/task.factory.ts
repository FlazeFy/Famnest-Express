import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { TaskStatus } from "../generated/prisma/enums"
import { FamilyRepository } from "../repositories/family.repository"
import { UserRepository } from "../repositories/user.repository"
import { randomEnumValue } from "../utils/generator.util"

class TaskFactory {
    private userRepository: UserRepository
    private familyRepository: FamilyRepository

    constructor(){
        this.userRepository = new UserRepository()
        this.familyRepository = new FamilyRepository()
    }

    private randomTaskStatus = (): TaskStatus => {
        return randomEnumValue(Object.values(TaskStatus))
    }

    public create = async () => {
        // Get random user from repo
        const user = await this.userRepository.findRandomUserFamilyRepo()
        if (!user) throw new Error('Cannot create task without users')

        // Get random family from repo
        const family = await this.familyRepository.findFamilyByUserIdRepo(user.id)
        if (!family) throw new Error('Cannot create task without family')

        // Get random task status
        const taskStatus = this.randomTaskStatus()

        // Get random start datetime
        const startDate = taskStatus === 'completed' ? faker.date.past({ years: 1 }) : faker.date.between({
            from: new Date(),
            to: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        })
        
        // Get random end datetime
        const dueDate = new Date(startDate)
        dueDate.setHours(dueDate.getHours() + faker.number.int({ min: 1, max: 5 }))

        // Get random tag
        const tagCount = faker.number.int({ min: 0, max: 5 })
        const tags = Array.from({ length: tagCount }, () => faker.lorem.word())

        return prisma.task.create({
            data: {
                id: faker.string.uuid(),
                task_title: faker.lorem.words(2),
                task_desc: faker.datatype.boolean() ? faker.lorem.sentence() : null,                
                status: taskStatus,
                start_date: startDate,
                due_date: dueDate,
                tags,
                family: { connect: { id: family.id } },
                created_at: faker.date.past({ years: 1 }),
                user: { connect: { id: user.id } },
            },
        })
    }

    public createMany = async (count: number) => {
        for (let i = 0; i < count; i++) {
            await this.create()
        }
    }
}

export default TaskFactory
