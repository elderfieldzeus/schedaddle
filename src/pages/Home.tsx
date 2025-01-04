import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cell from '../components/Cell'
import SubjectContainer from '../components/SubjectContainer'
import { IProposedSchedule, ISchedule, ISubject, ITable } from '../types/types'
import { createProposedSchedules } from '../utils/schedule'
import { convertTable, createDefaultTable } from '../utils/display'

const Home: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [proposed, setProposed] = useState<IProposedSchedule[]>([]);
  const [table, setTable] = useState<ITable>(createDefaultTable());
  const [index, setIndex] = useState<number>(0);

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
    setProposed(createProposedSchedules(subjects))
  }

  useEffect(() => {
    if(proposed.length > 0) {
      setTable(convertTable(proposed[0]));
    }
    else {
      setTable(createDefaultTable());
    }
    
    setIndex(0);
  }, [proposed]);

  useEffect(() => {
    if(proposed.length > 0) {
      setTable(convertTable(proposed[index]));
    }
    else {
      setIndex(0);
      setTable(createDefaultTable());
    }
  }, [index]);

  return (
    <div className='min-h-screen w-full bg-white pb-10'>
      <Header />

      <main className='w-full px-10 flex flex-col lg:flex-row lg:justify-between gap-4'>
        <div className='w-full lg:w-[40rem]'>
            <div className='flex justify-between items-center h-14'>
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
          <div className='flex justify-between items-center h-14'>
            <div className='flex gap-2'>
              <button
                onClick={() => setIndex(prev => prev - 1)}
                className=' bg-blue-400 disabled:bg-blue-200 active:bg-blue-600 text-xs transition-colors text-white w-24 py-2 rounded-lg font-medium'
                disabled={index <= 0}
              >
                Previous
              </button>
              <button
                onClick={() => setIndex(prev => prev + 1)}
                className='bg-blue-400 disabled:bg-blue-200 active:bg-blue-600 text-xs transition-colors text-white w-24 py-2 rounded-lg font-medium'
                disabled={index >= proposed.length - 1}
              >
                Next
              </button>
            </div>
            <button
              onClick={() => setTable(createDefaultTable())}
              className='bg-red-400 hover:bg-red-500 active:bg-red-600 text-xs transition-colors text-white px-4 py-2 rounded-lg font-medium'
            >
              Clear Table
            </button>
          </div>
          <div className='w-full min-h-[46rem] bg-white border-2 border-gray-200 grid grid-cols-7 divide-x-2 divide-gray-200 divide-solid'>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid text-center'>
                <Cell className='bg-blue-400 text-white'>&nbsp;</Cell>
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
                <Cell className='bg-blue-400 text-white font-medium row-span-4'>Monday</Cell>
                {table[0].map((cell, index) => {
                  return (
                    <Cell key={index} level={cell.start} slots={cell.slots} empty={cell.empty}><p>{cell.name}</p></Cell>
                  )
                })}
              </div>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid'>
                <Cell className='bg-blue-400 text-white font-medium'>Tuesday</Cell>
                {table[1].map((cell, index) => {
                  return (
                    <Cell key={index} level={cell.start} slots={cell.slots} empty={cell.empty}><p>{cell.name}</p></Cell>
                  )
                })}
              </div>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid'>
                <Cell className='bg-blue-400 text-white font-medium'>Wednesday</Cell>
                {table[2].map((cell, index) => {
                  return (
                    <Cell key={index} level={cell.start} slots={cell.slots} empty={cell.empty}><p>{cell.name}</p></Cell>
                  )
                })}
              </div>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid'>
                <Cell className='bg-blue-400 text-white font-medium'>Thursday</Cell>
                {table[3].map((cell, index) => {
                  return (
                    <Cell key={index} level={cell.start} slots={cell.slots} empty={cell.empty}><p>{cell.name}</p></Cell>
                  )
                })}
              </div>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid'>
                <Cell className='bg-blue-400 text-white font-medium'>Friday</Cell>
                {table[4].map((cell, index) => {
                  return (
                    <Cell key={index} level={cell.start} slots={cell.slots} empty={cell.empty}><p>{cell.name}</p></Cell>
                  )
                })}
              </div>
              <div className='h-full grid grid-rows-[repeat(29,1fr)] text-xs divide-y-2 divide-gray-200 divide-solid'>
                <Cell className='bg-blue-400 text-white font-medium'>Saturday</Cell>
                {table[5].map((cell, index) => {
                  return (
                    <Cell key={index} level={cell.start} slots={cell.slots} empty={cell.empty}><p>{cell.name}</p></Cell>
                  )
                })}
              </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
