import "dotenv/config"
import { prisma } from "./configs/prisma"
import FamilyFactory from "./factories/family.factory"
import UserFactory from "./factories/user.factory"
import FeedbackFactory from "./factories/feedback.factory"
import HistoryFactory from "./factories/history.factory"
import DictionaryFactory from "./factories/dictionary.factory"
import AllergicFactory from "./factories/allergic.factory"
import HobbyFactory from "./factories/hobby.factory"
import TaskFactory from "./factories/task.factory"
import FamilyMemberFactory from "./factories/family_member.factory"
import TaskAssignFactory from "./factories/task_assign.factory"
import ScheduleFactory from "./factories/schedule.factory"
import EventFactory from "./factories/event.factory"
import AdminFactory from "./factories/admin.factory"
import QuestionFactory from "./factories/question.factory"
import MealFactory from "./factories/meal.factory"
import MealPrepareByFactory from "./factories/meal_prepare_by.factory"
import FamilySleepTimeFactory from "./factories/family_sleep_time.factory"
import CashFlowFactory from "./factories/cash_flow.factory"
import MealFeedbackFactory from "./factories/meal_feedback.factory"

export const dictionaries = [
    // Event Categories
    { dictionary_type: "event_category", dictionary_name: "family gathering", dictionary_desc: "Family meetups and reunions" },
    { dictionary_type: "event_category", dictionary_name: "birthday", dictionary_desc: "Birthday celebration" },
    { dictionary_type: "event_category", dictionary_name: "wedding", dictionary_desc: "Wedding event" },
    { dictionary_type: "event_category", dictionary_name: "holiday", dictionary_desc: "Public or family holiday" },
    { dictionary_type: "event_category", dictionary_name: "appointment", dictionary_desc: "Personal or family appointment" },
    { dictionary_type: "event_category", dictionary_name: "reminder", dictionary_desc: "General reminder" },
    // Schedule Categories
    { dictionary_type: "schedule_category", dictionary_name: "meal preparation", dictionary_desc: "Cooking or preparing meals" },
    { dictionary_type: "schedule_category", dictionary_name: "family meal", dictionary_desc: "Breakfast, lunch, or dinner together" },
    { dictionary_type: "schedule_category", dictionary_name: "school time", dictionary_desc: "School or study time for children" },
    { dictionary_type: "schedule_category", dictionary_name: "homework assistance", dictionary_desc: "Helping children with homework" },
    { dictionary_type: "schedule_category", dictionary_name: "work from home", dictionary_desc: "Remote or home-based work schedule" },
    { dictionary_type: "schedule_category", dictionary_name: "house chores", dictionary_desc: "Cleaning, laundry, or household duties" },
    { dictionary_type: "schedule_category", dictionary_name: "childcare", dictionary_desc: "Taking care of children or babies" },
    { dictionary_type: "schedule_category", dictionary_name: "elder care", dictionary_desc: "Caring for elderly family members" },
    { dictionary_type: "schedule_category", dictionary_name: "exercise", dictionary_desc: "Workout, jogging, or physical activity" },
    { dictionary_type: "schedule_category", dictionary_name: "health check", dictionary_desc: "Medical or health-related routines" },
    { dictionary_type: "schedule_category", dictionary_name: "religious activity", dictionary_desc: "Prayer, worship, or religious events" },
    { dictionary_type: "schedule_category", dictionary_name: "family time", dictionary_desc: "Quality time with family members" },
    { dictionary_type: "schedule_category", dictionary_name: "leisure", dictionary_desc: "Relaxing, watching TV, or hobbies" },
    { dictionary_type: "schedule_category", dictionary_name: "shopping", dictionary_desc: "Grocery or household shopping" },
    { dictionary_type: "schedule_category", dictionary_name: "transportation", dictionary_desc: "School drop-off, pickup, or commuting" },
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
    private adminFactory = new AdminFactory()
    private userFactory = new UserFactory()
    private familyFactory = new FamilyFactory()
    private feedbackFactory = new FeedbackFactory()
    private historyFactory = new HistoryFactory()
    private dictionaryFactory = new DictionaryFactory()
    private allergicFactory = new AllergicFactory()
    private hobbyFactory = new HobbyFactory()
    private taskFactory = new TaskFactory()
    private familyMemberFactory = new FamilyMemberFactory()
    private taskAsssignFactory = new TaskAssignFactory()
    private scheduleFactory = new ScheduleFactory()
    private eventFactory = new EventFactory()
    private questionFactory = new QuestionFactory()
    private mealFactory = new MealFactory()
    private mealPrepareByFactory = new MealPrepareByFactory()
    private familySleepTimeFactory = new FamilySleepTimeFactory()
    private cashFlowFactory = new CashFlowFactory()
    private mealFeedbackFactory = new MealFeedbackFactory()
    private password = "nopass123"

    private clearAllTables = async () => {
        await prisma.meal_feedback.deleteMany()
        await prisma.cash_flow.deleteMany()
        await prisma.family_sleep_time.deleteMany()
        await prisma.question.deleteMany()
        await prisma.meal_prepare_by.deleteMany()
        await prisma.meal.deleteMany()
        await prisma.event.deleteMany()
        await prisma.schedule.deleteMany()
        await prisma.task_assign.deleteMany()
        await prisma.task.deleteMany()
        await prisma.family_member.deleteMany()
        await prisma.family.deleteMany()
        await prisma.feedback.deleteMany()
        await prisma.history.deleteMany()
        await prisma.allergic.deleteMany()
        await prisma.hobby.deleteMany()
        await prisma.user.deleteMany()
        await prisma.admin.deleteMany()
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
            await this.adminFactory.createMany(5, this.password)
            await this.userFactory.createMany(120, this.password)
            await this.familyFactory.createMany(30)
            await this.feedbackFactory.createMany(50)
            await this.historyFactory.createMany(500)
            await this.allergicFactory.createMany(150)
            await this.hobbyFactory.createMany(300)
            await this.taskFactory.createMany(1200)
            await this.familyMemberFactory.createMany(80)
            await this.taskAsssignFactory.createMany(2600)
            await this.scheduleFactory.createMany(200)
            await this.eventFactory.createMany(500)
            await this.questionFactory.createMany(50)
            await this.mealFactory.createMany(600)
            await this.mealPrepareByFactory.createMany(1300)
            await this.familySleepTimeFactory.createMany(20)
            await this.cashFlowFactory.createMany(1200)
            await this.mealFeedbackFactory.createMany(1000)
        } catch (err) {
            console.error(err)
        } finally {
            await prisma.$disconnect()
        }
    }
}

new Seeder().run()
