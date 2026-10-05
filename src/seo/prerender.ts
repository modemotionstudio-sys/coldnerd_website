/**
 * Build-time SEO (used by vite.config.ts, runs in Node — no browser APIs here).
 *
 * The site is a single-page app, so crawlers that don't run JavaScript
 * (OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot…) would otherwise see an
 * empty page. After `vite build` this writes:
 *   - dist/<slug>.html for every SEO page, with its own <head> and the full
 *     article text inside #root (React replaces it on load for real visitors)
 *   - a crawlable site summary + structured data in dist/index.html
 *   - dist/sitemap.xml and dist/llms.txt
 */
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { SITE_URL, seoPages, type SeoPage } from "./pages";
import { plans } from "../lib/pricingPlans";
import { seedPosts } from "../lib/blogSeed";

const SUPABASE_URL = "https://digzspnffmdrqpagxswi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpZ3pzcG5mZm1kcnFwYWd4c3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjg2MDEsImV4cCI6MjA5MzgwNDYwMX0.6_6pu-EKBxlAQc9TrktlhblAL1AYZtUuT88OX7PmQeQ";

const SEO_START = "<!-- seo:start -->";
const SEO_END = "<!-- seo:end -->";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const jsonLd = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

function headTags(o: { title: string; description: string; url: string; type?: string; extra?: string }) {
  return [
    `<title>${esc(o.title)}</title>`,
    `<meta name="description" content="${esc(o.description)}" />`,
    `<link rel="canonical" href="${o.url}" />`,
    `<meta property="og:type" content="${o.type ?? "website"}" />`,
    `<meta property="og:site_name" content="ColdNerd" />`,
    `<meta property="og:title" content="${esc(o.title)}" />`,
    `<meta property="og:description" content="${esc(o.description)}" />`,
    `<meta property="og:url" content="${o.url}" />`,
    `<meta property="og:image" content="${SITE_URL}/logo.png" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(o.title)}" />`,
    `<meta name="twitter:description" content="${esc(o.description)}" />`,
    o.extra ?? "",
  ].join("\n    ");
}

/** Shared crawlable navigation so every page links to every other page. */
function siteNav() {
  const links = [
    { href: "/", label: "Home" },
    ...seoPages.map((p) => ({ href: `/${p.slug}`, label: p.label })),
    { href: "/#pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ];
  return `<nav aria-label="ColdNerd pages" class="max-w-[860px] mx-auto px-4 py-10 border-t border-gray-100 text-sm"><ul class="flex flex-wrap gap-x-5 gap-y-2">${links
    .map((l) => `<li><a class="text-[#2a6ff3]" href="${l.href}">${esc(l.label)}</a></li>`)
    .join("")}</ul></nav>`;
}

function renderPageBody(page: SeoPage) {
  const sections = page.sections
    .map((s) => {
      const body = (s.body ?? []).map((p) => `<p class="text-lg text-gray-600 leading-relaxed mb-4">${esc(p)}</p>`).join("");
      const bullets = s.bullets
        ? `<ul class="list-disc pl-6 space-y-2 text-gray-700">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
        : "";
      const steps = s.steps
        ? `<ol class="list-decimal pl-6 space-y-3 text-gray-700">${s.steps
            .map((st) => `<li><strong>${esc(st.title)}.</strong> ${esc(st.text)}</li>`)
            .join("")}</ol>`
        : "";
      return `<section class="py-8"><h2 class="text-2xl font-bold text-gray-900 mb-4">${esc(s.heading)}</h2>${body}${bullets}${steps}</section>`;
    })
    .join("");
  const faqs = page.faqs.length
    ? `<section class="py-8"><h2 class="text-2xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>${page.faqs
        .map((f) => `<h3 class="font-semibold text-gray-900 mt-4">${esc(f.q)}</h3><p class="text-gray-600">${esc(f.a)}</p>`)
        .join("")}</section>`
    : "";
  return `<div class="bg-white min-h-screen"><header class="max-w-[860px] mx-auto px-4 pt-32 pb-6 text-center"><p class="text-[#2a6ff3] font-semibold mb-3">${esc(page.eyebrow)}</p><h1 class="text-4xl font-bold text-gray-900 mb-5">${esc(page.h1)}</h1><p class="text-xl text-gray-600">${esc(page.intro)}</p><p class="mt-6"><a class="text-[#2a6ff3] font-semibold" href="/signup">Get started with ColdNerd</a></p></header><main class="max-w-[860px] mx-auto px-4">${sections}${faqs}</main>${siteNav()}</div>`;
}

function pageJsonLd(page: SeoPage) {
  const url = `${SITE_URL}/${page.slug}`;
  const graph: unknown[] = [
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: page.metaTitle,
      description: page.metaDescription,
      isPartOf: { "@type": "WebSite", name: "ColdNerd", url: SITE_URL },
      publisher: { "@type": "Organization", name: "ColdNerd", url: SITE_URL, logo: `${SITE_URL}/logo.png` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: page.label, item: url },
      ],
    },
  ];
  if (page.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  return jsonLd({ "@context": "https://schema.org", "@graph": graph });
}

function homeJsonLd() {
  const paid = plans.filter((p) => !p.freeTrial);
  return jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "ColdNerd",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: [
          "https://www.instagram.com/cold_nerd_/",
          "https://www.facebook.com/profile.php?id=61573369782245",
          "https://www.tiktok.com/@cold.nerd",
          "https://www.linkedin.com/company/cold-nerd",
          "https://www.youtube.com/@coldnerdai",
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "ColdNerd",
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Windows",
        description:
          "AI-powered Instagram outreach and DM automation: prospect discovery, AI-personalized messages, follow-ups, analytics and built-in account safety.",
        offers: paid.map((p) => ({
          "@type": "Offer",
          name: p.name,
          price: String(p.monthlyPrice),
          priceCurrency: "USD",
          url: `${SITE_URL}/#pricing`,
        })),
      },
    ],
  });
}

function homeBody() {
  return `<div class="max-w-[860px] mx-auto px-4 pt-32 pb-10"><h1 class="text-4xl font-bold text-gray-900 mb-4">ColdNerd — AI Instagram Outreach &amp; DM Automation</h1><p class="text-lg text-gray-600 mb-4">ColdNerd finds the right prospects on Instagram, writes AI-personalized DMs, sends smart follow-ups and tracks replies — with automatic warmup, daily limits and human-like timing to keep accounts safe.</p><h2 class="text-2xl font-bold text-gray-900 mt-8 mb-3">Plans</h2><ul class="list-disc pl-6 text-gray-700">${plans
    .filter((p) => !p.freeTrial)
    .map((p) => `<li><strong>${esc(p.name)}</strong> — $${p.monthlyPrice}/month: ${esc(p.features.join(", "))}</li>`)
    .join("")}</ul></div>${siteNav()}`;
}

function inject(template: string, head: string, body: string) {
  const a = template.indexOf(SEO_START);
  const b = template.indexOf(SEO_END);
  if (a < 0 || b < 0) throw new Error("[seo] index.html is missing the <!-- seo:start --> / <!-- seo:end --> markers");
  const withHead = template.slice(0, a) + SEO_START + "\n    " + head + "\n    " + template.slice(b);
  if (!withHead.includes('<div id="root"></div>')) throw new Error('[seo] index.html is missing <div id="root"></div>');
  return withHead.replace('<div id="root"></div>', () => `<div id="root"><div data-prerender>${body}</div></div>`);
}

async function blogSlugs(): Promise<{ slug: string; lastmod: string }[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=slug,updated_at&status=eq.published`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const rows = (await res.json()) as { slug: string; updated_at: string }[];
      if (rows.length) return rows.map((r) => ({ slug: r.slug, lastmod: r.updated_at }));
    }
  } catch {
    /* offline build: fall back to starter articles */
  }
  return seedPosts.map((p) => ({ slug: p.slug, lastmod: p.updated_at }));
}

function llmsTxt() {
  const group = (g: SeoPage["group"]) =>
    seoPages
      .filter((p) => p.group === g)
      .map((p) => `- [${p.label}](${SITE_URL}/${p.slug}): ${p.metaDescription}`)
      .join("\n");
  const pricing = plans
    .filter((p) => !p.freeTrial)
    .map((p) => `- ${p.name} ($${p.monthlyPrice}/month, $${p.yearlyPrice}/month billed yearly): ${p.features.join(", ")}`)
    .join("\n");
  return `# ColdNerd

> ColdNerd is AI-powered Instagram outreach and DM automation software. It finds prospects, analyzes their profiles with AI, writes personalized DMs, sends follow-ups and tracks replies, with automatic account warmup, daily limits and human-like timing for safety.

## About
${group("company")}

## Learn
${group("learn")}

## Solutions
${group("solutions")}

## Pricing
${pricing}

## More
- [Blog](${SITE_URL}/blog): Guides on Instagram growth, DM outreach and automation.
- [Home](${SITE_URL}/): Product overview, features and pricing.
`;
}

export function seoPrerender(): Plugin {
  let outDir = "dist";
  return {
    name: "coldnerd-seo-prerender",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      const template = fs.readFileSync(indexPath, "utf8");
      const today = new Date().toISOString().slice(0, 10);

      for (const page of seoPages) {
        const url = `${SITE_URL}/${page.slug}`;
        const head = headTags({ title: page.metaTitle, description: page.metaDescription, url, extra: pageJsonLd(page) });
        fs.writeFileSync(path.join(outDir, `${page.slug}.html`), inject(template, head, renderPageBody(page)));
      }

      const homeHead = headTags({
        title: "ColdNerd — AI Instagram Outreach & DM Automation Software",
        description:
          "Find prospects, send AI-personalized Instagram DMs, automate follow-ups and track replies with ColdNerd — Instagram outreach with built-in account safety.",
        url: `${SITE_URL}/`,
        extra: homeJsonLd(),
      });
      fs.writeFileSync(indexPath, inject(template, homeHead, homeBody()));

      const posts = await blogSlugs();
      const urls = [
        { loc: `${SITE_URL}/`, lastmod: today, priority: "1.0" },
        ...seoPages.map((p) => ({ loc: `${SITE_URL}/${p.slug}`, lastmod: today, priority: "0.8" })),
        { loc: `${SITE_URL}/blog`, lastmod: today, priority: "0.7" },
        ...posts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.lastmod.slice(0, 10), priority: "0.6" })),
      ];
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`)
          .join("\n")}\n</urlset>\n`
      );
      fs.writeFileSync(path.join(outDir, "llms.txt"), llmsTxt());
      console.log(`[seo] pre-rendered ${seoPages.length} pages, sitemap (${urls.length} URLs) and llms.txt`);
    },
  };
}
