import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { hashPassword } from "../utils/auth.util"

class UserFactory {
    public create = async (password: string) => {
        return prisma.user.create({
            data: {
                id: faker.string.uuid(),
                username: faker.internet.username(),
                fullname: faker.person.fullName(),
                email: faker.internet.email().toLowerCase(),
                password: await hashPassword(password), 
                bio: faker.lorem.sentences(2),
                profile_image: null,
                born_at: faker.date.birthdate(),
                created_at: faker.date.past({ years: 1 }),
            },
        })
    }

    public createMany = async (count: number, password: string) => {
        for (let i = 0; i < count; i++) {
            await this.create(password)
        }
    }
}

export default UserFactory
