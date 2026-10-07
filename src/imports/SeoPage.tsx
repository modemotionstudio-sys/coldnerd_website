import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { BlogNavbar } from "../blog/BlogNavbar";
import { FooterSection } from "./sections/FooterSection";
import { seoPageBySlug, type SeoSection } from "../seo/pages";
import { setPageMeta } from "../lib/seo";


function Section({ section, index }: { section: SeoSection; index: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 2) * 0.05 }}
      className="py-8 sm:py-10 border-b border-gray-100 last:border-0"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-[#0d0d0d] tracking-tight mb-5">{section.heading}</h2>

      {section.body?.map((p, i) => (
        <p key={i} className="text-[17px] sm:text-lg text-[#475569] leading-relaxed mb-4 last:mb-0">
          {p}
        </p>
      ))}

      {section.bullets && (
        <ul className="grid sm:grid-cols-2 gap-3 mt-2">
          {section.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 bg-[#f8fbff] border border-[#e6eeff] rounded-xl p-4">
              <span className="w-6 h-6 rounded-full bg-[#2a6ff3] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </span>
              <span className="text-[15px] sm:text-base text-gray-700 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      )}

      {section.steps && (
        <ol className="space-y-4 mt-2">
          {section.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 sm:gap-5 bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_4px_20px_rgba(42,111,243,0.06)]">
              <span className="w-10 h-10 rounded-xl bg-[#eef4ff] text-[#2a6ff3] font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </motion.section>
  );
}

export default function SeoPage({ slug }: { slug: string }) {
  const page = seoPageBySlug(slug);

  useEffect(() => {
    if (!page) return;
    setPageMeta({ title: page.metaTitle, description: page.metaDescription, canonicalPath: `/${page.slug}` });
  }, [page]);

  if (!page) return null;
  const related = page.related.map(seoPageBySlug).filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <div className="bg-white min-h-screen w-full">
      <BlogNavbar centerLabel={page.label} centerTo={`/${page.slug}`} />

      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] to-white pt-36 sm:pt-40 pb-14 sm:pb-20 px-4">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#2a6ff3]/10 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-[860px] mx-auto text-center"
        >
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-5">
            <Link to="/" className="hover:text-[#2a6ff3] no-underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{page.label}</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white text-[#2a6ff3] text-sm font-semibold shadow-sm mb-5">
            {page.eyebrow}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold text-[#0d0d0d] leading-[1.1] tracking-tight mb-6">{page.h1}</h1>
          <p className="text-lg sm:text-xl text-[#5e5e5e] leading-relaxed max-w-[720px] mx-auto mb-8">{page.intro}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2a6ff3] text-white font-semibold no-underline hover:bg-[#1f5ccf] transition-colors shadow-lg shadow-blue-200"
            >
              Get started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/#pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-gray-200 text-gray-800 font-semibold no-underline hover:border-[#2a6ff3] hover:text-[#2a6ff3] transition-colors"
            >
              See pricing
            </Link>
          </div>
        </motion.div>
      </header>

      {/* Content */}
      <main className="max-w-[860px] mx-auto px-4 sm:px-6 pb-8">
        {page.sections.map((s, i) => (
          <Section key={s.heading} section={s} index={i} />
        ))}

        {/* FAQ */}
        {page.faqs.length > 0 && (
          <section className="py-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d0d0d] tracking-tight mb-6">Frequently asked questions</h2>
            <div className="space-y-3">
              {page.faqs.map((f) => (
                <details key={f.q} className="group bg-[#f8fbff] border border-[#e6eeff] rounded-2xl px-5 sm:px-6 open:bg-white open:shadow-[0_8px_30px_rgba(42,111,243,0.08)] transition-all">
                  <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-semibold text-gray-900 text-[17px] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="w-5 h-5 text-[#2a6ff3] shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-5 text-gray-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="py-10">
            <h2 className="text-2xl font-bold text-[#0d0d0d] mb-6">Keep learning</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/${r.slug}`}
                  className="group block rounded-2xl border border-gray-100 p-5 no-underline hover:border-[#2a6ff3] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2a6ff3]">{r.eyebrow}</span>
                  <h3 className="font-bold text-gray-900 mt-2 mb-2 group-hover:text-[#2a6ff3] transition-colors">{r.label}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{r.metaDescription}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* CTA */}
      <div className="px-4 pb-16">
        <div className="max-w-[1100px] mx-auto rounded-3xl bg-[#2a6ff3] text-white text-center p-10 sm:p-14">
          <h2 className="text-2xl sm:text-4xl font-bold mb-3">Start your Instagram outreach with ColdNerd</h2>
          <p className="text-white/80 max-w-[560px] mx-auto mb-7">
            Find prospects, send AI-personalized DMs and follow up automatically — with safety built in.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/signup" className="px-7 py-3.5 rounded-full bg-white text-[#2a6ff3] font-semibold no-underline hover:bg-blue-50 transition-colors">
              Get started
            </Link>
            <Link to="/what-is-coldnerd" className="px-7 py-3.5 rounded-full border border-white/40 text-white font-semibold no-underline hover:bg-white/10 transition-colors">
              What is ColdNerd?
            </Link>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
