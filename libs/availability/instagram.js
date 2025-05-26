export default async function checkInstagram(handle) {
  if (!/^[a-zA-Z0-9._]{1,30}$/.test(handle))
    throw new Error('invalid Instagram handle');

  const WEBHOOK = process.env.DISCORD_WEBHOOK_URL_INSTAGRAM;
  if (!WEBHOOK) throw new Error('DISCORD_WEBHOOK_URL_INSTAGRAM not set');

  const profileUrl = `https://www.instagram.com/${handle}/`;

  /* 1 — send the link */
  const create = await fetch(`${WEBHOOK}?wait=true`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ content: profileUrl })
  });
  if (!create.ok)
    throw new Error(`webhook create failed (${create.status})`);

  const msg = await create.json();                // full Message object

  /* 2 — see if the preview arrived on the first response */
  let hasEmbed = msg.embeds?.length > 0;

  /* 3 — if not, give Discord ~1 s and poll the same message once */
  if (!hasEmbed) {
    await new Promise(r => setTimeout(r, 1100));

    const get = await fetch(
      `${WEBHOOK}/messages/${msg.id}`              // webhook-scoped GET
    );
    if (get.ok) {
      const updated = await get.json();
      hasEmbed = updated.embeds?.length > 0;
    }
  }

  /* 5 — available ⇢ no embed */
  const available = !hasEmbed;
  return ['instagram', available];
}
