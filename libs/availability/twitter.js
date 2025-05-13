export default async function checkTwitter(handle) {
  const available = Math.random() > 0.5;
  await new Promise(res => setTimeout(res, 200));
  return ['twitter', available];
}
