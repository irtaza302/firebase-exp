"use client";

import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  company?: string;
  companyLogo?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "UI Designer",
    company: "Adobe",
    companyLogo: "https://placehold.co/200x60?text=Adobe",
    avatar: "https://picsum.photos/200/200?random=4",
    quote: `The Photoshop course completely transformed my design skills. The instructor's clear explanations and practical examples made it easy to follow along. I now feel confident taking on complex design projects in my day-to-day work.`,
  },
  {
    id: "2",
    name: "Michael Thompson",
    role: "Web Developer",
    company: "Freelancer",
    avatar: "https://picsum.photos/200/200?random=5",
    quote: `As someone who was completely new to web design, the HTML & CSS course provided exactly what I needed. The step-by-step approach and project-based learning helped me build a solid foundation. I've now launched my own freelance business!`,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    company: "Spotify",
    companyLogo: "https://placehold.co/200x60?text=Spotify",
    avatar: "https://picsum.photos/200/200?random=6",
    quote: `I needed to learn Illustrator to create graphics for our campaigns. This course exceeded my expectations with its comprehensive coverage and practical exercises. I was able to apply what I learned immediately in my job.`,
  },
  {
    id: "4",
    name: "David Chen",
    role: "Motion Designer",
    company: "Netflix",
    companyLogo: "https://placehold.co/200x60?text=Netflix",
    avatar: "https://picsum.photos/200/200?random=7",
    quote: `The After Effects course was exactly what I needed to level up my motion design skills. The instructor's guidance through real-world projects made the complex concepts easy to understand. Highly recommended!`,
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our community of learners who have transformed their
            skills
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Testimonial Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <svg
                  width="45"
                  height="36"
                  className="text-blue-600 mb-5"
                  viewBox="0 0 45 36"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.5 18H9C9 12.9375 12.9375 9 18 9V13.5C15.525 13.5 13.5 15.525 13.5 18ZM0 18H4.5C4.5 12.9375 0.5625 9 -4.5 9V13.5C-2.025 13.5 0 15.525 0 18ZM13.5 31.5C13.5 33.975 15.525 36 18 36V31.5C12.9375 31.5 9 27.5625 9 22.5H4.5C4.5 27.5625 8.4375 31.5 13.5 31.5ZM27 31.5C27 33.975 29.025 36 31.5 36V31.5C26.4375 31.5 22.5 27.5625 22.5 22.5H18C18 27.5625 21.9375 31.5 27 31.5ZM40.5 31.5C40.5 33.975 42.525 36 45 36V31.5C39.9375 31.5 36 27.5625 36 22.5H31.5C31.5 27.5625 35.4375 31.5 40.5 31.5Z" />
                </svg>
                <blockquote className="text-lg md:text-xl text-gray-800 leading-relaxed">
                  {currentTestimonial.quote}
                </blockquote>
              </div>

              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {currentTestimonial.role}
                  </div>
                  {currentTestimonial.company && (
                    <div className="text-gray-500 text-sm">
                      {currentTestimonial.company}
                    </div>
                  )}
                </div>
                {currentTestimonial.companyLogo && (
                  <div className="ml-auto">
                    <div className="h-8 w-24 relative opacity-80">
                      <Image
                        src={currentTestimonial.companyLogo}
                        alt={`${currentTestimonial.company} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image Section */}
            <div className="relative bg-blue-600 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 opacity-90"></div>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  backgroundSize: "60px 60px",
                }}
              />
              <div className="flex items-center justify-center h-full p-12 relative z-10">
                <div className="text-white text-center">
                  <div className="text-4xl md:text-6xl font-bold mb-2">4.8</div>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-8 w-8 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-xl mb-6">Average Rating</div>
                  <div className="text-3xl font-bold mb-2">25,000+</div>
                  <div className="text-xl">Happy Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === activeIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
