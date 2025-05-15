'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignInPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // trigger the fade-in after mount
    setVisible(true);
  }, []);

  return (
    <div
      className={`
        min-h-screen flex flex-col items-center justify-center
        bg-gray-50 px-4
        transition-opacity duration-700 ease-out
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* Top text block */}
      <div className="text-center mb-8 space-y-2">
        {/* 1) Icon + Brand */}
        <div className="flex items-center justify-center mb-7 space-x-2">
          <Image src="/picon.png" alt="UrBrandName Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-gray-900">UrBrandName</span>
        </div>
        {/* 2) Welcome */}
        <h2 className="text-3xl font-semibold text-gray-800">Welcome</h2>
        {/* 3) Subtitle */}
        <p className="text-base text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      {/* Sign-in card */}
      <div className="w-full max-w-[500px] bg-white rounded-[1rem] border border-[#cfcfcf] drop-shadow-[0_6px_10px_rgba(160,38,255,0.5)] shadow-lg p-8">
        <h3 className="text-[1.2rem] font-semibold text-gray-900 text-left mb-6">
          Sign in with Google
        </h3>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100 transition"
        >
          <Image src="/google.png" alt="Google" width={28} height={28} />
          <span className="text-[1rem] font-semibold text-gray-700">
            Continue with Google
          </span>
        </button>
      </div>

      {/* Footer */}
      <p className="mt-8 text-sm text-gray-500">
        © 2025 UrBrandName. All rights reserved.
      </p>
    </div>
  );
}
