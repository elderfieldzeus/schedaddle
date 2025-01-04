import React, { useRef, useState } from 'react'
import SelectTime from './SelectTime'
import DayCheckbox from './DayCheckbox'
import { compareDates, getTimeDate } from '../utils/date';
import SubjectSchedule from './SubjectSchedule';
import { ISchedule, IScheduleOption, ISubject } from '../types/types';
import { convertSchedule } from '../utils/schedule';
import { FaTrashAlt } from 'react-icons/fa';

interface SubjectContainerProps {
    subject: ISubject;
    handleChangeName: React.ChangeEventHandler<HTMLInputElement>;
    handleDeleteSubject: React.MouseEventHandler<HTMLButtonElement>;
    handleAddSchedule: (schedule: ISchedule) => void;
    handleDeleteSchedule: (schedIndex: number) => React.MouseEventHandler<HTMLButtonElement>;
}

const SubjectContainer: React.FC<SubjectContainerProps> = ({subject, handleChangeName, handleDeleteSubject, handleAddSchedule, handleDeleteSchedule}) => {
    const defaultSched: IScheduleOption = {
        start: "7:00",
        end: "7:00",
        days: new Set()
    };

    const [sched, setSched] = useState<IScheduleOption>(defaultSched);
    const formRef = useRef<HTMLFormElement>(null);


    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if(sched.days.size === 0) {
            return alert("Please select atleast one day.");
        }

        if(compareDates(getTimeDate(sched.start), getTimeDate(sched.end)) >= 0) {
            return alert("Invalid time input.");
        }

        handleAddSchedule(convertSchedule(sched));

        if(formRef.current) {
            formRef.current.reset();
        }

        setSched(defaultSched);
    }

    const handleChangeStart: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setSched(prev => {
            return {
                ...prev,
                start: e.target.value
            }
        })
    }

    const handleChangeEnd: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setSched(prev => {
            return {
                ...prev,
                end: e.target.value
            }
        })
    }

    const handleDay: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSched(prev => {
            const { days } = prev;

            if(!e.target.checked) {
                days.delete(e.target.value);
            }
            else {
                days.add(e.target.value);
            }

            return {
                ...prev,
                days
            }
        });
    }

  return (
    <div className='w-full mb-2'>
        <div className='w-full bg-blue-400 px-2 py-2 text-white font-medium border-2 border-gray-200 flex justify-between'>
            <input className='bg-blue-300 p-1 text-sm' value={subject.name} onChange={handleChangeName}/>
            <button 
                onClick={handleDeleteSubject}
                className='text-red-400 hover:text-red-500 active:text-red-600'
            >
                <FaTrashAlt />
            </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className='w-full px-3 py-1 text-xs flex flex-wrap gap-y-1 justify-between items-center'>
            <div className='flex gap-2'>
            <p>Start:</p>
            <SelectTime handleChange={handleChangeStart} value={sched.start}/>
            </div>
            <div className='flex gap-2'>
            <p>End:</p>
            <SelectTime handleChange={handleChangeEnd} value={sched.end}/>
            </div>
            <div className='flex gap-2'>
            <DayCheckbox label='M' value='monday' days={sched.days} handleDay={handleDay}/>
            <DayCheckbox label='T' value='tuesday' days={sched.days} handleDay={handleDay}/>
            <DayCheckbox label='W' value='wednesday' days={sched.days} handleDay={handleDay}/>
            <DayCheckbox label='TH' value='thursday' days={sched.days} handleDay={handleDay}/>
            <DayCheckbox label='F' value='friday' days={sched.days} handleDay={handleDay}/>
            <DayCheckbox label='S' value='saturday' days={sched.days} handleDay={handleDay}/>
            </div>
            <button className='text-xs rounded-lg bg-blue-400 py-1 px-2 text-white hover:bg-blue-500 active:bg-blue-600'>Add Sched</button>
        </form>

        <div className='w-full text-xs flex flex-col'>
            {
                subject.schedules.map((schedule, index) => {
                    return (
                        <SubjectSchedule 
                            key={index}
                            schedule = {schedule}
                            handleDelete = {handleDeleteSchedule(index)}
                        />
                    )
                })
            }
        </div>
    </div>
  )
}

export default SubjectContainer
