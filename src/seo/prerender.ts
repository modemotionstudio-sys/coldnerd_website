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
import { homeFaqs } from "../lib/faqData";

const SUPABASE_URL = "https://digzspnffmdrqpagxswi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpZ3pzcG5mZm1kcnFwYWd4c3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjg2MDEsImV4cCI6MjA5MzgwNDYwMX0.6_6pu-EKBxlAQc9TrktlhblAL1AYZtUuT88OX7PmQeQ";

const SEO_START = "<!-- seo:start -->";
const SEO_END = "<!-- seo:end -->";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const jsonLd = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

function headTags(o: { title: string; description: string; url?: string; type?: string; robots?: string; image?: string; extra?: string }) {
  return [
    `<title>${esc(o.title)}</title>`,
    `<meta name="description" content="${esc(o.description)}" />`,
    o.robots ? `<meta name="robots" content="${o.robots}" />` : "",
    o.url ? `<link rel="canonical" href="${o.url}" />` : "",
    `<meta property="og:type" content="${o.type ?? "website"}" />`,
    `<meta property="og:site_name" content="ColdNerd" />`,
    `<meta property="og:title" content="${esc(o.title)}" />`,
    `<meta property="og:description" content="${esc(o.description)}" />`,
    o.url ? `<meta property="og:url" content="${o.url}" />` : "",
    `<meta property="og:image" content="${o.image ?? `${SITE_URL}/logo.png`}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(o.title)}" />`,
    `<meta name="twitter:description" content="${esc(o.description)}" />`,
    o.extra ?? "",
  ]
    .filter(Boolean)
    .join("\n    ");
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
      {
        "@type": "FAQPage",
        mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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

interface PublishedPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  category: string;
  author_name: string;
  read_time_minutes: number;
  published_at: string | null;
  updated_at: string;
  seo_title: string | null;
  seo_description: string | null;
}

/** Published blog articles from Supabase (or the bundled starter articles if the database can't be reached). */
async function publishedPosts(): Promise<PublishedPost[]> {
  try {
    const cols =
      "slug,title,excerpt,content,cover_image_url,category,author_name,read_time_minutes,published_at,updated_at,seo_title,seo_description";
    const now = new Date().toISOString();
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=${cols}&status=eq.published&published_at=lte.${now}&order=published_at.desc`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }, signal: AbortSignal.timeout(10000) }
    );
    if (res.ok) {
      const rows = (await res.json()) as PublishedPost[];
      if (rows.length) return rows;
    }
  } catch {
    /* offline build: fall back to starter articles */
  }
  return seedPosts;
}

const ALLOWED_TAGS = new Set([
  "p", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "u", "s", "mark", "code", "pre",
  "blockquote", "ul", "ol", "li", "a", "img", "table", "thead", "tbody", "tr", "th", "td", "span", "div", "sub", "sup",
]);
const ALLOWED_ATTRS = new Set(["href", "src", "alt", "title"]);

/** Conservative sanitiser for article HTML written into the static pages (no scripts, styles, iframes or event handlers). */
function cleanHtml(html: string) {
  return html
    .replace(/<(script|style|iframe|object|embed|noscript|template)[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (tag, name: string, attrs: string) => {
      const t = name.toLowerCase();
      if (!ALLOWED_TAGS.has(t)) return "";
      if (tag.startsWith("</")) return `</${t}>`;
      const kept: string[] = [];
      for (const m of attrs.matchAll(/([a-zA-Z-]+)\s*=\s*("([^"]*)"|'([^']*)')/g)) {
        const key = m[1].toLowerCase();
        const val = m[3] ?? m[4] ?? "";
        if (!ALLOWED_ATTRS.has(key)) continue;
        if ((key === "href" || key === "src") && /^\s*(javascript|data|vbscript):/i.test(val)) continue;
        kept.push(`${key}="${esc(val.replace(/&quot;/g, '"').replace(/&amp;/g, "&"))}"`);
      }
      return `<${t}${kept.length ? " " + kept.join(" ") : ""}>`;
    });
}

const absUrl = (u: string | null) =>
  !u ? `${SITE_URL}/logo.png` : u.startsWith("http") ? u : `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`;
const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }) : "";

// Keep in sync with BLOG_META in src/lib/seo.ts
const BLOG_TITLE = "ColdNerd Blog — Instagram Outreach, DM Automation & Growth Guides";
const BLOG_DESCRIPTION =
  "Guides, comparisons and playbooks on Instagram outreach, cold DMs, prospecting, lead generation and safe DM automation from the ColdNerd team.";
const GENERIC_DESCRIPTION =
  "Find prospects, send AI-personalized Instagram DMs, automate follow-ups and track replies with ColdNerd — Instagram outreach with built-in account safety.";

function postHead(post: PublishedPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.seo_title || post.title} - ColdNerd Blog`;
  const description = post.seo_description || post.excerpt;
  const ld = jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description,
        image: absUrl(post.cover_image_url),
        datePublished: post.published_at ?? post.updated_at,
        dateModified: post.updated_at,
        articleSection: post.category,
        author: { "@type": post.author_name === "ColdNerd Team" ? "Organization" : "Person", name: post.author_name },
        publisher: {
          "@type": "Organization",
          name: "ColdNerd",
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        },
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  });
  return headTags({ title, description, url, type: "article", image: absUrl(post.cover_image_url), extra: ld });
}

function postBody(post: PublishedPost) {
  return `<article class="max-w-[760px] mx-auto px-4 pt-32 pb-10"><nav aria-label="Breadcrumb" class="text-sm text-gray-500 mb-4"><a href="/">Home</a> / <a href="/blog">Blog</a> / <span>${esc(post.title)}</span></nav><p class="text-[#2a6ff3] font-semibold">${esc(post.category)}</p><h1 class="text-4xl font-bold text-gray-900 my-4">${esc(post.title)}</h1><p class="text-xl text-gray-600 mb-4">${esc(post.excerpt)}</p><p class="text-sm text-gray-500 mb-8">By ${esc(post.author_name)} · ${fmtDate(post.published_at ?? post.updated_at)} · ${post.read_time_minutes} min read</p><div class="cn-prose">${cleanHtml(post.content)}</div><p class="mt-10"><a class="text-[#2a6ff3] font-semibold" href="/blog">More articles on the ColdNerd blog</a></p></article>${siteNav()}`;
}

function blogListHead(posts: PublishedPost[]) {
  const url = `${SITE_URL}/blog`;
  const ld = jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        url,
        name: BLOG_TITLE,
        description: BLOG_DESCRIPTION,
        isPartOf: { "@type": "WebSite", name: "ColdNerd", url: SITE_URL },
        hasPart: posts.slice(0, 20).map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/blog/${p.slug}` })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: url },
        ],
      },
    ],
  });
  return headTags({ title: BLOG_TITLE, description: BLOG_DESCRIPTION, url, extra: ld });
}

function blogListBody(posts: PublishedPost[]) {
  return `<div class="max-w-[960px] mx-auto px-4 pt-32 pb-10"><h1 class="text-4xl font-bold text-gray-900 mb-4">Insights &amp; Strategies for Instagram Growth</h1><p class="text-lg text-gray-600 mb-8">Tips, guides, and best practices to help you automate smarter and grow faster.</p>${posts
    .map(
      (p) =>
        `<article class="py-4 border-b border-gray-100"><h2 class="text-xl font-bold"><a href="/blog/${esc(p.slug)}">${esc(p.title)}</a></h2><p class="text-gray-600">${esc(p.excerpt)}</p><p class="text-sm text-gray-400">${esc(p.category)} · ${fmtDate(p.published_at)}</p></article>`
    )
    .join("")}</div>${siteNav()}`;
}

function llmsTxt(posts: PublishedPost[]) {
  const group = (g: SeoPage["group"]) =>
    seoPages
      .filter((p) => p.group === g)
      .map((p) => `- [${p.label}](${SITE_URL}/${p.slug}): ${p.metaDescription}`)
      .join("\n");
  const pricing = plans
    .filter((p) => !p.freeTrial)
    .map((p) => `- ${p.name} ($${p.monthlyPrice}/month, $${p.yearlyPrice}/month billed yearly): ${p.features.join(", ")}`)
    .join("\n");
  const articles = posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.seo_description || p.excerpt}`).join("\n");
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

## Blog articles
${articles}

## More
- [Blog](${SITE_URL}/blog): Guides on Instagram growth, DM outreach and automation.
- [Home](${SITE_URL}/): Product overview, features and pricing.
- [Terms & Privacy Policy](${SITE_URL}/terms-and-conditions)
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
      const write = (file: string, html: string) => {
        const full = path.join(outDir, file);
        fs.mkdirSync(path.dirname(full), { recursive: true });
        fs.writeFileSync(full, html);
      };

      // SEO landing pages
      for (const page of seoPages) {
        const url = `${SITE_URL}/${page.slug}`;
        const head = headTags({ title: page.metaTitle, description: page.metaDescription, url, extra: pageJsonLd(page) });
        write(`${page.slug}.html`, inject(template, head, renderPageBody(page)));
      }

      // Blog list + every published article
      const posts = await publishedPosts();
      write("blog.html", inject(template, blogListHead(posts), blogListBody(posts)));
      for (const post of posts) {
        if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(post.slug)) continue;
        write(`blog/${post.slug}.html`, inject(template, postHead(post), postBody(post)));
      }

      // App shell for pages that only render in the browser (login, sign-up, pricing, articles published
      // since the last deploy…). It has no canonical, so it never claims to be the homepage.
      write("app.html", inject(template, headTags({ title: "ColdNerd", description: GENERIC_DESCRIPTION }), ""));
      // Real 404 page: Vercel serves it with a 404 status for unknown URLs.
      write(
        "404.html",
        inject(template, headTags({ title: "Page not found - ColdNerd", description: GENERIC_DESCRIPTION, robots: "noindex" }), "")
      );

      // Homepage (written last because index.html is the template for everything above)
      const homeHead = headTags({
        title: "ColdNerd — AI Instagram Outreach & DM Automation Software",
        description: GENERIC_DESCRIPTION,
        url: `${SITE_URL}/`,
        extra: homeJsonLd(),
      });
      fs.writeFileSync(indexPath, inject(template, homeHead, homeBody()));

      const urls = [
        { loc: `${SITE_URL}/`, lastmod: today, priority: "1.0" },
        ...seoPages.map((p) => ({ loc: `${SITE_URL}/${p.slug}`, lastmod: today, priority: "0.8" })),
        { loc: `${SITE_URL}/blog`, lastmod: today, priority: "0.7" },
        ...posts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.updated_at.slice(0, 10), priority: "0.6" })),
        { loc: `${SITE_URL}/terms-and-conditions`, lastmod: today, priority: "0.3" },
      ];
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`)
          .join("\n")}\n</urlset>\n`
      );
      fs.writeFileSync(path.join(outDir, "llms.txt"), llmsTxt(posts));
      console.log(
        `[seo] pre-rendered ${seoPages.length} pages, blog + ${posts.length} articles, app shell, 404, sitemap (${urls.length} URLs), llms.txt`
      );
    },
  };
}
