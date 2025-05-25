'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { signIn } from 'next-auth/react';

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
  instagram: true,
  tiktok: true,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function HandleAlternativeCard() {
  const placeholder = 'UrBrandName';
  const [handle, setHandle] = useState('');
  const [displayedHandle, setDisplayedHandle] = useState('');
  const [results, setResults] = useState(DEFAULT_RESULTS);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const maxDescription = 420;

  // Alternatives
  const [alternatives, setAlternatives] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [fadeKey, setFadeKey] = useState(0); // For fade effect

  // Input/textarea shake state
  const [shakeInputs, setShakeInputs] = useState(false);

  // Responsive width
  const wrapperRef = useRef(null);
  const [offset, setOffset] = useState(0);
  useLayoutEffect(() => {
    function update() {
      if (!wrapperRef.current) return;
      const w = wrapperRef.current.clientWidth;
      const capped = Math.min(w, 800);
      setOffset(Math.max(0, capped - 775));
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const baseSearchH = 44;
  const baseCardH = 54;
  const searchH = baseSearchH + offset;
  const cardH = baseCardH + offset;

  function sanitize(input) {
    return input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }
  const displayName = (platform, name) => {
    const base = (name || placeholder).toLowerCase();
    return platform === 'domain' ? `${base}.com` : base;
  };

  async function checkAvailability() {
    const clean = sanitize(handle);
    if (!clean && !description.trim()) {
      setShakeInputs(true);
      setTimeout(() => setShakeInputs(false), 500); // duration of shake
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/check-handle+', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle: clean, description }),
      });
      const data = await res.json();

      setResults({
        domain: data.domain,
        twitter: data.twitter,
        instagram: data.instagram,
        tiktok: data.tiktok,
      });
      setDisplayedHandle(clean);

      if (data.alternatives && data.alternatives.length) {
        setAlternatives(data.alternatives);
        setActiveTab(clean ? 0 : 1);
      } else {
        setAlternatives([]);
        setActiveTab(0);
      }
      setFadeKey(prev => prev + 1); // trigger fade animation
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  // Which tabs to show
  // If NO handle, only alternatives
  const navTabs = (!displayedHandle && alternatives.length > 0)
    ? alternatives.map((alt, idx) => ({
        label: alt.name,
        isMain: false,
      })).slice(0, 4)
    : [
        { label: (displayedHandle || placeholder), isMain: true },
        ...alternatives.map((alt, idx) => ({
          label: alt.name,
          isMain: false,
        }))
      ].slice(0, 4);

  // Which tab is currently selected
  const actualTab = (!displayedHandle && alternatives.length > 0)
    ? activeTab // alternatives only, so 0=first alternative
    : activeTab;

  // What to display in the 4 cards
  let cardName = displayedHandle || placeholder;
  let cardAvail = results;
  if ((!displayedHandle && alternatives.length > 0 && alternatives[actualTab]) ||
      (displayedHandle && activeTab > 0 && alternatives[activeTab - 1])) {
    const altObj = (!displayedHandle && alternatives.length > 0)
      ? alternatives[actualTab]
      : alternatives[activeTab - 1];
    if (altObj) {
      cardName = altObj.name;
      cardAvail = altObj.availability;
    }
  }

  // Flexible swipeable nav bar logic
  const navBarRef = useRef(null);
  const navDrag = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  // Mobile nav bar: scroll to selected tab
  useLayoutEffect(() => {
    if (navBarRef.current) {
      const active = navBarRef.current.querySelector('.active-tab');
      if (active && active.scrollIntoView) {
        active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [actualTab, navTabs.length]);

  // Drag events for flexible nav bar
  function onNavPointerDown(e) {
    navDrag.current.dragging = true;
    navDrag.current.startX = e.touches ? e.touches[0].clientX : e.clientX;
    navDrag.current.scrollLeft = navBarRef.current.scrollLeft;
    document.body.style.userSelect = 'none';
  }
  function onNavPointerMove(e) {
    if (!navDrag.current.dragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = navDrag.current.startX - x;
    navBarRef.current.scrollLeft = navDrag.current.scrollLeft + delta;
  }
  function onNavPointerUp() {
    navDrag.current.dragging = false;
    document.body.style.userSelect = '';
    // Bounce effect
    if (navBarRef.current.scrollLeft < 0) {
      navBarRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (navBarRef.current.scrollLeft > navBarRef.current.scrollWidth - navBarRef.current.clientWidth) {
      navBarRef.current.scrollTo({ left: navBarRef.current.scrollWidth - navBarRef.current.clientWidth, behavior: 'smooth' });
    }
  }

  // Attach/remove global mouse/touch events for drag
  useLayoutEffect(() => {
    function onMove(e) { onNavPointerMove(e); }
    function onUp(e) { onNavPointerUp(e); }
    if (navDrag.current.dragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [navDrag.current.dragging]);

  return (
    <section
      ref={wrapperRef}
      className="w-full max-w-[894px] mx-auto px-6 pt-10 font-inter"
    >
      <style>{`
        .shake {
          animation: shake .95s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px);}
          40%, 60% { transform: translateX(4px);}
        }
      `}</style>

      {/* SEARCH BAR */}
      <div
        className={classNames("mb-4 flex w-full gap-2 max-h-[48px]", shakeInputs && 'shake')}
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
          disabled={loading}
          className="
            rounded-md
            bg-[#A026FF]
            px-6
            text-sm font-semibold text-white
            shadow-[0_0_6px_rgba(160,38,255,0.5)]
            hover:opacity-90
            max-h-[48px]
            disabled:opacity-60
          "
          style={{ height: `${searchH}px` }}
        >
          Go!
        </button>
      </div>

      {/* DESCRIPTION FIELD */}
      <div
        className={classNames("relative mb-6", shakeInputs && 'shake')}
        style={{ transition: 'box-shadow .2s' }}
      >
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value.slice(0, maxDescription))}
          maxLength={maxDescription}
          placeholder="(Optional) Describe your brand…"
          className="
            w-full resize-none
            rounded-md border border-[#707070]
            bg-white px-4 py-2 text-sm font-semibold
            placeholder-gray-400 placeholder:font-semibold
            shadow-[0_0_6px_rgba(160,38,255,0.5)]
            focus:outline-none
            min-h-[88px]
          "
        />
        <span
          className="absolute bottom-2 right-4 text-xs text-gray-400 pointer-events-none select-none"
          style={{ userSelect: 'none' }}
        >
          {description.length}/{maxDescription}
        </span>
      </div>

      {/* NAV TABS */}
      <div
        ref={navBarRef}
        className="flex space-x-2 mb-4 overflow-x-auto scrollbar-hide snap-x pl-0 pr-2 md:justify-center"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '0.75rem',
          scrollPaddingRight: '0.75rem',
          cursor: navDrag.current.dragging ? 'grabbing' : 'grab',
          touchAction: 'pan-x'
        }}
        onMouseDown={onNavPointerDown}
        onTouchStart={onNavPointerDown}
      >
        {navTabs.map((tab, idx) => (
          <button
            key={tab.label + idx}
            onClick={() => { setActiveTab(idx); setFadeKey(f => f+1); }}
            className={classNames(
              'px-5 py-2 rounded-t-lg font-semibold border-b-2 transition-all snap-center whitespace-nowrap mx-2 flex-shrink-0 truncate',
              actualTab === idx
                ? 'bg-white border-[#A026FF] border-b-4 text-[#A026FF] active-tab'
                : 'bg-[#f6f1fa] border-transparent text-gray-500 hover:text-[#A026FF]'
            )}
            style={{ maxWidth: '70vw' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* RESULT CARDS (for active tab, with fade and loading skeletons) */}
      <div
        className={classNames(
          "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative transition-opacity duration-300",
          loading ? 'opacity-50' : 'opacity-100'
        )}
        key={fadeKey}
        style={{
          transition: 'opacity 0.4s',
        }}
      >
        {PLATFORMS.map((platform, i) => {
          if (loading) {
            // Skeleton loading animation
            return (
              <div
                key={platform}
                className="flex w-full items-center gap-4 rounded-lg border border-[#707070] bg-gray-100 px-4 animate-pulse"
                style={{ height: `${cardH}px` }}
              >
                <div className="h-7 w-7 rounded-full bg-gray-300" />
                <span className="flex-1 h-4 bg-gray-300 rounded w-3/4"></span>
                <span className="h-4 w-12 bg-gray-200 rounded"></span>
              </div>
            );
          }
          const verdict = cardAvail[platform];
          const label = verdict ? 'Available' : 'Taken';
          const labelColor = verdict ? 'text-green-500' : 'text-red-500';
          return (
            <div
              key={platform}
              className="flex w-full items-center gap-4 rounded-lg border border-[#707070] bg-white px-4 shadow-[0_0_6px_rgba(160,38,255,0.5)] transition-all duration-300"
              style={{ height: `${cardH}px` }}
            >
              <img
                src={ICONS[platform]}
                alt={`${platform} icon`}
                className="h-7 w-7"
              />
              <span className="flex-1 text-sm font-semibold text-gray-400">
                {displayName(platform, cardName)}
              </span>
              <span className={`text-sm font-semibold ${labelColor}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {loading && (
        <p className="mt-2 text-center text-sm text-gray-600">Checking…</p>
      )}

      {/* BIG CTA BUTTON */}
      <div className="px-6 md:px-0 w-full flex justify-center pt-4">
        <button
          onClick={() => signIn()}
          className="
            bg-[#A026FF] hover:bg-[#8d1bf4]
            mt-6 mb-2 w-full max-w-[400px]
            border border-[#A026FF]
            text-sm font-semibold text-white
            py-3 rounded-md
            shadow-[0_0_6px_rgba(160,38,255,0.5)]
          "
        >
          Check AI Alternatives
        </button>
      </div>
    </section>
  );
}
