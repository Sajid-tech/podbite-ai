"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginModal from "../auth/LoginModal";
import Link from "next/link";
import { Home, Search, Bookmark, User, X, ChevronRight, Zap, Star, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

export default function Navbar({ user }: { user?: CustomUser }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    {
      title: "Features",
      url: "#features",
      icon: Zap,
      action: () => scrollToSection("features")
    },
    {
      title: "How It Works",
      url: "#how-it-works",
      icon: Search,
      action: () => scrollToSection("how-it-works")
    },
    {
      title: "Pricing",
      url: "#pricing",
      icon: Star,
      action: () => scrollToSection("pricing")
    },
    {
      title: "Testimonials",
      url: "#testimonials",
      icon: Bookmark,
      action: () => scrollToSection("testimonials")
    }
  ];

  return (
    <>
      {/* Desktop Navigation (lg screens and up) */}
      <nav
        className={`hidden lg:block fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-lg backdrop-blur-md py-2 border-b border-gray-200"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative">
                <Image
                  src="/images/icon_192.png"
                  alt="PodBite Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1
                className={`text-2xl font-bold tracking-tight ${
                  scrolled
                    ? "bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                    : "text-white"
                }`}
              >
                PodBite
              </h1>
            </div>

            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.title}
                  onClick={item.action}
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-gray-700 hover:text-gray-900"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button
                    variant={scrolled ? "outline" : "ghost"}
                    className={`${
                      scrolled
                        ? "border-gray-300 text-gray-800 hover:bg-gray-50 cursor-pointer"
                        : "text-white hover:bg-white/10 cursor-pointer"
                    }`}
                  >
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <LoginModal variant={scrolled ? "default" : "outline"} />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Floating Navigation (sm and md screens) */}
      <div
        className={`lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[92%] max-w-md transition-all duration-300 ${
          hidden ? "translate-y-20" : "translate-y-0"
        }`}
      >
        <div className="relative">
          {/* Main navigation pill */}
          <div className="bg-white rounded-full shadow-xl border border-gray-200 overflow-hidden">
            <div className="flex justify-around items-center p-1">
              {navItems.map((item) => (
                <button
                  key={item.title}
                  onClick={item.action}
                  className="flex flex-col items-center p-2 rounded-full hover:bg-gray-100 transition-colors group"
                >
                  <div className="p-2 rounded-full group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                    <item.icon className="w-5 h-5 text-gray-700 group-hover:text-purple-600" />
                  </div>
                </button>
              ))}
              
              {user ? (
                <Link
                  href="/dashboard"
                  className="flex flex-col items-center p-2 rounded-full hover:bg-gray-100 transition-colors group"
                >
                  <div className="p-2 rounded-full group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                    <User className="w-5 h-5 text-gray-700 group-hover:text-purple-600" />
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex items-center justify-center -mt-8"
                >
                  <div className="w-10 h-10  mt-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg border-4 border-white">
                    <Menu className="w-5 h-5 text-white" />
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Floating center button indicator */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col">
                {/* Handle bar for swipe gestures */}
                <div className="w-full flex justify-center pt-2 pb-4">
                  <div className="w-12 h-1 bg-gray-300 rounded-full" />
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src="/images/icon_192.png"
                        alt="PodBite Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      PodBite
                    </h1>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-3 mb-8">
                  {navItems.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => {
                        item.action();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium w-full text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mr-3">
                        <item.icon className="w-4 h-4 text-purple-500" />
                      </div>
                      {item.title}
                    </button>
                  ))}
                </div>

                <div className="flex space-x-4">
                  {user ? (
                    <Link href="/dashboard" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <LoginModal variant="default" />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}