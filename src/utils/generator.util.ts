export const randomEnumValue = <T>(values: readonly T[]): T => {
    return values[Math.floor(Math.random() * values.length)]
}

export const pickRandom = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)]
}