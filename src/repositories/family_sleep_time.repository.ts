import { prisma } from '../configs/prisma'

export class FamilySleepTimeRepository {
    public findFamilySleepTimeByFamilyIdRepo = async (familyId: string) => {
        return prisma.family_sleep_time.findFirst({ 
            where: { family_id: familyId },
            select: { 
                hour_start: true, hour_end: true, created_at: true, updated_at: true, user: {
                    select: { username: true }
                } 
            }
        })
    }

    public deleteFamilySleepTimeByFamilyIdRepo = async (familyId: string) => {
        return await prisma.family_sleep_time.deleteMany({
            where: { family_id: familyId }
        })
    }
}