import { Parser } from 'json2csv'

export const formatDateTime = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, "0")
    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())

    return `${year}-${month}-${day} ${hours}:${minutes}`
}
  
export const exportToCSV = (data: any[], fields: string[]) => {
    const parser = new Parser({ fields })
    return parser.parse(data)
}
