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
