import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, Lock, Mail, PenSquare } from "lucide-react";
import { supabase } from "../lib/supabase";
import { checkIsManager } from "../lib/blog";
import { setPageMeta } from "../lib/seo";

export default function CmsLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || "/admin";

  // Already signed in as a manager? Skip the form.
  useEffect(() => {
    setPageMeta({ title: "CMS Login - ColdNerd", noindex: true });
    checkIsManager().then((ok) => ok && navigate(from, { replace: true }));
  }, [from, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      if (!(await checkIsManager())) {
        await supabase.auth.signOut();
        throw new Error("This account doesn't have access to the Content Manager.");
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px]"
      >
        <Link to="/" className="flex justify-center mb-8">
          <img src="/logo.png" alt="ColdNerd" className="h-11 w-auto" />
        </Link>

        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(42,111,243,0.12)] border border-gray-100 p-8 sm:p-10">
          <div className="w-12 h-12 rounded-2xl bg-[#eef4ff] text-[#2a6ff3] flex items-center justify-center mb-5">
            <PenSquare className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Content Manager</h1>
          <p className="text-gray-500 mb-8">Sign in with your manager account to edit the blog.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2a6ff3] focus:ring-1 focus:ring-[#2a6ff3] text-sm"
                  placeholder="manager@coldnerd.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2a6ff3] focus:ring-1 focus:ring-[#2a6ff3] text-sm"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#2a6ff3] hover:bg-[#1f5ccf] text-white font-semibold rounded-xl transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? "Signing in…" : "Sign in to CMS"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          <Link to="/" className="hover:text-[#2a6ff3] no-underline">&larr; Back to coldnerd website</Link>
        </p>
      </motion.div>
    </div>
  );
}
