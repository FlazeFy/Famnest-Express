import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { DictionaryRepository } from "../repositories/dictionary.repository"
import { FamilyRepository } from "../repositories/family.repository"
import { UserRepository } from "../repositories/user.repository"

class FamilyMemberFactory {
    private familyRepository: FamilyRepository
    private dictionaryRepository: DictionaryRepository
    private userRepository: UserRepository

    constructor(){
        this.familyRepository = new FamilyRepository()
        this.dictionaryRepository = new DictionaryRepository()
        this.userRepository = new UserRepository()
    }

    public create = async () => {
        // Get random family from repo
        const family = await this.familyRepository.findRandomFamily()
        if (!family) {
            throw new Error('Family member requires a family')
        }

        // Get random family relation from repo
        const familyRelation = await this.dictionaryRepository.findRandomDictionaryByDictionaryType('family_relation')
        if (!familyRelation) {
            throw new Error('Family member requires a family relation')
        }

        const user = await this.userRepository.findRandomUserNoFamily()
        if (!user) {
            throw new Error('Family member requires a user')
        }

        return prisma.family_member.create({
            data: {
                id: faker.string.uuid(),
                is_admin: faker.datatype.boolean(0.35),
                created_at: faker.date.past({ years: 1 }),
                user: { connect: { id: user?.id } },
                family: { connect: { id: family.id } },
                dictionary: { connect: { dictionary_name: familyRelation?.dictionary_name}}
            },
        })
    }

    public createMany = async (count: number) => {
        for (let i = 0; i < count; i++) {
            await this.create()
        }
    }
}

export default FamilyMemberFactory
