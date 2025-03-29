import React from "react";
import { Clipboard, Headphones, Sparkles, ArrowRight, Play } from "lucide-react";
import { Button } from "../ui/button";

const steps = [
  {
    title: "Paste Podcast Link",
    description: "Simply copy and paste any podcast URL from your favorite platform.",
    icon: <Clipboard className="w-5 h-5 text-purple-500" />,
    detail: "Supports 50+ platforms including Spotify, Apple, and YouTube",
    video: "#demo-1"
  },
  {
    title: "AI Processing",
    description: "Our specialized AI analyzes, transcribes, and extracts key insights.",
    icon: <Headphones className="w-5 h-5 text-purple-500" />,
    detail: "98% accurate transcription with context understanding",
    video: "#demo-2"
  },
  {
    title: "Get Your Summary",
    description: "Receive structured outputs with timestamps and key takeaways.",
    icon: <Sparkles className="w-5 h-5 text-purple-500" />,
    detail: "Multiple formats: bullet points, executive summary, or full transcript",
    video: "#demo-3"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-purple-600 mb-4">
            SIMPLE 3-STEP PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            How <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">PodBite Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform podcasts into actionable insights in under a minute
          </p>
        </div>
        
        <div className="relative">
          {/* Progress line - desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-purple-100 via-purple-300 to-purple-100 transform -translate-x-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 lg:left-0 lg:translate-x-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold z-10 shadow-md">
                  {index + 1}
                </div>
                
                {/* Step card */}
                <div className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow-md h-full">
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-50 mb-4">
                      {step.icon}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    {/* Details */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{step.detail}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-purple-600 hover:text-purple-700 px-0"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Demo
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-gray-300 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl px-6 py-5 shadow-sm border border-purple-100 max-w-2xl mx-auto">
            <div className="mb-3 sm:mb-0 sm:mr-6">
              <h3 className="text-lg font-semibold text-gray-900">Ready to experience PodBite?</h3>
              <p className="text-sm text-gray-600">Get your first 3 summaries free</p>
            </div>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md"
              size="lg"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}