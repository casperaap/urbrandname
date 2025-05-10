"use client";

import Counter from "@/components/Counter";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function Home() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
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
  );
}
