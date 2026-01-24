import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { DictionaryRepository } from "../repositories/dictionary.repository"
import { UserRepository } from "../repositories/user.repository"

class FamilyFactory {
    private userRepository: UserRepository
    private dictionaryRepository: DictionaryRepository

    constructor(){
        this.userRepository = new UserRepository()
        this.dictionaryRepository = new DictionaryRepository
    }

    public create = async () => {
        // Get random user with no family from repo
        const user = await this.userRepository.findRandomUserNoFamily()
        if (!user) {
            throw new Error('Family requires an user')
        }

        const familyRelation = await this.dictionaryRepository.findRandomDictionaryByDictionaryTypeRepo('family_relation')
        if (!familyRelation) {
            throw new Error('Family member requires a family relation')
        }

        return prisma.family.create({
            data: {
                id: faker.string.uuid(),
                family_name: faker.person.lastName(),
                family_desc: faker.lorem.sentences(3),
                created_at: faker.date.past({ years: 1 }),
                user: { connect: { id: user?.id } },
                family_members: {
                    create: {
                        id: faker.string.uuid(),
                        is_admin: true,
                        dictionary: { connect: { dictionary_name: familyRelation?.dictionary_name}},
                        user: { connect: { id: user.id } },
                    },
                },
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
