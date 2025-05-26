export default async function checkDomain(handle) {
  const username = process.env.NAMECOM_USERNAME;
  const apiToken = process.env.NAMECOM_KEY;

  if (!username || !apiToken) {
    console.error('Missing Name.com API credentials');
    return ['domain', false];
  }

  const domain = `${handle.toLowerCase()}.com`;
  const auth = Buffer.from(`${username}:${apiToken}`).toString('base64');
  const url = `https://api.name.com/v4/domains:checkAvailability`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ domainNames: [domain] }),
  });

  const data = await res.json();
  console.log('[Name.com API] Response:', JSON.stringify(data, null, 2));

  if (!res.ok) {
    console.error('[Name.com] Error:', res.status, data);
    return ['domain', false];
  }

  // Updated availability logic:
  const result = data.results && data.results[0];
  const available = result && result.purchasable === true;

  return ['domain', available];
}
