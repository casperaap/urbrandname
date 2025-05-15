// components/Review.jsx
import React from "react";

const Review = () => (
  <div className="w-full px-8 md:px-6 max-w-[850px] mx-auto pb-16">
    <div className="indicator w-full">

      {/* corner icons */}
      <span className="indicator-item indicator-top indicator-end mr-2 mt-2">
        <img src="/heart-icon.png" alt="" className="w-8 h-8 object-contain" />
      </span>
      <span className="indicator-item indicator-bottom indicator-start ml-2 mb-2">
        <img src="/thumbup-icon.png" alt="" className="w-8 h-8 object-contain" />
      </span>

      {/* grey rectangle */}
      <div className="bg-[#EFF0F7] w-full rounded-lg p-6 sm:p-8">

        {/* ── invisible centred wrapper ── */}
        <div className="w-full max-w-[280] mx-auto flex flex-col items-start text-left gap-4">

          {/* avatar + name */}
          <div className="flex items-center gap-3">
            <img
              src="/pfpicon.jpg"
              alt="Mushtaq Bilial"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-semibold">Mamoun Debbagh</span>
          </div>

          {/* quote */}
          <p className="text-sm italic leading-relaxed">
            “Never thought it would be this tool finding the name of my&nbsp;10&nbsp;K&nbsp;MRR&nbsp;SaaS”
          </p>

          {/* owns list */}
          <p className="font-semibold">Owns:</p>
          <ul className="flex flex-col gap-2 text-sm pl-1">
            <li className="flex items-center gap-2">
              <img src="/globe.png" alt="" className="w-5 h-5" />
              <span>www.answersai.com</span>
            </li>
            <li className="flex items-center gap-2">
              <img src="/instagram.png" alt="" className="w-5 h-5" />
              <span>@answersai</span>
            </li>
            <li className="flex items-center gap-2">
              <img src="/tiktok.png" alt="" className="w-5 h-5" />
              <span>@answersai</span>
            </li>
          </ul>
        </div>
        {/* ── end wrapper ── */}

      </div>
    </div>
  </div>
);

export default Review;
