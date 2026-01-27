import { prisma } from '../configs/prisma'
import { v4 as uuidv4 } from 'uuid'

export class QuestionRepository {
    public createQuestionRepo = async (question: string, email: string) => {
        return prisma.question.create({
            data: {
                id: uuidv4(), question, answer: null, email, created_at: new Date(),
            },
        })
    }

    public findRandomQuestionRepo = async (limit: number, isAnswered: boolean) => {
        const whereClause = { answer: isAnswered ? { not: null } : null }
        const total = await prisma.question.count({ where: whereClause })
        const skip = total > limit ? Math.floor(Math.random() * (total - limit)) : 0

        const data = await prisma.question.findMany({
            skip,
            take: limit,
            select: {
                question: true, answer: isAnswered ? true : false, email: isAnswered ? false : true 
            },
            where: whereClause
        })

        return data
    }
}
