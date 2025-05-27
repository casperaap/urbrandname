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
import FAQ from "@/components/FAQ";
import CheckHandleCard from "@/components/CheckHandleCard";
import HeroHeader from "@/components/HeroHeader";

export default function Home() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <>
    <Navbar className="row-start-1 w-full" />
    
    <div className="grid w-full grid-cols-1 grid-rows-[auto_auto_1fr] items-center justify-items-stretch pt-20 pb-20">
      <div><HeroHeader /> </div>
      <div><CheckHandleCard /></div>
    </div>

    <div className="min-h-screen flex flex-col">
      {/* …other content… */}
      <WhyUrBrandName />   {/* centered block */}
      {/* …other content… */}
      
      <section className="flex flex-col md:flex-row items-center justify-center gap-6 px-6 md:px-6 w-full max-w-[896px] mx-auto">
      <ProbSolveCard
        src="problem.png"
        alt="The Problem"
        title="The Problem"
      >
        Founders waste hours on brainstorming brand names and checking domain/social handle availability seperately on each platform.
      </ProbSolveCard>
      <ProbSolveCard
        src="solution.png"
        alt="The Solution"
        title="The Solution"
      >
        A single place instantly checking domain (.com, .ai, …), Instagram, X, TikTok handle availability in one go + AI Brainstorming allong.
      </ProbSolveCard>
      </section>

      <div className="px-6 md:px-0 w-full flex justify-center">
      <button          onClick={() =>window.scrollTo({ top: 0, behavior: 'smooth' })          }  className="btn btn-primary bg-[#A026FF] hover:bg-[#8d1bf4] mt-8 md:mt-12 mb-8 w-full max-w-[400px] border border-[#A026FF]">Try For Free!</button>
      </div>

      <section className="flex flex-col items-center justify-center text-center px-4 pt-16 pb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
       Used by +2k <span className="text-[#A026FF]">Founders</span>!
       </h2>
      </section>
       <Review/>

       <Nutshelltxt/>

    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[896px] px-0 md:px-6 mx-auto">
      <ForWhoCards
        src="founders.png"
        alt="For Founders"
        title="For Founders"
      >
        Founders wanna communicate their brand across different platforms but struggle because of the unavailability of their brand name.
      </ForWhoCards>
      <ForWhoCards
        src="influencers.png"
        alt="for Influencers"
        title="For Influencers"
      >
        Combining a domain and social media username can help you monetize your audience more effectively!
      </ForWhoCards>
      <ForWhoCards
        src="solopreneurs.png"
        alt="For Solopreneurs"
        title="For Solopreneurs"
      >
        A Solopreneur is running on their own, finding an effective brand name available across all platforms is a must but takes time.
      </ForWhoCards>
      <ForWhoCards
        src="others.png"
        alt="Fpr Others"
        title="For Others"
      >
        Anyone creating a multi-platform brand needs A brand name. So lets create UrBrandName now!
      </ForWhoCards>
    </section>
      <div className="px-6 md:px-0 w-full flex justify-center">
      <button          onClick={() =>window.scrollTo({ top: 0, behavior: 'smooth' })          }  className="btn btn-primary bg-[#A026FF] hover:bg-[#8d1bf4] mt-8 md:mt-12 mb-8 w-full max-w-[400px] border border-[#A026FF]">Check UrBrandName</button>
      </div>

      <div className="w-full aspect-video my-8 sm:max-w-[824px] mx-auto mt-16">
      <iframe
        src="https://www.youtube.com/embed/U5AwO0U7eJ4?si=4ZhZc40syDM3qXHc"
        title="YouTube video"
        className="w-full h-full rounded-xl"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      </div>  

      <section className="flex flex-col items-center justify-center text-center px-4 pt-16 pb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
       Frequently Asked <span className="text-[#A026FF]">Questions</span>!
       </h2>
      </section>
      
      <FAQ />    
      <div className="px-6 md:px-0 w-full flex justify-center pt-4 pb-16">
      <button          onClick={() =>window.scrollTo({ top: 0, behavior: 'smooth' })          } className="btn btn-primary bg-[#A026FF] hover:bg-[#8d1bf4] mt-8 md:mt-12 mb-8 w-full max-w-[400px] border border-[#A026FF]">Check UrBrandName</button>
      </div>
    </div>
    <Footer className="row-start-4 w-full" />
    </>
  );
}
// 