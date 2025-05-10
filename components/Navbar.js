"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoggedIn = status === "authenticated";
  const userFirstName = session?.user?.name?.split(" ")[0] || "Guest";

  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-base-100 shadow-sm">
      <nav className="navbar mx-auto max-w-screen-xl">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            UrBrandName
          </Link>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a
                onClick={() =>
                  isLoggedIn
                    ? signOut({ callbackUrl: "/" })
                    : router.push("/api/auth/signin?callbackUrl=/dashboard")
                }
              >
                {isLoggedIn ? "Logout" : "SignIn"}
              </a>
            </li>
            <li>
              <details>
                <summary>{userFirstName}</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a onClick={() => router.push("/dashboard")}>Tool</a>
                  </li>
                  <li>
                    <a>Account</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
