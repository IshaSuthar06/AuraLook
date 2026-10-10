import React from 'react'

const MiddleBanner = () => {
  return (
    <div className='bg-[#e5f2ef] '>

  
    <div className='flex justify-center items-center gap-10 p-10 md:flex-row flex-col '>

      <div className="flex justify-start items-end  bg-[url('/2151905151.jpg')] md:w-1/2 w-full h-[500px] bg-center bg-cover rounded-2xl py-10  px-4 ">
        {/* <img src='./medicine3.webp' className='bg-cover bg-center rounded-3xl'/> */}
        
       <h1
  className='text-4xl text-white font-bold w-[370px] leading-tight'
  style={{ textShadow: "0px 4px 10px rgba(0,0,0,0.8)" }}
>Stock Up on Health - Explore Deals Now!</h1>

      </div>

      <div className="flex justify-start items-end  bg-[url('/18658.jpg')] md:w-1/2 w-full h-[500px] bg-center bg-cover rounded-2xl py-10 px-4">
        {/* <img src='./medicine2.webp' className='bg-center bg-cover rounded-3xl'/> */}
        <h1
  className='text-4xl text-white font-bold w-[500px] leading-tight'
  style={{ textShadow: "0px 4px 10px rgba(0,0,0,0.8)" }}
>Your Health Booster Just Got a Price Drop!</h1>
      </div>

    </div>


    <div className="overflow-hidden py-6">
  <div className="flex w-max animate-marquee gap-10">

    {/* First copy */}
  <h1 className="group text-9xl font-bold whitespace-nowrap transition-all duration-300">

  <span className="text-[#088498] 
    group-hover:text-transparent 
    group-hover:[-webkit-text-stroke:2px_#088498]">
    Boost Your
  </span>{" "}

  <span className="text-[#013f52] 
    group-hover:text-transparent 
    group-hover:[-webkit-text-stroke:2px_#013f52]">
    Health
  </span>

</h1>

    {/* Second copy (for seamless loop) */}
    <h1 className="group text-9xl font-bold whitespace-nowrap transition-all duration-300">

  <span className="text-[#088498] 
    group-hover:text-transparent 
    group-hover:[-webkit-text-stroke:2px_#088498]">
    Boost Your
  </span>{" "}

  <span className="text-[#013f52] 
    group-hover:text-transparent 
    group-hover:[-webkit-text-stroke:2px_#013f52]">
    Health
  </span>

</h1>

  </div>
</div>
      </div>
  )
}

export default MiddleBanner
