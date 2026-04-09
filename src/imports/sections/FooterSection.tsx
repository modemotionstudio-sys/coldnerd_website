import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Mail, MapPin, Send, X } from "lucide-react";
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
  { icon: Instagram, href: "#", label: "Instagram", hoverColor: "hover:text-pink-500" },
  { icon: Facebook, href: "#", label: "Facebook", hoverColor: "hover:text-blue-600" },
  { icon: Twitter, href: "#", label: "Twitter", hoverColor: "hover:text-sky-500" },
  { icon: Linkedin, href: "#", label: "LinkedIn", hoverColor: "hover:text-blue-500" },
  { icon: Youtube, href: "#", label: "YouTube", hoverColor: "hover:text-red-500" },
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
      // Send via mailto as a fallback-safe method
      const subject = encodeURIComponent(`Contact from ${contactName}`);
      const body = encodeURIComponent(
        `Name: ${contactName}\nEmail: ${contactEmail}\n\nQuery:\n${contactQueries}`
      );
      window.open(`mailto:coldnerdai@gmail.com?subject=${subject}&body=${body}`, "_blank");
      setSent(true);
      setTimeout(() => setShowContactModal(false), 2000);
    } catch {
      // Fallback handled
    } finally {
      setSending(false);
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
    <footer id="contact" className="bg-[#2a6ff3] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8"
          >
            <div className="text-center lg:text-left max-w-md">
              <h3 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">Stay in the Loop</h3>
              <p className="text-white/70 text-sm sm:text-base">Get the latest tips on Instagram growth, automation strategies, and product updates.</p>
            </div>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-full text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/50 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubscribeClick}
                className="px-5 py-3 bg-white text-[#2a6ff3] hover:bg-white/90 rounded-r-full font-semibold text-sm flex items-center gap-2 transition-colors"
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
