import { prisma } from '../configs/prisma'

export class AdminRepository {
    public findAdminByEmailRepo = async (email: string) => {
        return prisma.admin.findUnique({
            where: { email }
        })
    }
}