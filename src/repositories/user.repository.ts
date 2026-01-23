import { prisma } from '../configs/prisma'

export const findRandomUserNoFamily = async () => {
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
