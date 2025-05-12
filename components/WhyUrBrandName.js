// components/WhyUrBrandName.jsx
import React from "react";

const WhyUrBrandName = () => (
  <section className="flex flex-col items-center justify-center text-center px-4 pb-12">
    {/* heading */}
    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
      Why <span className="text-[#A026FF]">UrBrandName</span>?
    </h2>

    {/* copy */}
    <p className="max-w-prose text-lg leading-relaxed">
      We all know the value of a compelling brand name. We also know the struggle
      of finding one. Let alone finding one that's available across all
      platforms. <br className="hidden sm:block" />
      That brings us to….
    </p>
  </section>
);

export default WhyUrBrandName;
