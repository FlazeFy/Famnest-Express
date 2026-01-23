import { faker } from "@faker-js/faker"
import { prisma } from "../configs/prisma"

class DictionaryFactory {
    public create = async (dictionary_type: string, dictionary_name: string, dictionary_desc: string) => {
        return prisma.dictionary.create({
            data: {
                id: faker.string.uuid(),
                dictionary_type,
                dictionary_name,
                dictionary_desc,
                created_at: faker.date.past({ years: 1 }),
            },
        })
    }
}

export default DictionaryFactory
