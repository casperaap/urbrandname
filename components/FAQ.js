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
        Why should I create an account?
      </div>
      <div className="collapse-content text-sm">
        Click the &quot;Sign Up&quot; button in the top-right corner and follow
        the registration steps.
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
        Yes! Every new account starts with a 14-day free trial—no credit card
        required.
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
        Absolutely. You can upgrade or downgrade at any time from your account
        settings.
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
        Reach out via the in-app chat or email us at&nbsp;
        <a href="mailto:support@yourbrand.com" className="underline">
          support@yourbrand.com
        </a>
        .
      </div>
    </div>
  </section>
);

export default FAQ;
