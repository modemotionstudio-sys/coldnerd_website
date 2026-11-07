import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { TRUSTPILOT, isTrustpilotConfigured } from "../../lib/trustpilot";

const SCRIPT_SRC = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, forceReload?: boolean) => void };
  }
}

// Waits until the page has loaded and the browser is idle, so the widget never slows the first view on phones.
function whenIdle(fn: () => void) {
  const idle = () => ("requestIdleCallback" in window ? window.requestIdleCallback(fn, { timeout: 3000 }) : setTimeout(fn, 1500));
  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
}

// Loads Trustpilot's script once, then renders the widget into `el`.
function loadTrustBox(el: HTMLElement) {
  if (window.Trustpilot) {
    window.Trustpilot.loadFromElement(el, true);
    return;
  }
  let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  if (!script) {
    script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);
  }
  script.addEventListener("load", () => window.Trustpilot?.loadFromElement(el, true), { once: true });
}

/** Official Trustpilot TrustBox for the hero. Renders nothing until configured in `lib/trustpilot.ts`. */
export function TrustpilotBadge() {
  const ref = useRef<HTMLDivElement>(null);
  const configured = isTrustpilotConfigured();

  useEffect(() => {
    const el = ref.current;
    if (configured && el) whenIdle(() => loadTrustBox(el));
  }, [configured]);

  if (!configured) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.3, ease: "easeOut" }}
      // The Mini TrustBox is 150px tall with empty space at the bottom. On desktop the negative margins let it
      // overlap that space instead of making the hero taller (which pushed the headline into the navbar).
      className="shrink-0 w-[240px] lg:-mt-5 lg:-mb-[60px]"
      style={{ height: TRUSTPILOT.height }}
    >
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id={TRUSTPILOT.templateId}
        data-businessunit-id={TRUSTPILOT.businessUnitId}
        data-style-height={TRUSTPILOT.height}
        data-style-width="100%"
        data-theme="light"
      >
        <a href={TRUSTPILOT.profileUrl} target="_blank" rel="noopener noreferrer">
          Trustpilot
        </a>
      </div>
    </motion.div>
  );
}
