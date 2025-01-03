export function createDate(hour: number, minutes: number): Date {
    const date = new Date()

    date.setHours(hour);
    date.setMinutes(minutes);

    return date;
}

export function compareDates(date1: Date, date2: Date): number {
    return date1.getTime() - date2.getTime();
}