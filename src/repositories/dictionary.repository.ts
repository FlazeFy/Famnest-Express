import { prisma } from '../configs/prisma'
import { v4 as uuidv4 } from 'uuid'

export class DictionaryRepository {
    public findAllDictionaryRepo = async (page: number, limit: number) => {
        const skip = (page - 1) * limit

        const [data, total] = await Promise.all([
            prisma.dictionary.findMany({
                skip,
                take: limit,
                orderBy: { dictionary_name: "asc" }
            }),
            prisma.dictionary.count(),
        ])

        return {data, total}
    }

    public findRandomDictionaryByDictionaryTypeRepo = async (type: string) => {
        const count = await prisma.dictionary.count({
            where: { dictionary_type: type }
        })
    
        if (count === 0) return null
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.dictionary.findFirst({ 
            skip, 
            where: { dictionary_type: type },
            select: { dictionary_name: true }
        })
    }

    public findDictionaryByIdRepo = async (id: string) => prisma.dictionary.findUnique({ where: { id } })

    public findDictionaryByNameAndTypeRepo = async (dictionary_name: string, dictionary_type: string) => {
        return prisma.dictionary.findFirst({
            where: { dictionary_name, dictionary_type }
        })
    }

    public createDictionaryRepo = async (dictionary_name: string, dictionary_type: string, dictionary_desc: string | null) => {
        return prisma.dictionary.create({
            data: {
                id: uuidv4(), dictionary_name, dictionary_type, dictionary_desc,
            },
        })
    }
    
    public deleteDictionaryByIdRepo = async (id: string) => prisma.dictionary.delete({ where: { id } })
}
  