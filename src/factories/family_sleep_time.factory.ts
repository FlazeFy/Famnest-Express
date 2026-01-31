import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"
import { FamilyRepository } from "../repositories/family.repository"
import { pickRandom } from "../utils/generator.util"

class FamilySleepTimeFactory {
    private familyRepository: FamilyRepository

    constructor(){
        this.familyRepository = new FamilyRepository()
    }

    public generateRandomSleepTime = () => {
        const pad = (n: number) => String(n).padStart(2, "0")

        // Start in min
        const startTimes = []
        for (let h = 20; h <= 23; h++) {
            startTimes.push(h * 60)
            startTimes.push(h * 60 + 30)
        }
        startTimes.push(0) 
    
        // Step : Each 30 min
        const durations = []
        for (let m = 300; m <= 540; m += 30) {
            durations.push(m)
        }

        const startMinutes = pickRandom(startTimes)
        const durationMinutes = pickRandom(durations)
        const endMinutes = (startMinutes + durationMinutes) % (24 * 60)
    
        const startHour = Math.floor(startMinutes / 60)
        const startMinute = startMinutes % 60
    
        const endHour = Math.floor(endMinutes / 60)
        const endMinute = endMinutes % 60
    
        return {
            hour_start: `${pad(startHour)}:${pad(startMinute)}`,
            hour_end: `${pad(endHour)}:${pad(endMinute)}`,
        }
    }

    public create = async () => {
        // Get random family from repo
        const family = await this.familyRepository.findRandomFamilyNoSleepTimeRepo()
        if (!family) throw new Error('Family member requires a family')

        const sleepTime = this.generateRandomSleepTime()

        return prisma.family_sleep_time.create({
            data: {
                id: faker.string.uuid(),
                hour_start: sleepTime.hour_start,
                hour_end: sleepTime.hour_end,
                created_at: faker.date.past({ years: 1 }),
                user: { connect: { id: family?.created_by } },
                family: { connect: { id: family.id } },
            },
        })
    }

    public createMany = async (count: number) => {
        for (let i = 0; i < count; i++) {
            await this.create()
        }
    }
}

export default FamilySleepTimeFactory
