import { prisma } from '../configs/prisma'

export class MealRepository {
    public findRandomMealByFamilyId = async (familyId: string) => {
        const whereClause = { family_id: familyId }
        const count = await prisma.meal.count({
            where: whereClause
        })
        if (count === 0) throw new Error('No meal found. Seed meal first')
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.meal.findFirst({ 
            skip, 
            where: whereClause,
            select: { id: true, created_by: true }
        })
    }
}
  