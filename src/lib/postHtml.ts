/**
 * Blog helpers shared by the browser (BlogPost page) and the build-time
 * pre-render (src/seo/prerender.ts). Plain string work only — no DOM.
 */

/** The old starter articles were imported with a "blog-" slug prefix; the site serves them without it. */
export const publicSlug = (slug: string) => slug.replace(/^blog-/, "");

/** Old article URLs that now live elsewhere (also 301-redirected in vercel.json). */
const MOVED_POSTS: Record<string, string> = {
  "instagram-cold-outreach-guide": "instagram-cold-outreach-the-complete-guide",
};

/** "<SEO title> | ColdNerd" — no suffix when the title already names the brand or would pass 60 characters. */
export function postPageTitle(post: { title: string; seo_title?: string | null }) {
  const t = (post.seo_title || post.title).trim();
  const withBrand = `${t} | ColdNerd`;
  return /coldnerd/i.test(t) || withBrand.length > 60 ? t : withBrand;
}

const textOf = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

/**
 * Keeps one H1 per article page (the page template's title):
 * drops a leading H1 that repeats the title and turns any other H1 into an H2.
 * Also points internal links at current article URLs.
 */
export function tidyPostHtml(html: string, title: string) {
  let out = html.replace(/^\s*<h1[^>]*>([\s\S]*?)<\/h1>/i, (m, inner: string) =>
    textOf(inner) === textOf(title) ? "" : m
  );
  out = out.replace(/<h1(\s[^>]*)?>/gi, "<h2$1>").replace(/<\/h1>/gi, "</h2>");
  return out.replace(/href="([^"]*)"/g, (_m, href: string) => `href="${fixInternalHref(href)}"`);
}

function fixInternalHref(href: string) {
  const m = href.match(/^(?:https?:\/\/(?:www\.)?coldnerd\.com)?\/blog(?:\?highlight=([a-z0-9-]+)|\/([a-z0-9-]+))\/?$/i);
  if (!m) return href;
  const slug = publicSlug(m[1] ?? m[2]);
  return `/blog/${MOVED_POSTS[slug] ?? slug}`;
}

/**
 * Questions from an article's FAQ section, for FAQPage structured data:
 * a heading containing "FAQ" / "Frequently asked", then question headings each
 * followed by their answer paragraphs.
 */
export function extractFaqs(html: string): { q: string; a: string }[] {
  const start = html.search(/<h[2-4][^>]*>[^<]*(faq|frequently asked)/i);
  if (start < 0) return [];
  const section = html.slice(start).replace(/^<h([2-4])[^>]*>[\s\S]*?<\/h\1>/i, "");
  const faqs: { q: string; a: string }[] = [];
  for (const m of section.matchAll(/<h([2-4])[^>]*>([\s\S]*?)<\/h\1>([\s\S]*?)(?=<h[1-4][^>]*>|$)/gi)) {
    const q = m[2].replace(/<[^>]+>/g, "").trim();
    const a = m[3].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!q || !a) continue;
    if (!q.endsWith("?")) break; // left the FAQ section
    faqs.push({ q, a });
  }
  return faqs;
}
