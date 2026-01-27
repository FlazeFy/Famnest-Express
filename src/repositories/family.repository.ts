import { prisma } from '../configs/prisma'

export class FamilyRepository {
    public findRandomFamily = async () => {
        const count = await prisma.family.count()
        if (count === 0) throw new Error('No family found. Seed family first')
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.family.findFirst({ skip, select: { id: true, created_by: true }})
    }

    public findFamilyByUserId = async (userId: string) => {
        const count = await prisma.family.count({
            where: { created_by: userId },
        })
        if (count === 0) throw new Error('No family found for this user. Seed family first')
        
        const skip = Math.floor(Math.random() * count)
        
        return prisma.family.findFirst({
            skip,
            where: { created_by: userId },
            select: { id: true },
        })
    }
}
  