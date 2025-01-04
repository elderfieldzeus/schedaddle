export function getTimeDate(date: string) {
    const date_sep: string[] = date.split(':');

    return createDate(Number.parseInt(date_sep[0]), Number.parseInt(date_sep[1]));
}

export function getTimeString(date: Date) {
    const hours = date.getHours();
    const mins = date.getMinutes();
    const merridian = (hours >= 12) ? 'PM' : 'AM';

    return `${hours % 12 == 0 ? 12 : hours % 12}:${mins >= 10 ? mins : `0${mins}`} ${merridian}`;
}

export function getMinuteDifference(date1: Date, date2: Date): number {
    const date1_time = date1.getHours() * 60 + date1.getMinutes();
    const date2_time = date2.getHours() * 60 + date2.getMinutes();

    return date1_time - date2_time;
}

export function getLevel(start: Date): number {
    const beginning = createDate(7, 0);

    return getMinuteDifference(start, beginning) / 30;
}

export function createDate(hour: number, minutes: number): Date {
    const date = new Date()

    date.setHours(hour);
    date.setMinutes(minutes);

    return date;
}

export function compareDates(date1: Date, date2: Date): number {
    if(date1.getHours() == date2.getHours()) {
        return date1.getMinutes() - date2.getMinutes(); 
    }

    return date1.getHours() - date2.getHours();
}