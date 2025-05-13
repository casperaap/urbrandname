import checkDomain    from '@/libs/availability/domain';
import checkTwitter   from '@/libs/availability/twitter';
import checkTiktok    from '@/libs/availability/tiktok';
import checkInstagram from '@/libs/availability/instagram';

export async function POST(request) {
  try {
    const { handle } = await request.json();
    if (!handle || typeof handle !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid handle' }), { status: 400 });
    }
    
        // optional: log the types once
     console.log({
       domain: typeof checkDomain,
       twitter: typeof checkTwitter,
       tiktok: typeof checkTiktok,
       instagram: typeof checkInstagram,
     });

    const results = await Promise.all([
      checkDomain(handle),
      checkTwitter(handle),
      checkTiktok(handle),
      checkInstagram(handle),
    ]);

    return Response.json(Object.fromEntries(results));
  } catch (err) {
    console.error('[check-handle] ⛔️', err);   // <-- add this
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
