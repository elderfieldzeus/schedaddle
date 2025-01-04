export enum EDate {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}

export interface IScheduleOption {
    start: string;
    end: string;
    days: Set<string>;
}

export interface ISchedule {
    start: Date;
    end: Date;
    days: EDate[];
}

export interface ISubject {
    id: number;
    name: string;
    schedules: ISchedule[]; // TTH
}

export interface ISubjectSpecific {
    id: number;
    name: string;
    schedule: ISchedule; // TTH
}

export class IProposedSchedule {
    public days: Map<EDate, ISubjectSpecific[]>;

    constructor() {
        this.days = new Map();

        for(let i = 0; i < 7; i++) {
            this.days.set(i, []);
        }
    }
}

export interface ICell {
    start: number
    level: number;
    slots: number;
    name: string;
    empty: boolean;
};

export type IColumn = ICell[];

export type ITable = IColumn[];