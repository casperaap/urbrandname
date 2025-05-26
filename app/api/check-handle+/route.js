/* app/api/check-handle-plus/route.js
   – alternative-name checker, now with:
     ① global Upstash limiter  ② “retry-once-on-429” wrapper    */

import checkDomain    from '@/libs/availability/domain';
import checkTwitter   from '@/libs/availability/twitter';
import checkTiktok    from '@/libs/availability/tiktok';
import checkInstagram from '@/libs/availability/instagram';

import { Redis }     from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

/* ──────────────────────────────────────────────────────────────── */
/* 1 ▸ Upstash sliding-window limiters (≤ 5 posts / 2 s)           */
const redis = Redis.fromEnv();          // needs UPSTASH_REDIS_REST_URL/_TOKEN

const twitterRL   = new Ratelimit({ redis,
  limiter: Ratelimit.slidingWindow(5, '2 s'),
  prefix : 'twitter-webhook' });

const tiktokRL    = new Ratelimit({ redis,
  limiter: Ratelimit.slidingWindow(5, '2 s'),
  prefix : 'tiktok-webhook' });

const instagramRL = new Ratelimit({ redis,
  limiter: Ratelimit.slidingWindow(5, '2 s'),
  prefix : 'insta-webhook' });

/* ──────────────────────────────────────────────────────────────── */
/* 2 ▸ helper: wait for a slot in the bucket                       */
async function withLimit(rl, job) {
  while (true) {
    const hit = await rl.limit('global');
    if (hit.success) return job();      // got a token

    const waitMs =
      hit.resetAfter !== undefined
        ? hit.resetAfter * 1000
        : Math.max(0, hit.reset - Date.now());

    const jitter = Math.floor(Math.random() * 100);
    await new Promise(r => setTimeout(r, waitMs + jitter));
  }
}

/* 3 ▸ wrapper: if Discord still says 429, wait ~0.6 s and retry once */
async function safeCheck(rl, fn) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await withLimit(rl, fn);   // throttled call
    } catch (err) {
      if (attempt === 0 && /429/.test(String(err))) {
        const jitter = Math.floor(Math.random() * 100);
        await new Promise(r => setTimeout(r, 600 + jitter));
        continue;                       // retry the whole limiter+call
      }
      throw err;                        // unrecoverable
    }
  }
}

/* ──────────────────────────────────────────────────────────────── */
export async function POST(request) {
  try {
    const { handle, description } = await request.json();
    let rootAvailability = {};

    // ---------- Short handle block (delay + always taken) ----------
    if (typeof handle === 'string' && handle.trim() && handle.length <= 4) {
      // Wait for 1.5 seconds to simulate processing/loading
      await new Promise(res => setTimeout(res, 1500));
      return new Response(
        JSON.stringify({
          domain: false,
          twitter: false,
          instagram: false,
          tiktok: false,
          alternatives: []
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    /* ---------- primary handle ---------------------------------- */
    if (handle && typeof handle === 'string' && handle.trim()) {
      const base = await Promise.all([
        checkDomain(handle),
        safeCheck(twitterRL,   () => checkTwitter(handle)),
        safeCheck(tiktokRL,    () => checkTiktok(handle)),
        safeCheck(instagramRL, () => checkInstagram(handle)),
      ]);
      rootAvailability = Object.fromEntries(base);
    }

    /* ---------- no description? done ---------------------------- */
    if (!description || typeof description !== 'string' || !description.trim()) {
      return new Response(JSON.stringify(rootAvailability),
        { headers: { 'Content-Type': 'application/json' } });
    }

    /* ---------- ask AI for alternatives ------------------------- */
    const altRes = await fetch(`${request.nextUrl.origin}/api/generate-alternatives`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ description }),
    });

    const { alternatives: names = [] } = await altRes.json();
    console.log('[check-handle+] AI alternatives:', names);

    /* ---------- evaluate candidates ----------------------------- */
    const viable = [];
    for (const name of names) {
      // eslint-disable-next-line no-await-in-loop
      const checks = await Promise.all([
        checkDomain(name),
        safeCheck(twitterRL,   () => checkTwitter(name)),
        safeCheck(tiktokRL,    () => checkTiktok(name)),
        safeCheck(instagramRL, () => checkInstagram(name)),
      ]);

      const availMap  = Object.fromEntries(checks);
      const freeCount = Object.values(availMap).filter(Boolean).length;

      if (freeCount >= 3) viable.push({ name, availability: availMap });
      if (viable.length === 3) break;   // keep only 3 good ones
    }

    console.log('[check-handle+] viable alternatives:', viable);

    return new Response(
      JSON.stringify({ ...rootAvailability, alternatives: viable }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('[check-handle+] ⛔️', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

