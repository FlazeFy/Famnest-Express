import { FeedbackRepository } from "../repositories/feedback.repository"

export class FeedbackService {
    private feedbackRepo: FeedbackRepository

    constructor(){
        this.feedbackRepo = new FeedbackRepository()
    }

    public getAllFeedbackService = async (page: number, limit: number, role: String) => {
        // Repo : Find all feedback
        const res = await this.feedbackRepo.findAllFeedbackRepo(page, limit, role)
        if (!res || res.data.length === 0) return null
    
        return res
    }

    public getRandomFeedbackService = async (limit: number) => {
        // Repo : Find random feedback
        const res = await this.feedbackRepo.findRandomFeedbackRepo(limit)
        if (!res || res.length === 0) return null
    
        return res
    }
    
    public postCreateFeedbackService = async (feedback_rate: number, feedback_body: string, userId: string) => {
        // Repo : Create feedback
        return await this.feedbackRepo.createFeedbackRepo(feedback_rate, feedback_body, userId)
    }

    public hardDeleteFeedbackByIdService = async (id: string) => {
        // Repo : Delete feedback by id
        try {
            return await this.feedbackRepo.deleteFeedbackByIdRepo(id)
        } catch (error: any) {
            if (error.code === "P2025") return null
            throw error
        }
    }
}