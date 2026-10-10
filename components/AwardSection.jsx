const AwardSection = () => {
  const awards = [
    {
      image: "/award1.png",
      title: "Best Healthcare Service 2025",
      description: "Recognized for outstanding contribution to healthcare services.",
      organization: "Health Awards India",
      year: "2025",
    },
    {
      image: "/award2.png",
      title: "Excellence in Customer Care",
      description: "Awarded for delivering top-notch customer satisfaction.",
      organization: "Care Excellence Forum",
      year: "2024",
    },
    {
      image: "/award3.png",
      title: "Top Pharmacy Brand",
      description: "Ranked among the best pharmacy brands nationwide.",
      organization: "Pharma Leaders Summit",
      year: "2023",
    },
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#013e53]  to-[#088498] text-transparent bg-clip-text">
        Awards & Recognition
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {awards.map((award, index) => (
          <div
            key={index}
            className="relative group rounded-3xl p-[1px] bg-gradient-to-r from-[#013e53]  to-[#088498] hover:scale-105 transition duration-500"
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg h-full flex flex-col">
              
              {/* Year Badge */}
              <div className="absolute top-4 right-4 bg-[#1a9e83] text-white text-xs px-3 py-1 rounded-full shadow-md">
                {award.year}
              </div>

              {/* Image */}
              <div className="h-52 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={award.image}
                  alt={award.title}
                  className="h-full object-contain p-5 group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#1a9e83] transition">
                  {award.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {award.description}
                </p>

                {/* Divider */}
                <div className="w-10 h-1 bg-gradient-to-r from-[#013e53]  to-[#088498]  rounded-full my-2"></div>

                {/* Footer */}
                <span className="text-sm text-gray-500 font-medium">
                  {award.organization}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardSection;