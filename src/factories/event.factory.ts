import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { DictionaryRepository } from "../repositories/dictionary.repository"
import { FamilyRepository } from "../repositories/family.repository"

class EventFactory {
    private familyRepository: FamilyRepository
    private dictionaryRepository: DictionaryRepository

    constructor(){
        this.familyRepository = new FamilyRepository()
        this.dictionaryRepository = new DictionaryRepository
    }

    private randomTimeRange = () => {
        // 6 slots per hour (10 minutes each)
        const baseDate = new Date()
        baseDate.setDate(baseDate.getDate() + Math.floor(Math.random() * 7) + 1)
        baseDate.setHours(0, 0, 0, 0)

        const startSlot = Math.floor(Math.random() * (24 * 6))
        const startMinutes = startSlot * 10

        const start = new Date(baseDate)
        start.setMinutes(startMinutes)

        const durationSlots = Math.floor(Math.random() * (72 - 6 + 1)) + 6
        const endMinutes = startMinutes + durationSlots * 10

        const end = new Date(start)
        end.setMinutes(endMinutes)

        return { start, end }
    }

    public create = async () => {
        // Get random family from repo
        const family = await this.familyRepository.findRandomFamily()
        if (!family) {
            throw new Error('Event requires a family')
        }

        // Get random event category from repo
        const eventCategory = await this.dictionaryRepository.findRandomDictionaryByDictionaryType('event_category')
        if (!eventCategory) {
            throw new Error('Family member requires a family relation')
        }

        const { start, end } = this.randomTimeRange()

        return prisma.event.create({
            data: {
                id: faker.string.uuid(),
                event_title: faker.word.words(4),
                event_desc: faker.datatype.boolean() ? faker.lorem.sentences(6) : null,
                event_start_time: start,
                event_end_time: end,
                created_at: faker.date.past({ years: 1 }),
                family: { connect: { id: family?.id } },
                user: { connect: { id: family?.created_by } },
                dictionary: { connect: { dictionary_name: eventCategory?.dictionary_name}}
            },
        })
    }

    public createMany = async (count: number) => {
        for (let i = 0; i < count; i++) {
            await this.create()
        }
    }
}

export default EventFactory
