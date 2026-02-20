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

    public findMealByIdRepo = async (family_id: string, id: string) => prisma.meal.findFirst({ where: { id, family_id }})

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

    public findNearestMealRepo = async (familyId: string, now: Date) => {
        // ORM
        const meals = await prisma.meal.findMany({
            where: { family_id: familyId },
            select: {
                meal_name: true, meal_day: true, meal_time: true,
                meal_prepare_bys: {
                    select: {
                        user_prepare: {
                            select: { username: true }
                        }
                    }
                }
            }
        })
    
        if (!meals.length) return []
    
        // Day mapping to enum
        const dayMap: Record<number, 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'> = {
            0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat'
        }
    
        const mealTimeHourMap: Record<'breakfast' | 'lunch' | 'dinner', number> = {
            breakfast: 7,
            lunch: 12,
            dinner: 18
        }
    
        const todayIndex = now.getDay()
    
        const convertToDate = (dayOffset: number, hour: number): Date => {
            const result = new Date(now)
            result.setDate(now.getDate() + dayOffset)
            result.setHours(hour, 0, 0, 0)
            return result
        }
    
        // Check daily
        const upcoming: { meal: typeof meals[number], date: Date }[] = []   
        for (let offset = 0; offset < 7; offset++) {
            const checkDayIndex = (todayIndex + offset) % 7
            const checkDay = dayMap[checkDayIndex]
            const mealsInDay = meals.filter(m => m.meal_day === checkDay)
    
            for (const meal of mealsInDay) {
                const hour = mealTimeHourMap[meal.meal_time]
                const mealDate = convertToDate(offset, hour)

                if (offset === 0 && mealDate < now) continue
    
                upcoming.push({ meal, date: mealDate })
            }
    
            if (upcoming.length) break
        }
        if (!upcoming.length) return []
    
        // Sort by time start
        upcoming.sort((a, b) => a.date.getTime() - b.date.getTime())
        const nearestHour = upcoming[0].date.getHours()
    
        return upcoming
            .filter(dt => dt.date.getHours() === nearestHour)
            .map(dt => ({
                meal_name: dt.meal.meal_name,
                meal_day: dt.meal.meal_day,
                meal_time: dt.meal.meal_time,
                prepare_by: dt.meal.meal_prepare_bys.map(us => us.user_prepare.username)
            }))
    }

    public deleteMealByIdRepo = async (family_id: string, id: string) => await prisma.meal.delete({ where: { id, family_id }})

    public findAllMealExportRepo = async (familyId: string | null) => {
        const where = familyId ? { family_id: familyId } : {}
        return prisma.meal.findMany({
            where,
            orderBy: { created_at: 'desc' },
            select: {
                meal_name: true, meal_desc: true, meal_day: true, meal_time: true, created_at: true,
                meal_prepare_bys: {
                    select: {
                        user_prepare: {
                            select: { username: true }
                        }
                    }
                }
            }
        })
    }
}
  