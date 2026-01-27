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
}
