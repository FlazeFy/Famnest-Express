import { prisma } from "../configs/prisma"

export class MultiRepository {
    public async getContextTotalStats(context: string, userId: string | null, table?: string) {
        const whereClause: Record<string, any> = userId ? { created_by: userId } : {}

        const model = (prisma as any)[String(table)]
        if (!model) throw { code: 500, message: 'Table is not exist' }

        const results = await model.groupBy({
            by: [context],
            where: whereClause,
            _count: { [context]: true },
            orderBy: { 
                _count: { [context]: "desc" } 
            },
            take: 7,
        })

        if (!results.length) return null

        return results.map((dt: any) => ({
            [context]: dt[context],
            total: dt._count[context],
        }))
    }
}
