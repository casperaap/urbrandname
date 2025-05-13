'use client';

import { useState, useRef, useLayoutEffect } from 'react';

const ICONS = {
  domain: '/globe.png',
  twitter: '/twitter.png',
  tiktok: '/tiktok.png',
  instagram: '/instagram.png',
};

const PLATFORMS = ['domain', 'twitter', 'instagram', 'tiktok'];
const DEFAULT_RESULTS = {
  domain: true,
  twitter: true,
  instagram: false,
  tiktok: true,
};

export default function CheckHandleCard() {
  const placeholder = 'UrBrandName';
  const [handle, setHandle] = useState('');
  const [displayedHandle, setDisplayedHandle] = useState('');
  const [results, setResults] = useState(DEFAULT_RESULTS);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef(null);
  const [offset, setOffset] = useState(0);

  // measure wrapper width and compute offset = max(0, width - 775)
  useLayoutEffect(() => {
    function update() {
      if (!wrapperRef.current) return;
      const w = wrapperRef.current.clientWidth;
      const capped = Math.min(w, 800);          // match your max-w-[800px]
      setOffset(Math.max(0, capped - 775));
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // base heights (px) at breakpoint = 775px
  const baseSearchH = 44;
  const baseCardH   = 54;

  const searchH = baseSearchH + offset;
  const cardH   = baseCardH   + offset;

  function sanitize(input) {
    return input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  const displayName = (platform) => {
    const base = (displayedHandle || placeholder).toLowerCase();
    return platform === 'domain' ? `${base}.com` : base;
  };

  async function checkAvailability() {
    const clean = sanitize(handle);
    if (!clean) return;
    setLoading(true);
    try {
      const res = await fetch('/api/check-handle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle: clean }),
      });
      const data = await res.json();
      setResults(data);
      setDisplayedHandle(clean);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const takenCount = Object.values(results).filter((v) => v === false).length;
  const buttonText =
    takenCount >= 2 ? 'AI Found 5 Alternatives' : 'Check AI Alternatives';

  return (
    <section
      ref={wrapperRef}
      className="w-full max-w-[894px] mx-auto px-6 pt-10 font-inter"
    >
      {/* SEARCH BAR */}
      <div
        className="mb-8 flex w-full gap-2"
        style={{ height: `${searchH}px` }}
      >
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder={placeholder}
          className="
            flex-1
            rounded-md
            border border-[#707070]
            bg-white
            px-4 text-sm font-semibold
            placeholder-gray-400 placeholder:font-semibold
            shadow-[0_0_6px_rgba(160,38,255,0.5)]
            focus:outline-none
          "
        />
        <button
          onClick={checkAvailability}
          className="
            rounded-md
            bg-[#A026FF]
            px-6
            text-sm font-semibold text-white
            shadow-[0_0_6px_rgba(160,38,255,0.5)]
            hover:opacity-90
          "
          style={{ height: `${searchH}px` }}
        >
          Go!
        </button>
      </div>

      {/* RESULT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PLATFORMS.map((platform) => {
          const verdict = results[platform];
          const label = verdict ? 'Available' : 'Taken';
          const labelColor = verdict ? 'text-green-500' : 'text-red-500';

          return (
            <div
              key={platform}
              className="
                flex w-full items-center gap-4
                rounded-lg border border-[#707070]
                bg-white px-4
                shadow-[0_0_6px_rgba(160,38,255,0.5)]
              "
              style={{ height: `${cardH}px` }}
            >
              <img
                src={ICONS[platform]}
                alt={`${platform} icon`}
                className="h-7 w-7"
              />
              <span className="flex-1 text-sm font-semibold text-gray-400">
                {displayName(platform)}
              </span>
              <span className={`text-sm font-semibold ${labelColor}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {loading && (
        <p className="mt-4 text-center text-sm text-gray-600">Checking…</p>
      )}

      {/* AI Alternatives Button */}
      <div className="px-6 md:px-0 w-full flex justify-center pt-4">
        <button className="
          btn btn-primary
          bg-[#A026FF] hover:bg-[#8d1bf4]
          mt-8 md:mt-12 mb-8
          w-full max-w-[400px]
          border border-[#A026FF]
          text-sm font-semibold text-white
        ">
          {buttonText}
        </button>
      </div>
    </section>
  );
}
