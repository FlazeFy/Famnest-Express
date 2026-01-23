import "dotenv/config"
import { prisma } from "./configs/prisma"
import FamilyFactory from "./factories/family.factory"
import UserFactory from "./factories/user.factory"
import FeedbackFactory from "./factories/feedback.factory"

class Seeder {
    private userFactory = new UserFactory()
    private familyFactory = new FamilyFactory()
    private feedbackFactory = new FeedbackFactory()
    private password = "nopass123"

    private clearAllTables = async () => {
        await prisma.family.deleteMany()
        await prisma.feedback.deleteMany()
        await prisma.user.deleteMany()
    }

    public run = async () => {
        try {
            await this.clearAllTables()

            // Run the seeder
            await this.userFactory.createMany(100, this.password)
            await this.familyFactory.createMany(90)
            await this.feedbackFactory.createMany(50)
        } catch (err) {
            console.error(err)
        } finally {
            await prisma.$disconnect()
        }
    }
}

new Seeder().run()
