/**
 * Single source of truth for plans: used by the home pricing section, the
 * /pricing page, the comparison table and the SEO pages.
 */

export interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyTotal: number;
  checkoutUrl: string;
  freeTrial?: boolean;
  features: string[];
  popular: boolean;
}

export const plans: Plan[] = [
  {
    name: "Free Trial",
    description: "Try ColdNerd risk-free for 14 days. No credit card required.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    yearlyTotal: 0,
    checkoutUrl: "",
    freeTrial: true,
    features: ["1 Instagram account", "500 DMs total", "14-day free trial", "Auto warmup", "Email support"],
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
      "3 Instagram accounts",
      "Prospect discovery",
      "Limited AI profile analysis",
      "AI personalization",
      "3,000 DMs per month",
      "Follow-ups",
      "Basic analytics",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Growth",
    description: "Scale your outreach with more accounts, full AI analysis and unlimited DMs.",
    monthlyPrice: 97,
    yearlyPrice: 78,
    yearlyTotal: 931,
    checkoutUrl: "https://whop.com/coldnerd/coldnerd-growth",
    features: [
      "15 Instagram accounts",
      "Prospect discovery",
      "AI profile analysis",
      "AI personalization",
      "Unlimited DMs",
      "Follow-ups",
      "Advanced analytics",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Agency",
    description: "For agencies and teams. Unlimited accounts, client workspaces and API access.",
    monthlyPrice: 197,
    yearlyPrice: 158,
    yearlyTotal: 1891,
    checkoutUrl: "https://whop.com/coldnerd/coldnerd-agency-pro",
    features: [
      "Unlimited Instagram accounts",
      "Everything in Growth",
      "Voice notes",
      "Team members",
      "Client workspaces",
      "API access",
      "Advanced analytics",
      "Dedicated support",
    ],
    popular: false,
  },
];

/** `true` = included, `false` = not included, string = specific limit/level. */
export type FeatureValue = boolean | string;

export interface ComparisonRow {
  feature: string;
  starter: FeatureValue;
  growth: FeatureValue;
  agency: FeatureValue;
}

export const comparisonRows: ComparisonRow[] = [
  { feature: "Instagram accounts", starter: "3", growth: "15", agency: "Unlimited" },
  { feature: "Prospect discovery", starter: true, growth: true, agency: true },
  { feature: "AI profile analysis", starter: "Limited", growth: true, agency: true },
  { feature: "AI personalization", starter: true, growth: true, agency: true },
  { feature: "DMs", starter: "3K", growth: "Unlimited", agency: "Unlimited" },
  { feature: "Follow-ups", starter: true, growth: true, agency: true },
  { feature: "Voice notes", starter: false, growth: false, agency: true },
  { feature: "Analytics", starter: "Basic", growth: "Advanced", agency: "Advanced" },
  { feature: "Team members", starter: false, growth: false, agency: true },
  { feature: "Client workspaces", starter: false, growth: false, agency: true },
  { feature: "API", starter: false, growth: false, agency: true },
  { feature: "Support", starter: "Email", growth: "Priority", agency: "Dedicated" },
];
