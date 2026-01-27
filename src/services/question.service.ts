import { QuestionRepository } from "../repositories/question.repository"
import { announcementEmailTemplate } from "../templates/announcement.template"
import { sendEmail } from "../utils/mailer.util"

export class QuestionService {
    private questionRepo: QuestionRepository

    constructor(){
        this.questionRepo = new QuestionRepository()
    }

    public postQuestionService = async (question: string, email: string) => {
        // Repo : Create question
        const res = await this.questionRepo.createQuestionRepo(question, email)
        if (!res) {
            return null
        }

        // Broadcast email
        await sendEmail(
            email, "Question Sent",
            announcementEmailTemplate(
                email.split("@")[0],
                `Your question about "${res.question}" has been received by our team. We will notify you as soon as an answer is available. <br>Thank you for your patience.`
            )
        )
        return res
    }
}