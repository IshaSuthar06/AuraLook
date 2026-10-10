import React from 'react'

const ServiceDisplay = () => {
  return (
    <div className='flex justify-center items-center bg-[#e5f2ef] text-white gap-8 px-10 py-5 md:flex-row flex-col'>



      <div className="w-full bg-[url('/1187767.jpg')] bg-cover bg-center h-[600px] rounded-3xl flex items-end">
        {/* <h1 className='text-4xl text-white font-bold w-[370px] leading-tight px-4'>Our Ayurvedic Products Range</h1> */}
      </div>

      <div className="w-full flex flex-col gap-4 py-4">

        <div className="bg-[url('/service2.jpg')] bg-cover bg-center h-[300px] w-full rounded-3xl ">

 {/* <h1 className='text-4xl text-white font-bold w-[400px] leading-tight px-2'> Our Ayurvedic Products Range</h1> */}

        </div>

        <div className="gap-10 bg-[url('/service3.jpg')] bg-cover bg-center h-[300px] rounded-3xl flex w-full items-end justify-end">

 {/* <h1 className='text-4xl text-white font-bold leading-tight p-2 py-3'>Our Ayurvedic Products Range</h1> */}

        </div>

      </div>

</div>
  
  )
}

export default ServiceDisplay
