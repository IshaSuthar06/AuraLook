import React from 'react'
import Catalouge from './Catalouge'



const Catagories = () => {
    const data=[
        {image:"/category-images/Energy-and-Performance.jpg",
         title:"Energy and Performance"
        },
        {image:"/category-images/health-juices.jpg",
         title:"Healthy Juices "
        },
        {image:"/category-images/Gut-Health-and-Digestion.jpg",
         title:"Gut Health and Digestion"
        },
          {image:"/catagory7.webp",
         title:"Pills"
        },
        
    ]
  return (
    <div className=" ">

  
    <div className='relative flex gap-10 bg-[#e5f2ef] flex-wrap justify-center py-20'>
     {data.map((item,index)=>(
        <Catalouge key={index} image={item.image} title={item.title}/>
     ))}
    </div>
      </div>
  )
}

export default Catagories
