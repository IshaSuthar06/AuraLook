// "use client";

// import React, { useEffect, useState } from "react";

// const slides = [
//   {
//     id: 1,
//     image: "/Slider-01.jpg",
//     title: "Effective Solution for Everyday Health",
//   },
//   {
//     id: 2,
//     image: "/slider1.png",
//     title: "Quality Medicines You Can Trust",
//   },
//   {
//     id: 3,
//     image: "/service3.jpg",
//     title: "Your Health, Our Priority",
//   },
// ];

// const Slider = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-[400px] sm:h-[500px] md:h-[650px] overflow-hidden">

//       {slides.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === current ? "opacity-100" : "opacity-0"
//           }`}
//           style={{
//             backgroundImage: `url(${slide.image})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           {/* Overlay */}
//           {/* <div className="absolute inset-0 bg-black/40"></div> */}

//           {/* Content */}
//           <div className="relative z-10 flex flex-col gap-4 px-5 sm:px-10 md:px-20 py-10 sm:py-16 md:py-20 h-full justify-end text-white">

//             {/* <h2 className="text-2xl sm:text-4xl md:text-6xl max-w-[90%] md:max-w-[800px] font-semibold leading-tight">
//               {slide.title}
//             </h2> */}

//             {/* <div className="flex flex-wrap gap-3">
//               <button className="bg-[#088498] px-4 sm:px-6 py-2 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base">
//                 Shop Now
//               </button>

//               <button className="px-4 sm:px-8 py-2 rounded-xl sm:rounded-2xl font-semibold border border-white text-sm sm:text-base">
//                 Explore Collection
//               </button>
//             </div> */}

//           </div>
//         </div>
//       ))}

//       {/* Dots */}
//       <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${
//               index === current ? "bg-white" : "bg-white/40"
//             }`}
//           />
//         ))}
//       </div>

//     </div>
//   );
// };

// export default Slider;


"use client";

import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/Slider-01.jpg",
    title: "Effective Solution for Everyday Health",
  },
  {
    id: 2,
    image: "/Slider-01.jpg",
    title: "Quality Medicines You Can Trust",
  },
  {
    id: 3,
    image: "/service3.jpg",
    title: "Your Health, Our Priority",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  // Auto change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] overflow-hidden">

  {slides.map((slide, index) => (
    <div
      key={slide.id}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover sm:bg-cover md:bg-cover"
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      />
      {/* Content */}
      <div className="relative z-20 flex flex-col gap-4 sm:gap-5 
        px-5 sm:px-10 md:px-20 
        py-10 sm:py-16 md:py-20 
        h-full justify-end text-white"
      >
        
      </div>
    </div>
  ))}

  {/* Dots */}
  <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
    {slides.map((_, index) => (
      <div
        key={index}
        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition ${
          index === current ? "bg-white scale-110" : "bg-white/40"
        }`}
      />
    ))}
  </div>

</div>
  );
};

export default Slider;