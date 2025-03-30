import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/Navbar";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import React from "react";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";


export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions)
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* <p>{JSON.stringify(session)}</p> */}
      <Navbar user={session?.user} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <Pricing user={session?.user} />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}