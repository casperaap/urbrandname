// Footer.js
import React from "react";
// If you prefer Next.js <Image>, uncomment the import below and
// swap the <img/> for <Image/> in the code.
// import Image from "next/image";

const Footer = () => {
  /* -----------------------------------------------
   * 1)  Social-media links (edit URLs here only)
   * --------------------------------------------- */
  const socials = [
    {
      href: "https://x.com/mrsapers",
      label: "Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current"
        >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />        </svg>
      ),
    },
    {
      href: "https://www.youtube.com/watch?v=U5AwO0U7eJ4",
      label: "YouTube",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current"
        >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />        </svg>
      ),
    },
  ];

  return (
    <footer className="footer footer-horizontal footer-center bg-[#A026FF] text-primary-content p-10">
      {/* ------------------------------------------------
       * Brand block – replace the <img> src with your logo
       * ------------------------------------------------ */}
      <aside className="flex flex-col items-center gap-2">
        {/* Replace the src below with /logo.svg or any path you like.
            Or: use <Image src="/logo.svg" width={50} height={50} alt="UrBrandName logo" /> */}
        <img
          src="/icon.png"
          alt="UrBrandName logo"
          width={60}
          height={60}
          className="inline-block"
        />

        <p className="font-bold text-center">
          UrBrandName
          <br />
          Providing the best names since 2025
        </p>
        <p className="text-sm">
          © {new Date().getFullYear()} – All rights reserved
        </p>
      </aside>

      {/* ----------------------------------------------
       * Social-media icons – automatically rendered
       * -------------------------------------------- */}
      <nav>
        <div className="grid grid-flow-col gap-4">
          {socials.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {icon}
            </a>
          ))}
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
