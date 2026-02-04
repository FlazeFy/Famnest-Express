import { DictionaryRepository } from "../repositories/dictionary.repository"

export class DictionaryService {
    private dictionaryRepo: DictionaryRepository

    constructor(){
        this.dictionaryRepo = new DictionaryRepository()
    }

    public getAllDictionaryService = async (page: number, limit: number) => {
        // Repo : Find all dictionary
        const res = await this.dictionaryRepo.findAllDictionaryRepo(page, limit)
        if (!res || res.data.length === 0) return null
    
        return res
    }

    public postCreateDictionaryService = async (dictionary_name: string, dictionary_type: string, dictionary_desc: string | null) => {
        // Repo : Find dictionary by dictionary name and dictionary type
        const isExist = await this.dictionaryRepo.findDictionaryByNameAndTypeRepo(dictionary_name, dictionary_type)
        if (isExist) throw { code: 409, message: 'Dictionary is already exist' }
        
        // Repo : Create dictionary
        return await this.dictionaryRepo.createDictionaryRepo(dictionary_name, dictionary_type, dictionary_desc)
    }

    public hardDeleteDictionaryByIdService = async (id: string) => {
        // Repo : Check if dictionary exist
        const dictionary = await this.dictionaryRepo.findDictionaryByIdRepo(id)
        if (!dictionary) return null
    
        // Repo : Delete by id
        await this.dictionaryRepo.deleteDictionaryByIdRepo(id)
    
        return dictionary
    }
}