import { prisma } from '../configs/prisma'

export class ScheduleRepository {
    public findNearestScheduleRepo = async (familyId: string, now: Date) => {
        // ORM
        const schedules = await prisma.schedule.findMany({
            where: { family_id: familyId },
            select: {
                schedule_title: true, schedule_category: true, day: true, time_start: true, time_end: true
            }
        })
    
        if (!schedules.length) return []
    
        // Day mapping to enum
        const dayMap: Record<number, 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'> = {
            0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat'
        }
    
        const todayIndex = now.getDay()
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    
        const convertToDate = (time: string, dayOffset: number): Date => {
            const [hour, minute] = time.split(':').map(Number)
            const result = new Date(now)
            result.setDate(now.getDate() + dayOffset)
            result.setHours(hour, minute, 0, 0)

            return result
        }
        
        // Check daily
        const upcoming: { schedule: any, date: Date, status: string }[] = []
        for (let offset = 0; offset < 7; offset++) {
            const checkDayIndex = (todayIndex + offset) % 7
            const checkDay = dayMap[checkDayIndex]
            const schedulesInDay = schedules.filter(s => s.day === checkDay)
    
            for (const schedule of schedulesInDay) {
                const startDate = convertToDate(schedule.time_start, offset)
                const endDate = convertToDate(schedule.time_end, offset)
    
                if (endDate < oneHourAgo) continue
    
                let status = 'incoming'
                if (endDate < now) {
                    status = 'just_finished'
                } else if (startDate <= now && endDate >= now) {
                    status = 'on_going'
                }
    
                upcoming.push({
                    schedule: { ...schedule, status },
                    date: startDate,
                    status
                })
            }
    
            if (upcoming.length) break
        }
        if (!upcoming.length) return []
    
        // Sort by time start
        upcoming.sort((a, b) => a.date.getTime() - b.date.getTime())
        const nearestHour = upcoming[0].date.getHours()
    
        return upcoming.filter(dt => dt.date.getHours() === nearestHour).map(dt => dt.schedule)
    }
}
  