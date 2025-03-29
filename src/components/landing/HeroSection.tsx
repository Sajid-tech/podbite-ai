import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { PlayCircle, ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-24 lg:pt-32 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/grid-white.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        {/* Floating gradient blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full filter blur-3xl animate-float-medium"></div>
        
        {/* Floating circles */}
        <div className="absolute top-1/4 left-1/5 w-24 h-24 border border-white/10 rounded-full hidden md:block animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/5 w-32 h-32 border border-white/10 rounded-full hidden md:block animate-float-medium"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in">
                Podcast Intelligence
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-fade-in delay-100">
                At Your Fingertips
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 animate-fade-in delay-200">
              Transform hours of listening into minutes of actionable insights with our AI-powered podcast summarization platform.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in delay-300">
              <Link href="#pricing">
                <Button className="px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <span>Get Started Free</span>
                  <ChevronRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" className="px-8 py-6 text-lg border-white/30 text-white hover:bg-white/10 hover:text-white transition-all duration-300">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Trusted by brands - Mobile only */}
            <div className="mt-12 lg:hidden animate-fade-in delay-400">
              <p className="text-gray-400 text-sm mb-4">TRUSTED BY INNOVATORS AT</p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                {['Google', 'Spotify', 'Apple', 'Microsoft', 'Tesla'].map((brand) => (
                  <div key={brand} className="text-lg font-medium text-white/90 bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm">
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero image/content */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 animate-fade-in delay-200">
            <div className="relative rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
              <div className="relative p-1 bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="aspect-video bg-gray-800/50 rounded-xl flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6 animate-pulse-slow">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Summaries</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      See how PodBite transforms a 60-minute podcast into key takeaways in seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trusted by brands - Desktop only */}
        <div className="mt-20 hidden lg:block">
          <p className="text-gray-400 text-center mb-6">TRUSTED BY INNOVATORS AT</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80">
            {['Google', 'Spotify', 'Apple', 'Microsoft', 'Tesla'].map((brand) => (
              <div key={brand} className="text-2xl font-bold text-white/90">{brand}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}