import { prisma } from '../configs/prisma'

export class DictionaryRepository {
    public findAllDictionaryRepo = async (page: number, limit: number) => {
        const skip = (page - 1) * limit

        const [data, total] = await Promise.all([
            prisma.dictionary.findMany({
                skip,
                take: limit,
                orderBy: {
                    dictionary_name: "asc",
                }
            }),
            prisma.dictionary.count(),
        ])

        return {data, total}
    }

    public findRandomDictionaryByDictionaryTypeRepo = async (type: string) => {
        const count = await prisma.dictionary.count({
            where: { dictionary_type: type }
        })
    
        if (count === 0) throw new Error('No dictionary found. Seed dictionary first')
    
        const skip = Math.floor(Math.random() * count)
    
        return prisma.dictionary.findFirst({ 
            skip, 
            where: { dictionary_type: type },
            select: { dictionary_name: true }
        })
    }

    public findDictionaryByIdRepo = async (id: string) => {
        return prisma.dictionary.findUnique({ where: { id } })
    }
    
    public deleteDictionaryByIdRepo = async (id: string) => {
        return prisma.dictionary.delete({ where: { id } })
    }
}
  