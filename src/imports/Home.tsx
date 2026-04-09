import svgPaths from "./svg-yjlo5u9hqz";
import { Link, useNavigate } from "react-router";
import ScrollReveal, { StaggerContainer, StaggerItem } from "../app/components/ScrollReveal";
import FigmaScale from "../app/components/FigmaScale";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";
import backgroundImg from "../assets/background.png";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { PricingSection } from "./sections/PricingSection";
import { CampaignSection } from "./sections/CampaignSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { VerticalTimelineSection } from "./sections/VerticalTimelineSection";
import { FAQSection } from "./sections/FAQSection";
import { BlogSection } from "./sections/BlogSection";
import { FooterSection } from "./sections/FooterSection";
import imgFrame10000056551 from "figma:asset/bb834f03157fd23888b46fc97bf375d1f17e227d.png";
import imgDashboard1 from "figma:asset/92e21f3370ec8756b689948218a7dd293b611573.png";
import imgMetricItem1 from "figma:asset/69ae9a7aff4b31a3755fc57599c1994537159505.png";
import imgGroup24631 from "figma:asset/87700768d3203d3673956e074582825deecaf911.png";
const imgWhatsAppImage20260226At124548AmRemovebgPreview1 = "/logo.png";
import imgPicture from "figma:asset/bd9689c999bf51911b8fb96771c3462efa79a4c7.png";
import imgLaptopScreenWithAnalyticsDashboardStockTradingAndOnlineInvesting from "figma:asset/e7d4fbc9c4b7c8d74664b1d1d637a250ae4387d1.png";
import imgEmailMarketingAndNewsletterWithNewMessage from "figma:asset/2d8b0fb23aaee37163996871e6bcd074ba03a3eb.png";
import imgArtificialIntelligenceAnalyticsOnTabletScreen from "figma:asset/30b623da5eef2ba67e8725d71d87477832d7d554.png";
import imgSolvingAMentalHealthProblem from "figma:asset/5942f52e948b0579ac4d8c4cfbba7e568d25bb13.png";
import imgTabletDashboardWithChartsAndGraphsBusinessPerformanceMonitoring from "figma:asset/43c7ef25ada01accbeea0b43d5f16fbd98bac2d3.png";
import imgSearchingTheWebOnTablet from "figma:asset/139054c763e9f1e1246489dc92787873a1fb9c01.png";
import imgSearchingForFileInBlueFolder from "figma:asset/6157d747a19caf2a5b8fc1e9b11f2154af034fa6.png";
import { imgBase } from "./svg-kqpw6";

function Group1() {
  return (
    <div className="absolute inset-[52.12%_43.24%_35.25%_43.63%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73.1517 52.1662">
        <g id="Group">
          <path d={svgPaths.pdc4000} fill="var(--fill-0, #F5F8FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[412.954px] relative w-[557.072px]">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="h-[34.483px] relative w-[49.976px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.9756 34.4835">
        <g id="Group">
          <g id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents h-[685.325px] right-[-463.62px] top-[799px] w-[887.615px]" data-name="Group">
      <div className="absolute flex h-[595.761px] items-center justify-center right-[-249.2px] top-[799px] w-[673.196px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[22.67deg]">
          <Frame1 />
        </div>
      </div>
      <div className="absolute flex h-[51.077px] items-center justify-center right-[-355.9px] top-[1341.89px] w-[59.409px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[22.67deg] skew-x-[-0.01deg]">
          <Group2 />
        </div>
      </div>
    </div>
  );
}

function NavLink({ label, target, active }: { label: string; target: string; active?: boolean }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <button
      onClick={handleClick}
      className={`font-['Inter:${active ? "Bold" : "Regular"}',sans-serif] ${active ? "font-bold text-[#2a6ff3]" : "font-normal text-[#474747]"} text-[16px] lg:text-[18px] leading-[36px] whitespace-nowrap hover:text-[#2a6ff3] transition-colors cursor-pointer bg-transparent border-none`}
    >
      {label}
    </button>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between w-[95%] max-w-[1200px] px-4 sm:px-6 lg:px-8 py-3 rounded-full transition-all duration-500 ease-out ${
        scrolled || mobileOpen
          ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/40"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="h-[50px] w-[160px] lg:w-[200px] relative shrink-0 cursor-pointer bg-transparent border-none p-0 flex items-center">
        <img
          alt="ColdNerd Logo"
          className="h-full w-auto object-contain pointer-events-none"
          src={imgWhatsAppImage20260226At124548AmRemovebgPreview1}
        />
      </button>

      {/* Center nav links – desktop */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
        <NavLink label="Features" target="features" active />
        <NavLink label="Pricing" target="pricing" />
        <NavLink label="Contact" target="contact" />
        <Link
          to="/blog"
          className="font-['Inter:Regular',sans-serif] font-normal text-[#474747] text-[16px] lg:text-[18px] leading-[36px] whitespace-nowrap hover:text-[#2a6ff3] transition-colors no-underline"
        >
          Blog
        </Link>
      </div>

      {/* Right – auth buttons (desktop) */}
      <div className="hidden md:flex gap-[8px] items-center shrink-0">
        {user ? (
          <div className="relative group">
            <button
              className="w-10 h-10 rounded-full bg-[#2a6ff3] flex items-center justify-center text-white font-bold text-sm hover:bg-[#1f5ccf] transition-colors overflow-hidden"
              title={user.email || "Account"}
            >
              {(user.user_metadata?.avatar_url || user.user_metadata?.picture) ? (
                <img src={user.user_metadata.avatar_url || user.user_metadata.picture} alt="" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
              ) : (
                (user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()
              )}
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">{user.user_metadata?.full_name || "User"}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 no-underline transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  setUser(null);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link
              to="/signup"
              className="relative flex items-center justify-center rounded-full px-5 h-[40px] hover:opacity-80 transition-opacity no-underline"
            >
              <span className="absolute inset-0 border border-[#2a6ff3] rounded-full pointer-events-none" />
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#2a6ff3] text-[14px] lg:text-[15px] leading-[30px] whitespace-nowrap">
                Sign Up
              </span>
            </Link>
            <Link
              to="/login"
              className="bg-[#2a6ff3] flex items-center justify-center rounded-full px-5 h-[40px] hover:bg-[#1f5ccf] transition-colors no-underline"
            >
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-[14px] lg:text-[15px] leading-[30px] whitespace-nowrap">
                Login
              </span>
            </Link>
          </>
        )}
      </div>

      {/* Mobile menu button */}
      <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex flex-col gap-1.5 p-2 relative z-10" aria-label="Menu">
        <span className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
        <span className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
      </button>
    </nav>

    {/* Mobile dropdown menu */}
    {mobileOpen && (
      <div className="fixed top-[80px] left-1/2 -translate-x-1/2 z-[99] w-[90%] max-w-[400px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-6 flex flex-col gap-4">
        <button onClick={() => { document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }); closeMobile(); }} className="text-left text-gray-700 hover:text-[#2a6ff3] font-medium py-2 transition-colors">Features</button>
        <button onClick={() => { document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); closeMobile(); }} className="text-left text-gray-700 hover:text-[#2a6ff3] font-medium py-2 transition-colors">Pricing</button>
        <button onClick={() => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); closeMobile(); }} className="text-left text-gray-700 hover:text-[#2a6ff3] font-medium py-2 transition-colors">Contact</button>
        <Link to="/blog" onClick={closeMobile} className="text-gray-700 hover:text-[#2a6ff3] font-medium py-2 transition-colors no-underline">Blog</Link>
        <hr className="border-gray-200" />
        {user ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 py-2">
              <div className="w-9 h-9 rounded-full bg-[#2a6ff3] flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                {(user.user_metadata?.avatar_url || user.user_metadata?.picture) ? (
                  <img src={user.user_metadata.avatar_url || user.user_metadata.picture} alt="" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  (user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.user_metadata?.full_name || "User"}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <Link to="/dashboard" onClick={closeMobile} className="text-center py-2.5 rounded-full bg-[#2a6ff3] text-white font-semibold text-sm no-underline hover:bg-[#1f5ccf] transition-colors">Dashboard</Link>
            <button
              onClick={async () => { await supabase.auth.signOut(); setUser(null); closeMobile(); }}
              className="py-2.5 rounded-full border border-red-300 text-red-600 font-semibold text-sm hover:bg-red-50 transition-colors"
            >Log Out</button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/signup" onClick={closeMobile} className="flex-1 text-center py-2.5 rounded-full border border-[#2a6ff3] text-[#2a6ff3] font-semibold text-sm no-underline hover:bg-blue-50 transition-colors">Sign Up</Link>
            <Link to="/login" onClick={closeMobile} className="flex-1 text-center py-2.5 rounded-full bg-[#2a6ff3] text-white font-semibold text-sm no-underline hover:bg-[#1f5ccf] transition-colors">Login</Link>
          </div>
        )}
      </div>
    )}
    </>
  );
}

function Base1() {
  return (
    <div className="absolute h-[2037px] left-[330px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-330px_569px] mask-size-[1440px_780px] top-[-569px] w-[1800px]" data-name="Base" style={{ maskImage: `url('${imgBase}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1800 2037">
        <g id="Base">
          <path clipRule="evenodd" d={svgPaths.p3756dd00} fill="url(#paint0_linear_1_4254)" fillRule="evenodd" id="Oval" opacity="0.15" />
          <path clipRule="evenodd" d={svgPaths.p6ae0300} fill="url(#paint1_linear_1_4254)" fillRule="evenodd" id="Oval_2" opacity="0.15" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_4254" x1="1800" x2="617.162" y1="852.581" y2="852.581">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_4254" x1="786" x2="2.09531" y1="1.04765" y2="1.04765">
            <stop stopColor="white" stopOpacity="0.01" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Base() {
  return (
    <div className="absolute inset-0" data-name="Base">
      <Base1 />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white" />
    </div>
  );
}

function LetterReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  let charIndex = 0;
  return (
    <span className={className}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} style={{ whiteSpace: "nowrap" }}>
          {word.split("").map((char) => {
            const idx = charIndex++;
            return (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.35,
                  delay: delay + idx * 0.035,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
          {wi < text.split(" ").length - 1 && (
            <span className="inline-block">{"\u00A0"}</span>
          )}
          {(() => { charIndex++; return null; })()}
        </span>
      ))}
    </span>
  );
}

function Frame17() {
  const line1 = "Scale Your Instagram";
  const line2 = "Without the Manual Work";
  const subtitle = "Streamline outreach, automate engagement, and grow safely with smart timing and built-in safety controls.";

  return (
    <div className="flex flex-col gap-5 lg:gap-6 items-start relative shrink-0 text-[#0d0d0d] w-full">
      <div className="font-['Inter',sans-serif] font-bold leading-[1.15] relative shrink-0 text-[32px] sm:text-[38px] lg:text-[44px] xl:text-[50px] 2xl:text-[56px] text-left">
        <div>
          <LetterReveal text={line1} delay={0.2} />
        </div>
        <div className="mt-1">
          <LetterReveal text={line2} delay={0.2 + line1.length * 0.035 + 0.1} />
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 + (line1.length + line2.length) * 0.035 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-['Inter',sans-serif] font-normal text-gray-600 leading-[1.7] relative shrink-0 text-[15px] sm:text-[17px] lg:text-[19px] max-w-[520px] text-left"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[56px] items-center pl-[24px] pr-[16px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[30px]" dir="auto">
          Start Automating
        </p>
      </div>
      <div className="relative shrink-0 size-[24px]" data-name="icon-arrow-right">
        <div className="absolute inset-[17.7%_9.38%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.4993 15.502">
            <path d={svgPaths.p146cf6a0} fill="var(--fill-0, white)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonContainer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.2, ease: "easeOut" }}
      className="content-stretch flex flex-col h-[50px] items-center pb-[6px] relative shrink-0 w-[224px]"
      data-name="Button Container"
    >
      <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#2a6ff3] content-stretch flex h-[44px] items-center justify-center relative rounded-[8px] shrink-0 w-[217px] hover:bg-[#1f5ccf] transition-colors cursor-pointer" data-name="Button">
        <Container2 />
      </button>
    </motion.div>
  );
}

function Frame18() {
  return (
    <div className="relative flex flex-col gap-6 lg:gap-[49px] items-start w-full max-w-[591px]">
      <Frame17 />
      <ButtonContainer />
    </div>
  );
}

function Left() {
  return (
    <div className="relative z-10 px-6 pb-10 sm:pb-14 lg:absolute lg:left-[3%] xl:left-[4%] 2xl:left-[5%] lg:top-[50%] lg:-translate-y-1/2 lg:px-0 lg:pb-0" data-name="Left">
      <Frame18 />
    </div>
  );
}

function BgShape() {
  return (
    <div className="absolute inset-0" data-name="bg shape">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 638 638">
        <g id="bg shape">
          <circle cx="319" cy="319" fill="var(--fill-0, #2A6FF3)" id="bg" r="319" />
          <g id="Mask Group">
            <mask height="638" id="mask0_1_4355" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="638" x="0" y="0">
              <circle cx="319" cy="319" fill="var(--fill-0, #FFC947)" id="bg_2" r="319" />
            </mask>
            <g mask="url(#mask0_1_4355)">
              <g id="Shapes" opacity="0.2">
                <circle cx="270.5" cy="310.5" id="Shape" r="377.5" stroke="var(--stroke-0, white)" strokeWidth="4" />
                <path d={svgPaths.p58bd700} id="Shape_2" stroke="var(--stroke-0, white)" strokeWidth="4" />
                <path d={svgPaths.p32528800} id="Shape_3" stroke="var(--stroke-0, white)" strokeWidth="4" />
                <circle cx="270.501" cy="311.225" id="Shape_4" r="226.715" stroke="var(--stroke-0, white)" strokeWidth="4" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function HeroImages() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full flex justify-end lg:flex-none lg:absolute lg:right-[-8%] xl:right-[-5%] 2xl:right-[-2%] lg:top-[55%] lg:-translate-y-1/2 -mr-4 sm:-mr-2 lg:mr-0 mt-14 sm:mt-16 lg:mt-0"
    >
      <div className="relative w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] lg:w-[540px] lg:h-[540px] xl:w-[580px] xl:h-[580px] 2xl:w-[640px] 2xl:h-[640px]">
        {/* Blue circle - CSS fallback for mobile */}
        <div className="absolute inset-0 rounded-full bg-[#2A6FF3] lg:hidden" />
        {/* Blue circle - SVG for desktop */}
        <div className="hidden lg:block">
          <BgShape />
        </div>

        {/* Dashboard (main large image) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          className="absolute left-[38%] top-[2%] w-[70%] h-[80%] cursor-pointer z-10"
          style={{ rotate: "-30.49deg" }}
        >
          <div className="relative w-full h-full rounded-[10px] overflow-hidden">
            <img alt="" className="absolute h-full left-[-24%] max-w-none top-0 w-[124%] pointer-events-none" src={imgDashboard1} />
          </div>
        </motion.div>

        {/* Small frame card (top) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
          className="absolute left-[18%] top-[-10%] w-[35%] h-[23%] cursor-pointer z-20"
          style={{ rotate: "-29.08deg" }}
        >
          <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[10px] size-full pointer-events-none" src={imgFrame10000056551} />
        </motion.div>

        {/* Metric item (left side) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
          className="absolute left-[-5%] top-[20%] w-[25%] h-[21%] cursor-pointer z-20"
          style={{ rotate: "-29.9deg" }}
        >
          <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[10px] size-full pointer-events-none" src={imgMetricItem1} />
        </motion.div>

        {/* Group 2463 (bottom left) */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.06, transition: { duration: 0.3 } }}
          className="absolute left-[-1%] top-[50%] w-[40%] h-[42%] cursor-pointer z-10"
          style={{ rotate: "-30.05deg" }}
        >
          <img alt="" className="absolute inset-0 max-w-none object-cover size-full pointer-events-none" src={imgGroup24631} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function Frame4() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex flex-col lg:block overflow-visible pt-24 lg:pt-0">
      <Base />
      <Left />
      <HeroImages />
    </div>
  );
}

function Hero() {
  return (
    <div className="relative w-full overflow-x-clip overflow-y-visible" data-name="Hero">
      <Frame4 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      {/* Navbar is now a fixed component rendered at root level */}
      {/* Hero */}
      <Hero />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[45.66%_35.85%_29.09%_37.77%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 146.946 104.263">
        <g id="Group">
          <path d={svgPaths.p17e64080} fill="var(--fill-0, #F5F8FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[37.17%_27.15%_22.36%_30.61%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 235.297 167.136">
        <g id="Group">
          <path d={svgPaths.p30da9700} fill="var(--fill-0, #F5F8FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[31.82%_22.46%_18.72%_26.05%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 286.829 204.273">
        <g id="Group">
          <path d={svgPaths.p53a6a00} fill="var(--fill-0, #F5F8FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[18.02%_11.92%_10.45%_14.76%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 408.456 295.418">
        <g id="Group">
          <path d={svgPaths.p2cb74480} fill="var(--fill-0, #F5F8FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[9.6%_6.12%_5.69%_7.81%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 479.462 349.784">
        <g id="Group">
          <path d={svgPaths.p30f65a80} fill="var(--fill-0, #F5F8FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[52.12%_43.24%_35.25%_43.63%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73.1517 52.1662">
        <g id="Group">
          <path d={svgPaths.pdc4000} fill="var(--fill-0, #F5F8FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[412.954px] relative w-[557.072px]">
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 557.072 412.954">
        <g id="Group">
          <path d={svgPaths.p29f06780} fill="var(--fill-0, #F5F8FF)" id="Vector" />
        </g>
      </svg>
      <Group8 />
      <Group9 />
    </div>
  );
}

function Group10() {
  return (
    <div className="h-[34.483px] relative w-[49.976px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.9756 34.4835">
        <g id="Group">
          <g id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents h-[685.325px] right-[calc(58.33%-9.62px)] top-[1262px] w-[887.615px]" data-name="Group">
      <div className="absolute flex h-[595.761px] items-center justify-center right-[calc(75%-35.2px)] top-[1262px] w-[673.196px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "147" } as React.CSSProperties}>
        <div className="flex-none rotate-[22.67deg]">
          <Frame2 />
        </div>
      </div>
      <div className="absolute flex h-[51.077px] items-center justify-center right-[calc(66.67%-21.9px)] top-[1804.89px] w-[59.409px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[22.67deg] skew-x-[-0.01deg]">
          <Group10 />
        </div>
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <ScrollReveal variant="fadeUp" className="flex flex-col gap-[24px] items-center not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-tight lg:leading-[78px] relative shrink-0 text-[#0d0d0d] text-3xl sm:text-4xl lg:text-[48px]">Main Features</p>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] w-full relative shrink-0 text-[#5e5e5e] text-base lg:text-[20px] text-center">
        <p className="leading-relaxed lg:leading-[36px]">Powerful Automation Features Designed for Safe and Scalable Instagram Growth</p>
      </div>
    </ScrollReveal>
  );
}

function Frame14() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[457px] p-[10px] top-[47px] w-[415px]">
      <div className="bg-white h-[394px] relative rounded-[16px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.2)] shrink-0 w-full" data-name="Feature">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col gap-[16px] items-center justify-center p-[32px] size-full" />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[875px] p-[10px] top-[47px] w-[415px]">
      <div className="bg-white h-[394px] relative rounded-[16px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.2)] shrink-0 w-full" data-name="Feature">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col gap-[16px] items-center justify-center p-[32px] size-full" />
        </div>
      </div>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute bottom-[46.26%] contents right-[565px] top-[18.69%]" data-name="Group">
      <div className="absolute bottom-[46.26%] right-[565px] top-[18.69%] w-[150px]" data-name="Vector">
        <div className="absolute inset-[-2.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 158 158">
            <path d={svgPaths.p11bad80} id="Vector" stroke="var(--stroke-0, #2A6FF3)" strokeWidth="8" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[48.82%] right-[575.94px] top-[21.25%] w-[128.125px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128.125 128.125">
          <path d={svgPaths.pd53fb80} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute bottom-[52.03%] contents right-[584.76px] top-[26.5%]" data-name="Group">
      <div className="absolute bottom-[59.46%] right-[584.76px] top-[33.64%] w-[28.202px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.2019 29.5325">
          <path d={svgPaths.p311f05c0} fill="var(--fill-0, #382B73)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[58.94%] right-[664.87px] top-[33.42%] w-[23.365px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.365 32.7194">
          <path d={svgPaths.p2c46da00} fill="var(--fill-0, #382B73)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[57.77%] right-[618.63px] top-[32.25%] w-[42.732px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42.7325 42.7325">
          <path d={svgPaths.p2ccb9f80} fill="var(--fill-0, #382B73)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[67.57%] right-[600.65px] top-[26.5%] w-[74.012px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74.0118 25.3798">
          <path d={svgPaths.p3549c100} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[52.03%] right-[600.65px] top-[42.04%] w-[74.012px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74.012 25.3774">
          <path d={svgPaths.p344f8600} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute bottom-[60.48%] contents right-[584.76px] top-[32.62%]" data-name="Group">
      <div className="absolute bottom-[64.34%] right-[584.76px] top-[32.62%] w-[28.202px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.2019 13.0006">
          <path d={svgPaths.pf0c300} fill="var(--fill-0, #009ADD)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[63.96%] right-[584.76px] top-[33.01%] w-[28.202px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.2019 13.0006">
          <path d={svgPaths.p250abc00} fill="var(--fill-0, #136DA0)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[60.48%] right-[584.76px] top-[34.43%] w-[28.202px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.2019 21.7663">
          <path d={svgPaths.p22234700} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[64.71%] right-[584.76px] top-[34.43%] w-[28.202px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.2025 3.65312">
          <path d={svgPaths.p22597580} fill="var(--fill-0, #009ADD)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute bottom-[59.96%] contents right-[664.87px] top-[36.31%]" data-name="Group">
      <div className="absolute bottom-[59.96%] right-[664.87px] top-[36.99%] w-[23.368px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3675 13.0594">
          <path d={svgPaths.p189fdb00} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[59.96%] right-[664.87px] top-[37.3%] w-[3.424px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.42375 11.7256">
          <path d={svgPaths.p39708e0} fill="var(--fill-0, #009ADD)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[60.33%] right-[672.32px] top-[36.75%] w-[8.474px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.47438 12.5119">
          <path d={svgPaths.p1c60780} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[61.84%] right-[676.56px] top-[36.75%] w-[4.238px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.2375 6.02344">
          <path d={svgPaths.pa3b8a7a} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[61.84%] right-[672.32px] top-[36.75%] w-[4.237px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.2375 6.02344">
          <path d={svgPaths.pac5a40} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[62.33%] right-[674.67px] top-[36.31%] w-[3.766px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.76625 5.80812">
          <path d={svgPaths.p21305800} fill="var(--fill-0, #E6E7E8)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[61.65%] right-[674.98px] top-[37.67%] w-[3.152px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.1525 2.91703">
          <path d={svgPaths.p51d300} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[60.33%] right-[675.4px] top-[38.22%] w-[2.307px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.30687 6.215">
          <path d={svgPaths.p38189000} fill="var(--fill-0, #009ADD)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[60.33%] right-[676.56px] top-[36.99%] w-[6.144px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.14392 11.4888">
          <path d={svgPaths.pad17f00} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[60.33%] right-[670.41px] top-[36.99%] w-[6.144px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.14391 11.4888">
          <path d={svgPaths.p3838f400} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[60.33%] right-[669.24px] top-[39.49%] w-[4.634px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.63375 0.79875">
          <path d={svgPaths.p329ff030} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[59.96%] right-[684.82px] top-[37.3%] w-[3.424px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.42375 11.7256">
          <path d={svgPaths.p2dc48600} fill="var(--fill-0, #009ADD)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute bottom-[65.01%] contents right-[672.79px] top-[34.65%]" data-name="Group">
      <div className="absolute bottom-[65.01%] right-[678.36px] top-[34.65%] w-[1.438px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.43812 1.4375">
          <path d={svgPaths.p2987e000} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[65.01%] right-[672.79px] top-[34.65%] w-[1.438px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.4375 1.4375">
          <path d={svgPaths.p39c46480} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute bottom-[64.73%] contents right-[669.52px] top-[34.76%]" data-name="Group">
      <div className="absolute bottom-[64.73%] right-[682.38px] top-[34.76%] w-[1.211px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.21125 2.1975">
          <path d={svgPaths.p29cef280} fill="var(--fill-0, #E6E7E8)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[64.73%] right-[669.52px] top-[34.76%] w-[1.211px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.21062 2.1975">
          <path d={svgPaths.p1563e880} fill="var(--fill-0, #E6E7E8)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute bottom-[63.19%] contents right-[665.48px] top-[31.63%]" data-name="Group">
      <div className="absolute bottom-[63.19%] flex items-center justify-center right-[665.48px] top-[31.63%] w-[22.152px]">
        <div className="-rotate-45 flex-none size-[15.664px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6637 15.6638">
              <path d={svgPaths.p32a4d880} fill="var(--fill-0, #009ADD)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[63.61%] right-[670.62px] top-[32.89%] w-[11.869px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8694 14.95">
          <path d={svgPaths.p17547500} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[63.35%] right-[674.67px] top-[36.31%] w-[3.766px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.76625 1.44125">
          <path d={svgPaths.p3b372700} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[64.54%] right-[682.17px] top-[34.57%] w-[2.237px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23688 3.82312">
          <path d={svgPaths.p104dcc40} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[64.54%] right-[668.71px] top-[34.57%] w-[2.237px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23688 3.82312">
          <path d={svgPaths.p285f5fa0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[63.61%] right-[670.62px] top-[34.8%] w-[11.869px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8694 6.78688">
          <path d={svgPaths.p5a12880} fill="var(--fill-0, #E6E7E8)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[65.45%] right-[678.6px] top-[32.98%] w-[3.893px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.89312 6.73563">
          <path d={svgPaths.pccf3700} fill="var(--fill-0, #E6E7E8)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[65.4%] right-[670.62px] top-[32.89%] w-[10.275px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.275 7.31438">
          <path d={svgPaths.p5ff3600} fill="var(--fill-0, #E6E7E8)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[65.6%] right-[668.76px] top-[32.39%] w-[12.476px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4762 8.6025">
          <path d={svgPaths.pfc2f900} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[65.53%] right-[678.6px] top-[32.46%] w-[5.792px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.79188 8.59188">
          <path d={svgPaths.p3cdbfb00} fill="var(--fill-0, #009ADD)" id="Vector" />
        </svg>
      </div>
      <Group23 />
      <Group24 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute bottom-[59.96%] contents right-[664.87px] top-[31.63%]" data-name="Group">
      <Group21 />
      <Group22 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute bottom-[59.96%] contents right-[664.87px] top-[31.63%]" data-name="Group">
      <Group20 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute bottom-[59.96%] contents right-[584.76px] top-[31.63%]" data-name="Group">
      <Group18 />
      <Group19 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute bottom-[60.31%] contents right-[624.4px] top-[33.32%]" data-name="Group">
      <div className="absolute bottom-[60.31%] right-[636.08px] top-[34.86%] w-[19.523px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5231 20.6844">
          <path d={svgPaths.p2846bd00} fill="var(--fill-0, #2A6FF3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[63.33%] right-[624.4px] top-[33.32%] w-[13.549px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5487 14.3556">
          <path d={svgPaths.pc13d220} fill="var(--fill-0, #2A6FF3)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute bottom-[58.79%] contents right-[618.63px] top-[31.22%]" data-name="Group">
      <div className="absolute bottom-[58.79%] right-[618.63px] top-[31.22%] w-[42.732px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42.7325 42.7325">
          <path d={svgPaths.p2ccb9f80} fill="var(--fill-0, #2A6FF3)" id="Vector" />
        </svg>
      </div>
      <Group27 />
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute bottom-[60.87%] contents right-[641.18px] top-[34.57%]" data-name="Group">
      <div className="absolute bottom-[64.38%] right-[641.18px] top-[34.57%] w-[5.26px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.2596 4.50125">
          <path d={svgPaths.p302c7c00} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[60.87%] right-[641.18px] top-[38.08%] w-[5.26px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.25957 4.50125">
          <path d={svgPaths.p3936cd40} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute bottom-[62.54%] contents right-[634.05px] top-[36.24%]" data-name="Group">
      <div className="absolute bottom-[62.54%] right-[634.05px] top-[36.24%] w-[4.501px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.50126 5.25956">
          <path d={svgPaths.p2dc7bea0} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[62.54%] right-[649.07px] top-[36.24%] w-[4.501px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.50125 5.25956">
          <path d={svgPaths.p18218780} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute bottom-[61.31%] contents right-[635.92px] top-[35.01%]" data-name="Group">
      <div className="absolute bottom-[63.67%] right-[635.92px] top-[35.01%] w-[5.659px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.65923 5.65912">
          <path d={svgPaths.p1047b900} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[61.31%] right-[646.04px] top-[37.37%] w-[5.659px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.65923 5.6586">
          <path d={svgPaths.p16006100} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute bottom-[61.31%] contents right-[635.92px] top-[35.01%]" data-name="Group">
      <div className="absolute bottom-[61.31%] right-[635.92px] top-[37.37%] w-[5.659px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.65911 5.6586">
          <path d={svgPaths.p118911c0} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[63.67%] right-[646.04px] top-[35.01%] w-[5.659px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.65865 5.65923">
          <path d={svgPaths.p2324e100} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute bottom-[60.87%] contents right-[634.05px] top-[34.57%]" data-name="Group">
      <Group33 />
      <Group34 />
      <Group35 />
      <Group36 />
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute bottom-[61.78%] contents right-[637.94px] top-[35.48%]" data-name="Group">
      <div className="absolute bottom-[61.78%] right-[637.94px] top-[35.48%] w-[11.736px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.7363 11.7362">
          <path d={svgPaths.p1fa12800} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute bottom-[61.99%] contents right-[638.86px] top-[35.69%]" data-name="Group">
      <div className="absolute bottom-[61.99%] right-[638.86px] top-[35.69%] w-[9.9px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.9 9.9">
          <path d={svgPaths.pc8b4800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute bottom-[60.87%] contents right-[634.05px] top-[34.57%]" data-name="Group">
      <div className="absolute bottom-[61.51%] right-[636.8px] top-[35.21%] w-[14.021px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0213 14.0213">
          <path d={svgPaths.p21ead800} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
      <Group32 />
      <Group37 />
      <Group38 />
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute bottom-[60.6%] contents right-[634.05px] top-[34.57%]" data-name="Group">
      <div className="absolute bottom-[60.6%] right-[634.05px] top-[34.57%] w-[19.521px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5206 20.6831">
          <path d={svgPaths.p20205200} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <Group31 />
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute bottom-[60.6%] contents right-[634.05px] top-[34.57%]" data-name="Group">
      <Group30 />
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute bottom-[63.81%] contents right-[627.32px] top-[33.03%]" data-name="Group">
      <div className="absolute bottom-[66.24%] right-[627.32px] top-[33.03%] w-[3.651px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.65082 3.12438">
          <path d={svgPaths.p25d4aff0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[63.81%] right-[627.32px] top-[35.46%] w-[3.651px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.65104 3.12438">
          <path d={svgPaths.p9955b00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute bottom-[64.96%] contents right-[622.37px] top-[34.18%]" data-name="Group">
      <div className="absolute bottom-[64.96%] right-[622.37px] top-[34.18%] w-[3.124px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.12437 3.65083">
          <path d={svgPaths.p4510600} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[64.96%] right-[632.79px] top-[34.18%] w-[3.124px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.12438 3.65083">
          <path d={svgPaths.p27b09200} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute bottom-[64.11%] contents right-[623.66px] top-[33.33%]" data-name="Group">
      <div className="absolute bottom-[65.75%] right-[623.66px] top-[33.33%] w-[3.928px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.92767 3.92812">
          <path d={svgPaths.p2349c540} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[64.11%] right-[630.69px] top-[34.97%] w-[3.928px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.92767 3.92812">
          <path d={svgPaths.p4e3f880} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute bottom-[64.11%] contents right-[623.66px] top-[33.33%]" data-name="Group">
      <div className="absolute bottom-[64.11%] right-[623.66px] top-[34.97%] w-[3.928px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.92812 3.92767">
          <path d={svgPaths.p32d39700} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[65.75%] right-[630.69px] top-[33.33%] w-[3.928px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.92838 3.92767">
          <path d={svgPaths.p14cf9f80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute bottom-[63.81%] contents right-[622.37px] top-[33.03%]" data-name="Group">
      <Group43 />
      <Group44 />
      <Group45 />
      <Group46 />
    </div>
  );
}

function Group47() {
  return (
    <div className="absolute bottom-[64.44%] contents right-[625.07px] top-[33.66%]" data-name="Group">
      <div className="absolute bottom-[64.44%] right-[625.07px] top-[33.66%] w-[8.146px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.14626 8.14625">
          <path d={svgPaths.p3182e980} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group48() {
  return (
    <div className="absolute bottom-[64.59%] contents right-[625.71px] top-[33.81%]" data-name="Group">
      <div className="absolute bottom-[64.59%] right-[625.71px] top-[33.81%] w-[6.871px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.87125 6.87125">
          <path d={svgPaths.pa804000} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute bottom-[63.81%] contents right-[622.37px] top-[33.03%]" data-name="Group">
      <div className="absolute bottom-[64.25%] right-[624.27px] top-[33.47%] w-[9.733px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.7325 9.7325">
          <path d={svgPaths.p2dc4f80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <Group42 />
      <Group47 />
      <Group48 />
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute bottom-[63.62%] contents right-[622.37px] top-[33.03%]" data-name="Group">
      <div className="absolute bottom-[63.62%] right-[622.37px] top-[33.03%] w-[13.549px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5488 14.3563">
          <path d={svgPaths.p1e94e9f0} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <Group41 />
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute bottom-[63.62%] contents right-[622.37px] top-[33.03%]" data-name="Group">
      <Group40 />
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute bottom-[60.6%] contents right-[622.37px] top-[33.03%]" data-name="Group">
      <Group29 />
      <Group39 />
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute bottom-[58.79%] contents right-[618.63px] top-[31.22%]" data-name="Group">
      <Group26 />
      <Group28 />
    </div>
  );
}

function Group50() {
  return (
    <div className="absolute bottom-[68.59%] contents right-[600.65px] top-[25.48%]" data-name="Group">
      <div className="absolute bottom-[69.88%] right-[601.9px] top-[25.48%] w-[72.76px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72.7601 19.8438">
          <path d={svgPaths.p33301100} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[69.88%] right-[605.77px] top-[26.21%] w-[67.833px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67.8331 16.7194">
          <path d={svgPaths.p34a67fe0} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[68.59%] right-[600.65px] top-[26.81%] w-[19.706px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.7055 19.7055">
          <path d={svgPaths.p2408e300} fill="var(--fill-0, #C0B6B6)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[68.59%] right-[600.65px] top-[29.66%] w-[19.706px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.7062 7.48782">
          <path d={svgPaths.p3ad0ca00} fill="var(--fill-0, #5E5E5E)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group51() {
  return (
    <div className="absolute bottom-[53.05%] contents right-[600.65px] top-[41.02%]" data-name="Group">
      <div className="absolute bottom-[53.05%] right-[601.9px] top-[42.31%] w-[72.76px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72.7601 19.8438">
          <path d={svgPaths.p25f09d30} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[53.78%] right-[605.77px] top-[42.31%] w-[67.833px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67.8331 16.7194">
          <path d={svgPaths.p3338a200} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[54.38%] right-[600.65px] top-[41.02%] w-[19.706px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.7055 19.7055">
          <path d={svgPaths.p307f040} fill="var(--fill-0, #C0B6B6)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[57.23%] right-[600.65px] top-[41.02%] w-[19.706px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.7062 7.48783">
          <path d={svgPaths.p32884080} fill="var(--fill-0, #5E5E5E)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group49() {
  return (
    <div className="absolute bottom-[53.05%] contents right-[600.65px] top-[25.48%]" data-name="Group">
      <Group50 />
      <Group51 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute bottom-[53.05%] contents right-[584.76px] top-[25.48%]" data-name="Group">
      <Group17 />
      <Group25 />
      <Group49 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute bottom-[46.26%] contents right-[565px] top-[18.69%]" data-name="Group">
      <Group14 />
      <Group15 />
      <Group16 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute bottom-[46.26%] contents right-[565px] top-[18.69%]" data-name="Group">
      <Group13 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute bottom-[46.26%] contents right-[565px] top-[18.69%]" data-name="Group">
      <Group12 />
    </div>
  );
}

function Group55() {
  return (
    <div className="absolute bottom-[195px] contents left-[1007px]" data-name="Group">
      <div className="absolute bottom-[195px] left-[1007px] size-[150px]" data-name="Vector">
        <div className="absolute inset-[-2.67%_-5.33%_-8%_-5.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 166 166">
            <g filter="url(#filter0_d_1_4213)" id="Vector">
              <path d={svgPaths.p16c78d80} shapeRendering="crispEdges" stroke="var(--stroke-0, #2A6FF3)" strokeWidth="8" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="166" id="filter0_d_1_4213" width="166" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_4213" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_4213" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[205.11px] left-[1017.11px] size-[129.773px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 129.773 129.773">
          <path d={svgPaths.p1cef8e80} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group57() {
  return (
    <div className="absolute bottom-[245.19px] contents left-[1045px]" data-name="Group">
      <div className="absolute bottom-[245.51px] left-[1045.05px] size-[59.354px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.3543 59.3543">
          <path d={svgPaths.pae31f00} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[295.72px] h-[9.139px] left-[1045.05px] w-[59.354px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.3543 9.13882">
          <path d={svgPaths.p201909c0} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[245.19px] h-[10.81px] left-[1045px] w-[59.354px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.3543 10.8097">
          <path d={svgPaths.p3309e780} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[277.61px] h-[27.254px] left-[1067.99px] w-[13.463px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4629 27.2538">
          <path d={svgPaths.p2e91b500} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[300.44px] h-[4.422px] left-[1067.99px] w-[13.463px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4629 4.42211">
          <path d={svgPaths.p29b2b200} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[256.77px] h-[9.827px] left-[1084.78px] w-[14.445px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.4453 9.82663">
          <path d={svgPaths.p3489ab80} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[256.77px] h-[3.242px] left-[1049.01px] w-[14.445px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.4453 3.24245">
          <path d={svgPaths.pae4bf00} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[262.57px] h-[3.242px] left-[1049.01px] w-[14.445px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.4453 3.24246">
          <path d={svgPaths.p12b1bd00} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group62() {
  return (
    <div className="absolute bottom-[251.24px] contents left-[1092.12px]" data-name="Group">
      <div className="absolute bottom-[251.24px] h-[14.587px] left-[1092.12px] w-[20.033px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0327 14.5873">
          <path d={svgPaths.pe1a6370} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group61() {
  return (
    <div className="absolute bottom-[251.24px] contents left-[1092.12px]" data-name="Group">
      <Group62 />
      <div className="absolute bottom-[251.24px] h-[13.679px] left-[1092.12px] w-[20.024px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0238 13.679">
          <path d={svgPaths.p12ceba40} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group60() {
  return (
    <div className="absolute bottom-[249.8px] contents left-[1092.12px]" data-name="Group">
      <div className="absolute bottom-[249.8px] h-[14.588px] left-[1092.12px] w-[20.023px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0231 14.5884">
          <path d={svgPaths.p18b4ad80} fill="var(--fill-0, #788BA5)" id="Vector" />
        </svg>
      </div>
      <Group61 />
    </div>
  );
}

function Group59() {
  return (
    <div className="absolute bottom-[249.8px] contents left-[1092.12px]" data-name="Group">
      <Group60 />
    </div>
  );
}

function Group58() {
  return (
    <div className="absolute bottom-[233.34px] contents left-[1083.95px]" data-name="Group">
      <div className="absolute bottom-[233.34px] h-[45.036px] left-[1083.95px] w-[36.365px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.365 45.0356">
          <path d={svgPaths.p8ef3d00} fill="var(--fill-0, #788BA5)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[238.17px] h-[36.483px] left-[1087.73px] w-[28.808px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.8084 36.4832">
          <path d={svgPaths.p1891f300} fill="var(--fill-0, #DEE4ED)" id="Vector" />
        </svg>
      </div>
      <Group59 />
    </div>
  );
}

function Group56() {
  return (
    <div className="absolute bottom-[233.34px] contents left-[1045px]" data-name="Group">
      <Group57 />
      <Group58 />
    </div>
  );
}

function Group54() {
  return (
    <div className="absolute bottom-[195px] contents left-[1007px]" data-name="Group">
      <Group55 />
      <div className="absolute bottom-[228.94px] h-[71.522px] left-[1045.05px] w-[75.269px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75.2695 71.5218">
          <path d={svgPaths.pd0b5600} fill="var(--fill-0, #382B73)" id="Vector" />
        </svg>
      </div>
      <Group56 />
    </div>
  );
}

function Group53() {
  return (
    <div className="absolute bottom-[195px] contents left-[1007px]" data-name="Group">
      <Group54 />
    </div>
  );
}

function Group52() {
  return (
    <div className="absolute bottom-[195px] contents left-[1007px]" data-name="Group">
      <Group53 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute h-[52px] left-[923px] top-[324px] w-[330.667px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-[165.33px] not-italic text-[#757575] text-[20px] text-center top-0 w-[330.667px]">Mimic human behavior with built-in safety controls.</p>
    </div>
  );
}

function FeaturesContainer() {
  return (
    <div className="h-[428px] relative shrink-0 w-[1280px]" data-name="Features Container">
      <Frame14 />
      <Frame15 />
      <Group11 />
      <Group52 />
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] left-[645.5px] not-italic text-[#474747] text-[24px] text-center top-[278px] w-[331px]">Automated Follow-Ups</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-[645.5px] not-italic text-[#757575] text-[20px] text-center top-[325px] w-[331px]">Schedule timed message sequences to boost responses.</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] left-[1085.33px] not-italic text-[#474747] text-[24px] text-center top-[278px] w-[330.667px]">Safe Account Warmup</p>
      <Frame7 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative flex flex-col gap-[32px] items-start lg:items-center px-4 sm:px-8 lg:px-0 w-full">
      <SectionHeader />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <StaggerItem className="flex-1 min-w-[280px]">
      <motion.div
        whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(42,111,243,0.12)" }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-[2px_2px_7px_0px_rgba(65,74,83,0.2)] p-8 flex flex-col items-center text-center h-full"
      >
        {/* Icon circle */}
        <div className="w-[120px] h-[120px] rounded-full bg-[#E9F5FE] flex items-center justify-center mb-6 border-4 border-[#2A6FF3]/20">
          {icon}
        </div>
        {/* Title */}
        <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#474747] text-xl sm:text-2xl leading-[36px] mb-3">
          {title}
        </h3>
        {/* Description */}
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#757575] text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      </motion.div>
    </StaggerItem>
  );
}

/* Feature card icons */
function DmIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#2A6FF3" opacity="0.2" />
      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="#2A6FF3" />
      <rect x="7" y="7" width="10" height="2" rx="1" fill="#2A6FF3" opacity="0.6" />
      <rect x="7" y="11" width="6" height="2" rx="1" fill="#2A6FF3" opacity="0.6" />
    </svg>
  );
}

function FollowUpIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#2A6FF3" opacity="0.2" />
      <path d="M12 6V12L16 14" stroke="#2A6FF3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#2A6FF3" />
    </svg>
  );
}

function WarmupIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#2A6FF3" opacity="0.2" />
      <path d="M12 2L3 7V17L12 22L21 17V7L12 2ZM19 15.97L12 19.97L5 15.97V8.03L12 4.03L19 8.03V15.97Z" fill="#2A6FF3" />
      <path d="M12 8L10 12H14L12 16" stroke="#2A6FF3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex items-center left-[91px] p-[10px] top-[262px]">
      <div className="bg-white content-stretch flex flex-col gap-[16px] h-[403px] items-center justify-center p-[32px] rounded-[16px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.2)] shrink-0 w-[395px]" data-name="Feature" />
    </div>
  );
}

function Group66() {
  return (
    <div className="absolute bottom-[38.04%] contents right-[1067px] top-[41.58%]" data-name="Group">
      <div className="absolute bottom-[38.04%] right-[1067px] top-[41.58%] w-[150px]" data-name="Vector">
        <div className="absolute inset-[-2.84%_-2.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 158 149.033">
            <path d={svgPaths.pa196100} id="Vector" stroke="var(--stroke-0, #2A6FF3)" strokeWidth="8" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[39.53%] right-[1077.94px] top-[43.06%] w-[128.125px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128.125 120.465">
          <path d={svgPaths.p13fe2800} fill="var(--fill-0, #E9F5FE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group67() {
  return (
    <div className="absolute bottom-[41.42%] contents right-[1108.7px] top-[46.58%]" data-name="Group">
      <div className="absolute bottom-[50.85%] right-[1108.7px] top-[46.58%] w-[66.591px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.5912 17.7584">
          <path d={svgPaths.p2f386f40} fill="var(--fill-0, #382B73)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[47.86%] right-[1108.7px] top-[49.58%] w-[66.591px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.5912 17.7584">
          <path d={svgPaths.p28bc6600} fill="var(--fill-0, #382B73)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[41.42%] right-[1108.7px] top-[52.58%] w-[66.591px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.5912 41.5329">
          <path d={svgPaths.p38f84200} fill="var(--fill-0, #382B73)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group72() {
  return (
    <div className="absolute bottom-[51.45%] contents right-[1108.7px] top-[45.99%]" data-name="Group">
      <div className="absolute bottom-[51.45%] right-[1108.7px] top-[46.25%] w-[66.591px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.5912 15.9437">
          <path d={svgPaths.p5ce79c0} fill="var(--fill-0, #BCBEC0)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[51.71%] right-[1108.7px] top-[45.99%] w-[66.591px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.5912 15.9437">
          <path d={svgPaths.p5ce79c0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group71() {
  return (
    <div className="absolute bottom-[51.45%] contents right-[1108.7px] top-[45.99%]" data-name="Group">
      <Group72 />
    </div>
  );
}

function Group70() {
  return (
    <div className="absolute bottom-[51.45%] contents right-[1108.7px] top-[45.99%]" data-name="Group">
      <Group71 />
      <div className="absolute bottom-[52.07%] right-[1158.06px] top-[47.64%] w-[14.901px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9006 2.02852">
          <path d={svgPaths.p319b8100} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[52.07%] right-[1127.18px] top-[47.64%] w-[28.656px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.6562 2.02852">
          <path d={svgPaths.p16315500} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[52.66%] right-[1164.35px] top-[47.05%] w-[8.611px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.61125 2.02852">
          <path d={svgPaths.p3861c9c0} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[52.66%] right-[1121.97px] top-[47.05%] w-[15.707px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.7069 2.02852">
          <path d={svgPaths.pc00fa80} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[52.66%] right-[1139.89px] top-[47.05%] w-[22.237px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2369 2.02852">
          <path d={svgPaths.pda53900} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[53.36%] right-[1149.33px] top-[46.35%] w-[23.632px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.6325 2.02852">
          <path d={svgPaths.p8c1e800} fill="var(--fill-0, #1CAEE4)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group75() {
  return (
    <div className="absolute bottom-[48.45%] contents right-[1108.7px] top-[48.98%]" data-name="Group">
      <div className="absolute bottom-[48.45%] right-[1108.7px] top-[49.25%] w-[66.591px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.5912 15.9437">
          <path d={svgPaths.p16a84240} fill="var(--fill-0, #BCBEC0)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[48.71%] right-[1108.7px] top-[48.98%] w-[66.591px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.5912 15.9437">
          <path d={svgPaths.pa6d4400} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group74() {
  return (
    <div className="absolute bottom-[48.45%] contents right-[1108.7px] top-[48.98%]" data-name="Group">
      <Group75 />
    </div>
  );
}

function Group73() {
  return (
    <div className="absolute bottom-[48.45%] contents right-[1108.7px] top-[48.98%]" data-name="Group">
      <Group74 />
      <div className="absolute bottom-[49.07%] right-[1158.06px] top-[50.63%] w-[14.901px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9006 2.02852">
          <path d={svgPaths.p233daf00} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[49.07%] right-[1127.18px] top-[50.63%] w-[28.656px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.6562 2.02852">
          <path d={svgPaths.p18cdce80} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[49.66%] right-[1164.35px] top-[50.05%] w-[8.611px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.61125 2.02852">
          <path d={svgPaths.pdbca4f0} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[49.66%] right-[1121.97px] top-[50.05%] w-[15.707px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.7069 2.02852">
          <path d={svgPaths.p7767f80} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[49.66%] right-[1139.89px] top-[50.05%] w-[22.237px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2369 2.02852">
          <path d={svgPaths.p37064900} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[50.36%] right-[1149.33px] top-[49.34%] w-[23.632px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.6325 2.02852">
          <path d={svgPaths.p1df09570} fill="var(--fill-0, #1CAEE4)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group78() {
  return (
    <div className="absolute bottom-[45.45%] contents right-[1108.7px] top-[51.98%]" data-name="Group">
      <div className="absolute bottom-[45.45%] right-[1108.7px] top-[52.24%] w-[66.591px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.5912 15.9437">
          <path d={svgPaths.p16a84240} fill="var(--fill-0, #BCBEC0)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[45.71%] right-[1108.7px] top-[51.98%] w-[66.591px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.5912 15.9437">
          <path d={svgPaths.pa6d4400} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group77() {
  return (
    <div className="absolute bottom-[45.45%] contents right-[1108.7px] top-[51.98%]" data-name="Group">
      <Group78 />
    </div>
  );
}

function Group76() {
  return (
    <div className="absolute bottom-[45.45%] contents right-[1108.7px] top-[51.98%]" data-name="Group">
      <Group77 />
      <div className="absolute bottom-[46.07%] right-[1158.06px] top-[53.63%] w-[14.901px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9006 2.02852">
          <path d={svgPaths.p233daf00} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[46.07%] right-[1127.18px] top-[53.63%] w-[28.656px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.6562 2.02852">
          <path d={svgPaths.p18cdce80} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[46.66%] right-[1164.35px] top-[53.04%] w-[8.611px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.61125 2.02852">
          <path d={svgPaths.pdbca4f0} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[46.66%] right-[1121.97px] top-[53.04%] w-[15.707px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.7069 2.02852">
          <path d={svgPaths.p7767f80} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[46.66%] right-[1139.89px] top-[53.04%] w-[22.237px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2369 2.02852">
          <path d={svgPaths.p37064900} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[47.36%] right-[1149.33px] top-[52.34%] w-[23.632px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.6325 2.02852">
          <path d={svgPaths.p252a8800} fill="var(--fill-0, #1CAEE4)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group81() {
  return (
    <div className="absolute bottom-[42.45%] contents right-[1108.7px] top-[54.98%]" data-name="Group">
      <div className="absolute bottom-[42.45%] right-[1108.7px] top-[55.24%] w-[66.591px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.5912 15.9437">
          <path d={svgPaths.pa6d4400} fill="var(--fill-0, #BCBEC0)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[42.71%] right-[1108.7px] top-[54.98%] w-[66.591px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.5912 15.9437">
          <path d={svgPaths.p321d2f00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group80() {
  return (
    <div className="absolute bottom-[42.45%] contents right-[1108.7px] top-[54.98%]" data-name="Group">
      <Group81 />
    </div>
  );
}

function Group79() {
  return (
    <div className="absolute bottom-[42.45%] contents right-[1108.7px] top-[54.98%]" data-name="Group">
      <Group80 />
      <div className="absolute bottom-[43.07%] right-[1158.06px] top-[56.63%] w-[14.901px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9006 2.02852">
          <path d={svgPaths.p233daf00} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[43.07%] right-[1127.18px] top-[56.63%] w-[28.656px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.6562 2.02852">
          <path d={svgPaths.p18cdce80} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[43.66%] right-[1164.35px] top-[56.04%] w-[8.611px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.61125 2.02853">
          <path d={svgPaths.p3a58780} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[43.66%] right-[1121.97px] top-[56.04%] w-[15.707px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.7069 2.02853">
          <path d={svgPaths.p1f08ca00} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[43.66%] right-[1139.89px] top-[56.04%] w-[22.237px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2369 2.02853">
          <path d={svgPaths.p2595a300} fill="var(--fill-0, #D1D3D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[44.36%] right-[1149.33px] top-[55.34%] w-[23.632px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.6325 2.02852">
          <path d={svgPaths.p1df09570} fill="var(--fill-0, #1CAEE4)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group69() {
  return (
    <div className="absolute bottom-[42.45%] contents right-[1108.7px] top-[45.99%]" data-name="Group">
      <Group70 />
      <Group73 />
      <Group76 />
      <Group79 />
    </div>
  );
}

function Group85() {
  return (
    <div className="absolute bottom-[43.2%] contents right-[1130.79px] top-[54.58%]" data-name="Group">
      <div className="absolute bottom-[43.2%] right-[1130.79px] top-[54.58%] w-[22.416px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.4156 15.3467">
          <path d={svgPaths.p3e141a30} fill="var(--fill-0, #C0B6B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group86() {
  return (
    <div className="absolute bottom-[43.46%] contents right-[1130.79px] top-[54.32%]" data-name="Group">
      <div className="absolute bottom-[43.46%] right-[1130.79px] top-[54.32%] w-[22.416px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.4156 15.3461">
          <path d={svgPaths.p20285880} fill="var(--fill-0, #2A6FF3)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group84() {
  return (
    <div className="absolute bottom-[43.2%] contents right-[1130.79px] top-[54.32%]" data-name="Group">
      <Group85 />
      <Group86 />
      <div className="absolute bottom-[43.46%] right-[1130.8px] top-[54.46%] w-[22.405px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.4046 14.3906">
          <path d={svgPaths.p2cd2c680} fill="var(--fill-0, #2A6FF3)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group83() {
  return (
    <div className="absolute bottom-[43.2%] contents right-[1130.79px] top-[54.32%]" data-name="Group">
      <Group84 />
    </div>
  );
}

function Group82() {
  return (
    <div className="absolute bottom-[42.02%] contents right-[1123.25px] top-[52.89%]" data-name="Group">
      <div className="absolute bottom-[42.71%] right-[1123.25px] top-[54.98%] w-[37.5px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.5 15.9437">
          <path d={svgPaths.p32219fe0} fill="var(--fill-0, #BCBEC0)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[42.02%] right-[1123.25px] top-[52.89%] w-[37.5px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.5 35.2582">
          <path d={svgPaths.p24f5e400} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <Group83 />
    </div>
  );
}

function Group68() {
  return (
    <div className="absolute bottom-[42.02%] contents right-[1108.7px] top-[45.99%]" data-name="Group">
      <Group69 />
      <Group82 />
    </div>
  );
}

function Group65() {
  return (
    <div className="absolute bottom-[38.04%] contents right-[1067px] top-[41.58%]" data-name="Group">
      <Group66 />
      <Group67 />
      <Group68 />
    </div>
  );
}

function Group64() {
  return (
    <div className="absolute bottom-[38.04%] contents right-[1067px] top-[41.58%]" data-name="Group">
      <Group65 />
    </div>
  );
}

function Group63() {
  return (
    <div className="absolute contents inset-[41.58%_66.11%_13.01%_7.15%]" data-name="Group">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-[295.5px] not-italic text-[#757575] text-[20px] text-center top-[550px] w-[385px]">Send personalized DMs automatically with smart reply handling.</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] left-[290.5px] not-italic text-[#474747] text-[24px] text-center top-[502px] w-[331px]">{` Smart DM Automation`}</p>
      <Group64 />
    </div>
  );
}

function Feature() {
  return (
    <div className="bg-white relative shrink-0 w-full py-8 px-4 sm:px-8" data-name="Feature">
      <Frame16 />
      {/* 3-card grid */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10 max-w-[1280px] mx-auto px-4 sm:px-2 md:px-0"
        staggerDelay={0.15}
      >
        <FeatureCard
          icon={<DmIcon />}
          title="Smart DM Automation"
          description="Send personalized DMs automatically with smart reply handling."
        />
        <FeatureCard
          icon={<FollowUpIcon />}
          title="Automated Follow-Ups"
          description="Schedule timed message sequences to boost responses."
        />
        <FeatureCard
          icon={<WarmupIcon />}
          title="Safe Account Warmup"
          description="Mimic human behavior with built-in safety controls."
        />
      </StaggerContainer>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[5.111px] h-[51.111px] items-center justify-center pl-[20.444px] pr-[12.778px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[17.89px] whitespace-nowrap">
        <p className="leading-[30.667px]" dir="auto">
          Monthly
        </p>
      </div>
      <div className="relative shrink-0 size-[25.556px]" data-name="icon-angle-down">
        <div className="absolute inset-[34.37%_17.7%_30.21%_17.71%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5066 9.05199">
            <path d={svgPaths.p33e62700} fill="var(--fill-0, #919191)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40.889px] min-h-px min-w-px not-italic relative text-[#303030] text-[23px]">{` Analytics`}</p>
      <div className="content-stretch flex items-center justify-center relative rounded-[10.222px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1.278px] border-solid inset-0 pointer-events-none rounded-[10.222px]" />
        <Container4 />
      </div>
    </div>
  );
}

function ProjectInfo() {
  return <div className="content-stretch flex items-center shrink-0" data-name="Project Info" />;
}

function TaskInfo() {
  return <div className="content-stretch flex items-center shrink-0" data-name="Task Info" />;
}

function MainValue() {
  return (
    <div className="content-stretch flex gap-[12.778px] items-center relative shrink-0 w-[623.556px]" data-name="Main Value">
      <ProjectInfo />
      <TaskInfo />
    </div>
  );
}

function YAxis() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal h-full items-start justify-between leading-[0] not-italic relative shrink-0 text-[#303030] text-[15.33px] w-[28.111px]" data-name="Y Axis">
      <div className="flex flex-col h-[19.388px] justify-center relative shrink-0 w-full">
        <p className="leading-[28.111px]">100</p>
      </div>
      <div className="flex flex-col h-[19.388px] justify-center relative shrink-0 w-full">
        <p className="leading-[28.111px]">75</p>
      </div>
      <div className="flex flex-col h-[19.388px] justify-center relative shrink-0 w-full">
        <p className="leading-[28.111px]">50</p>
      </div>
      <div className="flex flex-col h-[19.388px] justify-center relative shrink-0 w-full">
        <p className="leading-[28.111px]">25</p>
      </div>
      <div className="flex flex-col h-[19.388px] justify-center relative shrink-0 w-full">
        <p className="leading-[28.111px]">0</p>
      </div>
    </div>
  );
}

function ChartContainer() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Chart Container">
      <div className="absolute inset-[-0.33%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 546.059 208.556">
          <g id="Chart Container">
            <path d="M7.74165 0.638889H540.977" id="Vector 4" stroke="var(--stroke-0, #E4E4E4)" strokeWidth="1.27778" />
            <path d={svgPaths.p36405540} id="Vector 5" stroke="var(--stroke-0, #E4E4E4)" strokeWidth="1.27778" />
            <path d={svgPaths.pf6bce00} id="Vector 6" stroke="var(--stroke-0, #E4E4E4)" strokeWidth="1.27778" />
            <path d={svgPaths.p33b9b600} id="Vector 7" stroke="var(--stroke-0, #E4E4E4)" strokeWidth="1.27778" />
            <path d="M9.12008 207.917H540.974" id="Vector 8" stroke="var(--stroke-0, #E4E4E4)" strokeWidth="1.27778" />
            <g id="Chart">
              <path d={svgPaths.p2f1281a0} id="Vector 381" stroke="var(--stroke-0, #FF9800)" strokeWidth="2.55556" />
              <path d={svgPaths.p2d72e100} id="Vector 383" stroke="var(--stroke-0, #2A6FF3)" strokeWidth="2.55556" />
              <path d={svgPaths.p2340b340} id="Vector 380" stroke="var(--stroke-0, #00BCD4)" strokeWidth="2.55556" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Month() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48.556px]" data-name="Month">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px not-italic relative text-[#303030] text-[12.78px] text-center">Jan</p>
    </div>
  );
}

function Month1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48.556px]" data-name="Month">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px not-italic relative text-[#303030] text-[12.78px] text-center">Feb</p>
    </div>
  );
}

function Month2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48.556px]" data-name="Month">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px not-italic relative text-[#303030] text-[12.78px] text-center">Mar</p>
    </div>
  );
}

function Month3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48.556px]" data-name="Month">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px not-italic relative text-[#303030] text-[12.78px] text-center">Apr</p>
    </div>
  );
}

function Month4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48.556px]" data-name="Month">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px not-italic relative text-[#303030] text-[12.78px] text-center">May</p>
    </div>
  );
}

function Month5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48.556px]" data-name="Month">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px not-italic relative text-[#303030] text-[12.78px] text-center">Jun</p>
    </div>
  );
}

function Month6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48.556px]" data-name="Month">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px not-italic relative text-[#303030] text-[12.78px] text-center">Jul</p>
    </div>
  );
}

function Month7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48.556px]" data-name="Month">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px not-italic relative text-[#303030] text-[12.78px] text-center">Aug</p>
    </div>
  );
}

function Month8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48.556px]" data-name="Month">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px not-italic relative text-[#303030] text-[12.78px] text-center">Oct</p>
    </div>
  );
}

function Month9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48.556px]" data-name="Month">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px not-italic relative text-[#303030] text-[12.78px] text-center">Nov</p>
    </div>
  );
}

function Month10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48.556px]" data-name="Month">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[23px] min-h-px min-w-px not-italic relative text-[#303030] text-[12.78px] text-center">Nov</p>
    </div>
  );
}

function Timeline() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Timeline">
      <Month />
      <Month1 />
      <Month2 />
      <Month3 />
      <Month4 />
      <Month5 />
      <Month6 />
      <Month7 />
      <Month8 />
      <Month9 />
      <Month10 />
    </div>
  );
}

function ChartTimeline() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[5.111px] h-full items-start min-h-px min-w-px overflow-clip relative" data-name="Chart + Timeline">
      <ChartContainer />
      <Timeline />
    </div>
  );
}

function ChartTimelineValue() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] gap-[10.222px] items-center min-h-px min-w-px overflow-clip relative w-full" data-name="Chart + Timeline + Value">
      <YAxis />
      <ChartTimeline />
    </div>
  );
}

function Label1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-[140.556px]" data-name="Label">
      <div className="content-start flex flex-wrap gap-y-[5.111111164093018px] items-start overflow-clip p-[10.222px] relative rounded-[inherit] w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30.667px] not-italic relative shrink-0 text-[#2a6ff3] text-[17.89px] w-[120.111px]">jan 13 ,2026</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#f2f2f2] border-[1.278px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_5.111px_38.333px_0px_rgba(46,45,116,0.1)]" />
    </div>
  );
}

function Label() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.111px] h-[230px] items-center left-[184px] top-[-21.72px]" data-name="Label">
      <Label1 />
      <div className="relative shrink-0 size-[15.333px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3333 15.3333">
          <circle cx="7.66667" cy="7.66667" fill="var(--fill-0, #2A6FF3)" id="Ellipse 143" r="6.38889" stroke="var(--stroke-0, white)" strokeWidth="2.55556" />
        </svg>
      </div>
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-0" data-name="Line">
        <div className="absolute inset-[0_-0.64px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.27778 153">
            <path d="M0.638889 0V153" id="Line" stroke="var(--stroke-0, #D6E2F8)" strokeDasharray="6.39 6.39" strokeWidth="1.27778" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function NewApexChartsBasicLineChart3YesYes() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="New ApexCharts/Basic Line Chart/3/Yes/Yes">
      <ChartTimelineValue />
      <Label />
    </div>
  );
}

function Legend() {
  return (
    <div className="content-stretch flex gap-[10.222px] items-center justify-center relative shrink-0 w-full" data-name="Legend">
      <div className="content-stretch flex gap-[10.222px] h-[29.389px] items-center relative shrink-0" data-name="Table Overall Progress Parts">
        <div className="relative shrink-0 size-[15.333px]" data-name="Color">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3333 15.3333">
            <circle cx="7.66667" cy="7.66667" fill="var(--fill-0, #00BCD4)" id="Legend" r="7.66667" />
          </svg>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#303030] text-[22.86px] text-ellipsis whitespace-nowrap">
          <p className="leading-[39.185px]">Followers Targeted</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[10.222px] h-[29.389px] items-center relative shrink-0" data-name="Table Overall Progress Parts">
        <div className="relative shrink-0 size-[15.333px]" data-name="Color">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3333 15.3333">
            <circle cx="7.66667" cy="7.66667" fill="var(--fill-0, #2A6FF3)" id="Legend" r="7.66667" />
          </svg>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#303030] text-[17.89px] text-ellipsis whitespace-nowrap">
          <p className="leading-[30.667px] overflow-hidden">Profile Visits</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[10.222px] h-[26.833px] items-center relative shrink-0 w-[136.722px]" data-name="Table Overall Progress Parts">
        <div className="relative shrink-0 size-[15.333px]" data-name="Color">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3333 15.3333">
            <circle cx="7.66667" cy="7.66667" fill="var(--fill-0, #FF9800)" id="Legend" r="7.66667" />
          </svg>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#303030] text-[17.89px] text-ellipsis whitespace-nowrap">
          <p className="leading-[30.667px] overflow-hidden">Engagement Rate</p>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[15.333px] items-start min-h-px min-w-px relative w-full" data-name="Container">
      <Header />
      <MainValue />
      <NewApexChartsBasicLineChart3YesYes />
      <Legend />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative flex flex-col gap-[8px] min-h-[430px] items-start py-[46px] w-full">
      <div className="absolute flex items-center justify-center left-[194.33px] size-[458.679px] top-[66.41px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-80.3deg]">
          <div className="relative size-[397.389px]" data-name="shape">
            <div className="absolute inset-[-60.02%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 874.393 874.393">
                <g filter="url(#filter0_f_1_4058)" id="shape" opacity="0.2">
                  <circle cx="437.196" cy="437.196" fill="var(--fill-0, #2A6FF3)" r="198.694" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="874.393" id="filter0_f_1_4058" width="874.393" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_4058" stdDeviation="119.251" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[35.12px] size-[402.635px] top-[59.82px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-80.3deg]">
          <div className="relative size-[348.833px]" data-name="shape">
            <div className="absolute inset-[-68.37%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 825.837 825.837">
                <g filter="url(#filter0_f_1_4377)" id="shape" opacity="0.2">
                  <circle cx="412.918" cy="412.918" fill="var(--fill-0, #00BCD4)" r="174.417" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="825.837" id="filter0_f_1_4377" width="825.837" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_4377" stdDeviation="119.251" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-[430px] relative rounded-[8px] shadow-[2.556px_2.556px_8.944px_0px_rgba(65,74,83,0.08)] shrink-0 w-full" data-name="Project Progress">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
            <Container3 />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveUser() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Active user">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#0d0d0d] text-[32px] tracking-[-0.64px]">900+</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#5e5e5e] text-[20px] tracking-[-0.4px]">Active Accounts</p>
    </div>
  );
}

function DesignTeam() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Design Team">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#0d0d0d] text-[32px] tracking-[-0.64px]">320%</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#5e5e5e] text-[20px] tracking-[-0.4px]">Avg. Growth Rate</p>
    </div>
  );
}

function DownloadDesktop() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Download desktop">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#0d0d0d] text-[32px] tracking-[-0.64px]">24/7</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#5e5e5e] text-[20px] tracking-[-0.4px]">Smart Monitoring</p>
    </div>
  );
}

function Statistics() {
  return (
    <div className="flex flex-wrap gap-6 lg:gap-[48px] items-end leading-[1.6] not-italic whitespace-nowrap" data-name="statistics">
      <ActiveUser />
      <DesignTeam />
      <DownloadDesktop />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[56px] items-center justify-center px-[24px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[28px]" dir="auto">
          Explore Analytics
        </p>
      </div>
    </div>
  );
}

function Description1() {
  return (
    <div className="relative flex flex-col gap-6 w-full lg:w-[624px]" data-name="Description 1">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-tight lg:leading-[78px] not-italic text-[#0d0d0d] text-3xl sm:text-4xl lg:text-[48px]">Track Every Message, Campaign, and Conversion</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-relaxed lg:leading-[36px] not-italic text-[#5e5e5e] text-base lg:text-[20px] max-w-[590px]">Get complete visibility into your outreach performance. Analyze response rates, monitor warmups, and adjust strategies instantly.</p>
      <Statistics />
      <div className="bg-[#2a6ff3] content-stretch flex h-[44px] items-center justify-center rounded-[8px] w-fit" data-name="Button">
        <Container5 />
      </div>
    </div>
  );
}

function Description() {
  return (
    <div className="relative shrink-0 w-full px-4 sm:px-8 lg:px-[80px] py-8" data-name="Description 1">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        <ScrollReveal variant="fadeLeft" className="relative w-full lg:w-1/2">
          <Frame3 />
        </ScrollReveal>
        <ScrollReveal variant="fadeRight" delay={0.2} className="w-full lg:w-auto">
          <Description1 />
        </ScrollReveal>
      </div>
    </div>
  );
}

function Hero1() {
  return (
    <div className="flex flex-col gap-[24px] items-center not-italic overflow-hidden relative shrink-0 text-center w-full" data-name="Hero">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-tight lg:leading-[78px] w-full relative shrink-0 text-[#0d0d0d] text-3xl sm:text-4xl lg:text-[48px]">{`Pricing & Plans`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-relaxed lg:leading-[36px] opacity-70 relative shrink-0 text-[#5e5e5e] text-base lg:text-[20px] w-full max-w-[800px]">Find the perfect plan for you or your team. Start for free and unlock more features as you grow.</p>
    </div>
  );
}

function ToggleOff() {
  return <div className="absolute bg-white left-[5px] rounded-[999px] size-[30px] top-[5px]" data-name="Toggle off" />;
}

function TooglePlan() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0 w-full" data-name="Toogle Plan">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#0d0d0d] text-[20px] whitespace-nowrap">Monthly</p>
      <button className="bg-[#e4e4e4] block cursor-pointer h-[40px] overflow-clip relative rounded-[999px] shrink-0 w-[80px]" data-name="Toggle">
        <ToggleOff />
      </button>
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#0d0d0d] text-[20px] whitespace-nowrap">Annually</p>
    </div>
  );
}

function HeadingsInfo() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 not-italic top-[81.89px] w-[333.333px]" data-name="Headings Info">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] min-w-full relative shrink-0 text-[#0d0d0d] text-[24px] w-[min-content]">Basic</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#5e5e5e] text-[16px] w-[357px]">Starter plan for personal accounts. Automate limited DMs and follow-ups safely.</p>
    </div>
  );
}

function Info() {
  return (
    <div className="absolute h-[181.891px] left-0 top-0 w-[333.333px]" data-name="Info">
      <HeadingsInfo />
      <div className="absolute inset-[1.5%_84.1%_71.01%_0.9%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <path clipRule="evenodd" d={svgPaths.p21835c40} fill="var(--fill-0, #4285F4)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Pricing1() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-end leading-[0] not-italic relative shrink-0 whitespace-nowrap" data-name="Pricing">
      <div className="flex flex-col justify-center relative shrink-0 text-[#0d0d0d] text-[28px]">
        <p className="leading-[46px]">$9</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#757575] text-[22px]">
        <p className="leading-[36px]">/month</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[6px] h-[48px] items-center justify-center pl-[24px] pr-[12px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[16px] whitespace-nowrap">
        <p className="leading-[28px]" dir="auto">
          Get started
        </p>
      </div>
      <div className="relative shrink-0 size-[24px]" data-name="icon-arrow-right-small">
        <div className="absolute inset-[30.2%_13.54%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4993 9.50197">
            <path d={svgPaths.p30e92e00} fill="var(--fill-0, #474747)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonDisplay1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Button Display">
      <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 w-full" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Container6 />
      </div>
    </div>
  );
}

function ButtonDisplay() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[42px] items-start left-0 top-[223.89px] w-[333.333px]" data-name="Button Display">
      <Pricing1 />
      <ButtonDisplay1 />
    </div>
  );
}

function TopContent() {
  return (
    <div className="absolute h-[359.891px] left-[36px] top-[36px] w-[333.333px]" data-name="Top content">
      <Info />
      <ButtonDisplay />
    </div>
  );
}

function Feature1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Feature">
      <div className="relative shrink-0 size-[20px]" data-name="Feature">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
            <g id="vector">
              <path d={svgPaths.p14be7480} fill="var(--fill-0, #2A6FF3)" />
              <path clipRule="evenodd" d={svgPaths.p1fa8c700} fill="var(--fill-0, #2A6FF3)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] whitespace-nowrap">5000 dms per day</p>
    </div>
  );
}

function Feature2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Feature">
      <div className="relative shrink-0 size-[20px]" data-name="Feature">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
            <g id="vector">
              <path d={svgPaths.p14be7480} fill="var(--fill-0, #2A6FF3)" />
              <path clipRule="evenodd" d={svgPaths.p1fa8c700} fill="var(--fill-0, #2A6FF3)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] whitespace-nowrap">{`Auto warmup `}</p>
    </div>
  );
}

function Feature3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Feature">
      <div className="relative shrink-0 size-[20px]" data-name="Feature">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
            <g id="vector">
              <path d={svgPaths.p14be7480} fill="var(--fill-0, #2A6FF3)" />
              <path clipRule="evenodd" d={svgPaths.p1fa8c700} fill="var(--fill-0, #2A6FF3)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] whitespace-nowrap">Humanize voice notes</p>
    </div>
  );
}

function Features() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[36px] top-[451.89px] w-[292px]" data-name="Features">
      <Feature1 />
      <Feature2 />
      <Feature3 />
    </div>
  );
}

function PricingCard() {
  return (
    <div className="bg-white w-full lg:flex-[1_0_0] h-[607.891px] min-h-px min-w-0 overflow-clip relative rounded-[32px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.1)]" data-name="Pricing Card">
      <div className="absolute flex h-[192.027px] items-center justify-center left-[84px] top-[-74.27px] w-[360.382px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[6.47deg]">
          <div className="h-[154.128px] opacity-10 rounded-[88.716px] w-[345.22px]" data-name="Mesh" style={{ backgroundImage: "linear-gradient(179.075deg, rgb(42, 111, 243) 1.7394%, rgba(42, 111, 243, 0) 98.261%)" }} />
        </div>
      </div>
      <TopContent />
      <Features />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[56.42px] relative shrink-0 w-[57.257px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57.257 56.42">
        <g id="Icon">
          <path d={svgPaths.p1ef30480} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3dda4c00} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center px-[16px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[24px]" dir="auto">
          Most popular
        </p>
      </div>
    </div>
  );
}

function TopIcon() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Top Icon">
      <Icon />
      <div className="bg-[#2a6ff3] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0" data-name="Button">
        <Container7 />
      </div>
    </div>
  );
}

function HeadingsInfo1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start not-italic relative shrink-0 w-full" data-name="Headings Info">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] relative shrink-0 text-[24px] text-white w-full">Pro</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#f2f2f2] text-[16px] w-full">For growing accounts. Full DM automation, follow-ups, and account warmup features.</p>
    </div>
  );
}

function Info1() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0 w-full" data-name="Info">
      <TopIcon />
      <HeadingsInfo1 />
    </div>
  );
}

function Pricing2() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-end leading-[0] not-italic relative shrink-0 text-white whitespace-nowrap" data-name="Pricing">
      <div className="flex flex-col justify-center relative shrink-0 text-[28px]">
        <p className="leading-[46px]">$20</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[22px]">
        <p className="leading-[36px]">/month</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[6px] h-[48px] items-center justify-center pl-[24px] pr-[12px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#2a6ff3] text-[16px] whitespace-nowrap">
        <p className="leading-[28px]" dir="auto">
          Get started
        </p>
      </div>
      <div className="relative shrink-0 size-[24px]" data-name="icon-arrow-right-small">
        <div className="absolute inset-[30.2%_13.54%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4993 9.50197">
            <path d={svgPaths.p30e92e00} fill="var(--fill-0, #2A6FF3)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonDisplay3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Button Display">
      <div className="bg-white content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 w-full" data-name="Button">
        <Container8 />
      </div>
    </div>
  );
}

function ButtonDisplay2() {
  return (
    <div className="content-stretch flex flex-col gap-[42px] items-start relative shrink-0 w-full" data-name="Button Display">
      <Pricing2 />
      <ButtonDisplay3 />
    </div>
  );
}

function TopContent1() {
  return (
    <div className="content-stretch flex flex-col gap-[42px] items-start relative shrink-0 w-full" data-name="Top content">
      <Info1 />
      <ButtonDisplay2 />
    </div>
  );
}

function Feature4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Feature">
      <div className="relative shrink-0 size-[20px]" data-name="Feature">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
            <g id="vector">
              <path d={svgPaths.p14be7480} fill="var(--fill-0, white)" />
              <path clipRule="evenodd" d={svgPaths.p1fa8c700} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">5000 dms per day</p>
    </div>
  );
}

function Feature5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Feature">
      <div className="relative shrink-0 size-[20px]" data-name="Feature">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
            <g id="vector">
              <path d={svgPaths.p14be7480} fill="var(--fill-0, white)" />
              <path clipRule="evenodd" d={svgPaths.p1fa8c700} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">{`Auto warmup `}</p>
    </div>
  );
}

function Feature6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Feature">
      <div className="relative shrink-0 size-[20px]" data-name="Feature">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
            <g id="vector">
              <path d={svgPaths.p14be7480} fill="var(--fill-0, white)" />
              <path clipRule="evenodd" d={svgPaths.p1fa8c700} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Humanize voice notes</p>
    </div>
  );
}

function Feature7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Feature">
      <div className="relative shrink-0 size-[20px]" data-name="Feature">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
            <g id="vector">
              <path d={svgPaths.p14be7480} fill="var(--fill-0, white)" />
              <path clipRule="evenodd" d={svgPaths.p1fa8c700} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">10+ accounts</p>
    </div>
  );
}

function Feature8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Feature">
      <div className="relative shrink-0 size-[20px]" data-name="Feature">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
            <g id="vector">
              <path d={svgPaths.p14be7480} fill="var(--fill-0, white)" />
              <path clipRule="evenodd" d={svgPaths.p1fa8c700} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Basic admin controls</p>
    </div>
  );
}

function Features1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Features">
      <Feature4 />
      <Feature5 />
      <Feature6 />
      <Feature7 />
      <Feature8 />
    </div>
  );
}

function PricingCard1() {
  return (
    <div className="bg-[#2a6ff3] w-full lg:flex-[1_0_0] min-h-px min-w-0 relative rounded-[32px]" data-name="Pricing Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[56px] items-start p-[36px] relative w-full">
          <div className="absolute flex h-[222.916px] items-center justify-center left-[107.08px] top-[-76.47px] w-[454.33px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-[6.47deg]">
              <div className="h-[174.764px] opacity-15 rounded-[88.716px] w-[437.431px]" data-name="Mesh" style={{ backgroundImage: "linear-gradient(179.172deg, rgb(42, 111, 243) 1.7394%, rgba(42, 111, 243, 0) 98.261%)" }} />
            </div>
          </div>
          <TopContent1 />
          <Features1 />
        </div>
      </div>
    </div>
  );
}

function HeadingsInfo2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[13px] items-start left-0 not-italic top-[81px] w-[333.333px]" data-name="Headings Info">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] min-w-full relative shrink-0 text-[#0d0d0d] text-[24px] w-[min-content]">Ultimate</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#5e5e5e] text-[16px] w-[282px]">{`Complete multi-account growth & analytics`}</p>
    </div>
  );
}

function Info2() {
  return (
    <div className="absolute h-[181px] left-[16.33px] top-[-0.21px] w-[333.333px]" data-name="Info">
      <HeadingsInfo2 />
      <div className="absolute inset-[4.27%_87.6%_69.76%_-2.6%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 47">
          <path d={svgPaths.p3b9a2280} fill="var(--fill-0, #2A6FF3)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Pricing3() {
  return (
    <div className="absolute content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-end leading-[0] left-[18.33px] not-italic text-[#181e25] top-[208.74px] whitespace-nowrap" data-name="Pricing">
      <div className="flex flex-col justify-center relative shrink-0 text-[28px]">
        <p className="leading-[46px]">$99</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[22px]">
        <p className="leading-[36px]">/month</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[6px] h-[48px] items-center pl-[12px] pr-[24px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#474747] text-[16px] whitespace-nowrap">
        <p className="leading-[28px]" dir="auto">
          Get started
        </p>
      </div>
    </div>
  );
}

function TopContent2() {
  return (
    <div className="absolute h-[593px] left-[36px] top-[36px] w-[333.333px]" data-name="Top content">
      <Info2 />
      <Pricing3 />
      <div className="absolute content-stretch flex items-center justify-center left-[17.33px] rounded-[8px] top-[297.79px] w-[321px]" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Container9 />
      </div>
    </div>
  );
}

function Feature9() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-0 top-0" data-name="Feature">
      <div className="relative shrink-0 size-[20px]" data-name="Feature">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
            <g id="vector">
              <path d={svgPaths.p14be7480} fill="var(--fill-0, #2A6FF3)" />
              <path clipRule="evenodd" d={svgPaths.p1fa8c700} fill="var(--fill-0, #2A6FF3)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#736969] text-[14px] whitespace-nowrap">5000 dms per day</p>
    </div>
  );
}

function Feature10() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-0 top-[48px]" data-name="Feature">
      <div className="relative shrink-0 size-[20px]" data-name="Feature">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
            <g id="vector">
              <path d={svgPaths.p14be7480} fill="var(--fill-0, #2A6FF3)" />
              <path clipRule="evenodd" d={svgPaths.p1fa8c700} fill="var(--fill-0, #2A6FF3)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] whitespace-nowrap">{`Auto warmup `}</p>
    </div>
  );
}

function Feature11() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-0 top-[96px]" data-name="Feature">
      <div className="relative shrink-0 size-[20px]" data-name="Feature">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
            <g id="vector">
              <path d={svgPaths.p14be7480} fill="var(--fill-0, #2A6FF3)" />
              <path clipRule="evenodd" d={svgPaths.p1fa8c700} fill="var(--fill-0, #2A6FF3)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#5e5e5e] text-[14px] whitespace-nowrap">Humanize voice notes</p>
    </div>
  );
}

function Features2() {
  return (
    <div className="absolute h-[120px] left-[60.33px] top-[442.79px] w-[333.333px]" data-name="Features">
      <Feature9 />
      <Feature10 />
      <Feature11 />
    </div>
  );
}

function PricingCard2() {
  return (
    <div className="bg-white w-full lg:flex-[1_0_0] h-[608px] min-h-px min-w-0 overflow-clip relative rounded-[32px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.1)]" data-name="Pricing Card">
      <div className="absolute flex h-[192.027px] items-center justify-center left-[90.33px] top-[-75.27px] w-[360.382px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[6.47deg]">
          <div className="h-[154.128px] opacity-10 rounded-[88.716px] w-[345.22px]" data-name="Mesh" style={{ backgroundImage: "linear-gradient(179.075deg, rgb(42, 111, 243) 1.7394%, rgba(42, 111, 243, 0) 98.261%)" }} />
        </div>
      </div>
      <TopContent2 />
      <Features2 />
    </div>
  );
}

function PricingCards() {
  return (
    <StaggerContainer className="flex flex-col lg:flex-row gap-[32px] items-center justify-center relative shrink-0 w-full" staggerDelay={0.15}>
      <StaggerItem><PricingCard /></StaggerItem>
      <StaggerItem><PricingCard1 /></StaggerItem>
      <StaggerItem><PricingCard2 /></StaggerItem>
    </StaggerContainer>
  );
}

function PricingPlans() {
  return (
    <div className="relative shrink-0 w-full" data-name="Pricing & Plans">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-[32px] items-center px-4 sm:px-8 lg:px-[80px] relative w-full">
          <ScrollReveal variant="fadeUp">
            <Hero1 />
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.2}>
            <TooglePlan />
          </ScrollReveal>
          <PricingCards />
        </div>
      </div>
    </div>
  );
}

function Group103() {
  return (
    <div className="absolute left-[431px] size-[574px] top-[225px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 574 574">
        <g id="Group 342">
          <g id="Group 319">
            <g id="Series 9">
              <mask fill="black" height="223.532" id="path-1-outside-1_1_4277" maskUnits="userSpaceOnUse" width="206.79" x="81.0699" y="77.8672">
                <rect fill="white" height="223.532" width="206.79" x="81.0699" y="77.8672" />
                <path d={svgPaths.p2c3fe600} />
              </mask>
              <path d={svgPaths.p2c3fe600} fill="var(--fill-0, #F31705)" />
              <path d={svgPaths.p2c3fe600} mask="url(#path-1-outside-1_1_4277)" stroke="var(--stroke-0, white)" strokeWidth="5.28421" />
            </g>
            <path d={svgPaths.p3844d000} fill="var(--fill-0, #2196F3)" id="Series 10" />
            <path d={svgPaths.p7399180} fill="var(--fill-0, #2196F3)" id="Series 11" />
            <path d={svgPaths.p1c196e00} fill="var(--fill-0, #2196F3)" id="Ellipse" />
          </g>
          <circle cx="287" cy="287" id="Ellipse 80" r="286" stroke="var(--stroke-0, #D6E2F8)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-white h-[64px] left-[60px] overflow-clip rounded-[32px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.1)] top-[78.58px] w-[275px]" data-name=".">
      <div className="absolute flex h-[211.396px] items-center justify-center left-[-56px] top-[-108px] w-[424.96px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[6.47deg]">
          <div className="h-[166.413px] opacity-40 rounded-[88.716px] w-[408.819px]" data-name="Mesh" style={{ backgroundImage: "linear-gradient(179.156deg, rgb(42, 111, 243) 1.7394%, rgba(42, 111, 243, 0) 98.261%)" }} />
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[36px] left-[47px] not-italic opacity-70 text-[20px] text-black top-[15px] w-[253px]">{`Problem & Solutions`}</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-start left-[60px] not-italic top-[223px] w-[343px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[78px] relative shrink-0 text-[#0d0d0d] text-[48px] w-full">Problem</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] opacity-70 relative shrink-0 text-[#5e5e5e] text-[20px] w-full">Manual Instagram outreach is time-consuming, inconsistent, and hard to scale.</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7px] items-start left-[1086px] not-italic top-[223px] w-[339px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[78px] relative shrink-0 text-[#0d0d0d] text-[48px] w-full">Solution 1</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] opacity-70 relative shrink-0 text-[#5e5e5e] text-[20px] w-full">Identify ideal prospects from followers, likers, and hashtags.</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[13px] items-start left-[1086px] not-italic top-[675px] w-[294px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[78px] relative shrink-0 text-[#0d0d0d] text-[48px] w-full">Solution 2</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] opacity-70 relative shrink-0 text-[#5e5e5e] text-[20px] w-full">Monitor campaign activity and response rates instantly.</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start left-[60px] not-italic top-[675px] w-[329px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[78px] relative shrink-0 text-[#0d0d0d] text-[48px] w-full">Solution 3</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] opacity-70 relative shrink-0 text-[#5e5e5e] text-[20px] w-full">Automate personalized DMs with smart follow-ups.</p>
    </div>
  );
}

function Group107() {
  return (
    <div className="absolute inset-[34.92%_35.95%_61.65%_61.25%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.3334 33">
        <g id="Group 2461">
          <path d={svgPaths.p1122d380} fill="var(--fill-0, #2196F3)" id="Vector" />
          <path d={svgPaths.p3c2d6a00} fill="var(--fill-0, #2196F3)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Varient() {
  return (
    <div className="bg-white overflow-hidden relative shrink-0 w-full" data-name="varient 2">
      <FigmaScale width={1440} height={961}>
        <div className="relative w-full h-full">
      <Group103 />
      <Component />
      <div className="absolute inset-[33.36%_60.83%_62.73%_36.39%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 37.5391">
          <path clipRule="evenodd" d={svgPaths.p3ce66a80} fill="var(--fill-0, #EB4335)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame22 />
      <div className="absolute inset-[51.05%_48.33%_44.27%_48.54%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
          <path d={svgPaths.p311e39f0} fill="var(--fill-0, #BFD4FB)" id="Vector" />
        </svg>
      </div>
      <Group107 />
      <div className="absolute inset-[68.84%_36.46%_27.83%_61.11%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 32">
          <path d={svgPaths.p1b0078f0} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[60.74%_23.55%_39.19%_76.39%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[69.05%_60.83%_27.31%_36.46%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 35">
          <path d={svgPaths.p915dd00} fill="var(--fill-0, #2196F3)" id="Vector" />
        </svg>
      </div>
        </div>
      </FigmaScale>
    </div>
  );
}

function Hero2() {
  return (
    <div className="flex flex-col gap-[24px] items-center not-italic overflow-clip text-center w-full px-4 sm:px-8 lg:px-0 mb-8" data-name="Hero">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-tight lg:leading-[78px] relative shrink-0 text-[#0d0d0d] text-3xl sm:text-4xl lg:text-[55px]">How it works : 2 simple steps</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-relaxed lg:leading-[36px] opacity-70 relative shrink-0 text-[#5e5e5e] text-base lg:text-[20px] w-full max-w-[800px]">Launch and automate your Instagram outreach in just three simple steps</p>
    </div>
  );
}

function Group87() {
  return (
    <div className="absolute contents left-[197px] top-[484.58px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[60px] leading-[78px] left-[262px] not-italic text-[16px] text-center text-white top-[484.58px] w-[130px]">Targeting</p>
    </div>
  );
}

function Group88() {
  return (
    <div className="absolute contents left-[197px] top-[484.58px]">
      <Group87 />
    </div>
  );
}

function Group92() {
  return (
    <div className="absolute contents left-[875px] top-[502.58px]">
      <div className="absolute border border-[#d8eeff] border-solid h-[52px] left-[875px] rounded-[10px] top-[514.58px] w-[263px]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium h-[60px] leading-[78px] left-[1010px] not-italic text-[#2a6ff3] text-[16px] text-center top-[502.58px] w-[158px]">Second follow up</p>
      <div className="absolute left-[908px] size-[23px] top-[528.58px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <path d={svgPaths.p20146200} id="Vector" stroke="var(--stroke-0, #2A6FF3)" />
        </svg>
      </div>
    </div>
  );
}

function Group90() {
  return (
    <div className="absolute contents left-[1041px] top-[199.58px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[60px] leading-[78px] left-[1099.5px] not-italic text-[#2a6ff3] text-[14px] text-center top-[199.58px] w-[73px]">Followers</p>
      <div className="absolute border border-[#bde3ff] border-solid h-[35px] left-[1041px] rounded-[5px] top-[220.58px] w-[114px]" />
    </div>
  );
}

function Group89() {
  return (
    <div className="absolute contents left-[861px] top-[200.58px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[47px] leading-[78px] left-[933.5px] not-italic text-[#2a6ff3] text-[12px] text-center top-[200.58px] w-[95px]">@johnsteven</p>
      <div className="absolute border border-[#bde3ff] border-solid h-[35px] left-[861px] rounded-[5px] top-[221.58px] w-[114px]" />
      <div className="absolute left-[863px] size-[30px] top-[224.58px]" data-name="Profile picture-online">
        <div className="absolute inset-0 rounded-[80px]" data-name="Picture">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[80px] size-full" src={imgPicture} />
        </div>
      </div>
    </div>
  );
}

function Group91() {
  return (
    <div className="absolute h-[18px] left-[922px] top-[255.58px] w-[177px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 177 18">
        <g id="Group 330">
          <line id="Line 1" stroke="var(--stroke-0, #5E5E5E)" strokeOpacity="0.5" x1="0.500002" x2="0.5" y1="3" y2="17" />
          <line id="Line 2" stroke="var(--stroke-0, #5E5E5E)" strokeOpacity="0.5" x1="176.5" x2="176.5" y1="2.18557e-08" y2="17" />
          <line id="Line 3" stroke="var(--stroke-0, #5E5E5E)" strokeOpacity="0.4" x1="1.02455e-06" x2="177" y1="17.5" y2="17.5" />
        </g>
      </svg>
    </div>
  );
}

function Group109() {
  return (
    <div className="absolute contents left-[801px] top-[182.58px]">
      <div className="absolute bg-white border border-[#e9f5fe] border-solid h-[440px] left-[801px] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(94,94,94,0.4)] top-[182.58px] w-[410px]" />
      <div className="absolute bg-[#2a6ff3] h-[52px] left-[875px] rounded-[10px] top-[294.58px] w-[263px]" />
      <div className="absolute border border-[#ceeaff] border-solid h-[53px] left-[875px] rounded-[10px] top-[405.58px] w-[263px]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[60px] leading-[78px] left-[1019px] not-italic text-[16px] text-center text-white top-[280.58px] w-[130px]">Initial message</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium h-[60px] leading-[78px] left-[1008px] not-italic text-[#2a6ff3] text-[16px] text-center top-[391.58px] w-[130px]">First follow up</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[60px] leading-[78px] left-[1012px] not-italic text-[14px] text-[rgba(94,94,94,0.7)] text-center top-[323.58px] w-[130px]">2 days</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[60px] leading-[78px] left-[1012px] not-italic text-[14px] text-[rgba(94,94,94,0.7)] text-center top-[433.58px] w-[130px]">3 days</p>
      <div className="absolute left-[913px] size-[23px] top-[309.58px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <path d={svgPaths.p20146200} id="Vector" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <div className="absolute left-[913px] size-[23px] top-[421.58px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <path d={svgPaths.p20146200} id="Vector" stroke="var(--stroke-0, #2A6FF3)" />
        </svg>
      </div>
      <Group92 />
      <div className="absolute flex h-[17px] items-center justify-center left-[1012px] top-[376.58px] w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[17px]">
            <div className="absolute inset-[-3.68px_-2.94%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 7.36396">
                <path d={svgPaths.p36a06b80} fill="var(--stroke-0, black)" fillOpacity="0.4" id="Arrow 1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-[1010px] top-[274.58px] w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[16px]">
            <div className="absolute inset-[-3.68px_-3.13%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 7.36396">
                <path d={svgPaths.p38054d80} fill="var(--stroke-0, black)" fillOpacity="0.4" id="Arrow 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[18px] items-center justify-center left-[1012px] top-[487.58px] w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[18px]">
            <div className="absolute inset-[-3.68px_-2.78%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 7.36396">
                <path d={svgPaths.pefaea80} fill="var(--stroke-0, black)" fillOpacity="0.4" id="Arrow 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Group90 />
      <Group89 />
      <Group91 />
    </div>
  );
}

function Group93() {
  return (
    <div className="absolute contents left-[7px] top-[15px]">
      <div className="absolute left-[7px] size-[36px] top-[15px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #2A6FF3)" id="Ellipse 91" r="18" />
        </svg>
      </div>
      <div className="absolute left-[13px] size-[24px] top-[21px]" data-name="Icon Check">
        <div className="absolute inset-[26.04%_17.71%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5009 11.501">
            <path d={svgPaths.p3a792f80} fill="var(--fill-0, white)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group94() {
  return (
    <div className="absolute contents left-[6px] top-px">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[48px] not-italic text-[#303030] text-[15px] top-[24px] whitespace-nowrap">
        <p className="leading-[44px]">900+</p>
      </div>
      <Group93 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute border border-[rgba(42,111,243,0.5)] border-solid h-[71px] left-[229px] overflow-clip rounded-[10px] top-[329.58px] w-[151px]">
      <Group94 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-[46px] not-italic text-[#1b3d1c] text-[12px] top-[32px] w-[116px]">Active accounts</p>
    </div>
  );
}

function Frame11() {
  return <div className="absolute border border-[rgba(42,111,243,0.5)] border-solid h-[71px] left-[417px] rounded-[10px] top-[329.58px] w-[151px]" />;
}

function Group96() {
  return (
    <div className="absolute contents left-[7px] top-[15px]">
      <div className="absolute left-[7px] size-[36px] top-[15px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #2A6FF3)" id="Ellipse 91" r="18" />
        </svg>
      </div>
      <div className="absolute left-[13px] size-[24px] top-[21px]" data-name="Icon Check" />
    </div>
  );
}

function Group95() {
  return (
    <div className="absolute contents left-[6px] top-px">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[48px] not-italic text-[#303030] text-[0px] top-[24px] whitespace-nowrap">
        <p>
          <span className="leading-[44px] text-[15px]">12</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[44px] not-italic text-[10px]">/35</span>
        </p>
      </div>
      <Group96 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute border border-[rgba(42,111,243,0.5)] border-solid h-[71px] left-[426px] overflow-clip rounded-[10px] top-[454.58px] w-[151px]">
      <Group95 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-[46px] not-italic text-[#1b3d1c] text-[12px] top-[32px] w-[116px]">Up coming tasks</p>
      <div className="absolute left-[15px] size-[17.917px] top-[23px]" data-name="vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
          <g id="vector">
            <path d={svgPaths.p1cb78880} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p3b194000} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Component1() {
  return <div className="absolute bg-[#2a6ff3] h-[36px] left-[306px] rounded-[10px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.1)] top-[253.58px] w-[202px]" data-name="." />;
}

function Group101() {
  return (
    <div className="absolute contents left-[282px] top-[231.58px]">
      <Component1 />
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[60px] leading-[78px] left-[407.5px] not-italic text-[13px] text-center text-white top-[231.58px] w-[251px]">Campaign Management</p>
    </div>
  );
}

function Group99() {
  return (
    <div className="absolute h-[56.849px] left-[432px] top-[326.73px] w-[36px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 56.8491">
        <g id="Group 332">
          <circle cx="18" cy="38.8491" fill="var(--fill-0, #2A6FF3)" id="Ellipse 91" r="18" />
          <g id="vector">
            <path d={svgPaths.p11b0c000} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p9bf9200} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.p9b51cf0} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p3c09d680} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
          <g id="vector_2">
            <path d={svgPaths.p70c4ea0} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p349c6000} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.p1ca32470} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p3238a300} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group98() {
  return (
    <div className="absolute contents left-[432px] top-[326.73px]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[473px] not-italic text-[#303030] text-[0px] top-[356.58px] whitespace-nowrap">
        <p>
          <span className="leading-[44px] text-[15px]">12</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[44px] not-italic text-[10px]">/35</span>
        </p>
      </div>
      <Group99 />
    </div>
  );
}

function Group97() {
  return (
    <div className="absolute contents left-[432px] top-[326.73px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-[473px] not-italic text-[#1b3d1c] text-[12px] top-[362.58px] w-[116px]">Tasks pending</p>
      <Group98 />
    </div>
  );
}

function Group102() {
  return (
    <div className="absolute contents left-[9px] top-[18px]">
      <div className="absolute left-[9px] size-[36px] top-[18px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #2A6FF3)" id="Ellipse 91" r="18" />
        </svg>
      </div>
      <div className="absolute left-[15px] size-[24px] top-[24px]" data-name="Icon Check" />
    </div>
  );
}

function Group100() {
  return (
    <div className="absolute contents left-[8px] top-[14px]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[50px] not-italic text-[#0d0d0d] text-[15px] top-[27px] tracking-[-0.3px] whitespace-nowrap">
        <p className="leading-[1.6]">320%</p>
      </div>
      <Group102 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute border border-[rgba(42,111,243,0.5)] border-solid h-[71px] left-[229px] overflow-clip rounded-[10px] top-[453.58px] w-[151px]">
      <Group100 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.6] left-[46px] not-italic text-[12px] text-black top-[36px] tracking-[-0.24px] w-[189px]">Avg. Growth Rate</p>
      <div className="absolute left-[16px] size-[20px] top-[26px]" data-name="vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="vector">
            <path d={svgPaths.p34000500} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p1afd23f0} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group108() {
  return (
    <div className="absolute contents left-[198px] top-[171.58px]">
      <div className="absolute bg-white border border-[#e9f5fe] border-solid h-[440px] left-[198px] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(94,94,94,0.4)] top-[180.58px] w-[406px]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[60px] leading-[78px] left-[536px] not-italic text-[10px] text-[rgba(94,94,94,0.7)] text-center top-[171.58px] w-[130px]">{` Last 30 days`}</p>
      <Frame8 />
      <Frame11 />
      <Frame10 />
      <Group101 />
      <div className="absolute inset-[24.23%_65.21%_74.63%_34.03%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 9.78585">
          <path d={svgPaths.p2b836400} fill="var(--fill-0, #5E5E5E)" fillOpacity="0.5" id="Vector" />
        </svg>
      </div>
      <Group97 />
      <Frame9 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[830px] not-italic pb-[12px] text-center top-[617.58px] w-[373px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[78px] min-w-full relative shrink-0 text-[25px] text-black w-[min-content]">Write Your Outreach Sequence</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] opacity-70 relative shrink-0 text-[#5e5e5e] text-[16px] w-[334px]">Write DMs and schedule follow-ups effortlessly.</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[223px] not-italic pb-[12px] text-center top-[617.58px] w-[352px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[78px] relative shrink-0 text-[25px] text-black w-full">Generate Leads on Autopilot</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] opacity-70 relative shrink-0 text-[#5e5e5e] text-[16px] w-full">Automate campaigns and track results in real time</p>
    </div>
  );
}

function Steps() {
  return (
    <div className="overflow-hidden relative shrink-0 w-full max-w-[1440px] mx-auto" data-name="steps">
      <Hero2 />
      <FigmaScale width={1280} height={700}>
        <div className="relative w-full h-full">
          <Group88 />
          <Group109 />
          <Group108 />
          <div className="absolute flex inset-[24.57%_59.65%_74.94%_39.79%] items-center justify-center">
            <div className="flex-none h-[7.999px] rotate-[-88.62deg] skew-x-[0.46deg] w-[4.078px]">
              <div className="relative size-full" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.07783 7.99948">
                  <path d={svgPaths.p3fa4c80} fill="var(--fill-0, #5E5E5E)" fillOpacity="0.5" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <Frame24 />
          <Frame23 />
        </div>
      </FigmaScale>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-end not-italic overflow-clip relative shrink-0 text-center w-full" data-name="Title">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-tight lg:leading-[78px] w-full relative shrink-0 text-[#0d0d0d] text-3xl sm:text-4xl lg:text-[48px]">Frequently Asked Questions</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-relaxed lg:leading-[36px] opacity-70 relative shrink-0 text-[#5e5e5e] text-base lg:text-[20px] w-full max-w-[800px]">We’ve gathered some frequently asked questions to help you get started quickly and make the most of the platform.</p>
    </div>
  );
}

function IconWrapper() {
  return (
    <div className="content-stretch flex items-center p-[6px] relative rounded-[50px] shrink-0" data-name="Icon Wrapper">
      <div className="relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[12.5%_12.5%_12.49%_12.5%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0001 18.0027">
            <g id="vector">
              <path d={svgPaths.p1beba080} fill="var(--fill-0, #2A6FF3)" />
              <path d={svgPaths.p26e41c00} fill="var(--fill-0, #2A6FF3)" />
              <path d={svgPaths.p36c69d00} fill="var(--fill-0, #2A6FF3)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TilteWrapper() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center min-h-px min-w-px relative" data-name="Tilte wrapper">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#2a6ff3] text-[20px] text-left whitespace-nowrap">Is using this tool safe for my Instagram account ?</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center px-[8px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="relative shrink-0 size-[16px]" data-name="icon-minus">
        <div className="absolute inset-[46.88%_17.71%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3333 1">
            <path d={svgPaths.p3658500} fill="var(--fill-0, white)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Heading">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <TilteWrapper />
      </div>
      <div className="bg-[#2a6ff3] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 w-[32px]" data-name="Button">
        <Container10 />
      </div>
    </div>
  );
}

function Texts() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-px min-w-px relative" data-name="Texts">
      <Heading />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#303030] text-[16px] text-left w-full">Yes! Our system simulates human-like behavior with smart delays, activity limits, and built-in safety controls to minimize risk</p>
    </div>
  );
}

function IconWrapper1() {
  return (
    <div className="content-stretch flex items-center p-[6px] relative rounded-[50px] shrink-0" data-name="Icon Wrapper">
      <div className="relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[9.38%_5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 19.5">
            <g id="vector">
              <path d={svgPaths.p3459da80} fill="var(--fill-0, #757575)" />
              <path d={svgPaths.p9746f80} fill="var(--fill-0, #757575)" />
              <path d={svgPaths.p317292c0} fill="var(--fill-0, #757575)" />
              <path clipRule="evenodd" d={svgPaths.pdee1700} fill="var(--fill-0, #757575)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ComplexTitle() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Complex Title">
      <IconWrapper1 />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#303030] text-[20px] text-left whitespace-nowrap">Can I manage multiple Instagram accounts?</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center px-[8px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="relative shrink-0 size-[16px]" data-name="icon-plus">
        <div className="absolute inset-[17.71%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3333 10.3333">
            <path d={svgPaths.p36fe5c00} fill="var(--fill-0, #474747)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Heading">
      <ComplexTitle />
      <div className="bg-[#f2f2f2] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 w-[32px]" data-name="Button">
        <Container11 />
      </div>
    </div>
  );
}

function IconWrapper2() {
  return (
    <div className="content-stretch flex items-center p-[6px] relative rounded-[50px] shrink-0" data-name="Icon Wrapper">
      <div className="relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[5.21%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
            <g id="vector">
              <path d={svgPaths.p20e3da80} fill="var(--fill-0, #757575)" />
              <path d={svgPaths.p2070a900} fill="var(--fill-0, #757575)" />
              <path clipRule="evenodd" d={svgPaths.p12a38600} fill="var(--fill-0, #757575)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ComplexTitle1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Complex Title">
      <IconWrapper2 />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#303030] text-[20px] text-left whitespace-nowrap">Can I automate DMs and follow-ups??</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center px-[8px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="relative shrink-0 size-[16px]" data-name="icon-plus">
        <div className="absolute inset-[17.71%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3333 10.3333">
            <path d={svgPaths.p36fe5c00} fill="var(--fill-0, #474747)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Heading">
      <ComplexTitle1 />
      <div className="bg-[#f2f2f2] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 w-[32px]" data-name="Button">
        <Container12 />
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] isolate items-start min-h-px min-w-px relative" data-name="Column">
      <button className="bg-white relative rounded-[16px] shrink-0 w-full z-[3]" data-name="Accordion">
        <div aria-hidden="true" className="absolute border-2 border-[#2a6ff3] border-solid inset-[-1px] pointer-events-none rounded-[17px]" />
        <div className="content-stretch flex gap-[8px] items-start p-[24px] relative w-full">
          <IconWrapper />
          <Texts />
        </div>
      </button>
      <button className="bg-white relative rounded-[16px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.08)] shrink-0 w-full z-[2]" data-name="Accordion">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative w-full">
            <Heading1 />
          </div>
        </div>
      </button>
      <button className="bg-white relative rounded-[16px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.08)] shrink-0 w-full z-[1]" data-name="Accordion">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative w-full">
            <Heading2 />
          </div>
        </div>
      </button>
    </div>
  );
}

function IconWrapper3() {
  return (
    <div className="content-stretch flex items-center p-[6px] relative rounded-[50px] shrink-0" data-name="Icon Wrapper">
      <div className="relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[5.24%_9.37%_5.21%_9.38%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.501 21.4921">
            <g id="vector">
              <path d={svgPaths.p1dcd4680} fill="var(--fill-0, #757575)" />
              <path clipRule="evenodd" d={svgPaths.p1edaea00} fill="var(--fill-0, #757575)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ComplexTitle2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Complex Title">
      <IconWrapper3 />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#303030] text-[20px] text-left whitespace-nowrap">Is my data secure and private ?</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center px-[8px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="relative shrink-0 size-[16px]" data-name="icon-plus">
        <div className="absolute inset-[17.71%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3333 10.3333">
            <path d={svgPaths.p36fe5c00} fill="var(--fill-0, #474747)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Heading">
      <ComplexTitle2 />
      <div className="bg-[#f2f2f2] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 w-[32px]" data-name="Button">
        <Container13 />
      </div>
    </div>
  );
}

function IconWrapper4() {
  return (
    <div className="content-stretch flex items-center p-[6px] relative rounded-[50px] shrink-0" data-name="Icon Wrapper">
      <div className="relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[9.38%_17.71%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5 19.5">
            <g id="vector">
              <path d={svgPaths.p13a13e80} fill="var(--fill-0, #757575)" />
              <path d={svgPaths.p25f5600} fill="var(--fill-0, #757575)" />
              <path clipRule="evenodd" d={svgPaths.p1bf74c80} fill="var(--fill-0, #757575)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ComplexTitle3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Complex Title">
      <IconWrapper4 />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#303030] text-[20px] text-left whitespace-nowrap">Do I need to install anything on my computer?</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center px-[8px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="relative shrink-0 size-[16px]" data-name="icon-plus">
        <div className="absolute inset-[17.71%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3333 10.3333">
            <path d={svgPaths.p36fe5c00} fill="var(--fill-0, #474747)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Heading">
      <ComplexTitle3 />
      <div className="bg-[#f2f2f2] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 w-[32px]" data-name="Button">
        <Container14 />
      </div>
    </div>
  );
}

function IconWrapper5() {
  return (
    <div className="content-stretch flex items-center p-[6px] relative rounded-[50px] shrink-0" data-name="Icon Wrapper">
      <div className="relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[17.71%_9.38%_13.54%_9.38%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 16.5">
            <g id="vector">
              <path clipRule="evenodd" d={svgPaths.p44d5c00} fill="var(--fill-0, #757575)" fillRule="evenodd" />
              <path d={svgPaths.p3036db80} fill="var(--fill-0, #757575)" />
              <path d={svgPaths.p275accc0} fill="var(--fill-0, #757575)" />
              <path clipRule="evenodd" d={svgPaths.p37528100} fill="var(--fill-0, #757575)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ComplexTitle4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Complex Title">
      <IconWrapper5 />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#303030] text-[20px] text-left whitespace-nowrap">Can I upgrade or downgrade my plan at any time ?</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center px-[8px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="relative shrink-0 size-[16px]" data-name="icon-plus">
        <div className="absolute inset-[17.71%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3333 10.3333">
            <path d={svgPaths.p36fe5c00} fill="var(--fill-0, #474747)" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Heading">
      <ComplexTitle4 />
      <div className="bg-[#f2f2f2] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 w-[32px]" data-name="Button">
        <Container15 />
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] isolate items-start min-h-px min-w-px relative" data-name="Column">
      <button className="bg-white relative rounded-[16px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.08)] shrink-0 w-full z-[3]" data-name="Accordion">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative w-full">
            <Heading3 />
          </div>
        </div>
      </button>
      <button className="bg-white relative rounded-[16px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.08)] shrink-0 w-full z-[2]" data-name="Accordion">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative w-full">
            <Heading4 />
          </div>
        </div>
      </button>
      <button className="bg-white relative rounded-[16px] shadow-[2px_2px_7px_0px_rgba(65,74,83,0.08)] shrink-0 w-full z-[1]" data-name="Accordion">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative w-full">
            <Heading5 />
          </div>
        </div>
      </button>
    </div>
  );
}

function Accordions() {
  return (
    <div className="flex flex-col lg:flex-row cursor-pointer gap-[24px] min-h-[410px] items-start justify-center relative shrink-0 w-full" data-name="Accordions">
      <Column />
      <Column1 />
    </div>
  );
}

function Faq() {
  return (
    <div className="min-h-[613px] relative shrink-0 w-full" data-name="FAQ">
      <div className="flex flex-col gap-[32px] items-start px-4 sm:px-8 lg:px-[80px] relative w-full">
        <ScrollReveal variant="fadeUp">
          <Title />
        </ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <Accordions />
        </ScrollReveal>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute content-stretch flex items-center left-[67px] p-[10px] top-[76.58px]">
      <div className="bg-[#e9f5fe] h-[467px] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(94,94,94,0.4)] shrink-0 w-[375px]" />
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute content-stretch flex items-center left-[67px] p-[10px] top-[669.58px]">
      <div className="bg-[#2a6ff3] h-[467px] relative rounded-[32px] shrink-0 w-[375px]">
        <div aria-hidden="true" className="absolute border border-[#2a6ff3] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_4px_4px_0px_rgba(94,94,94,0.4)]" />
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute content-stretch flex items-center left-[526px] p-[10px] top-[669.58px]">
      <div className="bg-[#e9f5fe] h-[467px] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(94,94,94,0.4)] shrink-0 w-[375px]" />
    </div>
  );
}

function Group105() {
  return (
    <div className="absolute contents left-[526px] top-[669.58px]">
      <Frame32 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex items-center left-[991px] top-[86.58px]">
      <div className="bg-[#e9f5fe] h-[467px] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(94,94,94,0.4)] shrink-0 w-[375px]" />
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute content-stretch flex items-center left-[987px] p-[10px] top-[669.58px]">
      <div className="bg-[#2a6ff3] h-[467px] relative rounded-[32px] shrink-0 w-[375px]">
        <div aria-hidden="true" className="absolute border border-[#2a6ff3] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_4px_4px_0px_rgba(94,94,94,0.4)]" />
      </div>
    </div>
  );
}

function Group106() {
  return (
    <div className="absolute contents left-[987px] top-[669.58px]">
      <Frame34 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-[77px] top-[77.58px] w-[373px]">
      <div className="h-[301px] relative shrink-0 w-full" data-name="Laptop screen with analytics dashboard, Stock trading and online investing">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[123.39%] left-[-7.07%] max-w-none top-0 w-[102.87%]" src={imgLaptopScreenWithAnalyticsDashboardStockTradingAndOnlineInvesting} />
        </div>
      </div>
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[39px] not-italic relative shrink-0 text-[#2a6ff3] text-[20px] w-[345px]">How Instagram Automation Can Save You 10+ Hours Every Week</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute content-stretch flex items-center left-[526px] p-[10px] top-[76.58px]">
      <div className="bg-[#2a6ff3] h-[467px] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(94,94,94,0.4)] shrink-0 w-[375px]" />
    </div>
  );
}

function Group104() {
  return (
    <div className="absolute contents left-[526px] top-[76.58px]">
      <Frame27 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[31px] items-start left-[554px] top-[101.58px] w-[344px]">
      <div className="h-[286px] relative shrink-0 w-full" data-name="email marketing and newsletter with new message">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgEmailMarketingAndNewsletterWithNewMessage} />
      </div>
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[39px] not-italic relative shrink-0 text-[20px] text-white w-[351px]">Common Instagram Outreach Mistakes That Kill Your Reply Rate</p>
    </div>
  );
}

function Group110() {
  return (
    <div className="absolute contents left-[526px] top-[76.58px]">
      <Group104 />
      <Frame28 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute content-stretch flex flex-col h-[476px] items-end left-[978px] pb-[5px] top-[77.58px] w-[394px]">
      <div className="h-[358px] mb-[-5px] relative rounded-[7px] shrink-0 w-[382px]" data-name="artificial intelligence analytics on tablet screen">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[7px] size-full" src={imgArtificialIntelligenceAnalyticsOnTabletScreen} />
      </div>
      <p className="font-['Inter:Bold',sans-serif] font-bold h-[74px] leading-[39px] not-italic relative shrink-0 text-[#2a6ff3] text-[20px] w-[345px]">How Agencies Use Instagram Automation to Get More Clients</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute content-stretch flex flex-col h-[434px] items-start left-[1015px] pb-[33px] top-[679.58px] w-[347px]">
      <div className="h-[374px] mb-[-33px] relative shrink-0 w-full" data-name="Tablet dashboard with charts and graphs, Business performance monitoring">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgTabletDashboardWithChartsAndGraphsBusinessPerformanceMonitoring} />
      </div>
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[39px] not-italic relative shrink-0 text-[20px] text-white w-[351px]">How Automated Follow-Ups Increase Instagram Replies</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[13px] items-start left-[564px] top-[701.58px] w-[345px]">
      <div className="h-[297px] relative shrink-0 w-[305px]" data-name="searching the web on tablet">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgSearchingTheWebOnTablet} />
      </div>
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[39px] min-w-full not-italic relative shrink-0 text-[#2a6ff3] text-[20px] w-[min-content]">Instagram Outreach vs Paid Ads: Which One Works Better?</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="absolute content-stretch flex flex-col h-[419px] items-start left-[95px] pb-[36px] top-[679.58px] w-[359px]">
      <div className="h-[377px] mb-[-36px] relative shrink-0 w-[336px]" data-name="Searching for file in blue folder">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgSearchingForFileInBlueFolder} />
      </div>
      <p className="font-['Inter:Bold',sans-serif] font-bold h-[82px] leading-[39px] not-italic relative shrink-0 text-[20px] text-white w-full">Top Instagram Lead Generation Strategies for 2026</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-white overflow-hidden relative shrink-0 w-full">
      <FigmaScale width={1440} height={1211}>
        <div className="relative w-full h-full">
          <Frame25 />
          <Frame30 />
          <Group105 />
          <Frame />
          <Group106 />
          <Frame26 />
          <Group110 />
          <Frame29 />
          <div className="absolute left-[2465px] size-[736px] top-[-182.42px]" data-name="solving a mental health problem">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgSolvingAMentalHealthProblem} />
          </div>
          <Frame35 />
          <Frame33 />
          <Frame31 />
        </div>
      </FigmaScale>
    </div>
  );
}

function FooterColumnContent() {
  return <div className="h-[48px] shrink-0 w-full" data-name="Footer Column Content" />;
}

function Container16() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#919191] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[10px] py-[16px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="icon-envelope">
            <div className="absolute inset-[17.71%_9.38%_13.54%_9.38%]" data-name="vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.25 13.75">
                <g id="vector">
                  <path d={svgPaths.p2ce63780} fill="var(--fill-0, #919191)" />
                  <path clipRule="evenodd" d={svgPaths.p34d57400} fill="var(--fill-0, #919191)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#919191] text-[14px] text-ellipsis whitespace-nowrap">Enter your email</p>
        </div>
      </div>
    </div>
  );
}

function TextField() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Text field">
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center px-[16px] relative rounded-[8px] shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[24px]" dir="auto">
          Subscribe Now
        </p>
      </div>
    </div>
  );
}

function FooterButton() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Footer Button">
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Input">
        <TextField />
      </div>
      <div className="bg-[#2a6ff3] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0" data-name="Button">
        <Container17 />
      </div>
    </div>
  );
}

function FooterColumn() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-between relative shrink-0 w-[455px]" data-name="Footer Column">
      <FooterColumnContent />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#474747] text-[14px] w-[455px]">Orbitask was built for the way we work today. We create smarter, more connected workspaces around the world.</p>
      <FooterButton />
    </div>
  );
}

function FooterColumnLinks() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start leading-[0] relative shrink-0 text-[#474747] text-[14px] w-full" data-name="Footer Column Links">
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[24px]">Features</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[24px]">For Teams</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[24px]">Learn</p>
      </div>
      <a href="/pricing" className="flex flex-col justify-center relative shrink-0 w-full cursor-pointer hover:text-[#2a6ff3] transition-colors">
        <p className="leading-[24px]">Pricing</p>
      </a>
    </div>
  );
}

function FooterColumnContent1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Footer Column Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[#0d0d0d] text-[20px] w-full">Product</p>
      <FooterColumnLinks />
    </div>
  );
}

function FooterColumnLinks1() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start leading-[0] relative shrink-0 text-[#474747] text-[14px] w-full" data-name="Footer Column Links">
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[24px]">{`Overview & Updates`}</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[24px]">{`Guides & Tutorials`}</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[24px]">{`Overview & Updates`}</p>
      </div>
    </div>
  );
}

function FooterColumn2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Footer Column">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[#0d0d0d] text-[20px] w-full">Company</p>
      <FooterColumnLinks1 />
    </div>
  );
}

function FooterColumnLinks2() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start leading-[0] relative shrink-0 text-[#474747] text-[14px] w-full" data-name="Footer Column Links">
      <a href="/terms-and-conditions" className="flex flex-col justify-center relative shrink-0 w-full cursor-pointer hover:text-[#2a6ff3] transition-colors">
        <p className="leading-[24px]">Privacy Policy</p>
      </a>
      <a href="/terms-and-conditions" className="flex flex-col justify-center relative shrink-0 w-full cursor-pointer hover:text-[#2a6ff3] transition-colors">
        <p className="leading-[24px]">{`Terms & Conditions`}</p>
      </a>
    </div>
  );
}

function FooterColumn3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Footer Column">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[#0d0d0d] text-[20px] w-full">Legal</p>
      <FooterColumnLinks2 />
    </div>
  );
}

function FooterColumnLinks3() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start leading-[0] relative shrink-0 text-[#474747] text-[14px] w-full" data-name="Footer Column Links">
      <div className="flex flex-col justify-center relative shrink-0 w-[184px]">
        <p className="leading-[24px]">instagram ai@gmail.com</p>
      </div>
      <div className="flex flex-col justify-center min-w-full relative shrink-0 w-[min-content]">
        <p className="leading-[24px]">+133-394-3439-1435</p>
      </div>
    </div>
  );
}

function FooterColumn4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Footer Column">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[#0d0d0d] text-[20px] w-full">Contact us</p>
      <FooterColumnLinks3 />
    </div>
  );
}

function FooterColumn1() {
  return (
    <div className="flex flex-col sm:flex-row flex-1 gap-6 lg:gap-[48px] items-start min-h-px min-w-0 not-italic relative" data-name="Footer Column">
      <FooterColumnContent1 />
      <FooterColumn2 />
      <FooterColumn3 />
      <FooterColumn4 />
    </div>
  );
}

function FooterLinksContainer() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-[72px] items-start lg:items-center justify-center relative shrink-0 w-full max-w-[1280px]" data-name="Footer Links Container">
      <div className="flex flex-row items-center self-stretch">
        <FooterColumn />
      </div>
      <FooterColumn1 />
    </div>
  );
}

function SocialIcon() {
  return (
    <div className="content-stretch flex gap-[26px] items-center relative shrink-0" data-name="Social Icon">
      <div className="relative shrink-0 size-[30px]" data-name="Social Icon">
        <div className="absolute inset-[12.5%_29.17%_12.5%_33.33%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 22.5">
            <path d={svgPaths.p12382870} fill="var(--fill-0, white)" id="vector" />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[30px]" data-name="Social Icon">
        <div className="absolute inset-[16.75%_8.37%_16.62%_8.33%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.9878 19.9878">
            <path d={svgPaths.p3f056300} fill="var(--fill-0, white)" id="vector" />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[30px]" data-name="Social Icon">
        <div className="absolute inset-[12.5%_12.46%_12.46%_12.49%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5143 22.5143">
            <g id="vector">
              <path d={svgPaths.p3e5bfb00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p348b1c00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3de20100} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function FooterTopRow() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Footer Top Row">
      <div className="h-[64px] relative shrink-0 w-[270px]" data-name="Logo full">
        <div className="absolute inset-[11.01%_0_10.37%_28.64%]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 192.676 50.3174">
            <g id="vector">
              <path d={svgPaths.p398c8200} fill="var(--fill-0, white)" />
              <path clipRule="evenodd" d={svgPaths.p2205b280} fill="var(--fill-0, white)" fillRule="evenodd" />
              <path d={svgPaths.p6f81a00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2a322a00} fill="var(--fill-0, white)" />
              <path clipRule="evenodd" d={svgPaths.p58f0b00} fill="var(--fill-0, white)" fillRule="evenodd" />
              <path d={svgPaths.p7e60080} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2576c640} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2fa5ed00} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
        <div className="absolute inset-[0_74.75%_0_0]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 68.1808 64">
            <g id="vector">
              <path d={svgPaths.p2f848c00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p375efb00} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
      </div>
      <SocialIcon />
    </div>
  );
}

function FooterDivider() {
  return (
    <div className="h-[2px] relative shrink-0 w-full" data-name="Footer Divider">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FooterContent() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Footer Content">
      <FooterTopRow />
      <FooterDivider />
    </div>
  );
}

function FooterContainer() {
  return (
    <div className="flex flex-col gap-[21px] items-center relative shrink-0 w-full max-w-[1280px]" data-name="Footer Container">
      <FooterContent />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-center text-white w-full">Non Copyrighted © 2025 Design and upload by Orbitask</p>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Footer 7">
      <div className="overflow-hidden rounded-[inherit] w-full">
        <div className="flex flex-wrap gap-y-[27px] items-start px-4 sm:px-8 lg:pl-[39px] lg:pr-[39px] py-[18px] relative w-full">
          <div className="h-[80px] relative shrink-0 w-[200px] flex items-center" data-name="Logo">
            <img alt="ColdNerd Logo" className="h-full w-auto object-contain pointer-events-none" src={imgWhatsAppImage20260226At124548AmRemovebgPreview1} />
          </div>
          <FooterLinksContainer />
          <FooterContainer />
        </div>
      </div>
    </div>
  );
}

const problemSolutionItems = [
  {
    title: "Problem",
    description: "Manual Instagram outreach is time-consuming, inconsistent, and hard to scale.",
    type: "problem" as const,
  },
  {
    title: "Solution 1",
    description: "Identify ideal prospects from followers, likers, and hashtags.",
    type: "solution" as const,
  },
  {
    title: "Solution 2",
    description: "Monitor campaign activity and response rates instantly.",
    type: "solution" as const,
  },
  {
    title: "Solution 3",
    description: "Automate personalized DMs with smart follow-ups.",
    type: "solution" as const,
  },
];

function ProblemSolutionMobile() {
  // SVG arc paths from Figma export
  const arcPaths = {
    redArc: "M2.93676 184.856C0.492157 143.019 13.3236 101.722 39.0242 68.713C64.7248 35.7037 101.529 13.2497 142.533 5.56267C183.537 -2.12436 225.923 5.48379 261.742 26.96C297.56 48.4363 324.35 82.305 337.086 122.213L320.289 127.625C308.864 91.8256 284.833 61.4442 252.703 42.1793C220.572 22.9144 182.55 16.0896 145.768 22.9851C108.986 29.8806 75.9717 50.0227 52.9174 79.6331C29.8631 109.244 18.3529 146.288 20.5457 183.818L2.93676 184.856Z",
    blueArc1: "M8.52058 204.691C-0.841719 171.137 1.01899 135.423 13.8169 103.035C26.6147 70.6469 49.6419 43.3761 79.3609 25.412C109.08 7.44788 143.847 -0.215843 178.321 3.59808C212.796 7.412 245.07 22.4926 270.187 46.5233L258.944 58.387C236.413 36.8307 207.461 23.3029 176.537 19.8816C145.612 16.4604 114.425 23.335 87.766 39.4494C61.107 55.5638 40.4509 80.0267 28.9707 109.08C17.4906 138.133 15.8215 170.17 24.2198 200.269L8.52058 204.691Z",
    blueArc2: "M8.52062 204.691C-1.36232 169.272 1.27553 131.505 15.9853 97.8196C30.695 64.134 56.5676 36.6104 89.2002 19.9331C121.833 3.25568 159.209 -1.54502 194.967 6.34794C230.726 14.2409 262.658 34.3398 285.328 63.2242L272.526 73.3683C252.189 47.458 223.546 29.4286 191.469 22.3484C159.392 15.2681 125.865 19.5745 96.5922 34.5347C67.3197 49.4949 44.111 74.1844 30.9159 104.402C17.7208 134.619 15.3545 168.496 24.2198 200.269L8.52062 204.691Z",
    blueArc3: "M8.52076 204.691C-2.29324 165.934 1.91494 124.5 20.2973 88.737C38.6798 52.9739 69.87 25.5405 107.583 11.9647C145.296 -1.61106 186.729 -0.320128 223.532 15.5774C260.336 31.4749 289.774 60.7973 305.916 97.6361L290.994 104.237C276.514 71.1913 250.107 44.8881 217.093 30.6275C184.079 16.3669 146.912 15.2088 113.082 27.3868C79.2523 39.5647 51.2736 64.1734 34.784 96.2541C18.2943 128.335 14.5195 165.503 24.22 200.269L8.52076 204.691Z",
    warningTriangle: "M38.0522 33.1195L1.94775 33.1213C1.60585 33.1213 1.26997 33.0365 0.97387 32.8755C0.677773 32.7145 0.431893 32.4829 0.260944 32.204C0.0899942 31.9251 -2.17147e-06 31.6087 0 31.2867C2.17155e-06 30.9647 0.090003 30.6483 0.260956 30.3694L18.3093 0.917205C18.4803 0.638337 18.7262 0.406765 19.0222 0.245762C19.3183 0.08476 19.6542 0 19.9961 0C20.338 0 20.6739 0.08476 20.97 0.245762C21.2661 0.406765 21.5119 0.638337 21.6829 0.917205L39.739 30.3676C39.91 30.6465 40 30.9628 40 31.2849C40 31.6069 39.91 31.9233 39.7391 32.2022C39.5681 32.481 39.3222 32.7126 39.0261 32.8737C38.73 33.0347 38.3942 33.1195 38.0522 33.1195ZM18.5353 12.0072L18.7612 22.4019H21.2388L21.4667 12.0072H18.5353ZM19.9961 27.7332C20.9311 27.7332 21.6615 27.0562 21.6615 26.2068C21.6615 25.3574 20.931 24.6914 19.9942 24.6914C19.7792 24.6866 19.5655 24.7221 19.3653 24.796C19.1652 24.8698 18.9827 24.9806 18.8285 25.1217C18.6743 25.2628 18.5516 25.4314 18.4675 25.6177C18.3833 25.8041 18.3395 26.0043 18.3385 26.2068C18.3385 27.0562 19.0689 27.7332 19.9942 27.7332H19.9961Z",
    chatIcon: "M27.1333 18.6022L33 13.4259V3.23516C33 1.45582 31.35 0 29.3333 0H3.66667C1.65 0 0 1.45582 0 3.23516V17.7934C0 19.5727 1.65 21.0285 3.66667 21.0285H7.33333V29.1164L23.2833 15.0435L27.1333 18.6022Z",
    chatCheck: "M37.7667 13.1025L26.5833 22.9698L22.7333 19.4111L20.1667 21.6757L26.5833 27.499L40.3333 15.2054L37.7667 13.1025Z",
    starIcon: "M28 0C29.8565 0 31.637 0.661034 32.9497 1.83768C34.2625 3.01433 35 4.61021 35 6.27424V21.9599C35 23.6239 34.2625 25.2198 32.9497 26.3964C31.637 27.5731 29.8565 28.2341 28 28.2341H7C5.14348 28.2341 3.36301 27.5731 2.05025 26.3964C0.737498 25.2198 0 23.6239 0 21.9599V6.27424C0 4.61021 0.737498 3.01433 2.05025 1.83768C3.36301 0.661034 5.14348 0 7 0H28ZM18.529 6.90167C18.4476 6.71653 18.3059 6.55762 18.1224 6.44563C17.9389 6.33365 17.722 6.27376 17.5 6.27376C17.278 6.27376 17.0611 6.33365 16.8776 6.44563C16.6941 6.55762 16.5524 6.71653 16.471 6.90167L15.9163 8.09848C14.9872 10.1282 13.2245 11.7609 10.9918 12.6599L9.42375 13.2857C8.526 13.6433 8.526 14.8151 9.42375 15.1743L11.0863 15.8362C13.2625 16.7113 14.9939 18.2856 15.939 20.2486L16.478 21.3575C16.5623 21.5382 16.7043 21.6925 16.8861 21.801C17.068 21.9095 17.2815 21.9674 17.5 21.9674C17.7185 21.9674 17.932 21.9095 18.1139 21.801C18.2957 21.6925 18.4377 21.5382 18.522 21.3575L19.061 20.2486C20.0061 18.2856 21.7375 16.7113 23.9137 15.8362L25.5762 15.1743C26.4757 14.8151 26.474 13.6433 25.5762 13.2857L24.0082 12.6599C21.7749 11.7612 20.0115 10.1284 19.082 8.09848L18.529 6.90167Z",
    msgIcon: "M33.15 0C34.7015 0 36.1895 0.616294 37.2866 1.7133C38.3837 2.81031 39 4.29818 39 5.84958V25.3482C39 26.8996 38.3837 28.3875 37.2866 29.4845C36.1895 30.5815 34.7015 31.1978 33.15 31.1978H25.9409L20.8514 34.5905C20.0324 35.1365 18.9677 35.1365 18.1487 34.5905L13.0591 31.1978H5.85C4.29848 31.1978 2.81051 30.5815 1.71343 29.4845C0.616338 28.3875 0 26.8996 0 25.3482V5.84958C0 4.29818 0.616338 2.81031 1.71343 1.7133C2.81051 0.616294 4.29848 0 5.85 0H33.15ZM12.675 13.649C11.8992 13.649 11.1553 13.9572 10.6067 14.5057C10.0582 15.0542 9.75 15.7981 9.75 16.5738C9.75 17.3495 10.0582 18.0935 10.6067 18.642C11.1553 19.1905 11.8992 19.4986 12.675 19.4986C13.4508 19.4986 14.1947 19.1905 14.7433 18.642C15.2918 18.0935 15.6 17.3495 15.6 16.5738C15.6 15.7981 15.2918 15.0542 14.7433 14.5057C14.1947 13.9572 13.4508 13.649 12.675 13.649ZM26.325 13.649C25.5492 13.649 24.8053 13.9572 24.2567 14.5057C23.7082 15.0542 23.4 15.7981 23.4 16.5738C23.4 17.3495 23.7082 18.0935 24.2567 18.642C24.8053 19.1905 25.5492 19.4986 26.325 19.4986C27.1008 19.4986 27.8447 19.1905 28.3933 18.642C28.9418 18.0935 29.25 17.3495 29.25 16.5738C29.25 15.7981 28.9418 15.0542 28.3933 14.5057C27.8447 13.9572 27.1008 13.649 26.325 13.649Z",
  };

  return (
    <section className="py-12 pb-24 bg-white overflow-hidden">
      {/* Centered pill label */}
      <div className="flex justify-center mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="px-6 py-2.5 rounded-full bg-white shadow-[2px_2px_7px_0px_rgba(65,74,83,0.1)] border border-gray-100">
            <p className="font-['Inter',sans-serif] font-medium text-[12px] text-black opacity-70">Problem &amp; Solutions</p>
          </div>
        </motion.div>
      </div>

      {/* Scaled Figma container */}
      <div className="relative mx-auto w-full overflow-hidden" style={{ maxWidth: 430, aspectRatio: "430 / 1280" }}>
        <div className="absolute inset-0" style={{ width: 430, height: 1450 }}>

          {/* RED ARC - Problem section (top) - slides from LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute flex items-center justify-center"
            style={{ left: 15, top: -25, width: 454, height: 453 }}
          >
            <div className="flex-none" style={{ transform: "rotate(-76.13deg) skewX(0.3deg)" }}>
              <div className="relative" style={{ width: 343, height: 344 }}>
                <svg className="absolute" style={{ left: "-0.77%", top: "-0.77%", width: "101.54%", height: "54.51%" }} viewBox="0 0 340.404 187.65" fill="none" preserveAspectRatio="none">
                  <path d={arcPaths.redArc} fill="#F31705" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Warning triangle icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute"
            style={{ left: 175, top: 120, width: 40, height: 33 }}
          >
            <svg className="block w-full h-full" fill="none" viewBox="0 0 40 33.1213">
              <path clipRule="evenodd" d={arcPaths.warningTriangle} fill="#EB4335" fillRule="evenodd" />
            </svg>
          </motion.div>

          {/* Problem text - positioned on RIGHT side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute flex flex-col items-start"
            style={{ left: 175, top: 160, width: 237, paddingBottom: 10 }}
          >
            <p className="font-['Inter',sans-serif] font-medium text-[#0d0d0d] text-[24px] leading-[40px] w-full">Problem</p>
            <p className="font-['Inter',sans-serif] font-normal text-[#5e5e5e] text-[15px] leading-[22px] opacity-70 mt-1" style={{ width: 229 }}>Manual Instagram outreach is time-consuming, inconsistent, and hard to scale.</p>
          </motion.div>

          {/* BLUE ARC 1 - Solution 1 area - slides from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute flex items-center justify-center"
            style={{ left: -20, top: 295, width: 435, height: 435 }}
          >
            <div className="flex-none" style={{ transform: "rotate(115.76deg) skewX(2.9deg)" }}>
              <div className="relative" style={{ width: 317, height: 318 }}>
                <svg className="absolute" style={{ left: "-0.83%", top: "1.83%", width: "86.49%", height: "65.35%" }} viewBox="0 0 270.100  205.953" fill="none" preserveAspectRatio="none">
                  <path d={arcPaths.blueArc1} fill="#2196F3" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Chat icon (Solution 1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute"
            style={{ left: 80, top: 420, width: 40, height: 29 }}
          >
            <svg className="block w-full h-full" fill="none" viewBox="0 0 40.3333 29.1164">
              <path d={arcPaths.chatIcon} fill="#2196F3" />
              <path d={arcPaths.chatCheck} fill="#2196F3" />
            </svg>
          </motion.div>

          {/* Solution 1 text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute flex flex-col items-start"
            style={{ left: 80, top: 450, width: 339, paddingBottom: 10 }}
          >
            <p className="font-['Inter',sans-serif] font-medium text-[#0d0d0d] text-[24px] leading-[40px] w-full">Solution 1</p>
            <p className="font-['Inter',sans-serif] font-normal text-[#5e5e5e] text-[15px] leading-[22px] opacity-70 mt-1" style={{ width: 245 }}>Identify ideal prospects from followers, likers, and hashtags.</p>
          </motion.div>

          {/* BLUE ARC 2 - Solution 2 area - slides from LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute flex items-center justify-center"
            style={{ left: 50, top: 579, width: 433, height: 432 }}
          >
            <div className="flex-none" style={{ transform: "rotate(-60.42deg) skewX(1.3deg)" }}>
              <div className="relative" style={{ width: 317, height: 318 }}>
                <svg className="absolute" style={{ left: "-0.83%", top: "-0.83%", width: "91.26%", height: "65.35%" }} viewBox="0 0 289.03 207.953" fill="none" preserveAspectRatio="none">
                  <path d={arcPaths.blueArc2} fill="#2196F3" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Star icon (Solution 2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="absolute"
            style={{ left: 200, top: 730, width: 35, height: 28 }}
          >
            <svg className="block w-full h-full" fill="none" viewBox="0 0 35 28.2341">
              <path d={arcPaths.starIcon} fill="#2196F3" />
            </svg>
          </motion.div>

          {/* Solution 2 text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute flex flex-col items-start"
            style={{ left: 200, top: 760, width: 220, paddingBottom: 10 }}
          >
            <p className="font-['Inter',sans-serif] font-medium text-[#0d0d0d] text-[24px] leading-[40px] w-full">Solution 2</p>
            <p className="font-['Inter',sans-serif] font-normal text-[#5e5e5e] text-[15px] leading-[22px] opacity-70 mt-1" style={{ width: 220 }}>Monitor campaign activity and response rates instantly.</p>
          </motion.div>

          {/* BLUE ARC 3 - Solution 3 area - slides from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute flex items-center justify-center"
            style={{ left: -25, top: 868, width: 435, height: 435 }}
          >
            <div className="flex-none" style={{ transform: "rotate(120.76deg) skewX(0.5deg)" }}>
              <div className="relative" style={{ width: 317, height: 318 }}>
                <svg className="absolute" style={{ left: "-0.83%", top: "-0.83%", width: "97.67%", height: "65.35%" }} viewBox="0 0 309.393 207.952" fill="none" preserveAspectRatio="none">
                  <path d={arcPaths.blueArc3} fill="#2196F3" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Message icon (Solution 3) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="absolute"
            style={{ left: 80, top: 1010, width: 39, height: 35 }}
          >
            <svg className="block w-full h-full" fill="none" viewBox="0 0 39 35">
              <path d={arcPaths.msgIcon} fill="#2196F3" />
            </svg>
          </motion.div>

          {/* Solution 3 text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute flex flex-col items-start"
            style={{ left: 80, top: 1040, width: 339, paddingBottom: 10 }}
          >
            <p className="font-['Inter',sans-serif] font-medium text-[#0d0d0d] text-[24px] leading-[40px] w-full">Solution 3</p>
            <p className="font-['Inter',sans-serif] font-normal text-[#5e5e5e] text-[15px] leading-[22px] opacity-70 mt-1" style={{ width: 245 }}>Automate personalized DMs with smart follow-ups</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-white flex flex-col items-center relative w-full overflow-x-hidden" data-name="Home">
      {/* Fixed frosted glass navbar */}
      <Navbar />

      {/* Hero + Header Section */}
      <div className="w-full max-w-[1440px] mx-auto relative">
        <Group />
        <Frame6 />
      </div>

      {/* Features Section */}
      <div id="features" className="w-full max-w-[1440px] mx-auto relative scroll-mt-24">
        <Group3 />
        <ScrollReveal variant="fadeUp">
          <Feature />
        </ScrollReveal>
      </div>

      {/* Analytics Section */}
      <div className="w-full">
        <AnalyticsSection />
      </div>

      {/* Pricing Plans */}
      <div id="pricing" className="w-full scroll-mt-24">
        <PricingSection />
      </div>

      {/* Problem & Solutions - Desktop */}
      <div className="hidden lg:block w-full max-w-[1440px] mx-auto relative overflow-hidden">
        <ScrollReveal variant="scaleUp">
          <Varient />
        </ScrollReveal>
      </div>

      {/* Problem & Solutions - Mobile */}
      <div className="lg:hidden w-full">
        <ProblemSolutionMobile />
      </div>

      {/* Vertical Timeline - How it works */}
      <div className="w-full">
        <VerticalTimelineSection />
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="w-full scroll-mt-24">
        <HowItWorksSection />
      </div>

      {/* Campaign Dashboard */}
      <div id="dashboard" className="w-full scroll-mt-24">
        <CampaignSection />
      </div>

      {/* FAQ */}
      <div className="w-full">
        <FAQSection />
      </div>

      {/* Blog Section */}
      <div className="w-full">
        <BlogSection />
      </div>

      {/* Footer / Contact */}
      <div className="w-full">
        <FooterSection />
      </div>
    </div>
  );
}