import checkDomain    from '@/libs/availability/domain';
import checkTwitter   from '@/libs/availability/twitter';
import checkTiktok    from '@/libs/availability/tiktok';
import checkInstagram from '@/libs/availability/instagram';

export async function POST(request) {
  try {
    const { handle, description } = await request.json();
    let rootAvailability = {};

    // Always do the normal checks if handle is present
    if (handle && typeof handle === 'string' && handle.trim()) {
      const results = await Promise.all([
        checkDomain(handle),
        checkTwitter(handle),
        checkTiktok(handle),
        checkInstagram(handle),
      ]);
      rootAvailability = Object.fromEntries(results);
    }

    // If no description, just return the normal results
    if (!description || typeof description !== 'string' || !description.trim()) {
      return new Response(JSON.stringify(rootAvailability), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Otherwise, call generate-alternatives
    // Build the absolute URL to generate-alternatives (always use /api path)
    const altRes = await fetch(`${request.nextUrl.origin}/api/generate-alternatives`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });

    const altData = await altRes.json();
    const names = altData.alternatives || [];
    console.log('[check-handle+] AI alternatives:', names);

    // Check availability for each alternative
    const viable = [];
    for (const name of names) {
      // eslint-disable-next-line no-await-in-loop
      const checks = await Promise.all([
        checkDomain(name),
        checkTwitter(name),
        checkTiktok(name),
        checkInstagram(name),
      ]);
      const availMap = Object.fromEntries(checks);
      const freeCount = Object.values(availMap).filter(Boolean).length;
      if (freeCount >= 3) {
        viable.push({ name, availability: availMap });
      }
      if (viable.length === 3) break; // Stop after 3 found
    }

    console.log('[check-handle+] viable alternatives:', viable);

    // Return both the "normal" root availability and the alternatives!
    return new Response(
      JSON.stringify({ ...rootAvailability, alternatives: viable }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[check-handle+] ⛔️', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
