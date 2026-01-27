import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { UserRepository } from "../repositories/user.repository"

class QuestionFactory {
    private userRepository: UserRepository

    constructor(){
        this.userRepository = new UserRepository()
    }

    public create = async () => {
        let email: string

        if (faker.datatype.boolean()){
            // Get random user from repo
            const user = await this.userRepository.findRandomUser()
            if (!user) throw new Error('Cannot create question without users')

            email = user.email
        } else {
            email = faker.internet.email().toLowerCase()
        }

        const isShow = faker.datatype.boolean()
        
        return prisma.question.create({
            data: {
                id: faker.string.uuid(),
                question: faker.lorem.sentence(),
                answer: isShow ? faker.lorem.sentence() : faker.datatype.boolean() ? faker.lorem.sentence() : null,
                is_show: isShow,
                created_at: faker.date.past({ years: 1 }),
                email: email,
            },
        })
    }

    public createMany = async (count: number) => {
        for (let i = 0; i < count; i++) {
            await this.create()
        }
    }
}

export default QuestionFactory
