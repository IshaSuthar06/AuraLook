import React from 'react'
import InstaReel from './InstaReel'

const DisplayReel = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 py-10' >
      {/* <InstaReel id="DUs18-JDBWP"/>
      <InstaReel id="DUs18-JDBWP"/>
      <InstaReel id="DUs18-JDBWP"/> */}
      {/* <InstaReel id="DVLvkmfjUUo"/>
      <InstaReel id="DU-3iSGAtdP"/> */}
      <div>
        <h1 className='text-3xl font-semibold pb-10'> STORIES</h1>
      
        </div>
        
<div className='flex gap-10 px-10 md:flex-row justify-center flex-col items-center'>


      <div className="w-[300px] h-[500px] border-2 border-gray-100 justify-center flex items-center rounded-3xl bg-[#e5f2ef] bg-[url('/reel.png')]">
        <img className='flex rounded-3xl' src='/reel.png'/>
      </div>
     <div className='w-[300px] h-[500px] border-2 border-gray-100 rounded-3xl  justify-center flex items-center bg-[#e5f2ef]'>
      <img className='flex rounded-3xl' src='/3-1.png'/>
      </div>
      <div className='w-[300px] h-[500px] border-2 border-gray-100 rounded-3xl  justify-center flex items-center bg-[#e5f2ef]' >
        <img className='flex rounded-3xl' src='/2.png'/>
      </div>
      <div className='w-[300px] h-[500px] border-2 border-gray-100 rounded-3xl  justify-center flex items-center bg-[#e5f2ef]' >
        <img className='flex rounded-3xl' src='/4.png'/>
      </div>
    </div>

    </div>
  )
}

export default DisplayReel
