/**
 * Local calendar day as "YYYY-MM-DD" — for comparing days, not moments.
 */
export const toDayKey = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${date.getFullYear()}-${month}-${day}`
}

/**
 * Monday 00:00 of the week `date` falls into.
 */
export const startOfWeek = (date: Date) => {
    const daysSinceMonday = (date.getDay() + 6) % 7
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysSinceMonday)
}
