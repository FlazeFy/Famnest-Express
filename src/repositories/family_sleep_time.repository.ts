import { prisma } from '../configs/prisma'
import { v4 as uuidv4 } from 'uuid'

export class FamilySleepTimeRepository {
    public createFamilySleepTimeRepo = async (userId: string, familyId: string, hour_start: string, hour_end: string) => {
        return prisma.family_sleep_time.create({
            data: {
                id: uuidv4(), hour_start, hour_end, created_by: userId, created_at: new Date(), family_id: familyId
            },
        })
    }

    public findFamilySleepTimeByFamilyIdRepo = async (familyId: string) => {
        return prisma.family_sleep_time.findFirst({ 
            where: { family_id: familyId },
            select: { 
                hour_start: true, hour_end: true, created_at: true, updated_at: true, 
                user: {
                    select: { username: true }
                } 
            }
        })
    }

    public deleteFamilySleepTimeByFamilyIdRepo = async (familyId: string) => await prisma.family_sleep_time.deleteMany({ where: { family_id: familyId }})
}