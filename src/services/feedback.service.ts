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
}