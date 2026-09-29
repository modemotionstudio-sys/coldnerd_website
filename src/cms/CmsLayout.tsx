import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { ExternalLink, FileText, LogOut, Plus } from "lucide-react";
import { Toaster } from "sonner";
import { supabase } from "../lib/supabase";

export function CmsLayout({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setEmail(session?.user.email));
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
      isActive ? "bg-[#eef4ff] text-[#2a6ff3]" : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-[#f5f8ff] text-gray-900">
      <Toaster position="bottom-right" richColors closeButton />
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link to="/admin" className="flex items-center gap-3 no-underline shrink-0">
            <img src="/logo.png" alt="ColdNerd" className="h-8 w-auto" />
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-gray-400 border-l border-gray-200 pl-3">
              Content Manager
            </span>
          </Link>

          <nav className="flex items-center gap-1 ml-2">
            <NavLink to="/admin" end className={navClass}>
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Articles</span>
            </NavLink>
            <NavLink to="/admin/new" className={navClass}>
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New article</span>
            </NavLink>
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link
              to="/blog"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2a6ff3] no-underline"
            >
              View blog <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <span className="hidden lg:inline text-sm text-gray-400 max-w-[200px] truncate">{email}</span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
