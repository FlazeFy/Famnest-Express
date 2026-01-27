import { NextFunction, Request, Response } from "express"
import { QuestionService } from "../services/question.service"

export class QuestionController {
    private questionService: QuestionService

    constructor(){
        this.questionService = new QuestionService()
    }

    public postQuestionController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { question, email } = req.body

            // Service : Send question
            const result = await this.questionService.postQuestionService(question, email)
            if (!result) {
                return res.status(500).json({
                    message: "Something went wrong",
                })
            }

            // Success response
            return res.status(201).json({
                message: "Question sended",
                data: result,
            })
        } catch (error: any) {
            next(error)
        }
    }
}