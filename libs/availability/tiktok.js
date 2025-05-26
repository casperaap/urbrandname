export default async function checkTiktok(handle) {
  if (!/^[A-Za-z0-9._]{2,24}$/.test(handle))
    throw new Error('invalid TikTok handle');

  const WEBHOOK = process.env.DISCORD_WEBHOOK_URL_TIKTOK;
  if (!WEBHOOK) throw new Error('DISCORD_WEBHOOK_URL_TIKTOK not set');

  const profileUrl = `https://www.tiktok.com/@${handle}`;
  const create = await fetch(`${WEBHOOK}?wait=true`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ content: profileUrl })
  });
  if (!create.ok)
    throw new Error(`webhook create failed (${create.status})`);

  const msg   = await create.json();
  const msgId = msg.id;

  /* allow Discord time to add the preview if it was empty */
  let embeds = msg.embeds ?? [];
  if (!embeds.length) {
    await new Promise(r => setTimeout(r, 1300));
    const upd = await fetch(`${WEBHOOK}/messages/${msgId}`).then(r => r.json());
    embeds = upd.embeds ?? [];
  }

  /* ---- improved detection ---- */
  const needle = handle.toLowerCase();
  const taken = embeds.some(e => {
    const texts = [
      e.title,
      e.description,
      e.author?.name,
      ...(e.fields ?? []).map(f => f.name + ' ' + f.value)
    ]
    .filter(Boolean)
    .map(s => s.toLowerCase());

    return texts.some(t => t.includes(needle));
  });

  return ['tiktok', !taken];   // true = available
}
