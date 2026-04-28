import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Apple } from "lucide-react";

export const DOWNLOAD_URL =
  "https://github.com/modemotionstudio-sys/coldnerd_website/releases/latest/download/ColdNerd_Software.zip";

export const openDownloadModal = () => {
  window.dispatchEvent(new Event("open-download-modal"));
};

const triggerWindowsDownload = () => {
  const a = document.createElement("a");
  a.href = DOWNLOAD_URL;
  a.download = "ColdNerd_Software.zip";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// Inline Windows logo (lucide has no Windows icon)
const WindowsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M2 4.5 11 3v8.5H2V4.5Zm0 8h9V21l-9-1.5v-7Zm10-9.7L22 1v10.5H12V2.8Zm0 9.7h10V23l-10-1.5v-9Z" />
  </svg>
);

export function DownloadModal() {
  const [open, setOpen] = useState(false);
  const [macClicked, setMacClicked] = useState(false);

  useEffect(() => {
    const handler = () => {
      setMacClicked(false);
      setOpen(true);
    };
    window.addEventListener("open-download-modal", handler);
    return () => window.removeEventListener("open-download-modal", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleWindows = () => {
    triggerWindowsDownload();
    setTimeout(() => setOpen(false), 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose your platform</h3>
              <p className="text-sm text-gray-600">
                Select the operating system you'd like to download ColdNerd on.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Windows */}
              <button
                onClick={handleWindows}
                className="group flex flex-col items-center justify-center gap-3 p-5 sm:p-6 rounded-xl border-2 border-gray-200 hover:border-[#2a6ff3] hover:bg-blue-50 transition-all"
              >
                <WindowsIcon className="w-10 h-10 text-gray-700 group-hover:text-[#2a6ff3] transition-colors" />
                <div className="text-center">
                  <p className="font-semibold text-gray-900">Windows</p>
                  <p className="text-xs text-gray-500 mt-0.5">Download .zip</p>
                </div>
              </button>

              {/* macOS */}
              <button
                onClick={() => setMacClicked(true)}
                className="group flex flex-col items-center justify-center gap-3 p-5 sm:p-6 rounded-xl border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <Apple className="w-10 h-10 text-gray-700 transition-colors" />
                <div className="text-center">
                  <p className="font-semibold text-gray-900">macOS</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {macClicked ? "Coming soon" : "Apple silicon / Intel"}
                  </p>
                </div>
              </button>
            </div>

            <AnimatePresence>
              {macClicked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-center text-sm text-amber-800">
                    The macOS build is <span className="font-semibold">coming soon</span>. Stay tuned!
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
