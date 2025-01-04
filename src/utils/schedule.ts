import { compareDates } from "./date";
import { IProposedSchedule, ISingleSubject, IChosenSubjects } from "../types/types";

export function createProposedSchedules(subjects: IChosenSubjects): IProposedSchedule[] {
    const proposedSchedules: IProposedSchedule[] = [];

    // recursive function to find all posible schedules
    getProposedSchedules(
        0,
        subjects,
        new IProposedSchedule(),
        proposedSchedules
    );
    
    return proposedSchedules;
}

// Depth First Search
export function getProposedSchedules(
    index: number,
    subjects: IChosenSubjects,
    proposedSchedule: IProposedSchedule,
    proposedSchedules: IProposedSchedule[]
): void 
{
    if(index > subjects.length) {
        proposedSchedules.push(proposedSchedule);
        return;
    }

    // loop through the different subject schedules
    for(let i = 0; i < subjects[index].length; i++) {
        const option = subjects[index][i];

        let copy: IProposedSchedule | null = proposedSchedule;

        // loop through the days (MW, TTH, F)
        for(let j = 0; j < option.schedule.length && copy; j++) {
            // copy receives updated proposedSchedule if compatible, else gets null
            copy = insertSubject(copy, {
                ...option,
                schedule: option.schedule[j]
            });
        }

        // if copy is not null, continue search
        if(copy) {
            getProposedSchedules(
                index + 1,
                subjects,
                copy,
                proposedSchedules
            );
        }
    }
}

export function insertSubject(proposedSchedule: IProposedSchedule, subject: ISingleSubject, ): IProposedSchedule | null {
    const scheds: undefined | ISingleSubject[] = proposedSchedule.days.get(subject.schedule.day);
    
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
    if(i !== scheds.length && (subject.schedule.end > scheds[i].schedule.start)) return null;


    // insert
    scheds.splice(i, 0, subject);

    return proposedSchedule;
}