import { prisma } from '../configs/prisma'

export class MealFeedbackRepository {
    public findMealFeedbackByMealIdRepo = async (page: number, limit: number, mealId: string, familyId: string) => {
        const skip = (page - 1) * limit
        const where = { 
            meal_id: mealId,
            meal: { family_id: familyId } 
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
                orderBy: { created_at: "desc" }
            }),
            prisma.meal_feedback.count({where}),
        ])

        return {data, total}
    }

    public findLastMealFeedbackRepo = async (familyId: string) => {
        // Last 3 meal that have feedback
        const lastFeedbacks = await prisma.meal_feedback.findMany({
            take: 3,
            where: {
                meal: { family_id: familyId }
            },
            select: {
                meal_id: true,
                meal: {
                    select: {
                        meal_name: true,
                        meal_prepare_bys: {
                            select: {
                                user_prepare: { select: { fullname: true } }
                            }
                        }
                    }
                },
                created_at: true
            },
            orderBy: { created_at: "desc" }
        })
    
        // Group by id for last feedback
        const mealIds = Array.from(new Set(lastFeedbacks.map(fb => fb.meal_id)))
    
        // Count average meal rate
        const feedbackAggregates = await Promise.all(
            mealIds.map(async (mealId) => {
                const avgRate = await prisma.meal_feedback.aggregate({
                    _avg: { meal_rate: true },
                    where: { meal_id: mealId }
                })

                return { mealId, avgRate: avgRate._avg.meal_rate || 0 }
            })
        )
    
        // Group by prepare by
        const mealsMap: Record<string, any> = {}
        lastFeedbacks.forEach(fb => {
            const mealId = fb.meal_id
            
            if (!mealsMap[mealId]) {
                const fullnames = fb.meal.meal_prepare_bys.map(mp => mp.user_prepare?.fullname).filter(Boolean)
                const avgRate = feedbackAggregates.find(f => f.mealId === mealId)?.avgRate || 0
    
                mealsMap[mealId] = {
                    meal_name: fb.meal.meal_name,
                    prepare_by: Array.from(new Set(fullnames)).join(", "),
                    avg_meal_rate: parseFloat(avgRate.toFixed(2))
                }
            }
        })
    
        return Object.values(mealsMap)
    }
    
    public deleteMealFeedbackByMealIdRepo = async (family_id: string, meal_id: string) => {
        return await prisma.meal_feedback.deleteMany({
            where: { meal_id, meal: { family_id }}
        })
    }  
}
  