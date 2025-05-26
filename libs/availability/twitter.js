export default async function checkTwitter(handle) {
  // 1 — basic handle validation (1–15 chars, A-Z 0-9 _)
  if (!/^[A-Za-z0-9_]{1,15}$/.test(handle))
    throw new Error('invalid X handle');

  const WEBHOOK = process.env.DISCORD_WEBHOOK_URL_X;
  if (!WEBHOOK)
    throw new Error('DISCORD_WEBHOOK_URL_X not set');

  const profileUrl = `https://X.com/${handle}`;

  /* ---------- create the message ---------- */
  const create = await fetch(`${WEBHOOK}?wait=true`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ content: profileUrl })
  });
  if (!create.ok)
    throw new Error(`webhook create failed (${create.status})`);

  const msg   = await create.json();   // full Message object
  const msgId = msg.id;

  /* ---------- give Discord time to scrape ---------- */
  let embeds = msg.embeds ?? [];
  if (!embeds.length) {
    await new Promise(r => setTimeout(r, 1100));          // ~1 s
    const upd = await fetch(`${WEBHOOK}/messages/${msgId}`).then(r => r.json());
    embeds = upd.embeds ?? [];
  }

  /* ---------- decide availability ---------- */
  const available = embeds.length === 0;  // no preview → free

  return ['twitter', available];          // shape expected by route.js
}