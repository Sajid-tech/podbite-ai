import React from "react";
import ProfileDropdown from "../common/ProfileDropdown";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import Link from "next/link";

export default function DashNav({
  user,
  userCoins,
}: {
  user: CustomUser;
  userCoins: CoinsType | null;
}) {
  return (
    <nav className="w-full py-6 flex justify-between items-center">
      <Link href="/" passHref>
        <div
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-20"></div>
            <Image 
              src="/images/icon_192.png" 
              fill
              style={{ objectFit: "contain" }}
              alt="PodBite Logo"
              className="rounded-lg"
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            PodBite
          </h1>
        </div>
      </Link>
      
      <div className="flex items-center space-x-6">
        <div
          className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
        >
          <span className="text-lg font-semibold text-gray-800">
            {userCoins?.coins ?? 0}
          </span>
          <div className="relative h-6 w-6">
            <Image 
              src="/images/coin.png" 
              fill
              style={{ objectFit: "contain" }}
              alt="Coins"
              className="animate-bounce"
            />
          </div>
        </div>
        
        <ProfileDropdown user={user} />
      </div>
    </nav>
  );
}