import React from 'react'
import Header from '../components/Header'

const Home: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-blue-200'>
      <Header />

      <main className='w-full px-10 flex justify-between'>
        <div className='w-5/12 lg:bg-white h-96 border-2 border-gray-400'>
            <p className='text-xl'>Subject Schedules</p>
            <button>
                
            </button>
        </div>

        <div className='w-6/12 bg-white h-96 border-2 border-gray-400'>

        </div>
      </main>
    </div>
  )
}

export default Home
