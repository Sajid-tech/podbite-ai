import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand column */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 relative">
                <Image 
                  src="/images/icon_192.png" 
                  alt="PodBite Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                PodBite
              </h2>
            </div>
            <p className="text-sm text-center md:text-left mb-4 max-w-xs">
              AI-powered podcast summaries that save you time.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Links columns */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-sm hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-sm hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#how-it-works" className="text-sm hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/dashboard" className="text-sm hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-sm hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-sm hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-sm hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          {/* CTA column */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Stay Updated</h3>
            <div className="relative w-full max-w-xs">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
              <Button 
                variant="ghost" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 text-xs"
              >
                Join
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom row */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-2 md:mb-0">
            © {new Date().getFullYear()} PodBite. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}