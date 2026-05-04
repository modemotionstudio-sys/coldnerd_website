import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";
import { SHOW_FREE_TRIAL_PRICING_CARD } from "../lib/pricingVisibility";
import type { User } from "@supabase/supabase-js";

const imgLogo = "/logo.png";

const plans = [
  {
    name: "Free Trial",
    description: "Try ColdNerd risk-free for 14 days. No credit card required.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    yearlyTotal: 0,
    checkoutUrl: "",
    freeTrial: true,
    features: [
      "1 Instagram account",
      "500 DMs total",
      "14-day free trial",
      "Auto warmup",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Starter",
    description: "Perfect for solo creators getting started with safe Instagram outreach.",
    monthlyPrice: 27,
    yearlyPrice: 22,
    yearlyTotal: 259,
    checkoutUrl: "https://whop.com/coldnerd/cold-nerd-3c/",
    features: [
      "Up to 3 Instagram accounts",
      "3,000 DMs per month",
      "Smart DM automation",
      "Auto warmup",
      "Basic analytics",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Growth",
    description: "Scale your outreach with multi-account automation and unlimited DMs.",
    monthlyPrice: 97,
    yearlyPrice: 78,
    yearlyTotal: 931,
    checkoutUrl: "https://whop.com/coldnerd/coldnerd-growth",
    features: [
      "Up to 15 Instagram accounts",
      "Unlimited DMs",
      "Auto warmup",
      "Advanced analytics",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Agency Pro",
    description: "For agencies. Land clients, not just DMs \u2014 unlimited everything.",
    monthlyPrice: 197,
    yearlyPrice: 158,
    yearlyTotal: 1891,
    checkoutUrl: "https://whop.com/coldnerd/coldnerd-agency-pro",
    features: [
      "Unlimited Instagram accounts",
      "Unlimited DMs",
      "Humanized voice notes",
      "Auto warmup",
      "Admin controls & team seats",
      "Dedicated support",
    ],
    popular: false,
  },
];

function PricingCard({ plan, isYearly, isActive, onActivate, onBuyNow }: { plan: typeof plans[0]; isYearly: boolean; isActive: boolean; onActivate: () => void; onBuyNow: () => void }) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const active = isActive;
  const isFree = plan.freeTrial;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={onActivate}
      onClick={onActivate}
      className={`relative rounded-3xl p-6 sm:p-8 h-full cursor-pointer transition-all duration-500 ease-out ${
        active
          ? "bg-[#2a6ff3] border-2 border-[#2a6ff3] shadow-xl shadow-blue-200"
          : plan.popular
            ? "bg-white border-2 border-[#2a6ff3] shadow-xl shadow-blue-100"
            : "bg-white border border-gray-200 hover:border-blue-200 hover:shadow-lg"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors duration-500 ${
            active ? "bg-white text-[#2a6ff3]" : "bg-[#2a6ff3] text-white"
          }`}>
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className={`text-xl font-semibold mb-2 transition-colors duration-500 ${active ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
        <p className={`text-sm leading-relaxed transition-colors duration-500 ${active ? "text-white/80" : "text-gray-500"}`}>{plan.description}</p>
      </div>

      <div className="text-center mb-8">
        {isFree ? (
          <div className="flex items-baseline justify-center gap-1">
            <span className={`text-4xl font-bold transition-colors duration-500 ${active ? "text-white" : "text-gray-900"}`}>Free</span>
            <span className={`transition-colors duration-500 ${active ? "text-white/70" : "text-gray-500"}`}>/14 days</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={isYearly ? "yearly" : "monthly"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-baseline justify-center gap-1"
            >
              <span className={`text-4xl font-bold transition-colors duration-500 ${active ? "text-white" : "text-gray-900"}`}>${price}</span>
              <span className={`transition-colors duration-500 ${active ? "text-white/70" : "text-gray-500"}`}>/month</span>
            </motion.div>
          </AnimatePresence>
        )}
        {!isFree && isYearly && <p className={`text-sm mt-1 transition-colors duration-500 ${active ? "text-green-200" : "text-green-600"}`}>${plan.yearlyTotal} billed yearly &middot; Save 20%</p>}
        {isFree && <p className={`text-sm mt-1 transition-colors duration-500 ${active ? "text-white/70" : "text-gray-500"}`}>No credit card required</p>}
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-500 ${active ? "bg-white/20" : "bg-blue-50"}`}>
              <Check className={`w-3 h-3 transition-colors duration-500 ${active ? "text-white" : "text-[#2a6ff3]"}`} />
            </div>
            <span className={`text-sm transition-colors duration-500 ${active ? "text-white/90" : "text-gray-600"}`}>{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={(e) => { e.stopPropagation(); onBuyNow(); }}
        className={`w-full rounded-full py-3.5 font-semibold transition-colors duration-500 ${
          active
            ? "bg-white text-[#2a6ff3] hover:bg-gray-100"
            : plan.popular
              ? "bg-[#2a6ff3] hover:bg-[#1f5ccf] text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-900"
        }`}
      >
        {isFree ? "Start Free Trial \u2192" : "Buy Now \u2192"}
      </motion.button>
    </motion.div>
  );
}

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const visiblePlans = SHOW_FREE_TRIAL_PRICING_CARD ? plans : plans.filter((p) => !p.freeTrial);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleBuyNow = (plan: typeof plans[0]) => {
    if (plan.freeTrial) {
      navigate("/signup");
      return;
    }
    window.open(plan.checkoutUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2a6ff3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between w-[95%] max-w-[1200px] px-4 sm:px-6 lg:px-8 py-3 rounded-full bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/40">
        <Link to="/" className="h-[50px] w-[160px] lg:w-[200px] relative shrink-0 flex items-center no-underline">
          <img alt="ColdNerd Logo" className="h-full w-auto object-contain pointer-events-none" src={imgLogo} />
        </Link>
        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          <span className="font-['Inter:Bold',sans-serif] font-bold text-[#0d0d0d] text-[20px]">Pricing</span>
        </div>
        <div className="flex gap-[8px] items-center shrink-0">
          <Link to="/" className="flex items-center gap-1 font-semibold text-[#2a6ff3] text-[15px] hover:opacity-80 transition-opacity no-underline">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Pricing Section */}
      <section className="pt-32 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#2a6ff3] text-sm font-medium mb-4">
              Pricing &amp; Plans
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Find the Perfect Plan for You or Your Team
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Start for free and unlock more features as you grow
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <span className={`text-sm font-medium transition-colors ${!isYearly ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isYearly ? "bg-[#2a6ff3]" : "bg-gray-300"}`}
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isYearly ? "text-gray-900" : "text-gray-400"}`}>Annual</span>
            {isYearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full"
              >
                Save 20%
              </motion.span>
            )}
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-6 items-stretch ${SHOW_FREE_TRIAL_PRICING_CARD ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
          >
            {visiblePlans.map((plan, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              >
                <PricingCard plan={plan} isYearly={isYearly} isActive={activeCard === i} onActivate={() => setActiveCard(i)} onBuyNow={() => handleBuyNow(plan)} />
              </motion.div>
            ))}
          </motion.div>

          {/* Terms & Conditions Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 text-sm mb-3">By purchasing, you agree to our</p>
            <Link
              to="/terms-and-conditions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-[#2a6ff3] font-medium text-sm hover:bg-blue-50 hover:border-blue-200 transition-all no-underline"
            >
              Terms and Conditions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
