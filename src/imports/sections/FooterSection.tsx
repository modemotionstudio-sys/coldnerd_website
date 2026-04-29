import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Instagram, Facebook, Linkedin, Youtube, Mail, MapPin, Send, X } from "lucide-react";

// TikTok icon (lucide-react doesn't ship one)
const TikTok = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.59a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.02Z"/>
  </svg>
);
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Blog", href: "/blog" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "/terms-and-conditions" },
    { label: "Terms of Service", href: "/terms-and-conditions" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Help Center", href: "#" },
    { label: "API Documentation", href: "#" },
    { label: "Community", href: "#" },
    { label: "Status", href: "#" },
    { label: "Changelog", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/cold_nerd_/", label: "Instagram", hoverColor: "hover:text-pink-500" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61573369782245", label: "Facebook", hoverColor: "hover:text-blue-600" },
  { icon: TikTok, href: "https://www.tiktok.com/@cold.nerd", label: "TikTok", hoverColor: "hover:text-black" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/cold-nerd", label: "LinkedIn", hoverColor: "hover:text-blue-500" },
  { icon: Youtube, href: "https://www.youtube.com/@coldnerdai", label: "YouTube", hoverColor: "hover:text-red-500" },
];

export function FooterSection() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactQueries, setContactQueries] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Inline contact form (separate from the subscribe-modal flow above)
  const [cFirstName, setCFirstName] = useState("");
  const [cLastName, setCLastName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cMessage, setCMessage] = useState("");
  const [cSending, setCSending] = useState(false);
  const [cSent, setCSent] = useState(false);
  const [cError, setCError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setContactName(session.user.user_metadata?.full_name || "");
        setContactEmail(session.user.email || "");
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setContactName(session.user.user_metadata?.full_name || "");
        setContactEmail(session.user.email || "");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubscribeClick = () => {
    if (!user) {
      navigate("/signup");
      return;
    }
    setSent(false);
    setShowContactModal(true);
  };

  const handleContactSubmit = async () => {
    if (!contactName.trim() || !contactEmail.trim() || !contactQueries.trim()) return;
    setSending(true);
    try {
      const res = await fetch("https://coldnerdserver.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          queries: contactQueries,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setTimeout(() => {
          setShowContactModal(false);
          setContactQueries("");
        }, 2000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleInlineContactSubmit = async () => {
    setCError("");
    if (!cFirstName.trim() || !cLastName.trim() || !cEmail.trim() || !cMessage.trim()) {
      setCError("Please fill in all fields.");
      return;
    }
    setCSending(true);
    try {
      const res = await fetch("https://coldnerdserver.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${cFirstName.trim()} ${cLastName.trim()}`,
          email: cEmail.trim(),
          queries: cMessage.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCSent(true);
        setCFirstName("");
        setCLastName("");
        setCEmail("");
        setCMessage("");
        setTimeout(() => setCSent(false), 5000);
      } else {
        setCError("Failed to send. Please try again.");
      }
    } catch {
      setCError("Network error. Please try again.");
    } finally {
      setCSending(false);
    }
  };

  const protectedPaths = ["/pricing", "/terms-and-conditions"];

  const handleProtectedLink = (e: React.MouseEvent, href: string) => {
    if (protectedPaths.includes(href) && !user) {
      e.preventDefault();
      navigate("/signup");
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    {/* Inline Contact Section (above footer) */}
    <section id="contact" className="bg-[#2a6ff3] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start"
        >
          <div className="text-center lg:text-left lg:flex lg:flex-col lg:justify-center lg:h-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
              Get in touch with us
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              Have a question, partnership idea, or need help? Send us a message and we&apos;ll get back to you shortly.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-7 border border-white/20">
            {cSent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-1">Message sent!</h3>
                <p className="text-white/80 text-sm">We&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">First name</label>
                    <input
                      type="text"
                      value={cFirstName}
                      onChange={(e) => setCFirstName(e.target.value)}
                      placeholder="Jane"
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-white focus:bg-white/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">Last name</label>
                    <input
                      type="text"
                      value={cLastName}
                      onChange={(e) => setCLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-white focus:bg-white/15 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={cEmail}
                    onChange={(e) => setCEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-white focus:bg-white/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1.5">Message</label>
                  <textarea
                    value={cMessage}
                    onChange={(e) => setCMessage(e.target.value)}
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-white focus:bg-white/15 transition-all resize-none"
                  />
                </div>
                {cError && <p className="text-yellow-200 text-xs">{cError}</p>}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInlineContactSubmit}
                  disabled={cSending}
                  className="w-full py-3 bg-white text-[#2a6ff3] hover:bg-white/90 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {cSending ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>

    <footer className="bg-[#2a6ff3] text-white">
      {/* Newsletter (white bar) */}
      <div className="bg-white text-gray-900 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8"
          >
            <div className="text-center lg:text-left max-w-md">
              <h3 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2 text-gray-900">Stay in the Loop</h3>
              <p className="text-gray-600 text-sm sm:text-base">Get the latest tips on Instagram growth, automation strategies, and product updates.</p>
            </div>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-l-full text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#2a6ff3] focus:bg-white transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubscribeClick}
                className="px-5 py-3 bg-[#2a6ff3] hover:bg-[#1f5ccf] text-white rounded-r-full font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                Subscribe <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl mb-2 sm:mb-4">
                <span className="font-extrabold text-white">Cold</span><span className="font-normal text-white">Nerd</span>
              </h2>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-6 max-w-sm">
                The #1 Instagram DM automation platform trusted by 10,000+ creators, brands, and agencies worldwide. Scale your outreach safely.
              </p>
              {/* Social */}
              <div className="flex items-center gap-2 sm:gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all"
                  >
                    <social.icon className="w-4.5 h-4.5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links], colIdx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: colIdx * 0.1 }}
            >
              <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-2 sm:mb-4">{title}</h4>
              <ul className="space-y-1.5 sm:space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        onClick={(e) => handleProtectedLink(e, link.href)}
                        className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p>&copy; {new Date().getFullYear()} ColdNerd. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:virtualdepthstudio@gmail.com" className="hover:text-white transition-colors">
                  virtualdepthstudio@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-1 text-white/40">
              <MapPin className="w-3.5 h-3.5" />
              <span>Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Get in Touch</h3>
                  <p className="text-gray-500 text-sm mb-6">We&apos;d love to hear from you.</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2a6ff3]/30 focus:border-[#2a6ff3] transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2a6ff3]/30 focus:border-[#2a6ff3] transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Query</label>
                      <textarea
                        value={contactQueries}
                        onChange={(e) => setContactQueries(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2a6ff3]/30 focus:border-[#2a6ff3] transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleContactSubmit}
                      disabled={sending || !contactName.trim() || !contactEmail.trim() || !contactQueries.trim()}
                      className="w-full py-3 bg-[#2a6ff3] hover:bg-[#1f5ccf] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
