import { useEffect } from "react";

export const SITE_ORIGIN = "https://www.coldnerd.com";

export const DEFAULT_DESCRIPTION =
  "Find prospects, send AI-personalized Instagram DMs, automate follow-ups and track replies with ColdNerd — Instagram outreach with built-in account safety.";

interface PageMeta {
  title: string;
  description?: string;
  /** Path of the page's main URL, e.g. "/blog". Omit on pages that shouldn't be indexed. */
  canonicalPath?: string;
  /** Keep this page out of search results (login, sign-up, admin, 404…). */
  noindex?: boolean;
}

function upsert(selector: string, create: () => HTMLElement): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

const meta = (attr: "name" | "property", key: string) =>
  upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, key);
    return m;
  });

/**
 * Sets the page's <title>, description, canonical link, Open Graph tags and
 * robots rule. Pages call this on mount so the head always matches the page,
 * even after client-side navigation from another page.
 */
export function setPageMeta({ title, description = DEFAULT_DESCRIPTION, canonicalPath, noindex }: PageMeta) {
  if (typeof document === "undefined") return;
  document.title = title;
  meta("name", "description").setAttribute("content", description);
  meta("property", "og:title").setAttribute("content", title);
  meta("property", "og:description").setAttribute("content", description);
  meta("name", "twitter:title").setAttribute("content", title);
  meta("name", "twitter:description").setAttribute("content", description);

  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonicalPath && !noindex) {
    const href = SITE_ORIGIN + canonicalPath;
    const link = canonical ?? Object.assign(document.createElement("link"), { rel: "canonical" });
    link.href = href;
    if (!canonical) document.head.appendChild(link);
    meta("property", "og:url").setAttribute("content", href);
  } else {
    canonical?.remove();
  }

  const robots = document.head.querySelector('meta[name="robots"]');
  if (noindex) meta("name", "robots").setAttribute("content", "noindex, follow");
  else robots?.remove();
}

export function usePageMeta(m: PageMeta | null) {
  const key = m ? JSON.stringify(m) : "";
  useEffect(() => {
    if (m) setPageMeta(m);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

export const BLOG_META: PageMeta = {
  title: "ColdNerd Blog — Instagram Outreach, DM Automation & Growth Guides",
  description:
    "Guides, comparisons and playbooks on Instagram outreach, cold DMs, prospecting, lead generation and safe DM automation from the ColdNerd team.",
  canonicalPath: "/blog",
};
