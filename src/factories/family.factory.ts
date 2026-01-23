import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { findRandomUserNoFamily } from "../repositories/user.repository"

class FamilyFactory {
    public create = async () => {
        // Get random user with no family from repo
        const user = await findRandomUserNoFamily()
        if (!user) {
            throw new Error('Family requires an user')
        }

        return prisma.family.create({
            data: {
                id: faker.string.uuid(),
                family_name: faker.person.lastName(),
                family_desc: faker.lorem.sentences(3),
                created_at: faker.date.past({ years: 1 }),
                user: { connect: { id: user?.id } }
            },
        })
    }

    public createMany = async (count: number) => {
        for (let i = 0; i < count; i++) {
            await this.create()
        }
    }
}

export default FamilyFactory
