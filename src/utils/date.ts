export function getTimeDate(date: string) {
    const date_sep: string[] = date.split(':');

    return createDate(Number.parseInt(date_sep[0]), Number.parseInt(date_sep[1]));
}

export function getTimeString(date: Date) {
    const hours = date.getHours();
    const mins = date.getMinutes()
    const merridian = (hours >= 12) ? 'PM' : 'AM';

    return `${hours % 12 == 0 ? 12 : hours % 12}:${mins >= 10 ? mins : `0${mins}`} ${merridian}`;
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