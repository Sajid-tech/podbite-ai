"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { CheckCircle2, Sparkles, Headphones, Zap, X } from "lucide-react";

interface LoginModalProps {
  variant?: "default" | "outline" | "ghost";
}

export default function LoginModal({ variant = "outline" }: LoginModalProps) {
  const handleGoogleLogin = async () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          className={`${variant === "outline" ? "border-gray-300 hover:bg-gray-50 text-gray-800" : ""} group`}
        >
          <span className="group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
            Login / Sign up
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-md p-0 rounded-xl overflow-hidden border-0 shadow-xl">
        {/* Mobile close button */}
        <button className="md:hidden absolute top-4 right-4 z-50 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Branding Section - Hidden on mobile */}
          <div className="hidden md:flex bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:w-2/5 flex-col">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 relative mr-3">
                <Image 
                  src="/images/icon_192.png" 
                  alt="PodBite Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-lg font-bold text-white">PodBite</h2>
            </div>
            
            <div className="space-y-4 mt-4">
              <div className="flex items-start">
                <div className="p-1.5 rounded-md bg-white/10 mr-3 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-xs text-gray-300">AI-generated podcast summaries</p>
              </div>
              <div className="flex items-start">
                <div className="p-1.5 rounded-md bg-white/10 mr-3 flex-shrink-0">
                  <Headphones className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-xs text-gray-300">Key insights extraction</p>
              </div>
              <div className="flex items-start">
                <div className="p-1.5 rounded-md bg-white/10 mr-3 flex-shrink-0">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-xs text-gray-300">Lightning fast processing</p>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-700">
              <div className="flex items-center justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
                <span className="text-xs text-gray-400">4.9/5 (1k+)</span>
              </div>
            </div>
          </div>
          
          {/* Login Section */}
          <div className="bg-white p-6 md:p-8 md:w-3/5 flex flex-col">
            <DialogHeader className="mb-6">
              <div className="flex justify-center md:hidden mb-4">
                <div className="w-12 h-12 relative">
                  <Image 
                    src="/images/icon_192.png" 
                    alt="PodBite Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 text-center">
                Welcome to PodBite
              </DialogTitle>
              <p className="text-sm text-gray-500 text-center mt-1">
                Sign in with Google to continue
              </p>
            </DialogHeader>
            
            <div className="flex-grow flex flex-col justify-center">
              <Button 
                onClick={handleGoogleLogin}
                className="group relative overflow-hidden py-3.5 bg-white border border-gray-300 rounded-lg hover:border-purple-300 transition-all shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center w-full">
                  <Image
                    src="/images/google.png"
                    width={18}
                    height={18}
                    alt="Google"
                    className="mr-3"
                  />
                  <span className="text-gray-800 font-medium text-sm sm:text-base">
                    Continue with Google
                  </span>
                </div>
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-xs text-gray-500">New to PodBite?</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-3">
                  Create an account with Google in seconds
                </p>
                <Button 
                  onClick={handleGoogleLogin}
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700 text-xs underline"
                >
                  Learn more about signing up
                </Button>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-[0.65rem] md:text-xs text-gray-500 text-center">
                By continuing, you agree to our <a href="#" className="text-purple-600 hover:underline">Terms</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}