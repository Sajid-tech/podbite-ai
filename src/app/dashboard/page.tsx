import DashNav from "@/components/dashboard/DashNav";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getOldSummary, getUserCoins } from "@/actions/fetchActions";
import UrlInput from "@/components/dashboard/UrlInput";
import OldSummaryCard from "@/components/dashboard/OldSummaryCard";

export default async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const oldSummaries = await getOldSummary(Number(session?.user?.id!));
  const userCoins = await getUserCoins(session?.user?.id!);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashNav user={session?.user!} userCoins={userCoins} />

        <main className="py-8">
          <UrlInput user={session?.user!} />

          {oldSummaries.length > 0 ? (
            <div
              className="mt-12"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Your Podcast Summaries
                  </h2>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                    {oldSummaries.length} saved
                  </span>
                </div>
               
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {oldSummaries.map((item, index) => (
                  <OldSummaryCard key={index} summary={item} />
                ))}
              </div>
            </div>
          ) : (
            <div
              className="mt-16 text-center"
            >
              <div className="mx-auto h-72 w-72 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center p-8 shadow-inner border-2 border-dashed border-indigo-100">
                <div className="space-y-4">
                  <div className="relative mx-auto w-16 h-16">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full blur-md"></div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 relative text-indigo-500"
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
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    No summaries yet
                  </h3>
                  <p className="text-gray-500 max-w-xs mx-auto">
                    Start by entering a podcast URL to generate your first AI-powered summary!
                  </p>
                  <button className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-md transition-all">
                    Try Example Podcast
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}