"use client";

import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { useState } from "react";
import Loading from "../common/Loading";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function UrlInput({ user }: { user: CustomUser | null }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AddUrlErrorType>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/add-url", {
        url: url,
        user_id: user?.id,
      });

      const summary: SummaryType = data?.data;
      if (summary) {
        toast.success("Analyzing podcast content...", {
          description: "We're preparing your summary now",
          action: {
            label: "View",
            onClick: () => router.push(`/summarize/?id=${summary.id}`),
          },
        });
        router.push(`/summarize/?id=${summary.id}`);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          setError(error?.response.data?.errors);
        } else {
          toast.error(error.response?.data?.message);
        }
      }
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Transform <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Podcasts</span> into Key Insights
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Get AI-powered summaries of any podcast in seconds. Save time and capture key takeaways effortlessly.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="relative max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <input
            type="url"
            className="w-full h-14 pl-10 pr-36 rounded-xl bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm hover:shadow-md text-lg"
            placeholder="Paste YouTube link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />
          <motion.button
            type="submit"
            disabled={loading || !url}
            className={`absolute right-2 top-2 h-10 px-6 rounded-lg flex items-center justify-center ${
              loading || !url
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
            } transition-all font-medium`}
            whileHover={!loading && url ? { scale: 1.05 } : {}}
            whileTap={!loading && url ? { scale: 0.95 } : {}}
          >
            {loading ? <Loading  /> : 
            <>
             <span className="hidden sm:inline">Summarize Now</span>
             <ArrowRight className="sm:hidden h-5 w-5" />
             </>
            }
          </motion.button>
        </div>
        {error?.url && (
          <motion.p
            className="mt-2 text-sm text-red-500 text-left pl-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error.url}
          </motion.p>
        )}
      </motion.form>

     

      <motion.div
        className="mt-12 max-w-4xl mx-auto grid md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Lightning Fast</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Get summaries in seconds, not hours. Our AI works at superhuman speed.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Accurate</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Advanced AI captures key points with human-level understanding.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-pink-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Secure</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Your data is encrypted and never shared with third parties.
          </p>
        </div>
      </motion.div>
    </div>
  );
}