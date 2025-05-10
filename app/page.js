"use client";

import Counter from "@/components/Counter";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Image from 'next/image'

export default function Home() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <>
    <main>
      <Navbar className="row-start-1 w-full" />
        <section>
          <div>
            <h1 className="mt-24 text-7xl">Check Your Brand Name</h1>
            <p className="underh1">
              Check domain and social media handle
              <span className="nombile"><br /></span>
              availability instantly
            </p>
          </div>

          <form className="brand-form">
            <input type="text" placeholder="UrBrandName" />
            <button type="submit">Go!</button>
          </form>

          <div className="loaditems">
            <div className="twocol twocol2">
            <div className="generatedcard">
  <Image
    src="/godaddy.png"
    alt="GoDaddy Icon"
    width={32}
    height={32}
    placeholder="empty"
  />
  <span>urbrandname.com</span>
  <span className="status available">Available</span>
</div>
<div className="generatedcard">
  <Image
    src="/x.png"
    alt="X Icon"
    width={32}
    height={32}
    placeholder="empty"
  />
  <span>urbrandname</span>
  <span className="status available">Available</span>
</div>
<div className="generatedcard">
  <Image
    src="/tiktok.png"
    alt="Instagram Icon"
    width={32}
    height={32}
    placeholder="empty"
  />
  <span>urbrandname</span>
  <span className="status taken">Taken</span>
</div>
<div className="generatedcard">
  <Image
    src="/tiktok.png"
    alt="TikTok Icon"
    width={32}
    height={32}
    placeholder="empty"
  />
  <span>urbrandname</span>
  <span className="status available">Available</span>
</div>

            </div>

            <button className="alt-btn">AI Found 5 Alternatives →</button>
            <div className="underaltbtn">
              <span>You are the 347th user!</span>
            </div>
          </div>
        </section>

        <section>
          <h2>
            Why <span className="highlight">UrBrandname</span>?
          </h2>
          <p>
            We all know the value of a compelling brand name. We also know the struggle of finding one.
            Let alone finding one that's available across all platforms.
            <span className="mobile"><br /></span>
            That brings us to…
          </p>
          <div className="twocol margintop">
            <div className="card cardwhite">
              {/* You can add <Image> or real <img src> here */}
              <span className="boldtitle">The Problem</span>
              <span className="undertitle">
                Founders waste hours on brainstorming brand names and checking domain/social handle availability.
              </span>
            </div>
            <div className="card cardwhite">
              <span className="boldtitle">The Solution</span>
              <span className="undertitle">
                A single place instantly checking domain (.com, .ai, …), Instagram, X, TikTok handle availability +
                AI Brainstorming along.
              </span>
            </div>
          </div>
          <button className="button btn trybtn">Try it out!</button>
        </section>

        <section className="testimonial-section">
          <h2 className="usedby">
            <span className="light-text">Used by +2k</span> <span className="highlight">founders!</span>
          </h2>

          <div className="testicard">
            <div className="innertesticard">
            <div className="imgtext">
  <Image
    src="/person.png"
    alt="Mushtaq Bilial"
    className="avatar"
    width={48}
    height={48}
    placeholder="empty"
  />
  <span className="name">Mushtaq Bilial</span>
</div>

              <p className="quote">
                "Never thought it would be this tool finding the name of my 10K MRR SaaS"
              </p>

              <span className="owns-label">Owns:</span>

              <div className="imgtext">
  <Image
    src="/godaddy.png"
    alt="Website icon"
    width={24}
    height={24}
    placeholder="empty"
  />
  <span>www.mushtaq.com</span>
</div>
<div className="imgtext">
  <Image
    src="/insta.png"
    alt="Instagram icon"
    width={24}
    height={24}
    placeholder="empty"
  />
  <span>@mushtaq</span>
</div>
<div className="imgtext">
  <Image
    src="/tiktok.png"
    alt="TikTok icon"
    width={24}
    height={24}
    placeholder="empty"
  />
  <span>@mushtaq</span>
</div>
            </div>
          </div>
        </section>

        <section>
          <h2>
            UrBrandname in a <span className="highlight">Nutshell</span>
          </h2>
          <p>
            Stop checking platforms one by one<br />
            and start working efficient.
          </p>
          <div className="card-grid">
            <div className="card2">
              <img src="placeholder.png" alt="For Influencers" />
              <span className="boldtitle boldtitle2">For Influencers</span>
              <span className="undertitle">
                Combining a domain and social media username can help you monetize your audience more effectively!
              </span>
            </div>

            <div className="card2">
              <img src="placeholder.png" alt="For Founders" />
              <span className="boldtitle boldtitle2">For Founders</span>
              <span className="undertitle">
                Founders wanna communicate their brand across different platforms but struggle because of the
                unavailability of their brand name.
              </span>
            </div>

            <div className="card2 nomobile">
              <img src="placeholder.png" alt="For Influencers" />
              <span className="boldtitle boldtitle2">For Influencers</span>
              <span className="undertitle">
                Combining a domain and social media username can help you monetize your audience more effectively!
              </span>
            </div>

            <div className="card2">
              <img src="placeholder.png" alt="For Others" />
              <span className="boldtitle boldtitle2">For Others</span>
              <span className="undertitle">
                Anyone creating a multi-platform brand needs a brand name. So let’s create UrBrandName now!
              </span>
            </div>
          </div>
          <button className="trybtn">Give it a go!</button>
        </section>
        
      </main>
      <Footer className="xyz row-start-1 w-full" />
      </>
  );
}
