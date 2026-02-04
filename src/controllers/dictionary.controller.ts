import { NextFunction, Request, Response } from "express"
import { DictionaryService } from "../services/dictionary.service"
import { validate as isUuid } from "uuid"
import { extractUserFromLocals } from "../utils/auth.util"

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
            if (!result) throw { code: 404, message: "Dictionary not found" }
    
            // Success response
            return res.status(200).json({
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

    public postCreateDictionaryController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Request body
            const { dictionary_name, dictionary_type, dictionary_desc } = req.body
    
            // Service : Create dictionary
            const result = await this.dictionaryService.postCreateDictionaryService(dictionary_name, dictionary_type, dictionary_desc)
            if (!result) throw { code: 500, message: "Something went wrong" }
    
            // Success response
            return res.status(201).json({
                message: "Dictionary created"
            })
        } catch (error: any) {
            next(error)
        }
    }

    public hardDeleteDictionaryByIdController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Param
            const id = req.params.id as string

            // Validate : UUID
            if (!isUuid(id)) throw { code: 400, message: "Invalid UUID format" }
    
            // Service : Hard delete dictionary by id
            const result = await this.dictionaryService.hardDeleteDictionaryByIdService(id)
            if (!result) throw { code: 404, message: "Dictionary not found" }
    
            // Success response
            return res.status(200).json({
                message: "Delete dictionary successful",
                data: result,
            })
        } catch (error: any) {
            next(error)
        }
    }
}