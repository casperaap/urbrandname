import React from "react";

const HeroHeader = () => {
  return (
    <div className="max-w-2xl mx-auto px-10 pt-5 md:pt-12 text-center">
      <h1 className="text-[2.6rem] sm:text-5xl font-bold text-gray-900 leading-tight">
        {/* “Check” underlined with short dashes */}
        <span className="underline decoration-dashed decoration-4 decoration-[#A026FF] underline-offset-4">
          Check
        </span>{" "}
        <span>Your Brand Name</span>
      </h1>
      <p className="mt-2 text-lg sm:text-xl text-gray-900">
        Check domain and social media handle{" "}
        {/* “availability” marked with a shorter, rounded highlight */}
        <span className="relative inline-block">
          <span className="absolute bottom-1 left-0 w-full h-[35%] bg-[#A026FF] opacity-30 rounded-full" />
          <span className="relative">availability</span>
        </span>{" "}
        instantly
      </p>
    </div>
  );
};

export default HeroHeader;
