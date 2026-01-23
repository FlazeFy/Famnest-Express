import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { UserRepository } from "../repositories/user.repository"

class FeedbackFactory {
    private userRepository: UserRepository

    constructor(){
        this.userRepository = new UserRepository()
    }

    public create = async () => {
        // Get random user from repo
        const user = await this.userRepository.findRandomUser()
        if (!user) {
            throw new Error('Cannot create feedback without users')
        }

        return prisma.feedback.create({
            data: {
                id: faker.string.uuid(),
                feedback_rate: faker.number.int({ min: 1, max: 5 }),
                feedback_body: faker.lorem.sentence(),
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

export default FeedbackFactory
