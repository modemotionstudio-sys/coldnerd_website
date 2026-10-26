import { supabase } from "./supabase";

/** GA4 Measurement ID — Admin → Data streams → coldnerd stream → Measurement ID */
export const GA_MEASUREMENT_ID = "G-CE4STCRD29";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// ---------------------------------------------------------------------------
// Page views. index.html configures GA with send_page_view: false and only on
// the live domain (window.gtag is undefined elsewhere, so everything here no-ops).
// The app sends one page_view per route, the first one before any other event,
// so GA4 never reports a "(not set)" landing page.
// ---------------------------------------------------------------------------

let firstPageViewSent = false;
let pendingPageView: ReturnType<typeof setTimeout> | null = null;
let flushPending: (() => void) | null = null;
const afterFirstPageView: (() => void)[] = [];

function sendPageView() {
  window.gtag?.("event", "page_view", {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });
  if (!firstPageViewSent) {
    firstPageViewSent = true;
    afterFirstPageView.splice(0).forEach((fn) => fn());
  }
}

/** Called on every route change (routes.tsx). */
export function gaPageView(pathname: string) {
  if (typeof window === "undefined") return;
  if (pathname.startsWith("/admin")) markInternalTraffic();
  if (!firstPageViewSent) {
    sendPageView(); // first load: the pre-rendered <title> is already correct
    return;
  }
  // Later navigations: wait for the page transition so the new page has set its <title>.
  flushPending?.();
  flushPending = () => {
    if (pendingPageView) clearTimeout(pendingPageView);
    pendingPageView = null;
    flushPending = null;
    sendPageView();
  };
  pendingPageView = setTimeout(flushPending, 700);
}

/** Sends a GA4 event once the landing page_view has gone out. */
export function gaEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const send = () => window.gtag?.("event", name, params);
  if (firstPageViewSent) send();
  else afterFirstPageView.push(send);
}

// ---------------------------------------------------------------------------
// Internal traffic: the team's own visits (CMS managers, /admin) are tagged
// traffic_type=internal so GA4's "Internal Traffic" data filter can drop them.
// Remembered on this device, also after logging out.
// ---------------------------------------------------------------------------

export function markInternalTraffic() {
  try {
    localStorage.setItem("cn:internal", "1");
  } catch {
    /* storage unavailable */
  }
  window.gtag?.("set", { traffic_type: "internal" });
}

// ---------------------------------------------------------------------------
// Accounts: user_id, sign_up and login
// ---------------------------------------------------------------------------

function onceKey(key: string, where: "local" | "session") {
  try {
    const storage = where === "local" ? localStorage : sessionStorage;
    if (storage.getItem(key)) return false;
    storage.setItem(key, "1");
  } catch {
    /* storage unavailable: send anyway */
  }
  return true;
}

/** Sends sign_up once per account (email sign-ups call this from the success callback). */
export function trackSignUp(userId: string, method: string) {
  if (onceKey(`cn:signup:${userId}`, "local")) gaEvent("sign_up", { method });
}

/**
 * Sets GA4 user_id (the internal account id, never an email) for logged-in visitors,
 * sends sign_up for brand-new accounts (incl. Google sign-in) and login otherwise.
 */
export function trackAuth() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user;
    if (!user) {
      window.gtag?.("set", { user_id: null });
      return;
    }
    window.gtag?.("set", { user_id: user.id });
    window.gtag?.("set", "user_properties", { signup_date: user.created_at.slice(0, 10) });
    if (event !== "SIGNED_IN") return;
    const method = (user.app_metadata?.provider as string | undefined) ?? "email";
    const isNew = Date.now() - new Date(user.created_at).getTime() < 15 * 60 * 1000;
    if (isNew) trackSignUp(user.id, method);
    else if (onceKey(`cn:login:${user.id}`, "session")) gaEvent("login", { method });
    setTimeout(() => {
      supabase.rpc("is_cms_manager").then(({ data }) => data === true && markInternalTraffic());
    }, 0);
  });
}

// ---------------------------------------------------------------------------
// CTA clicks: cta_click for sign-up / pricing / download buttons and links,
// plus begin_checkout for Whop checkout links. One listener for the whole site.
// ---------------------------------------------------------------------------

const CTA_TEXT = /(download|get started|sign ?up|start (free|now|trial)|try (it|free|coldnerd)|buy|subscribe|choose plan)/i;

export function trackCtaClicks() {
  if (typeof document === "undefined") return;
  document.addEventListener(
    "click",
    (e) => {
      if (window.location.pathname.startsWith("/admin")) return;
      const el = (e.target as Element | null)?.closest?.("a, button");
      if (!el) return;
      const href = el instanceof HTMLAnchorElement ? el.href : "";
      const name = (el.getAttribute("aria-label") || (el as HTMLElement).innerText || "").trim().replace(/\s+/g, " ").slice(0, 60);
      const isCheckout = /whop\.com/.test(href);
      if (!isCheckout && !/\/(signup|pricing)\b/.test(href) && !CTA_TEXT.test(name)) return;
      gaEvent("cta_click", { button_name: name || "(no text)", link_url: href, page_path: window.location.pathname });
      if (isCheckout) gaEvent("begin_checkout", { button_name: name, link_url: href });
    },
    { capture: true }
  );
}

// ---------------------------------------------------------------------------
// AI assistant traffic (ChatGPT, Perplexity, Gemini, Copilot, Claude, …)
// ---------------------------------------------------------------------------

const AI_SOURCES: { name: string; pattern: RegExp }[] = [
  { name: "chatgpt", pattern: /(^|\.)(chatgpt\.com|chat\.openai\.com|openai\.com)$/ },
  { name: "perplexity", pattern: /(^|\.)perplexity\.ai$/ },
  { name: "gemini", pattern: /(^|\.)(gemini\.google\.com|bard\.google\.com)$/ },
  { name: "copilot", pattern: /(^|\.)(copilot\.microsoft\.com|copilot\.cloud\.microsoft)$/ },
  { name: "claude", pattern: /(^|\.)claude\.ai$/ },
  { name: "deepseek", pattern: /(^|\.)(chat\.)?deepseek\.com$/ },
  { name: "grok", pattern: /(^|\.)(grok\.com|x\.ai)$/ },
  { name: "meta_ai", pattern: /(^|\.)meta\.ai$/ },
  { name: "mistral", pattern: /(^|\.)chat\.mistral\.ai$/ },
  { name: "you", pattern: /(^|\.)you\.com$/ },
  { name: "phind", pattern: /(^|\.)phind\.com$/ },
  { name: "poe", pattern: /(^|\.)poe\.com$/ },
];

function matchAiSource(value: string | null): string | null {
  if (!value) return null;
  let host = value.toLowerCase().trim();
  try {
    if (host.includes("/")) host = new URL(host.startsWith("http") ? host : `https://${host}`).hostname;
  } catch {
    return null;
  }
  return AI_SOURCES.find((s) => s.pattern.test(host))?.name ?? null;
}

/**
 * Once per visit, if the visitor came from an AI assistant (by referrer or by
 * the utm_source ChatGPT and others add to links), send a GA4 `ai_referral`
 * event with `ai_source` (e.g. "chatgpt") and the landing page.
 */
export function trackAiReferral() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem("cn:ai-referral")) return;
  } catch {
    /* storage unavailable */
  }
  const utm = new URLSearchParams(window.location.search).get("utm_source");
  const source = matchAiSource(utm) ?? matchAiSource(document.referrer);
  if (!source) return;
  try {
    sessionStorage.setItem("cn:ai-referral", source);
  } catch {
    /* storage unavailable */
  }
  gaEvent("ai_referral", {
    ai_source: source,
    landing_page: window.location.pathname,
    referrer: document.referrer || "(none)",
  });
}
