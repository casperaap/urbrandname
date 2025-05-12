import React from "react";


const Review = () => (
  <div className="w-full px-8 md:px-0 max-w-5xl mx-auto pb-16">
    <div className="indicator w-full">
      {/* ── top-right icon ── */}
      <span className="indicator-item indicator-top indicator-end mr-2 mt-2">
        <img src="/heart-icon.png" alt="" className="w-8 h-8 object-contain" />
      </span>

      {/* ── bottom-left icon ── */}
      <span className="indicator-item indicator-bottom indicator-start ml-2 mb-2">
        <img src="/thumbup-icon.png" alt="" className="w-8 h-8 object-contain" />
      </span>

      {/* grey rectangle */}
      <div
        className="grid h-32 w-full place-items-center rounded-lg"
        style={{ backgroundColor: "#EFF0F7" }}
      >
        Box
      </div>
    </div>
  </div>
);

export default Review;