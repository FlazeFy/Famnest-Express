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
}
  