import { prisma } from '../configs/prisma'

export class UserRepository {
    public findRandomUser = async () => {
        const count = await prisma.user.count()
    
        if (count === 0) {
            throw new Error('No users found. Seed users first')
        }
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.user.findFirst({ skip, select: { id: true }})
    }

    public findRandomUserNoFamily = async () => {
        const usersWithoutFamilyCount = await prisma.user.count({
            where: {
                families: { none: {} },
            },
        })
    
        if (usersWithoutFamilyCount === 0) {
            throw new Error("No available users without family")
        }
    
        const skip = Math.floor(Math.random() * usersWithoutFamilyCount)
        return prisma.user.findFirst({
            skip,
            where: {
                families: { none: {} },
            },
            select: { id: true },
        })
    }

    public findRandomUserFamily = async () => {
        const count = await prisma.user.count({
            where: { families: { some: {} } }
        })
    
        if (count === 0) {
            throw new Error("No available users with family")
        }
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.user.findFirst({
            skip,
            where: { families: { some: {} } },
            select: { id: true },
        })
    }

    public findUserByEmailRepo = async (email: string) => {
        return prisma.user.findUnique({
            where: { email }
        })
    }
}