// components/Footer.jsx
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-base-100 text-center py-6">
      <div className="mt-16 flex items-center justify-center space-x-2 mb-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          placeholder="empty"
        />
        <span className=" text-white brandnamespanfooter text-xl font-semibold">
          UrBrandName
        </span>
      </div>

      <div className="footertxt">
        <div className="twocol twocolfooter">
          <Link href="/terms" className=" text-white hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-white hover:underline">
            Privacy Policy
          </Link>
        </div>
        <span className="text-sm text-gray-500">
          © 2025 UrBrandName.com
        </span>
      </div>
    </footer>
  )
}
