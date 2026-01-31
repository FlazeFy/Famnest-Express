import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { DayName, MealTime } from "../generated/prisma/enums"
import { FamilyRepository } from "../repositories/family.repository"
import { UserRepository } from "../repositories/user.repository"
import { randomEnumValue } from "../utils/generator.util"

class MealFactory {
    private userRepository: UserRepository
    private familyRepository: FamilyRepository

    constructor(){
        this.userRepository = new UserRepository()
        this.familyRepository = new FamilyRepository()
    }

    private randomMealDay = (): DayName => {
        return randomEnumValue(Object.values(DayName))
    }

    private randomMealTime = (): MealTime => {
        return randomEnumValue(Object.values(MealTime))
    }

    public create = async () => {
        // Get random user from repo
        const user = await this.userRepository.findRandomUserFamilyRepo()
        if (!user) throw new Error('Cannot create meal without users')

        // Get random family from repo
        const family = await this.familyRepository.findFamilyByUserIdRepo(user.id)
        if (!family) throw new Error('Cannot create meal without family')

        return prisma.meal.create({
            data: {
                id: faker.string.uuid(),
                family: { connect: { id: family.id } },
                meal_name: faker.food.dish(),
                meal_desc: faker.datatype.boolean() ? faker.food.description() : null,
                meal_day: this.randomMealDay(),
                meal_time: this.randomMealTime(),
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

export default MealFactory
