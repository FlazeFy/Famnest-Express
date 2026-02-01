import { prisma } from '../configs/prisma'

export class MealPrepareByRepository {
    public deleteMealPrepareByByMealIdRepo = async (family_id: string, meal_id: string) => {
        return await prisma.meal_prepare_by.deleteMany({
            where: { 
                meal_id,
                meal: { family_id } 
            }
        })
    }      
}
  