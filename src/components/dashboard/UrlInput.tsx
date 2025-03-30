"use client"

import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { useState } from "react";
import Loading from "../common/Loading";


export default function UrlInput({user}:{user:CustomUser |null}) {
    const [url, setUrl] = useState('');
    const [loading,setLoading]= useState(false)
  const handleSumbit =  (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-center items-center mt-10 w-full">
      <form onSubmit={handleSumbit} className="relative w-full md:w-[500px]">
        <input
          type="url"
          className="w-full md:w-[500px] h-12 rounded-lg bg-muted border border-pink-500 border-dashed"
          placeholder="Enter your podcast link"
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
          disabled={loading}
        />
        {loading && (
            <div className="absolute right-2 top-2.5">
            <Loading/>
            </div>
        )}
         
      </form>
      {/* <span className="text-red-500">{error?.url}</span> */}
    </div>
  );
}
