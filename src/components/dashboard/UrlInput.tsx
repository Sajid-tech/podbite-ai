"use client";

import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { useState } from "react";
import Loading from "../common/Loading";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UrlInput({ user }: { user: CustomUser | null }) {
  const router = useRouter()
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AddUrlErrorType>({});
  const handleSumbit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post("/api/add-url", {
        url: url,
        user_id: user?.id,
      });

      const summary:SummaryType =  data?.data
      if(summary){
        toast.success("Url is correct redirecting you to summarize page.")
        router.push(`/summarize/?id=${summary.id}`)
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
    <div className="flex justify-center items-center mt-10 w-full">
      <form onSubmit={handleSumbit} className="relative w-full md:w-[500px]">
        <input
          type="url"
          className="w-full md:w-[500px] h-12 rounded-lg bg-muted border border-pink-500 border-dashed"
          placeholder="Enter your podcast link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        {loading && (
          <div className="absolute right-2 top-2.5">
            <Loading />
          </div>
        )}
      </form>
      <span className="text-red-500">{error?.url}</span>
    </div>
  );
}
