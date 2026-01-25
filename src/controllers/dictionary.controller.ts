import { NextFunction, Request, Response } from "express"
import { DictionaryService } from "../services/dictionary.service"

export class DictionaryController {
    private dictionaryService: DictionaryService

    constructor(){
        this.dictionaryService = new DictionaryService()
    }

    public getAllDictionary = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Query params
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 14
    
            // Service : Get all dictionary
            const result = await this.dictionaryService.getAllDictionaryService(page, limit)
            if (!result) {
                return res.status(404).json({
                    message: "Dictionary not found"
                })
            }
    
            // Success response
            res.status(200).json({
                message: "Get dictionary successful",
                data: result.data,
                meta: {
                    page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
                },
            })
        } catch (error: any) {
            next(error)
        }
    }
}