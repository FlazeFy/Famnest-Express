import { prisma } from "../configs/prisma"
import { faker } from '@faker-js/faker'
import { hashPassword } from '../utils/auth.util'

export default class AdminFactory {
    public create = async (password: string) => {
        return prisma.admin.create({
            data: {
                id: faker.string.uuid(),
                username: faker.internet.username(),
                email: faker.internet.email().toLowerCase(),
                password: await hashPassword(password), 
                created_at: faker.date.past({ years: 1 }),
            },
        })
    }

    public createMany = async (count: number, password: string) => {
        for (let i = 0; i < count; i++) {
            await this.create(password)
        }
    }
}