import { prisma } from '../configs/prisma'

export class FeedbackRepository {
    public findAllFeedbackRepo = async (page: number, limit: number, role: String) => {
        const skip = (page - 1) * limit

        const [data, total] = await Promise.all([
            prisma.feedback.findMany({
                skip,
                take: limit,
                select: { 
                    id: role === "user" ? false : true, feedback_body: true, feedback_rate: true, created_at: true,
                    user: {
                        select: { username: true, email: role === "user" ? false : true }
                    }
                },
                orderBy: {
                    created_at: "desc",
                }
            }),
            prisma.feedback.count(),
        ])

        return {data, total}
    }

    public findRandomFeedbackRepo = async (limit: number) => {
        const total = await prisma.feedback.count()
        const skip = total > limit ? Math.floor(Math.random() * (total - limit)) : 0

        const data = await prisma.feedback.findMany({
            skip,
            take: limit,
            select: {
                feedback_body: true, feedback_rate: true,
                user: {
                    select: { username: true },
                },
            },
        })

        return data
    }
}
  