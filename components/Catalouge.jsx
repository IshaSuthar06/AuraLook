import Image from 'next/image'
import React from 'react'

const Catalouge = ({image,title}) => {
  return (
    <div className="">
    <div style={{ backgroundImage: `url(${image})` }} className='relative bg-green-100 w-[300px] h-[350px] bg-cover bg-center rounded-3xl' >
      
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent z-0"></div>

      {/* Text (above gradient) */}
      <h2 className="absolute bottom-4 w-full text-white text-2xl text-center z-10">
        {title}
      </h2>

</div>
</div>
  )
}

export default Catalouge
