import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { TRUSTPILOT, isTrustpilotConfigured } from "../../lib/trustpilot";

const SCRIPT_SRC = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, forceReload?: boolean) => void };
  }
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
    if (configured && ref.current) loadTrustBox(ref.current);
  }, [configured]);

  if (!configured) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.3, ease: "easeOut" }}
      className="shrink-0 w-[240px]"
      style={{ minHeight: TRUSTPILOT.height }}
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
