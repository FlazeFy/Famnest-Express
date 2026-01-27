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

    public getRandomAnsweredQuestionController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const limit = Number(req.query.limit) || 3
    
            // Service : Get random answered question
            const result = await this.questionService.getRandomAnsweredQuestionService(limit)
            if (!result) {
                return res.status(404).json({
                    message: "Question not found"
                })
            }
    
            // Success response
            res.status(200).json({
                message: "Get question successful",
                data: result,
            })
        } catch (error: any) {
            next(error)
        }
    }
}