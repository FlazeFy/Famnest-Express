import { prisma } from '../configs/prisma'

export class UserRepository {
    public findRandomUserRepo = async () => {
        const count = await prisma.user.count()
        if (count === 0) return null
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.user.findFirst({ skip, select: { id: true, email: true }})
    }

    public findRandomUserNoFamilyRepo = async () => {
        const usersWithoutFamilyCount = await prisma.user.count({
            where: { families: { none: {} } }
        })
    
        if (usersWithoutFamilyCount === 0) return null
    
        const skip = Math.floor(Math.random() * usersWithoutFamilyCount)

        return prisma.user.findFirst({
            skip,
            where: { families: { none: {} } },
            select: { id: true },
        })
    }

    public findRandomUserFamilyRepo = async () => {
        const count = await prisma.user.count({
            where: { families: { some: {} } }
        })
        if (count === 0) return null
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.user.findFirst({
            skip,
            where: { families: { some: {} } },
            select: { id: true },
        })
    }

    public findRandomUserFamilyMealRepo = async () => {
        const whereClause = { families: { some: { meals: { some: {} } } } }
        const count = await prisma.user.count({
            where: whereClause
        })
        if (count === 0) return null
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.user.findFirst({
            skip,
            where: whereClause,
            select: { id: true },
        })
    }

    public findUserByEmailRepo = async (email: string) => {
        return prisma.user.findUnique({
            where: { email }
        })
    }

    public findUserByIdRepo = async (id: string) => {
        return prisma.user.findUnique({
            where: { id }
        })
    }
}