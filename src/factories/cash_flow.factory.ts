import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { UserRepository } from "../repositories/user.repository"
import { CashFlowCategory, CashFlowType } from "../generated/prisma/enums"
import { randomEnumValue } from "../utils/generator.util"

class CashFlowFactory {
    private userRepository: UserRepository

    constructor(){
        this.userRepository = new UserRepository()
    }

    private randomCashFlowCategory = (): CashFlowCategory => {
        return randomEnumValue(Object.values(CashFlowCategory))
    }

    private randomCashFlowType = (): CashFlowType => {
        return randomEnumValue(Object.values(CashFlowType))
    }

    public create = async () => {
        // Get random user from repo
        const user = await this.userRepository.findRandomUserRepo()
        if (!user) throw new Error('Cannot create cash flow without users')

        // Get random tag
        const tagCount = faker.number.int({ min: 0, max: 5 })
        const tags = Array.from({ length: tagCount }, () => faker.lorem.word())

        return prisma.cash_flow.create({
            data: {
                id: faker.string.uuid(),
                flow_type: this.randomCashFlowType(),
                flow_context: faker.word.words(2),
                flow_desc: faker.datatype.boolean() ? faker.word.words(3) : null,
                flow_category: this.randomCashFlowCategory(),
                flow_amount: faker.number.int({ min: 1, max: 100 }) * 5000,
                tags,
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

export default CashFlowFactory
