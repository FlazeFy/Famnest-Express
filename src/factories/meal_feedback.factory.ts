import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { FamilyRepository } from "../repositories/family.repository"
import { MealRepository } from "../repositories/meal.repository"
import { UserRepository } from "../repositories/user.repository"

class MealFeedbackFactory {
    private userRepository: UserRepository
    private familyRepository: FamilyRepository
    private mealRepository: MealRepository

    constructor(){
        this.userRepository = new UserRepository()
        this.familyRepository = new FamilyRepository()
        this.mealRepository = new MealRepository()
    }

    private getRandomDateForMealDay = (mealDay: string) => {
        const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

        const targetDay = dayMap[mealDay]
        if (targetDay === undefined) return faker.date.past({ years: 1 }) 

        const today = new Date()
        const randomPastDate = faker.date.past({ years: 1 })

        const diff = targetDay - randomPastDate.getDay()
        const createdAt = new Date(randomPastDate)
        createdAt.setDate(randomPastDate.getDate() + diff + faker.number.int({ min: 0, max: 1 })) // same day or next day

        return createdAt
    }

    public create = async () => {
        // Get random user from repo
        const user = await this.userRepository.findRandomUserFamilyMealRepo()
        if (!user) throw new Error('Cannot create meal prepare by without users')

        // Get random family from repo
        const family = await this.familyRepository.findFamilyByUserIdRepo(user.id)
        if (!family) throw new Error('Cannot create meal prepare by without family')

        // Get random meal from repo
        const meal = await this.mealRepository.findRandomMealByFamilyIdRepo(family.id)
        if (!meal) throw new Error('Cannot create meal prepare by without meal')


        return prisma.meal_feedback.create({
            data: {
                id: faker.string.uuid(),
                meal: { connect: { id: meal.id } },
                meal_rate: faker.number.int({ min: 1, max: 5 }),
                meal_feedback: faker.datatype.boolean() ? faker.word.words(3) : null,
                created_at: this.getRandomDateForMealDay(meal.meal_day),
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

export default MealFeedbackFactory
