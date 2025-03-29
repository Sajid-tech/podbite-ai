import React from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager at Google",
    content: "PodBite has transformed how I consume podcasts. I get through my listening list in a fraction of the time while retaining more information than ever.",
    rating: 5,
    avatar: "/avatars/sarah-johnson.jpg"
  },
  {
    name: "Michael Chen",
    role: "Founder at TechStart",
    content: "As a busy founder, PodBite gives me key insights in minutes. It's like having a research assistant who works at lightning speed.",
    rating: 5,
    avatar: "/avatars/michael-chen.jpg"
  },
  {
    name: "Emily Rodriguez",
    role: "Content Director at MediaCo",
    content: "The AI picks up on nuances I might miss. The summaries are so good I sometimes prefer them to listening to full episodes.",
    rating: 4,
    avatar: "/avatars/emily-rodriguez.jpg"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-xs font-medium text-purple-600 mb-4">
            TRUSTED BY PROFESSIONALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Loved by <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join professionals who save hours every week with PodBite
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {/* Rating */}
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              {/* Quote */}
              <Quote className="w-6 h-6 text-gray-300 mb-4" />
              
              {/* Content */}
              <p className="text-gray-700 mb-6 text-sm sm:text-base">"{testimonial.content}"</p>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden mr-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        {/* Navigation and rating */}
        <div className="mt-12 flex flex-col items-center">
          <div className="flex space-x-2 mb-6">
            <Button variant="outline" size="icon" className="w-8 h-8">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-3">
              <span className="text-lg font-bold">4.9</span>
            </div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-600">Based on 1,200+ reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}