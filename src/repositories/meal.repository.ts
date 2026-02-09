import { prisma } from '../configs/prisma'
import { DayName, MealTime } from '../generated/prisma/enums'
import { v4 as uuidv4 } from 'uuid'

export class MealRepository {
    public findRandomMealByFamilyIdRepo = async (familyId: string) => {
        const whereClause = { family_id: familyId }
        const count = await prisma.meal.count({
            where: whereClause
        })
        if (count === 0) return null
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.meal.findFirst({ 
            skip, 
            where: whereClause,
            select: { id: true, created_by: true, meal_day: true }
        })
    }

    public findAllMealByFamilyIdRepo = async (familyId: string) => {
        const meals = await prisma.meal.findMany({
            where: { family_id: familyId },
            orderBy: { meal_time: 'asc' },
            include: {
                meal_prepare_bys: {
                    include: {
                        user_prepare: {
                            select: {
                                fullname: true,
                            },
                        },
                    },
                },
            },
        })
        
        const dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        
        return meals.sort((a, b) =>
                dayOrder.indexOf(a.meal_day) - dayOrder.indexOf(b.meal_day),
            )
            .map((meal) => ({
                id: meal.id,
                meal_name: meal.meal_name,
                meal_desc: meal.meal_desc,
                meal_day: meal.meal_day,
                meal_time: meal.meal_time,
                prepare_by: meal.meal_prepare_bys.map((dt) => dt.user_prepare.fullname).join(', ')
            })
        )
    }

    public findMealByIdRepo = async (family_id: string, id: string) => {
        return prisma.meal.findFirst({
            where: { id, family_id }
        })
    }

    public findMealByNameDayTimeFamilyIdRepo = async (meal_name: string, meal_day: DayName, meal_time: MealTime, family_id: string) => {
        return prisma.meal.findFirst({
            where: { meal_name, meal_day, meal_time, family_id }
        })
    }

    public createMealRepo = async (meal_name: string, meal_desc: string | null, meal_day: DayName, meal_time: MealTime, family_id: string, userId: string) => {
        return prisma.meal.create({
            data: {
                id: uuidv4(), meal_name, meal_desc, meal_day, meal_time, created_at: new Date(), created_by: userId, family_id
            },
        })
    }

    public deleteMealByIdRepo = async (family_id: string, id: string) => {
        return await prisma.meal.delete({
            where: { 
                id, family_id
            }
        })
    }
}
  