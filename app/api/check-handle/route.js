import checkDomain    from '@/libs/availability/domain';
import checkTwitter   from '@/libs/availability/twitter';
import checkTiktok    from '@/libs/availability/tiktok';
import checkInstagram from '@/libs/availability/instagram';

import { Redis }     from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

/* ── 1 ▸ Upstash sliding-window buckets (≤ 5 / 2 s, cluster-wide) ── */
const redis = Redis.fromEnv();                 // needs REST_URL & TOKEN

const twitterRL   = new Ratelimit({ redis,
  limiter: Ratelimit.slidingWindow(5, '2 s'),
  prefix : 'twitter-webhook' });

const tiktokRL    = new Ratelimit({ redis,
  limiter: Ratelimit.slidingWindow(5, '2 s'),
  prefix : 'tiktok-webhook' });

const instagramRL = new Ratelimit({ redis,
  limiter: Ratelimit.slidingWindow(5, '2 s'),
  prefix : 'insta-webhook' });

/* ── 2 ▸ book a slot in the bucket ─────────────────────────────── */
async function withLimit(rl, job) {
  while (true) {
    const hit = await rl.limit('global');
    if (hit.success) return job();             // token acquired

    const waitMs =
      hit.resetAfter !== undefined
        ? hit.resetAfter * 1000
        : Math.max(0, hit.reset - Date.now());

    const jitter = Math.floor(Math.random() * 100);
    await new Promise(r => setTimeout(r, waitMs + jitter));
  }
}

/* ── 3 ▸ safe wrapper: re-run once if the checker throws a 429 ─── */
async function safeCheck(rl, fn, label) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await withLimit(rl, fn);          // normal path
    } catch (err) {
      const msg = String(err);

      /* one retry on Discord 429 */
      if (attempt === 0 && /429/.test(msg)) {
        const jitter = Math.floor(Math.random() * 100);
        await new Promise(r => setTimeout(r, 600 + jitter));
        continue;                              // loop again
      }

      /* any other error → treat as unavailable, do not crash   */
      console.warn(`[safeCheck] ${label} error ➜ marking unavailable`);
      return [label, false];
    }
  }
}

/* ── 4 ▸ route handler ─────────────────────────────────────────── */
export async function POST(request) {
  try {
    const { handle } = await request.json();
    if (typeof handle !== 'string' || !handle.trim()) {
      return Response.json({ error: 'Invalid handle' }, { status: 400 });
    }

    // Short handle: always taken, with delay
    if (handle.length <= 4) {
      await new Promise(res => setTimeout(res, 1500));
      return Response.json({
        domain: false,
        twitter: false,
        instagram: false,
        tiktok: false
      });
    }

    const results = await Promise.all([
      checkDomain(handle),                                        // no Discord
      safeCheck(twitterRL,   () => checkTwitter(handle),   'twitter'),
      safeCheck(tiktokRL,    () => checkTiktok(handle),    'tiktok'),
      safeCheck(instagramRL, () => checkInstagram(handle), 'instagram'),
    ]);

    return Response.json(Object.fromEntries(results));
  } catch (err) {
    console.error('[check-handle] ⛔️', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
