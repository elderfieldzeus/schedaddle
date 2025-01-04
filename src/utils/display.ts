import { IProposedSchedule, ISubjectSpecific, ITable } from "../types/types";
import { getLevel, getMinuteDifference } from "./date";

export function createDefaultTable(): ITable {
    const table: ITable = [];

    for(let i = 0; i < 6; i++) {
        table.push([]);
        for(let j = 0; j < 28; j++) {
            table[i].push({
                start: j,
                level: j,
                slots: 1,
                name: '',
                empty: true
            });
        }
    }

    return table;
}

export function convertTable(proposedSchedule: IProposedSchedule): ITable {
    const table = createDefaultTable();

    for(const key of proposedSchedule.days.keys()) {
        let subtract = 0;
        const data: ISubjectSpecific[] | undefined = proposedSchedule.days.get(key);

        if(data) {
            data.forEach((d) => {
                const start = getLevel(d.schedule.start);
                const level = start - subtract;
                console.log(level);
                const slots = getMinuteDifference(d.schedule.end, d.schedule.start) / 30;
                
                subtract += (slots - 1);
                table[key].splice(level, slots, {
                    start,
                    level,
                    slots,
                    name: d.name,
                    empty: false
                });
            });
        }
    }

    return table;
} 