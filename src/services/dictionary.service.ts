import { DictionaryRepository } from "../repositories/dictionary.repository"

export class DictionaryService {
    private dictionaryRepo: DictionaryRepository

    constructor(){
        this.dictionaryRepo = new DictionaryRepository()
    }

    public getAllDictionaryService = async (page: number, limit: number) => {
        // Repo : Find all dictionary
        const res = await this.dictionaryRepo.findAllDictionaryRepo(page, limit)
        if (!res || res.data.length === 0) {
            return null
        }
    
        return res
    }
}