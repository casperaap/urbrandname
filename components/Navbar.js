"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from 'next/image'

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoggedIn = status === "authenticated";
  const userFirstName = session?.user?.name?.split(" ")[0] || "Guest";

  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-base-100 xyz shadow-sm">
      <nav className="navbar mx-auto max-w-screen-xl">
        {/* brand area */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"        // served from public/logo.png
              alt="Logo"
              width={32}             // adjust to your real size
              height={32}
              placeholder="empty"
            />
            <span className="brandnamespan text-xl font-semibold">
              UrBrandName
            </span>
          </Link>
        </div>

        {/* sign in / user menu */}
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="headerbtnn"
                onClick={() =>
                  isLoggedIn
                    ? signOut({ callbackUrl: '/' })
                    : router.push('/api/auth/signin?callbackUrl=/dashboard')
                }
              >
                {isLoggedIn ? 'Logout' : 'Sign In'}
              </a>
            </li>

            {isLoggedIn && (
              <li>
                <details>
                  <summary>{userFirstName}</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <a onClick={() => router.push('/dashboard')}>Tool</a>
                    </li>
                    <li>
                      <a onClick={() => router.push('/account')}>Account</a>
                    </li>
                  </ul>
                </details>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
