"use client"
import toast from 'react-hot-toast';

import React, { Suspense } from 'react'
import { Clock4, LocationEdit, Mail, MapPin, Phone } from "lucide-react";
import ContactPage from '../../components/ContactPage';

const page = () => {
    
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       name: e.target.name.value,
//       email: e.target.email.value,
//       phone: e.target.phone.value,
//       subject: e.target.subject.value,
//       message: e.target.message.value,
//     };

//      const loadingId = toast.loading("Sending message...");

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       toast.dismiss(loadingId); // remove loading toast

//       if (res.ok) {
//         e.target.reset();
//         toast.success("Message sent successfully! 🎉");
//       } else {
//         toast.error("Error sending message.");
//       }
//     } catch (err) {
//       toast.dismiss(loadingId);
//       toast.error("Something went wrong.");
//     }
//   };


  return (
//     <div>
       
//       {/* Contact Section */}
//       <div className="bg-white py-5 px-2 lg:mx-40 lg:mt-15 flex justify-center items-center shadow-2xl ">
//         {/* Main container with flex-row on large screens */}
//         <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-10 items-center p-4">
//           {/* ✅ Left Side: Image */}
//           <div className="w-full lg:w-1/2 flex justify-center items-center">
//             <iframe
//               src="https://www.google.com/maps?q=Aryanshakti+Aryans+Enterprises&output=embed"
//               className="w-full h-[500px]"
//             ></iframe>
//           </div>

//           {/* ✅ Right Side: Form */}
//           <div className="w-full lg:w-1/2">
//             <form className="flex flex-col gap-4 p-2">
//               <h3 className="font-bold text-3xl text-[#2d2d3e] ">
//                 Contact With Us
//                  <hr className="h-[3px] w-[70px] font-bold bg-[#1893bf] mt-2"></hr>
//               </h3>
              
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1893bf]"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1893bf]"
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone"
//                 className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1893bf]"
//               />
//               <input
//                 type="text"
//                 name="subject"
//                 placeholder="Subject"
//                 className="border border-gray-300 rounded-md p-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1893bf]"
//               />
//               <textarea
//                 placeholder="Write Your Message Here....."
//                 name="message" 
//                 className="h-32 border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#1893bf]"
//               ></textarea>
//               <button
//                 type="submit"
//                 className="mt-4 bg-[#1a9e83] text-white px-6 py-3 rounded-md hover:bg-[#166e5d] transition"
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
      
//       <div className="flex flex-col lg:flex-row justify-center items-center gap-8 px-2 py-12 bg-white">
//   {/* Contact Card */}
//   <div className="w-80 h-auto bg-[#e4f3ef] text-[#1a9e83] rounded-xl p-8 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 text-center">
//     <div className="bg-white text-[#1a9e83] p-4 rounded-full mb-6 mx-auto w-fit">
//       <Phone className="size-12" />
//     </div>
//     <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
//     <p className="text-base font-medium">+91 000000000</p>
//     <p className="text-base font-medium">example@gmail.com</p>
//   </div>

//   {/* Location Card */}
//   <div className="w-80  h-auto bg-[#e4f3ef] text-[#1a9e83] rounded-xl p-8 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 text-center">
//     <div className="bg-white text-[#1a9e83] p-4 rounded-full mb-6 mx-auto w-fit">
//       <MapPin className="size-12" />
//     </div>
//     <h2 className="text-2xl font-bold mb-2">Location</h2>
//     <p className="text-base font-medium">00 , xx , xxxxxxx (X)</p>
//     <p className="text-base font-medium">Mumbai – xxxxxx</p>
//   </div>

//   {/* Time Card */}
//   <div className="w-80  h-auto bg-[#e4f3ef] text-[#1a9e83] rounded-xl p-8 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 text-center">
//     <div className="bg-white text-[#1a9e83] p-4 rounded-full mb-6 mx-auto w-fit">
//       <Clock4 className="size-12" />
//     </div>
//     <h2 className="text-2xl font-bold mb-2">Timings</h2>
//     <p className="text-base font-medium">Mon / Wed / Fri: 5 PM – 8 PM</p>
//     <p className="text-base font-medium">Tue / Thu / Sat: 10 AM – 5 PM</p>
//   </div>
// </div>

//     </div>
<>
<ContactPage/>
</>
  );
};

export default page
