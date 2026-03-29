import { motion } from "motion/react";
import { Link } from "react-router";
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-[#2a6ff3] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div className="text-center lg:text-left max-w-md">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">Stay in the Loop</h3>
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
                className="px-5 py-3 bg-white text-[#2a6ff3] hover:bg-white/90 rounded-r-full font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                Subscribe <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">
                Cold<span className="text-[#0d1b3e]">Nerd</span>
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
                The #1 Instagram DM automation platform trusted by 10,000+ creators, brands, and agencies worldwide. Scale your outreach safely.
              </p>
              {/* Social */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all"
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
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
  );
}
