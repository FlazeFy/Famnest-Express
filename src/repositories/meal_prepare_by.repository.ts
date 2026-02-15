import { prisma } from '../configs/prisma'
import { v4 as uuidv4 } from 'uuid'

export class MealPrepareByRepository {
    public deleteMealPrepareByByMealIdRepo = async (family_id: string, meal_id: string) => {
        return await prisma.meal_prepare_by.deleteMany({
            where: { meal_id, meal: { family_id }}
        })
    }     

    public createMealPrepareByRepo = async (meal_id: string, prepare_by: string, userId: string) => {
        return prisma.meal_prepare_by.create({
            data: {
                id: uuidv4(), meal_id, prepare_by, created_at: new Date(), created_by: userId
            },
        })
    }
}
  