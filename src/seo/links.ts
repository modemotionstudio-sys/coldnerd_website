/**
 * The small part of the SEO data that every page needs (route paths, menu and
 * footer links, head tags of browser-only pages). Kept apart from pages.ts,
 * whose long page texts are only downloaded when an SEO page is opened.
 * The build checks that seoPageList matches the pages in pages.ts.
 */

/** The SEO landing pages, in the same order as seoPages in pages.ts. */
export const seoPageList = [
  { slug: "what-is-coldnerd", label: "What Is ColdNerd?", group: "company" },
  { slug: "instagram-outreach", label: "Instagram Outreach", group: "learn" },
  { slug: "instagram-prospecting", label: "Instagram Prospecting", group: "learn" },
  { slug: "instagram-lead-generation", label: "Instagram Lead Generation", group: "learn" },
  { slug: "instagram-dm-automation", label: "Instagram DM Automation", group: "learn" },
  { slug: "for-agencies", label: "For Agencies", group: "solutions" },
  { slug: "for-freelancers", label: "For Freelancers", group: "solutions" },
] as const;

/** "Learn" guides, in menu order. */
export const learnLinks = seoPageList
  .filter((p) => p.group === "learn")
  .map((p) => ({ label: p.label, href: `/${p.slug}` }));

/** Comparison articles (published through the blog CMS). */
export const comparisonLinks = [
  { label: "ColdNerd vs ManyChat", href: "/blog/coldnerd-vs-manychat" },
  { label: "ColdNerd vs PhantomBuster", href: "/blog/coldnerd-vs-phantombuster" },
  { label: "Best Instagram Outreach Tools", href: "/blog/best-instagram-outreach-tools" },
];

/**
 * Head tags for pages that only render in the browser. The same values are
 * pre-rendered into their static HTML, so crawlers see them without JavaScript.
 */
export const appPageMeta = {
  login: {
    title: "Log in to ColdNerd | Instagram Outreach & DM Automation",
    description: "Log in to your ColdNerd account to manage your Instagram outreach and DM automation campaigns.",
    noindex: true,
  },
  signup: {
    title: "Create Your ColdNerd Account | Instagram DM Automation",
    description: "Create your ColdNerd account to start AI-personalised Instagram outreach with automated follow-ups and built-in account safety.",
    noindex: true,
  },
  pricing: {
    title: "ColdNerd Pricing: Instagram DM Automation Plans & Features",
    description:
      "See ColdNerd plans for AI Instagram outreach and DM automation, for freelancers, agencies and teams. Compare features and pick the right plan.",
    noindex: true,
  },
  "terms-and-conditions": {
    title: "Terms of Service & Privacy Policy | ColdNerd",
    description: "ColdNerd's terms of service and privacy policy: what data we collect, how it is used and your rights.",
    canonicalPath: "/terms-and-conditions",
  },
} satisfies Record<string, { title: string; description: string; noindex?: boolean; canonicalPath?: string }>;
