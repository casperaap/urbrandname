// components/FAQ.js
import React from "react";

const FAQ = () => (
  <section className="w-full max-w-4xl mx-auto space-y-4 px-6">
    {/* FAQ #1 */}
    <div
      tabIndex={0}
      className="
        collapse collapse-arrow
        bg-white text-[#222222]
        border border-[#aaaaaa]
        drop-shadow-[0_4px_4px_rgba(160,38,255,0.5)]
        rounded-lg
      "
    >
      <div className="collapse-title font-semibold">
        What do I get from making an account?
      </div>
      <div className="collapse-content text-sm">
        Our full version uses AI to brainstorm brandname alternatives, checks availability and provides the best ones to you.
      </div>
    </div>

    {/* FAQ #2 */}
    <div
      tabIndex={0}
      className="
        collapse collapse-arrow
        bg-white text-[#222222]
        border border-[#aaaaaa]
        drop-shadow-[0_4px_4px_rgba(160,38,255,0.5)]
        rounded-lg
      "
    >
      <div className="collapse-title font-semibold">
        Is there a free trial available?
      </div>
      <div className="collapse-content text-sm">
        No there's no free trial available, we give our product for free by default.
      </div>
    </div>

    {/* FAQ #3 */}
    <div
      tabIndex={0}
      className="
        collapse collapse-arrow
        bg-white text-[#222222]
        border border-[#aaaaaa]
        drop-shadow-[0_4px_4px_rgba(160,38,255,0.5)]
        rounded-lg
      "
    >
      <div className="collapse-title font-semibold">
        Where can I give feedback?
      </div>
      <div className="collapse-content text-sm">
          You can give feedback on our product by filling in this{" "}
          <a
            href="https://forms.gle/jVvzsEnkbpv25Fmp8"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            forum
          </a>.
        </div>
    </div>

    {/* FAQ #4 */}
    <div
      tabIndex={0}
      className="
        collapse collapse-arrow
        bg-white text-[#222222]
        border border-[#aaaaaa]
        drop-shadow-[0_4px_4px_rgba(160,38,255,0.5)]
        rounded-lg
      "
    >
      <div className="collapse-title font-semibold">
        How do I contact support?
      </div>
      <div className="collapse-content text-sm">
          Reach out to the following X account:{" "}
          <a
            href="https://www.x.com/mrsapers"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @mrsapers
          </a>.
      </div>
    </div>
  </section>
);

export default FAQ;
