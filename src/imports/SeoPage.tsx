import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { BlogNavbar } from "../blog/BlogNavbar";
import { FooterSection } from "./sections/FooterSection";
import { guidesForPage, seoPageBySlug, type SeoBlock, type SeoFigure, type SeoImage, type SeoSection } from "../seo/pages";
import { setPageMeta } from "../lib/seo";
import { fetchPublishedPosts, type BlogPost } from "../lib/blog";

function GuideImage({ image, eager = false }: { image: SeoImage; eager?: boolean }) {
  return (
    <img
      src={`${image.src}-1600.webp`}
      srcSet={`${image.src}-800.webp 800w, ${image.src}-1600.webp 1600w`}
      sizes="(max-width: 900px) 100vw, 812px"
      width={1600}
      height={900}
      alt={image.alt}
      loading={eager ? "eager" : "lazy"}
      className="w-full h-auto rounded-2xl border border-[#e6eeff] bg-[#f5f8ff]"
    />
  );
}

/** Internal links use the router; outside links open in a new tab. */
function SmartLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  if (href.startsWith("/")) return <Link to={href} className={className}>{children}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
}

function Callout({ text, href }: { text: string; href: string }) {
  return (
    <SmartLink
      href={href}
      className="group flex items-center justify-between gap-4 mt-6 rounded-2xl border-l-4 border-[#2a6ff3] bg-[#f3f7ff] px-5 py-4 font-semibold text-[#2a6ff3] no-underline hover:bg-[#eaf1ff] transition-colors"
    >
      <span>{text}</span>
      <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
    </SmartLink>
  );
}

/** The "field guide" diagrams from the content PDFs, drawn in HTML. */
function FieldGuide({ figure }: { figure: SeoFigure }) {
  const max = Math.max(...figure.items.map((i) => i.value ?? 0), 1);
  const card = "bg-white rounded-xl border border-[#e3ebfb] p-4";
  return (
    <figure className="my-7">
      <div className="rounded-2xl border-t-4 border-[#2a6ff3] bg-[#f3f7ff] p-5 sm:p-7">
        <p className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-[#2a6ff3] mb-3">
          <span className="w-4 h-4 rounded bg-[#2a6ff3] text-white flex items-center justify-center">
            <Check className="w-3 h-3" />
          </span>
          ColdNerd / Field guide
        </p>
        <p className="text-xl sm:text-2xl font-bold text-[#0d0d0d] leading-tight">{figure.title}</p>
        <p className="text-[15px] text-gray-500 mt-1 mb-5">{figure.subtitle}</p>

        {(figure.kind === "cards" || figure.kind === "grid") && (
          <ol className={`grid gap-3 ${figure.kind === "cards" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {figure.items.map((item, i) => (
              <li key={item.title} className={figure.kind === "grid" ? `${card} flex gap-3` : card}>
                <span className="inline-flex items-center justify-center min-w-7 h-7 px-1.5 rounded-md bg-[#eaf1ff] text-[#2a6ff3] text-xs font-bold mb-2 shrink-0">
                  {figure.kind === "cards" ? String(i + 1).padStart(2, "0") : i + 1}
                </span>
                <span className="block">
                  <span className="block font-semibold text-gray-900">{item.title}</span>
                  <span className="block text-sm text-gray-500 leading-relaxed mt-0.5">{item.text}</span>
                </span>
              </li>
            ))}
          </ol>
        )}

        {figure.kind === "funnel" && (
          <ul className="space-y-3">
            {figure.items.map((item) => (
              <li key={item.title} className="grid grid-cols-[120px_1fr_32px] sm:grid-cols-[150px_1fr_40px] items-center gap-3">
                <span className="text-sm font-semibold text-gray-900">{item.title}</span>
                <span className="h-5 rounded-md bg-[#e2ebfd] overflow-hidden">
                  <span className="block h-full rounded-md bg-[#2a6ff3]" style={{ width: `${((item.value ?? 0) / max) * 100}%` }} />
                </span>
                <span className="text-sm font-bold text-[#2a6ff3] text-right">{item.value}</span>
              </li>
            ))}
          </ul>
        )}

        {figure.kind === "flow" && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {figure.items.slice(0, 2).map((item) => (
              <div key={item.title} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:flex-1">
                <div className={`${card} sm:flex-1`}>
                  <span className="block font-semibold text-[#2a6ff3]">{item.title}</span>
                  <span className="block text-sm text-gray-500 mt-0.5">{item.text}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-[#2a6ff3] self-center rotate-90 sm:rotate-0 shrink-0" />
              </div>
            ))}
            <div className="flex flex-col gap-3 sm:flex-1">
              {figure.items.slice(2).map((item) => (
                <div key={item.title} className={card}>
                  <span className="block font-semibold text-[#2a6ff3]">{item.title}</span>
                  <span className="block text-sm text-gray-500 mt-0.5">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <figcaption className="text-sm text-gray-500 mt-2.5">{figure.caption}</figcaption>
    </figure>
  );
}

function Block({ block }: { block: SeoBlock }) {
  if ("p" in block) return <p className="text-[17px] sm:text-lg text-[#475569] leading-relaxed mb-4">{block.p}</p>;
  if ("h3" in block) return <h3 className="text-lg sm:text-xl font-bold text-[#2a6ff3] mt-7 mb-2">{block.h3}</h3>;
  if ("quote" in block)
    return (
      <blockquote className="mb-4 rounded-xl bg-[#f8fbff] border border-[#e6eeff] px-5 py-4 text-[16px] sm:text-[17px] text-gray-700 leading-relaxed">
        “{block.quote}”
      </blockquote>
    );
  if ("list" in block)
    return (
      <ul className="space-y-2.5 mb-4">
        {block.list.map((item) => {
          const [label, ...rest] = item.split(": ");
          return (
            <li key={item} className="flex items-start gap-3 text-[16px] sm:text-[17px] text-[#475569] leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2a6ff3] mt-2.5 shrink-0" />
              <span>
                {rest.length ? <><strong className="text-gray-900">{label}:</strong> {rest.join(": ")}</> : item}
              </span>
            </li>
          );
        })}
      </ul>
    );
  if ("figure" in block) return <FieldGuide figure={block.figure} />;
  if ("image" in block) return <div className="my-7"><GuideImage image={block.image} /></div>;
  return <Callout text={block.callout} href={block.href} />;
}

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

      {section.blocks?.map((b, i) => <Block key={i} block={b} />)}

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
  const [guides, setGuides] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!page) return;
    setPageMeta({ title: page.metaTitle, description: page.metaDescription, canonicalPath: `/${page.slug}`, image: page.shareImage });
  }, [page]);

  useEffect(() => {
    let alive = true;
    fetchPublishedPosts().then((posts) => alive && setGuides(guidesForPage(slug, posts)));
    return () => {
      alive = false;
    };
  }, [slug]);

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
        {page.heroImage && (
          <div className="-mt-4 sm:-mt-8 mb-4">
            <GuideImage image={page.heroImage} eager />
          </div>
        )}
        {page.sections.map((s, i) => (
          <Section key={s.heading} section={s} index={i} />
        ))}

        {/* Guides from the blog (internal linking plan in seo/pages.ts) */}
        {guides.length > 0 && (
          <section className="py-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d0d0d] tracking-tight mb-6">Related guides</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link
                    to={`/blog/${g.slug}`}
                    className="group flex items-center justify-between gap-3 h-full rounded-2xl border border-gray-100 px-5 py-4 no-underline hover:border-[#2a6ff3] transition-colors"
                  >
                    <span className="font-semibold text-gray-900 group-hover:text-[#2a6ff3] transition-colors">{g.title}</span>
                    <ArrowRight className="w-4 h-4 text-[#2a6ff3] shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        {page.faqs.length > 0 && (
          <section className="py-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d0d0d] tracking-tight mb-6">
              {page.faqHeading ?? "Frequently asked questions"}
            </h2>
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
            {page.closing && <Callout text={page.closing.text} href={page.closing.href} />}
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
