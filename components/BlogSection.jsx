"use client"

import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
const BlogSection = () => {
    const router = useRouter()
  const blogs = [
    {
      image: "/18658.jpg",
      title: "5 Tips for Better Health",
      description:
        "Discover simple habits that can improve your daily health and boost energy levels...",
      author: "Dr. Sharma",
      date: "Apr 10, 2026",
    },
    {
      image: "/24848.jpg",
      title: "Why Vitamins Matter",
      description:
        "Vitamins play a crucial role in keeping your immune system strong...",
      author: "Health Expert",
      date: "Apr 12, 2026",
    },
    {
      image: "/1187767.jpg",
      title: "Daily Fitness Routine",
      description:
        "A quick and effective fitness routine you can follow every day...",
      author: "Fitness Coach",
      date: "Apr 14, 2026",
    },
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Latest Blogs
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-[#e5f2ef] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 max-w-sm"
          >
            {/* Image */}
            <div className="h-52 w-full overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-800">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-3">
                {blog.description}
              </p>

              {/* Footer */}
              <div className="flex justify-between text-sm  mt-3">
                <span>{blog.author}</span>
                <span>{blog.date}</span>
              </div>

              <button className="mt-3 text-[#013e53] font-semibold hover:underline" onClick={()=>router.push('/blog')}>
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;