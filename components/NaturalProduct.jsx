import React from 'react'

import Image from 'next/image';

const NaturalProduct = () => {
  return (
    <div className=' p-5 mt-5 md:py-15 ' >
      <div className="flex flex-col items-center pt-10 pb-10">
        <p className="text-4xl font-medium text-center"> Natural Product</p>
        {/* <div className="w-28 h-0.5 bg-gray-400 mt-3"></div> */}
      </div>
     
        <div className='flex  flex-col md:flex-row  justify-between items-center px-5 md-px-20 text-xl gap-20 md:gap-0 '>
        <div className='flex gap-2 items-center flex-col md:flex-row'>
            <img src="/icon-Natural_Herbs.webp" alt='clean'/>
            <span className=''>CLEAN</span>
        </div>
        <div className=" w-0.5 h-14 bg-gray-400 mt-3 hidden md:flex"></div>
        <div className='flex gap-2 items-center flex-col md:flex-row'>
            <img src="/icon-No_Added_Sugar.avif" alt='vegan'/>
            <span className=''>VEGAN</span>
        </div>
         <div className="w-0.5 h-14 bg-gray-400 mt-3 hidden md:flex"></div>
        <div className='flex gap-2 items-center flex-col md:flex-row'>
            <img src="/icon-No_Artifical_Colors.webp" alt='rabbit'/>
            <span className=''>CRUELTY FREE</span>
        </div>
         <div className="w-0.5 h-14 bg-gray-400 mt-3 hidden md:flex"></div>
        <div className='flex gap-2 items-center flex-col md:flex-row'>
            <img src="/icon-No_Extracts_Used.avif" alt='clinical'/>
            <span className=''>CLINICALLY TESTED</span>
        </div>
        </div>
   

    </div>
  )
}

export default NaturalProduct
