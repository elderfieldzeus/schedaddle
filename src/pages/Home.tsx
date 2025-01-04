import React, { useState } from 'react'
import Header from '../components/Header'
import Cell from '../components/Cell'
import CellPlaceHolder from '../components/CellPlaceHolder'
import SubjectContainer from '../components/SubjectContainer'
import { ISchedule, ISubject } from '../types/types'
import { createProposedSchedules } from '../utils/schedule'

const Home: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  const handleAddSubject = (index: number) => {
    setSubjects(prev => {
      return [...prev, {
        id: Math.floor(Math.random() * 100),
        name: `Subject #${index + 1}`,
        schedules: []
      }]
    })
  }

  const handleDeleteSubject = (index: number): React.MouseEventHandler<HTMLButtonElement> => () => {
    setSubjects(prev => {
      return prev.filter((_, i) => index !== i);
    });
  }

  const handleChangeName = (index: number): React.ChangeEventHandler<HTMLInputElement> => (e) => {
    setSubjects(prev => {
      const copy = [...prev];

      copy[index] = {
        ...copy[index],
        name: e.target.value
      }
      
      return copy;
    });
  }

  const handleAddSchedule = (index: number) => (schedule: ISchedule) => {
    setSubjects(prev => {
      const copy = [...prev];

      const sCopy = [schedule, ...copy[index].schedules];

      copy[index] = {
        ...copy[index],
        schedules: sCopy
      };

      return copy;
    });
  }

  const handleDeleteSchedule = (subIndex: number) => (schedIndex: number): React.MouseEventHandler<HTMLButtonElement> => () => {
    setSubjects(prev => {
      return prev.map((subject, i) => 
        i === subIndex
          ? {
              ...subject,
              schedules: subject.schedules.filter((_, j) => j !== schedIndex),
            }
          : subject
      );
    });
  } 

  const handleGenerate = () => {
    console.log(createProposedSchedules(subjects));
  }

  return (
    <div className='min-h-screen w-full bg-white pb-10'>
      <Header />

      <main className='w-full px-10 flex flex-col lg:flex-row lg:justify-between gap-4'>
        <div className='w-full lg:w-[40rem]'>
            <div className='flex justify-between items-center mb-4'>
              <p className='text-xl font-medium'>Subject Schedules</p>
              <div className='flex gap-2'>
                <button
                  onClick={() => handleAddSubject(subjects.length)}
                  className='bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-xs transition-colors text-white px-4 py-2 rounded-lg font-medium'
                >
                    Add Subject
                </button>
                <button
                  onClick={handleGenerate}
                  className='bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-xs transition-colors text-white px-4 py-2 rounded-lg font-medium'
                >
                  Generate
                </button>
              </div>
            </div>

            <div className='w-full'>
              {
                subjects.map((subject, index) => {
                  return (
                    <SubjectContainer 
                      key={index}
                      subject={subject} 
                      handleChangeName = {handleChangeName(index)}
                      handleDeleteSubject = {handleDeleteSubject(index)}
                      handleAddSchedule = {handleAddSchedule(index)}
                      handleDeleteSchedule = {handleDeleteSchedule(index)}
                    />
                  );
                })
              }
            </div>
        </div>

        <div className='w-full lg:w-[46rem]'>
          <div className='w-full min-h-[46rem] bg-white border-2 border-gray-200 grid grid-cols-7 divide-x-2 divide-gray-200 divide-solid'>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid text-center'>
                <Cell className='bg-blue-400'>&nbsp;</Cell>
                <Cell>7:00-7:30AM</Cell>
                <Cell>7:30-8:00AM</Cell>
                <Cell>8:00-8:30AM</Cell>
                <Cell>8:30-9:00AM</Cell>
                <Cell>9:00-9:30AM</Cell>
                <Cell>9:30-10:00AM</Cell>
                <Cell>10:00-10:30AM</Cell>
                <Cell>10:30-11:00AM</Cell>
                <Cell>11:00-11:30AM</Cell>
                <Cell>11:30-12:00PM</Cell>
                <Cell>12:00-12:30PM</Cell>
                <Cell>12:30-1:00PM</Cell>
                <Cell>1:00-1:30PM</Cell>
                <Cell>1:30-2:00PM</Cell>
                <Cell>2:00-2:30PM</Cell>
                <Cell>2:30-3:00PM</Cell>
                <Cell>3:00-3:30PM</Cell>
                <Cell>3:30-4:00PM</Cell>
                <Cell>4:00-4:30PM</Cell>
                <Cell>4:30-5:00PM</Cell>
                <Cell>5:00-5:30PM</Cell>
                <Cell>5:30-6:00PM</Cell>
                <Cell>6:00-6:30PM</Cell>
                <Cell>6:30-7:00PM</Cell>
                <Cell>7:00-7:30PM</Cell>
                <Cell>7:30-8:00PM</Cell>
                <Cell>8:00-8:30PM</Cell>
                <Cell>8:30-9:00PM</Cell>
              </div>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid'>
                <Cell className='bg-blue-400 text-white font-medium'>Monday</Cell>
                <CellPlaceHolder />
              </div>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid'>
                <Cell className='bg-blue-400 text-white font-medium'>Tuesday</Cell>
                <CellPlaceHolder />
              </div>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid'>
                <Cell className='bg-blue-400 text-white font-medium'>Wednesday</Cell>
                <CellPlaceHolder />
              </div>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid'>
                <Cell className='bg-blue-400 text-white font-medium'>Thursday</Cell>
                <CellPlaceHolder />
              </div>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid'>
                <Cell className='bg-blue-400 text-white font-medium'>Friday</Cell>
                <CellPlaceHolder />
              </div>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid'>
                <Cell className='bg-blue-400 text-white font-medium'>Saturday</Cell>
                <CellPlaceHolder />
              </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
