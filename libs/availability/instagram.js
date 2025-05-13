export default async function checkInstagram(handle) {
  const available = Math.random() > 0.5;
  await new Promise(res => setTimeout(res, 200));
  return ['instagram', available];
}