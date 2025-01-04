export enum EDate {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}

export interface ISchedule {
    start: Date;
    end: Date;
    days: EDate[];
}

export interface ISubject {
    id: number;
    name: string;
    schedule: ISchedule; // TTH
}

export type ISubjectOfferedSchedules = ISubject[];

export type IChosenSubjects = ISubjectOfferedSchedules[]; // subject[specific-subject][sched-option]

export class IProposedSchedule {
    public days: Map<EDate, ISubject[]>;

    constructor() {
        this.days = new Map();

        for(let i = 0; i < 7; i++) {
            this.days.set(i, []);
        }
    }
}