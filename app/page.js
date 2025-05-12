"use client";

import Counter from "@/components/Counter";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Footer from "@/components/Footer";
import WhyUrBrandName from "@/components/WhyUrBrandName";
import ProbSolveCard from "@/components/ProbSolveCard";
import Review from "@/components/Review";
import Nutshelltxt from "@/components/Nutshelletxt";
import ForWhoCards from "@/components/ForWhoCards";


export default function Home() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <>
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* top row */}
      <Navbar className="row-start-1 w-full" />

      {/* main content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Counter title="Counter #1" counterId={1} />
        <Counter title="Counter #2" counterId={2} />
        <Counter title="Counter #3" counterId={3} />
      </main>

      {/* bottom row */}
      {isLoggedIn ? (
        <Link href="/dashboard" className="underline row-start-3">
          Go to our Tool
        </Link>
      ) : (
        <Link
          href="/api/auth/signin?callbackUrl=/dashboard"
          className="underline row-start-3"
        >
          Go to our Tool
        </Link>
      )} 
    </div>
        <div className="min-h-screen flex flex-col">
      {/* …other content… */}
      <WhyUrBrandName />   {/* centered block */}
      {/* …other content… */}
      
      <section className="flex flex-col md:flex-row items-center justify-center gap-6 px-6 md:px-0">
      <ProbSolveCard
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Comfy sneakers"
        title="The Problem"
      >
        Founders waste hours on brainstorming brand names and checking domain/social handle availability.
      </ProbSolveCard>
      <ProbSolveCard
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Comfy sneakers"
        title="The Solution"
      >
        A single place instantly checking domain (.com, .ai, …), Instagram, X, TikTok handle availability + AI Brainstorming allong.
      </ProbSolveCard>
      </section>

      <div className="px-6 md:px-0 w-full flex justify-center">
      <button className="btn btn-primary bg-[#A026FF] hover:bg-[#8d1bf4] mt-8 md:mt-12 mb-8 w-full max-w-[400px] border border-[#A026FF]">Try It Out!</button>
      </div>

      <section className="flex flex-col items-center justify-center text-center px-4 pt-16 pb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
       Used by +2k <span className="text-[#A026FF]">Founders</span>!
       </h2>
      </section>
       <Review/>

       <Nutshelltxt/>

    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[820px] mx-auto px-0">
      <ForWhoCards
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Comfy sneakers"
        title="For Founders"
      >
        Founders wanna communicate their brand across different platforms but struggle because of the unavailability of their brand name.
      </ForWhoCards>
      <ForWhoCards
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Comfy sneakers"
        title="For Influencers"
      >
        Combining a domain and social media username can help you monetize your audience more effectively!
      </ForWhoCards>
      <ForWhoCards
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Comfy sneakers"
        title="For Solopreneurs"
      >
        A single place instantly checking domain (.com, .ai, …), Instagram, X, TikTok handle availability + AI Brainstorming allong.
      </ForWhoCards>
      <ForWhoCards
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Comfy sneakers"
        title="For Others"
      >
        Anyone creating a multi-platform brand needs A brand name. So lets create UrBrandName now!
      </ForWhoCards>
    </section>
      <div className="px-6 md:px-0 w-full flex justify-center">
      <button className="btn btn-primary bg-[#A026FF] hover:bg-[#8d1bf4] mt-8 md:mt-12 mb-8 w-full max-w-[400px] border border-[#A026FF]">Check UrBrandName</button>
      </div>
    </div>
    <Footer className="row-start-4 w-full" />
    </>
  );
}
