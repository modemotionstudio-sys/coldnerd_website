/** GA4 Measurement ID — Admin → Data streams → coldnerd stream → Measurement ID */
export const GA_MEASUREMENT_ID = "G-CE4STCRD29";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends virtual page_view when SPA navigates (gtag in index.html only loads once). */
export function gaPageView(pathname: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: pathname,
  });
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
  const send = () =>
    window.gtag?.("event", "ai_referral", {
      ai_source: source,
      landing_page: window.location.pathname,
      referrer: document.referrer || "(none)",
    });
  // gtag.js loads async; retry briefly if it isn't ready yet.
  if (typeof window.gtag === "function") send();
  else setTimeout(send, 1500);
}
