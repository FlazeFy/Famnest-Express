export const randomEnumValue = <T>(values: readonly T[]): T => {
    return values[Math.floor(Math.random() * values.length)]
}

export const pickRandom = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)]
}

export const getLast7Days = () => {
    return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        d.setDate(d.getDate() - (6 - i))
        return d
    })
}
export const getLast7Months = () => {
    return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date()
        d.setDate(1)
        d.setHours(0, 0, 0, 0)
        d.setMonth(d.getMonth() - (6 - i))
        return d
    })
}
export const dayKey = (d: Date) => {
    return d.toISOString().slice(0, 10)
}
export const monthKey = (d: Date) => {
    return d.toISOString().slice(0, 7)
}
export const dayLabel = (d: Date) => {
    return d.toLocaleDateString('en-US', { weekday: 'short' })
}
export const monthLabel = (d: Date) => {
    return d.toLocaleDateString('en-US', { month: 'short' })
}
