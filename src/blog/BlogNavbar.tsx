import { Link } from "react-router";
import { LayoutDashboard } from "lucide-react";
import { useIsManager } from "../lib/blog";

const logo = "/logo.png";

export function BlogNavbar({
  backTo = "/",
  backLabel = "Back to Home",
  centerLabel = "Blog",
  centerTo = "/blog",
}: {
  backTo?: string;
  backLabel?: string;
  centerLabel?: string;
  centerTo?: string;
}) {
  const isManager = useIsManager();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between w-[95%] max-w-[1200px] px-4 sm:px-6 lg:px-8 py-3 rounded-full bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/40">
      <Link to="/" className="h-[50px] w-[140px] sm:w-[160px] lg:w-[200px] relative shrink-0 flex items-center">
        <img alt="ColdNerd Logo" className="h-full w-auto object-contain pointer-events-none" src={logo} />
      </Link>

      <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
        <Link to={centerTo} className="font-['Inter:Bold',sans-serif] font-bold text-[#0d0d0d] text-[20px] no-underline">
          {centerLabel}
        </Link>
      </div>

      <div className="flex gap-3 sm:gap-4 items-center shrink-0">
        {isManager && (
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#2a6ff3] text-white text-[13px] sm:text-[14px] font-semibold px-3 sm:px-4 h-9 hover:bg-[#1f5ccf] transition-colors no-underline"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Manage Blog</span>
          </Link>
        )}
        <Link
          to={backTo}
          className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#2a6ff3] text-[14px] sm:text-[15px] leading-[30px] hover:opacity-80 transition-opacity no-underline whitespace-nowrap"
        >
          &larr; <span className="hidden sm:inline">{backLabel}</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </div>
    </nav>
  );
}
