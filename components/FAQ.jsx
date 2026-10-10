"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Aryan Shakti Acidity Care Juice?",
    answer: "It is an Ayurvedic juice designed to support digestion and reduce acidity."
  },
  {
    question: "What are the main benefits of this juice?",
    answer: "Helps improve digestion, reduces acidity, and supports gut health."
  },
  {
    question: "What are the key ingredients?",
    answer: "It contains natural herbs like Amla, Aloe Vera, and other Ayurvedic ingredients."
  },
  {
    question: "How should I use it (dosage)?",
    answer: "Take 10-20ml twice daily before meals or as directed by a physician."
  },
  {
    question: "How long will one bottle last?",
    answer: "It depends on usage, but typically 2–3 weeks."
  },
  {
    question: "Is it safe to use regularly?",
    answer: "Yes, it's generally safe, but consult a doctor if you have conditions."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" py-10">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Frequently Asked Questions
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className=" rounded-xl bg-[#e4f3ef] p-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            {/* QUESTION */}
            <div className="flex justify-between items-center">
              <p className=" text-[#1e4f15] font-semibold">
                {faq.question}
              </p>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* ANSWER */}
            {openIndex === index && (
              <p className="mt-3  text-[#033b2c]  text-sm">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}