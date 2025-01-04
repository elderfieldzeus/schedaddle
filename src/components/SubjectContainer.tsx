import React, { useState } from 'react'
import SelectTime from './SelectTime'
import DayCheckbox from './DayCheckbox'
import { createDate } from '../utils/date';
import SubjectSchedule from './SubjectSchedule';
import { EDate } from '../types/types';

interface SubjectContainerProps {
    index?: number;
}

const SubjectContainer: React.FC<SubjectContainerProps> = ({index}) => {
    const [name, setName] = useState<string>(`Subject #${index}`);

  return (
    <div className='w-full mb-2'>
        <div className='w-full bg-blue-400 px-2 py-2 text-white font-medium border-2 border-gray-200'>
            <input className='bg-blue-300 p-1 text-sm' value={name} onChange={(e) => {setName(e.currentTarget.value)}}/>
        </div>

        <form className='w-full px-3 py-1 text-xs flex justify-between items-center'>
            <div className='flex gap-2'>
            <p>Start</p>
            <SelectTime />
            </div>
            <div className='flex gap-2'>
            <p>End</p>
            <SelectTime />
            </div>
            <div className='flex gap-2'>
            <DayCheckbox label='M' value='monday'/>
            <DayCheckbox label='T' value='tuesday'/>
            <DayCheckbox label='W' value='wednesday'/>
            <DayCheckbox label='TH' value='thursday'/>
            <DayCheckbox label='F' value='friday'/>
            <DayCheckbox label='S' value='saturday'/>
            </div>
            <button className='text-xs rounded-lg bg-blue-400 py-1 px-2 text-white hover:bg-blue-500 active:bg-blue-600'>Add Sched</button>
        </form>

        <div className='w-full text-xs flex flex-col'>
            <SubjectSchedule 
                schedule = {{
                    start: createDate(7, 30),
                    end: createDate(10, 0),
                    days: [EDate.TUESDAY, EDate.THURSDAY]
                }} />
            <SubjectSchedule 
                schedule = {{
                    start: createDate(10, 30),
                    end: createDate(10, 0),
                    days: [EDate.TUESDAY, EDate.THURSDAY]
                }} />
        </div>
    </div>
  )
}

export default SubjectContainer
