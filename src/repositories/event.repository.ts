import { prisma } from '../configs/prisma'

export class EventRepository {
    public findNearestEventRepo = async (familyId: string, now: Date) => {
        // Prepare time boundary
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    
        // ORM
        const events = await prisma.event.findMany({
          where: {
                family_id: familyId,
                event_end_time: {
                    gte: oneHourAgo
                }
            },
            orderBy: { event_start_time: 'asc' },
            select: {
                event_title: true, event_category: true, event_start_time: true, event_end_time: true
            }
        })
    
        if (!events.length) return []
    
        // Assign status
        const res = events.map(dt => {
            let status = 'incoming'
        
            if (dt.event_end_time < now) {
                status = 'just_finished'
            } else if (dt.event_start_time <= now && dt.event_end_time >= now) {
                status = 'on_going'
            }
        
            return { ...dt, status }
        })
    
        // Get nearest start hour 
        const nearestHour = res[0].event_start_time.getHours()
    
        // Return all events in nearest hour
        return res.filter(dt=> dt.event_start_time.getHours() === nearestHour)
    }
}
  