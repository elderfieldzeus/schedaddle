import React from 'react'
import { IoMdTime } from 'react-icons/io'
import { EDate, ISchedule } from '../types/types'
import { getTimeString } from '../utils/date'

interface SubjectScheduleProps {
    schedule: ISchedule;
}

const SubjectSchedule: React.FC<SubjectScheduleProps> = ({schedule}) => {
  return (
    <div className='w-full flex items-center justify-between px-3 py-2 border-t'>
        <div className='flex items-center gap-4'>
            <IoMdTime />
            <div className='flex gap-1'>
                <p>{getTimeString(schedule.start)}</p>
                <p>-</p>
                <p>{getTimeString(schedule.start)}</p>
                <div className='flex'>
                    {
                        schedule.days.map((day, index) => {
                            let letter: string = '';
                            switch(day) {
                                case EDate.MONDAY: letter = 'M'; break;
                                case EDate.TUESDAY: letter = 'T'; break;
                                case EDate.WEDNESDAY: letter = 'W'; break;
                                case EDate.THURSDAY: letter = 'TH'; break;
                                case EDate.FRIDAY: letter = 'F'; break;
                                case EDate.SATURDAY: letter = 'S'; break;
                            }
                            return (
                                <p key={index}>{letter}</p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <button className='text-xs rounded-lg bg-red-400 py-1 px-2 text-white hover:bg-red-500 active:bg-red-600'>Remove Sched</button>
    </div>
  )
}

export default SubjectSchedule
