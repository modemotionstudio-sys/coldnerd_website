/**
 * IndexNow (runs in Node at build time): tells Bing, Yandex, Naver, Seznam… about new or
 * updated pages straight away, instead of waiting for them to re-read sitemap.xml.
 * Google does not use IndexNow; it still finds new articles through the sitemap.
 *
 * The key must match the file public/<INDEXNOW_KEY>.txt (served at the site root).
 * Only Vercel production builds submit, so local and preview builds never ping.
 */
import { SITE_URL } from "./pages";

export const INDEXNOW_KEY = "134fe00a673c4c419c3757b22c77381a";

/** Articles updated within this window are submitted (a publish triggers a rebuild within minutes). */
const RECENT_MS = 2 * 24 * 60 * 60 * 1000;

export function recentlyUpdated(posts: { slug: string; updated_at: string }[], now = Date.now()) {
  const fresh = posts.filter((p) => now - new Date(p.updated_at).getTime() < RECENT_MS);
  if (!fresh.length) return [];
  return [`${SITE_URL}/blog`, ...fresh.map((p) => `${SITE_URL}/blog/${p.slug}`)];
}

export async function submitIndexNow(urls: string[]) {
  if (process.env.VERCEL_ENV !== "production") return "skipped (not a Vercel production build)";
  if (!urls.length) return "nothing new to submit";
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
      signal: AbortSignal.timeout(10000),
    });
    return `submitted ${urls.length} URLs (HTTP ${res.status})`;
  } catch (err) {
    // Never fail the build over this; the sitemap still covers the pages.
    return `failed (${(err as Error).message})`;
  }
}
