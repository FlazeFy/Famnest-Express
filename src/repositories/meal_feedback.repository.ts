import { prisma } from '../configs/prisma'

export class MealFeedbackRepository {
    public findMealFeedbackByMealIdRepo = async (page: number, limit: number, mealId: string, familyId: string) => {
        const skip = (page - 1) * limit
        const where = { 
            meal_id: mealId,
            meal: {
                family_id: familyId
            } 
        }

        const [data, total] = await Promise.all([
            prisma.meal_feedback.findMany({
                skip,
                take: limit,
                where,
                select: { 
                    meal_feedback: true, meal_rate: true, created_at: true,
                    user: {
                        select: { username: true, fullname: true, id: true }
                    }
                },
                orderBy: {
                    created_at: "desc",
                }
            }),
            prisma.meal_feedback.count({where}),
        ])

        return {data, total}
    }
}
  