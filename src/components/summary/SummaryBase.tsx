"use client";
import React, { useEffect, useState } from "react";
import SummarizeLoader from "./SummarizeLoader";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Markdown from "react-markdown";
import { clearCache } from "@/actions/commonAction";
import { motion } from "framer-motion";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

// Add proper type definitions for Markdown components
type MarkdownComponents = Parameters<typeof Markdown>['0']['components'];

export default function SummaryBase({ summary }: { summary: SummaryType | null }) {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (summary?.response) {
      setResponse(summary?.response!);
      setLoading(false);
    } else {
      summarize();
    }
  }, [summary]);

  const summarize = async () => {
    try {
      if (response.length > 0) {
        setLoading(false);
        return true;
      }
      const { data } = await axios.post("/api/summarize", {
        url: summary?.url,
        id: summary?.id,
      });
      setLoading(false);
      const res = data?.data;
      if (res) {
        setResponse(res);
        clearCache("userCoins");
        clearCache("coinsSpend");
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if ([500, 401, 400].includes(error.response?.status!)) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Something went wrong!");
        }
      }
    }
  };

  // Define components with proper TypeScript types
  const components: MarkdownComponents = {
    h1: ({ node, ...props }) => (
      <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-lg font-medium text-gray-800 mt-6 mb-2" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="text-gray-700 mb-4 leading-relaxed" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a className="text-indigo-600 hover:underline" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-5 mb-4 space-y-1 marker:text-indigo-400" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-5 mb-4 space-y-1 marker:text-indigo-400" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 border-indigo-300 pl-4 italic text-gray-600 my-4 bg-indigo-50 p-3 rounded-r-lg"
        {...props}
      />
    ),
    code: ({ node, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <div className="rounded-lg overflow-hidden my-4">
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-gray-400 ml-2">
              {match[1]}
            </div>
          </div>
          <pre className="!mt-0 !rounded-t-none">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      ) : (
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {summary?.title}
          </h1>
          <motion.a
            href={summary?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Original Podcast</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.a>
        </motion.div>

        {loading ? (
          <SummarizeLoader />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="p-8">
              <Markdown
                className="prose prose-indigo max-w-none"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={components}
              >
                {response}
              </Markdown>
            </div>
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-500">
                    Generated {new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-1 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                      />
                    </svg>
                    <span>Save as PDF</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}