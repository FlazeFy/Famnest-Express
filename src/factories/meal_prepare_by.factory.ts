import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { FamilyRepository } from "../repositories/family.repository"
import { FamilyMemberRepository } from "../repositories/family_member.repository"
import { MealRepository } from "../repositories/meal.repository"
import { UserRepository } from "../repositories/user.repository"

class MealPrepareByFactory {
    private userRepository: UserRepository
    private familyRepository: FamilyRepository
    private mealRepository: MealRepository
    private familyMemberRepository: FamilyMemberRepository

    constructor(){
        this.userRepository = new UserRepository()
        this.familyRepository = new FamilyRepository()
        this.familyMemberRepository = new FamilyMemberRepository()
        this.mealRepository = new MealRepository()
    }

    public create = async () => {
        // Get random user from repo
        const user = await this.userRepository.findRandomUserFamilyMeal()
        if (!user) throw new Error('Cannot create meal prepare by without users')

        // Get random family from repo
        const family = await this.familyRepository.findFamilyByUserId(user.id)
        if (!family) throw new Error('Cannot create meal prepare by without family')

        // Get random meal from repo
        const meal = await this.mealRepository.findRandomMealByFamilyId(family.id)
        if (!meal) throw new Error('Cannot create meal prepare by without meal')

        // Get random family member
        const familyMember = await this.familyMemberRepository.findFamilyMemberMealAssignable(family.id)
        if (!familyMember) throw new Error('Cannot create meal prepare by without users')

        return prisma.meal_prepare_by.create({
            data: {
                id: faker.string.uuid(),
                meal: { connect: { id: meal.id } },
                user_assigne: { connect: { id: user.id } },
                user_prepare: { connect: { id: familyMember.user_id } },
            },
        })
    }

    public createMany = async (count: number) => {
        for (let i = 0; i < count; i++) {
            await this.create()
        }
    }
}

export default MealPrepareByFactory
