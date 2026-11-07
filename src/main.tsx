
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { preloadPages } from "./app/routes";
  import "./styles/index.css";
  import { trackAiReferral, trackAuth, trackCtaClicks } from "./lib/analytics";

  // Disable browser's automatic scroll restoration so we can re-anchor to the
  // saved Y after layout settles (images + motion animations) and avoid the
  // "shake" on reload mid-page.
  if (typeof history !== "undefined" && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  createRoot(document.getElementById("root")!).render(<App />);
  trackAiReferral();
  trackAuth();
  trackCtaClicks();

  // Fetch the other pages in the background after the visitor's first interaction,
  // so the first load stays small and later clicks still open instantly.
  const preloadOnce = () => {
    ["pointerdown", "keydown", "scroll", "touchstart"].forEach((e) => window.removeEventListener(e, preloadOnce));
    preloadPages();
  };
  ["pointerdown", "keydown", "scroll", "touchstart"].forEach((e) => window.addEventListener(e, preloadOnce, { passive: true }));
  