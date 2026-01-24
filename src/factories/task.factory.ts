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
        const user = await this.userRepository.findRandomUserFamily()
        if (!user) {
            throw new Error('Cannot create task without users')
        }

        // Get random family from repo
        const family = await this.familyRepository.findFamilyByUserId(user.id)
        if (!family) {
            throw new Error('Cannot create task without family')
        }

        const taskStatus = this.randomTaskStatus()

        return prisma.task.create({
            data: {
                id: faker.string.uuid(),
                task_title: faker.lorem.words(2),
                task_desc: faker.datatype.boolean() ? faker.lorem.sentence() : null,                
                status: taskStatus,
                due_date: taskStatus === 'completed' ? faker.date.past({ years: 1 }) : faker.date.between({
                    from: new Date(),
                    to: new Date(new Date().setMonth(new Date().getMonth() + 2)),
                }),
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
