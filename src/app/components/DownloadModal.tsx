import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export const DOWNLOAD_URL =
  "https://github.com/modemotionstudio-sys/coldnerd_website/releases/latest/download/ColdNerd_Setup.exe";

export const openDownloadModal = () => {
  window.dispatchEvent(new Event("open-download-modal"));
};

const triggerWindowsDownload = () => {
  const a = document.createElement("a");
  a.href = DOWNLOAD_URL;
  a.download = "ColdNerd_Setup.exe";
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

// Inline Apple logo
const AppleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.365 1.43c0 1.14-.46 2.235-1.21 3.04-.81.87-2.13 1.55-3.22 1.46-.13-1.12.43-2.29 1.16-3.06.82-.86 2.22-1.5 3.27-1.44ZM20.5 17.27c-.55 1.27-.81 1.83-1.51 2.95-.98 1.56-2.36 3.51-4.07 3.52-1.52.02-1.91-.99-3.97-.97-2.06.02-2.49 1-4.01.98-1.71-.02-3.02-1.78-4-3.34C.93 15.94.7 11.86 2.4 9.36c1.21-1.79 3.12-2.84 4.92-2.84 1.83 0 2.98.99 4.49.99 1.46 0 2.36-.99 4.48-.99 1.61 0 3.32.88 4.54 2.4-3.99 2.18-3.34 7.85.67 8.35Z" />
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
                  <p className="text-xs text-gray-500 mt-0.5">Download installer (.exe)</p>
                </div>
              </button>

              {/* macOS */}
              <button
                onClick={() => setMacClicked(true)}
                className="group flex flex-col items-center justify-center gap-3 p-5 sm:p-6 rounded-xl border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <AppleLogo className="w-10 h-10 text-gray-700 transition-colors" />
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
