import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { UserRepository } from "../repositories/user.repository"

class HobbyFactory {
    private userRepository: UserRepository

    constructor(){
        this.userRepository = new UserRepository()
    }

    public create = async () => {
        // Get random user from repo
        const user = await this.userRepository.findRandomUser()
        if (!user) {
            throw new Error('Cannot create hobby without users')
        }

        return prisma.hobby.create({
            data: {
                id: faker.string.uuid(),
                hobby_context: faker.word.verb(),
                hobby_desc: faker.datatype.boolean() ? faker.lorem.sentence() : null,
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

export default HobbyFactory
