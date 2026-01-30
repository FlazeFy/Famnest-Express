import { prisma } from '../configs/prisma'

export class FamilyMemberRepository {
    public findFamilyMemberByFamilyId = async (familyId: string) => {
        return prisma.family_member.findMany({
            where: { family_id: familyId },
            orderBy: { 
                user: { fullname: "asc" } 
            },
            select: { id: true, family_relation: true, user_id: true }
        })
    }

    public findFamilyMemberTaskAssignable = async (familyOwnerId: string, taskId: string) => {
        return prisma.family_member.findFirst({
            where: {
                family: { created_by: familyOwnerId },
                user: {
                    task_assigns_assigned: {
                        none: { task_id: taskId },
                    },
                },
            },
            select: { user_id: true }
        })
    }   

    public findFamilyMemberMealAssignable = async (familyOwnerId: string) => {
        return prisma.family_member.findFirst({
            where: {
                family: {
                    id: familyOwnerId,
                    meals: {
                        some: {},
                    },
                }
            },
            select: { user_id: true }
        })
    }   
}
  