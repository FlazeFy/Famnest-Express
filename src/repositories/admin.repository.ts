import { prisma } from '../configs/prisma'

export class AdminRepository {
    public findAdminByEmailRepo = async (email: string) => prisma.admin.findUnique({ where: { email } })

    public findAdminByIdRepo = async (id: string) => prisma.admin.findUnique({ where: { id } })
}