export default async function checkDomain(handle) {
  const available = Math.random() > 0.5;
  await new Promise(res => setTimeout(res, 200)); // simulate latency
  return ['domain', available];
}