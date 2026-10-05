import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, ChevronDown, Scale } from "lucide-react";
import { comparisonLinks, learnLinks } from "../../seo/pages";

const groups = [
  { title: "Learn", icon: BookOpen, links: learnLinks },
  { title: "Comparisons", icon: Scale, links: comparisonLinks },
];

/** Navbar "Resources" dropdown: Learn guides + comparison articles. */
export function ResourcesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onScroll = () => setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 font-['Inter:Regular',sans-serif] font-normal text-[#474747] text-[16px] lg:text-[18px] leading-[36px] whitespace-nowrap hover:text-[#2a6ff3] transition-colors cursor-pointer bg-transparent border-none"
      >
        Resources
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[120]"
          >
            <div className="w-[min(560px,90vw)] grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100">
              {groups.map((g) => (
                <div key={g.title} className="p-2">
                  <p className="flex items-center gap-2 px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    <g.icon className="w-3.5 h-3.5" /> {g.title}
                  </p>
                  <ul>
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          to={l.href}
                          onClick={() => setOpen(false)}
                          className="block px-2 py-2 rounded-lg text-[15px] text-gray-700 hover:bg-[#eef4ff] hover:text-[#2a6ff3] no-underline transition-colors"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const resourceGroups = groups;
