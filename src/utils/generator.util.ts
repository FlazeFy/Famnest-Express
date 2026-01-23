export const randomEnumValue = <T>(values: readonly T[]): T => {
    return values[Math.floor(Math.random() * values.length)]
}