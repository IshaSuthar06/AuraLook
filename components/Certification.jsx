import React from "react";

const Certification = () => {
  const certificates = [
    "/certificate.webp",
    "/certificate.webp",
    "/certificate.webp",
    "/certificate.webp",
    "/certificate.webp",
    "/certificate.webp",
  ];

  return (
    <div className="bg-[#f1f7fd] py-16 px-5 flex flex-col items-center">
      
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold capitalize mb-12 text-gray-800">
        Certified Excellence
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {certificates.map((img, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={img}
              alt={`certificate-${index}`}
              className="w-full h-[280px] object-cover hover:scale-105 transition duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certification;