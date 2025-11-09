// lib/getBaseUrl.ts
export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // client: relative ok
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000"; // fallback for dev
}
