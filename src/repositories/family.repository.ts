import { prisma } from '../configs/prisma'

export class FamilyRepository {
    public findRandomFamilyRepo = async () => {
        const count = await prisma.family.count()
        if (count === 0) return null
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.family.findFirst({ skip, select: { id: true, created_by: true }})
    }

    public findFamilyByUserIdRepo = async (userId: string) => {
        const count = await prisma.family.count({
            where: { created_by: userId },
        })
        if (count === 0) return null
        
        const skip = Math.floor(Math.random() * count)
        
        return prisma.family.findFirst({
            skip,
            where: { created_by: userId },
            omit: { deleted_at: true }
        })
    }
}
  