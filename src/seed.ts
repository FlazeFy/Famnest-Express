import "dotenv/config"
import { prisma } from "./configs/prisma"
import FamilyFactory from "./factories/family.factory"
import UserFactory from "./factories/user.factory"
import FeedbackFactory from "./factories/feedback.factory"
import HistoryFactory from "./factories/history.factory"
import DictionaryFactory from "./factories/dictionary.factory"

export const dictionaries = [
    // Event Categories
    { dictionary_type: "event_category", dictionary_name: "family gathering", dictionary_desc: "Family meetups and reunions" },
    { dictionary_type: "event_category", dictionary_name: "birthday", dictionary_desc: "Birthday celebration" },
    { dictionary_type: "event_category", dictionary_name: "wedding", dictionary_desc: "Wedding event" },
    { dictionary_type: "event_category", dictionary_name: "holiday", dictionary_desc: "Public or family holiday" },
    { dictionary_type: "event_category", dictionary_name: "appointment", dictionary_desc: "Personal or family appointment" },
    { dictionary_type: "event_category", dictionary_name: "reminder", dictionary_desc: "General reminder" },
    // Family Relations
    { dictionary_type: "family_relation", dictionary_name: "father", dictionary_desc: "Father" },
    { dictionary_type: "family_relation", dictionary_name: "mother", dictionary_desc: "Mother" },
    { dictionary_type: "family_relation", dictionary_name: "son", dictionary_desc: "Son" },
    { dictionary_type: "family_relation", dictionary_name: "daughter", dictionary_desc: "Daughter" },
    { dictionary_type: "family_relation", dictionary_name: "brother", dictionary_desc: "Brother" },
    { dictionary_type: "family_relation", dictionary_name: "sister", dictionary_desc: "Sister" },
    { dictionary_type: "family_relation", dictionary_name: "grandfather", dictionary_desc: "Grandfather" },
    { dictionary_type: "family_relation", dictionary_name: "grandmother", dictionary_desc: "Grandmother" },
    { dictionary_type: "family_relation", dictionary_name: "uncle", dictionary_desc: "Uncle" },
    { dictionary_type: "family_relation", dictionary_name: "aunt", dictionary_desc: "Aunt" },
    { dictionary_type: "family_relation", dictionary_name: "cousin", dictionary_desc: "Cousin" }
]

class Seeder {
    private userFactory = new UserFactory()
    private familyFactory = new FamilyFactory()
    private feedbackFactory = new FeedbackFactory()
    private historyFactory = new HistoryFactory()
    private dictionaryFactory = new DictionaryFactory()
    private password = "nopass123"

    private clearAllTables = async () => {
        await prisma.family.deleteMany()
        await prisma.feedback.deleteMany()
        await prisma.history.deleteMany()
        await prisma.user.deleteMany()
        await prisma.dictionary.deleteMany()
    }

    // Fixed seeds
    private seedDictionary = async () => {
        for (const dct of dictionaries) {
            await this.dictionaryFactory.create(dct.dictionary_type, dct.dictionary_name, dct.dictionary_desc)
        }
    }

    public run = async () => {
        try {
            await this.clearAllTables()

            // Run the seeder
            await this.seedDictionary()
            await this.userFactory.createMany(100, this.password)
            await this.familyFactory.createMany(90)
            await this.feedbackFactory.createMany(50)
            await this.historyFactory.createMany(500)
        } catch (err) {
            console.error(err)
        } finally {
            await prisma.$disconnect()
        }
    }
}

new Seeder().run()
