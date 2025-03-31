"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const loadingMessages = [
  {
    text: "Analyzing audio content...",
    color: "from-blue-500 to-indigo-600",
  },
  {
    text: "Transcribing podcast...",
    color: "from-indigo-500 to-purple-600",
  },
  {
    text: "Identifying key points...",
    color: "from-purple-500 to-pink-600",
  },
  {
    text: "Generating summary...",
    color: "from-pink-500 to-red-600",
  },
  {
    text: "Polishing results...",
    color: "from-red-500 to-orange-600",
  },
];

export default function SummarizeLoader() {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      <div className="relative w-32 h-32">
        <motion.div
          className="absolute inset-0 border-4 border-indigo-100 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <motion.p
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className={`text-xl font-semibold bg-gradient-to-r ${loadingMessages[currentMessage].color} bg-clip-text text-transparent`}
        >
          {loadingMessages[currentMessage].text}
        </motion.p>
        <p className="text-gray-500 text-sm">
          This usually takes 15-30 seconds
        </p>
      </div>

      <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full"
          initial={{ width: "10%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 30, ease: "linear" }}
        />
      </div>

      <div className="mt-6 text-center max-w-md">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-600">Pro Tip:</span> While you wait, check out our latest featured podcasts in the dashboard.
        </p>
      </div>
    </div>
  );
}