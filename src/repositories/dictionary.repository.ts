import { prisma } from '../configs/prisma'

export class DictionaryRepository {
    public findRandomDictionaryByDictionaryType = async (type: string) => {
        const count = await prisma.dictionary.count({
            where: { dictionary_type: type }
        })
    
        if (count === 0) {
            throw new Error('No dictionary found. Seed dictionary first')
        }
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.dictionary.findFirst({ 
            skip, 
            where: { dictionary_type: type },
            select: { dictionary_name: true }
        })
    }
}
  