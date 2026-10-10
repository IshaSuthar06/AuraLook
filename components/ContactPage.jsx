"use client";

import { useEffect,useState } from "react";
import {
  Menu,
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowDown,
  Send,
  Home,
  User,
  ChevronDown,
  Leaf,
} from "lucide-react";

export default function ContactPage() {

    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [phone,setPhone]= useState("");
    const [subject,setSubject]= useState("wellness Consultation");
    const [message,setMessage]= useState("");
    const [loading,setLoading]= useState(false)

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = {
    name,
    email,
    phone,
    subject,
    message,
  };

  try {
    setLoading(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert("Message sent successfully 🌿");

      // reset form
      setName("");
      setEmail("");
      setPhone("");
      setSubject("Wellness Consultation");
      setMessage("");
    } else {
      alert("Failed to send message");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className=" text-[#1b1d0e] overflow-x-hidden">
   

      <main className="bg-gray-100">
        {/* HERO */}
        <section className="relative h-[75vh] flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop"
            alt="Ayurveda"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 text-center px-6 reveal">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Contact Aryan Shakti
            </h2>

            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              We’re here to support your wellness journey with Ayurvedic care
              and natural healing.
            </p>

            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 bg-[#154212] hover:bg-[#23501e] text-white px-8 py-4 rounded-full transition-all duration-300"
            >
              Get in Touch
              <ArrowDown size={18} />
            </a>
          </div>
        </section>

        {/* CONTACT CARDS */}
        <section className="py-24 px-6 md:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal">
            {[
              {
                icon: <Phone />,
                title: "Phone",
                value: "+91 83799 77555",
              },
              {
                icon: <Mail />,
                title: "Email",
                value: "info@AryanShakti.com",
              },
              {
                icon: <MapPin />,
                title: "Office",
                value: "Laxmi Sawmill Compound, Vasai West, Dist: Palghar. 401202, Maharashtra – India",
              },
              {
                icon: <Clock />,
                title: "Business Hours",
                value: "9 AM - 9 PM",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#154212] rounded-2xl p-8 shadow-sm border border-[#d9dccb] hover:-translate-y-2 hover:shadow-xl transition-all duration-300 text-center flex items-center flex-col justify-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#F4F5DC] flex items-center justify-center text-[#154212] mb-6">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-semibold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section
          id="contact-form"
          className="py-24 px-6 md:px-16 bg-[#f5f5dc]"
        >
          <div className="max-w-5xl mx-auto reveal">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-[#154212] mb-4">
                Send a Message
              </h2>

              <div className="w-24 h-1 bg-[#cca730] mx-auto rounded-full" />
            </div>

            <form  onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-14 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">

              <Input
              type="text"
               value={name} 
               onChange={(e)=>setName(e.target.value)} 
               label="Full Name" 
               placeholder="Enter your name" />

              <Input
              type="email"
               value={email}
               onChange={(e)=>setEmail(e.target.value)} label="Email Address" placeholder="you@example.com" />

              <Input 
              type="tel"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)} label="Phone Number" placeholder="+91 00000 00000" />

              <div>
                <label className="block mb-2 font-medium text-[#154212]">
                  Subject
                </label>

                <select 
                   value={subject} 
                   onChange={(e)=>setSubject(e.target.value)} 
                   className="w-full border-b-2 border-[#154212]/20 bg-transparent py-3 outline-none focus:border-[#154212]">
                  <option>Wellness Consultation</option>
                  <option>Order Support</option>
                  <option>Product Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium text-[#154212]">
                  Message
                </label>

                <textarea
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    rows={5}
                  placeholder="How can we help you?"
                  className="w-full border-b-2 border-[#154212]/20 bg-transparent py-3 outline-none focus:border-[#154212] resize-none"
                />
              </div>

              <div className="md:col-span-2 text-center">
                <button
  type="submit"
  disabled={loading}
  className="bg-[#cca730] hover:bg-[#b99724] text-black px-12 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
>
  {loading ? "Sending..." : "Send Message"}
</button>
              </div>
            </form>
          </div>
        </section>

        {/* QUOTE */}
        <section className="py-24 bg-[#154212] text-white text-center px-6 reveal">
          <Leaf className="mx-auto mb-8 text-[#ffe088]" size={60} />

          <blockquote className="text-3xl md:text-5xl font-semibold italic max-w-4xl mx-auto leading-relaxed mb-6">
            “Heal the body, quiet the mind, and return to your natural rhythm.”
          </blockquote>

          <p className="max-w-2xl mx-auto text-white/80 text-lg">
            Rooted in ancient Ayurvedic wisdom, Aryan Shakti delivers wellness
            through purity, balance, and natural healing.
          </p>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 md:px-16 bg-white">
          <div className="max-w-4xl mx-auto reveal">
            <h2 className="text-4xl font-bold text-center text-[#154212] mb-14">
              Frequently Asked Questions
            </h2>

            <div className="space-y-5">
              <FAQ
                title="How does consultation work?"
                content="Our Ayurvedic experts provide personalized wellness guidance based on your body constitution and lifestyle."
              />

              <FAQ
                title="How long does shipping take?"
                content="Domestic shipping usually takes 3–5 business days across India."
              />

              <FAQ
                title="Can I track my order?"
                content="Yes, tracking details are sent via email and WhatsApp after dispatch."
              />

              <FAQ
                title="Do you offer returns?"
                content="Returns are accepted for damaged products reported within 48 hours."
              />
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="h-[450px]">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Aryanshakti+Aryans+Enterprises&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
          
        </section>

      </main>

   


      {/* ANIMATION STYLES */}
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s ease;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block mb-2 font-medium text-[#154212]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border-b-2 border-[#154212]/20 bg-transparent py-3 outline-none focus:border-[#154212]"
      />
    </div>
  );
}

function FAQ({ title, content }) {
  return (
    <details className="bg-[#E4F3EF] rounded-2xl p-6 shadow-sm group">
      <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-[#154212]">
        {title}

        <ChevronDown className="group-open:rotate-180 transition-transform" />
      </summary>

      <p className="mt-4 text-[#154212] leading-relaxed">{content}</p>
    </details>
  );
}

function MobileNavItem({ icon, label }) {
  return (
    <button className="flex flex-col items-center text-gray-600 text-sm">
      {icon}
      <span>{label}</span>
    </button>
  );
}