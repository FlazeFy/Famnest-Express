import { prisma } from '../configs/prisma'

export class FamilyMemberRepository {
    public findFamilyMemberTaskAssignable = async (familyOwnerId: string, taskId: string) => {
        return prisma.family_member.findFirst({
            where: {
                family: {
                    created_by: familyOwnerId,
                },
                user: {
                    task_assigns_assigned: {
                        none: {
                            task_id: taskId,
                        },
                    },
                },
            },
            select: {
                user_id: true,
            },
        })
    }      
}
  