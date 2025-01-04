import { compareDates, getTimeDate } from "./date";
import { EDate, IProposedSchedule, ISchedule, IScheduleOption, ISubject, ISubjectSpecific } from "../types/types";

export function convertSchedule(schedule: IScheduleOption): ISchedule {
    const days: EDate[] = [];

    schedule.days.forEach((day) => {
        let d: EDate = EDate.MONDAY;

        switch(day) {
            case 'monday': d = EDate.MONDAY; break;
            case 'tuesday': d = EDate.TUESDAY; break;
            case 'wednesday': d = EDate.WEDNESDAY; break;
            case 'thursday': d = EDate.THURSDAY; break;
            case 'friday': d = EDate.FRIDAY; break;
            case 'saturday': d = EDate.SATURDAY; break;
        }

        days.push(d);
    });

    days.sort();

    return {
        start: getTimeDate(schedule.start),
        end: getTimeDate(schedule.end),
        days
    };
}

export function createProposedSchedules(subjects: ISubject[]): IProposedSchedule[] {
    const proposedSchedules: IProposedSchedule[] = [];

    console.log(subjects);
    // recursive function to find all posible schedules
    getProposedSchedules(
        0,
        subjects,
        new IProposedSchedule(),
        proposedSchedules
    );
    
    return proposedSchedules
}

// Depth First Search
export function getProposedSchedules(
    index: number,
    subjects: ISubject[],
    proposedSchedule: IProposedSchedule,
    proposedSchedules: IProposedSchedule[]
): void
{
    if(index >= subjects.length) {
        proposedSchedules.push(proposedSchedule);
        return;
    }

    let status = true;

    // loop through the different subject schedules
    for(let i = 0; i < subjects[index].schedules.length && status; i++) {
        const sched = subjects[index].schedules[i];

        let copy: IProposedSchedule | null = proposedSchedule;

        // get newly updated schedule
        copy = insertSubject(copy, {
            id: subjects[index].id,
            name: subjects[index].name,
            schedule: sched
        });

        if(copy == null) {
            console.log('meow');
        }

        // if copy is not null, continue search
        if(copy !== null) {
            getProposedSchedules(
                index + 1,
                subjects,
                copy,
                proposedSchedules
            );
        }
    }
}

export function insertSubject(proposedSchedule: IProposedSchedule, subject: ISubjectSpecific): IProposedSchedule | null {

    for(let j: number = 0; j < subject.schedule.days.length; j++) {
        const day: EDate = subject.schedule.days[j];
        const scheds: undefined | ISubjectSpecific[] = proposedSchedule.days.get(day);
    
        // if error in map
        if(scheds === undefined) return null;

        // if subject already in schedule
        if(scheds.findIndex((sched) => sched.id === subject.id) !== -1) return null;


        // insert sorted by start time
        let i;
        for(i = 0
            ; i < scheds.length 
            && compareDates(subject.schedule.start, scheds[i].schedule.start) > 0
        ; i++) {}

        // if overlaps
        if(i !== scheds.length && (compareDates(subject.schedule.end, scheds[i].schedule.start) > 0)) return null;

        if(i !== 0 && (compareDates(scheds[i - 1].schedule.end, subject.schedule.start) > 0)) return null;

        // insert
        scheds.splice(i, 0, subject);

        proposedSchedule.days.set(day, scheds);
    }

    return proposedSchedule;
}