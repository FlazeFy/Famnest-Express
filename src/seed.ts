import "dotenv/config"
import { prisma } from "./configs/prisma"
import UserFactory from "./factories/user.factory"

class Seeder {
    private userFactory = new UserFactory()
    private password = "nopass123"

    private clearAllTables = async () => {
        await prisma.user.deleteMany()
    }

    public run = async () => {
        try {
            await this.clearAllTables()

            // Run the seeder
            await this.userFactory.createMany(100, this.password)
        } catch (err) {
            console.error(err)
        } finally {
            await prisma.$disconnect()
        }
    }
}

new Seeder().run()
