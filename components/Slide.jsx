// "use client"
// import React from "react";
// import { useState, useEffect } from "react";
// const Slide = () => {
//   const slides = [
//   {
//     id: 1,
//     image: "/banner/Natural-detox-juice-(500ml)-Banner-01.jpg",
//     title: "Effective Solution for Everyday Health",
//   },
//   {
//     id: 2,
//     image: "/Men-Power-Slider-02.jpg",
//     title: "Effective Solution for Everyday Health",
//   },
//     {
//     id: 3,
//     image: "/banner/Natural-detox-juice-(500ml)-Banner-02.jpg",
//     title: "Effective Solution for Everyday Health",
//   },
 
// ];

// const [current, setCurrent] = useState(0);

//   // Auto slide every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className=' sm:w-full md:w-[1024px] lg:w-[1300px] md:bg-amber-300 sm:bg-black lg:bg-amber-800 xl:bg-blue-500 xl:w-full  ' >
//       <img
//         src={slides[current].image}
//         alt="slider"
//         className=""
//       />
//       {/* <img src="/Men-Power-Slider-02.jpg"/> */}
//       {/* <img src="/banner/Natural-detox-juice-(500ml)-Banner-01.jpg"/> */}
//        {/* Dots */}
//   <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
//     {slides.map((_, index) => (
//       <div
//         key={index}
//         className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition ${
//           index === current ? "bg-white scale-110" : "bg-white/40"
//         }`}
//       />
//     ))}
//   </div>
//     </div>
//   );
// };

// export default Slide;




"use client";

import React, { useState, useEffect } from "react";

const Slide = () => {
  const slides = [
    {
      id: 1,
      image: "/banner/Natural-detox-juice-(500ml)-Banner-01.jpg",
    },
    {
      id: 2,
      image: "/banner/Natural-detox-juice-(500ml)-Banner-02.jpg",
    },
    {
      id: 3,
      image: "/Men-Power-Slider-02-1.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden">

      {/* Slider */}
      <div
        className="flex transition-transform duration-700 ease-in-out "
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <img
            key={slide.id}
            src={slide.image}
            alt="slider"
            className="w-full  flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-white scale-110"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default Slide;