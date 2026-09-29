import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { ShieldAlert } from "lucide-react";
import { supabase } from "../lib/supabase";
import { checkIsManager } from "../lib/blog";

type State = "loading" | "anonymous" | "denied" | "manager";

/** Only CMS managers get through. Everyone else is sent to the CMS login. */
export function ManagerRoute({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState<string | undefined>();
  const location = useLocation();

  useEffect(() => {
    let alive = true;
    const run = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!alive) return;
      if (!session) return setState("anonymous");
      setEmail(session.user.email);
      const ok = await checkIsManager();
      if (alive) setState(ok ? "manager" : "denied");
    };
    run();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") setState("anonymous");
    });
    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2a6ff3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (state === "anonymous") {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (state === "denied") {
    return (
      <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-5">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No CMS access</h1>
          <p className="text-gray-500 mb-8">
            You're signed in as <strong className="text-gray-800">{email}</strong>, but this account isn't a blog manager.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium no-underline hover:bg-gray-50">
              Back to site
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              className="px-5 py-2.5 rounded-xl bg-[#2a6ff3] text-white font-medium hover:bg-[#1f5ccf]"
            >
              Switch account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
