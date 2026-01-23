import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { UserRepository } from "../repositories/user.repository"

class HistoryFactory {
    private userRepository: UserRepository

    constructor(){
        this.userRepository = new UserRepository()
    }

    public create = async () => {
        // Get random user from repo
        const user = await this.userRepository.findRandomUser()
        if (!user) {
            throw new Error('Cannot create history without users')
        }

        return prisma.history.create({
            data: {
                id: faker.string.uuid(),
                history_type: faker.word.words(1),
                history_context: faker.word.words(2),
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

export default HistoryFactory
