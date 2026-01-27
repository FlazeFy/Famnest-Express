import { FeedbackRepository } from "../repositories/feedback.repository"

export class FeedbackService {
    private feedbackRepo: FeedbackRepository

    constructor(){
        this.feedbackRepo = new FeedbackRepository()
    }

    public getAllFeedbackService = async (page: number, limit: number, role: String) => {
        // Repo : Find all feedback
        const res = await this.feedbackRepo.findAllFeedbackRepo(page, limit, role)
        if (!res || res.data.length === 0) {
            return null
        }
    
        return res
    }

    public getRandomFeedbackService = async (limit: number) => {
        // Repo : Find random feedback
        const res = await this.feedbackRepo.findRandomFeedbackRepo(limit)
        if (!res || res.length === 0) {
            return null
        }
    
        return res
    }
}