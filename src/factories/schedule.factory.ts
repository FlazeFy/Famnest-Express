import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { DayName } from "../generated/prisma/enums"
import { DictionaryRepository } from "../repositories/dictionary.repository"
import { FamilyRepository } from "../repositories/family.repository"
import { randomEnumValue } from "../utils/generator.util"

class ScheduleFactory {
    private familyRepository: FamilyRepository
    private dictionaryRepository: DictionaryRepository

    constructor(){
        this.familyRepository = new FamilyRepository()
        this.dictionaryRepository = new DictionaryRepository
    }

    private randomDayName = (): DayName => {
        return randomEnumValue(Object.values(DayName))
    }

    private randomTimeRange = () => {
        // 24 hours * 6 slots per hour (10 minutes each)
        const startSlot = Math.floor(Math.random() * (24 * 6 - 1))
        const durationSlots = Math.floor(Math.random() * (18 - 2 + 1)) + 2
    
        let endSlot = startSlot + durationSlots
        if (endSlot >= 24 * 6) {
            endSlot = 24 * 6 - 1
        }
    
        const toTime = (slot: number) => {
            const minutes = slot * 10
            return `${Math.floor(minutes / 60).toString().padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}`
        }
    
        return { start: toTime(startSlot), end: toTime(endSlot),}
    }    

    public create = async () => {
        // Get random family from repo
        const family = await this.familyRepository.findRandomFamily()
        if (!family) {
            throw new Error('Schedule requires a family')
        }

        // Get random schedule category from repo
        const scheduleCategory = await this.dictionaryRepository.findRandomDictionaryByDictionaryType('schedule_category')
        if (!scheduleCategory) {
            throw new Error('Family member requires a family relation')
        }

        const { start, end } = this.randomTimeRange()

        return prisma.schedule.create({
            data: {
                id: faker.string.uuid(),
                schedule_title: faker.word.words(2),
                schedule_desc: faker.datatype.boolean() ? faker.lorem.sentences(3) : null,
                day: this.randomDayName(),
                time_start: start,
                time_end: end,
                created_at: faker.date.past({ years: 1 }),
                family: { connect: { id: family?.id } },
                user: { connect: { id: family?.created_by } },
                dictionary: { connect: { dictionary_name: scheduleCategory?.dictionary_name}}
            },
        })
    }

    public createMany = async (count: number) => {
        for (let i = 0; i < count; i++) {
            await this.create()
        }
    }
}

export default ScheduleFactory
