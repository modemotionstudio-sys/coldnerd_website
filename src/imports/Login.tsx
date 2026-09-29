import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { supabase } from "../lib/supabase";
import { checkIsManager } from "../lib/blog";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
const imgWhatsAppImage20260226At124548AmRemovebgPreview1 = "/logo.png";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.session) {
        // Blog managers land straight in the Content Manager.
        navigate((await checkIsManager()) ? "/admin" : "/");
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Failed to log in with Google");
    }
  };

  const handleAppleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "apple" });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Failed to log in with Apple");
    }
  };

  return (
    <div className="min-h-screen bg-white flex" data-name="Login">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12">
        {/* Logo */}
        <div className="mb-10">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="h-[45px] w-[160px] relative shrink-0 flex items-center">
              <img
                alt="ColdNerd Logo"
                className="h-full w-auto object-contain pointer-events-none"
                src={imgWhatsAppImage20260226At124548AmRemovebgPreview1}
              />
            </div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[440px] w-full"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Login</h1>
          <p className="text-gray-500 mb-8">Please login to continue to your account.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex: example@domain.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2a6ff3] focus:ring-1 focus:ring-[#2a6ff3] transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2a6ff3] focus:ring-1 focus:ring-[#2a6ff3] transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Keep me logged in / Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setKeepLoggedIn(!keepLoggedIn)}
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                    keepLoggedIn ? "bg-[#2a6ff3]" : "border-2 border-gray-300"
                  }`}
                >
                  {keepLoggedIn && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-gray-600">Keep me logged in</span>
              </div>
              <a href="#" className="text-sm text-[#2a6ff3] hover:underline font-medium no-underline">
                Forgot password?
              </a>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm"
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 bg-[#2a6ff3] hover:bg-[#1f5ccf] text-white font-semibold rounded-xl transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? "Signing in..." : "Sign in"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Button */}
          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </motion.button>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Need an account?{" "}
            <Link to="/signup" className="text-[#2a6ff3] font-semibold hover:underline no-underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Column - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-4 bg-[#2a6ff3] rounded-3xl flex flex-col items-center justify-center px-16">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 1000">
              <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" />
              <circle cx="700" cy="200" r="120" stroke="white" strokeWidth="2" />
              <circle cx="400" cy="500" r="200" stroke="white" strokeWidth="2" />
              <circle cx="200" cy="800" r="100" stroke="white" strokeWidth="2" />
              <circle cx="600" cy="700" r="150" stroke="white" strokeWidth="2" />
              <path d="M50 300 Q400 100 750 500 T750 900" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M100 600 Q350 400 600 700 T800 400" stroke="white" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 text-center text-white"
          >
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Effortlessly manage your team and operations.
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-md mx-auto">
              "What's needed is a sound intellectual framework for making decisions, and the ability to keep emotions from corroding that framework."
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
