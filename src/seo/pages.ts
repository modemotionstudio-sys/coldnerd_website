/**
 * SEO landing pages (linked from the footer). This file is plain data so it can
 * be used both by the React pages and by the build step that pre-renders static
 * HTML for search engines and AI crawlers (see vite.config.ts).
 *
 * To edit a page's text, change it here. To add a page, add an entry and a
 * footer link in FooterSection.tsx.
 */

export interface SeoSection {
  heading: string;
  body?: string[];
  bullets?: string[];
  steps?: { title: string; text: string }[];
}

export interface SeoFaq {
  q: string;
  a: string;
}

export interface SeoPage {
  slug: string;
  /** Footer / link label */
  label: string;
  group: "learn" | "solutions" | "company";
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: SeoSection[];
  faqs: SeoFaq[];
  related: string[];
}

export const SITE_URL = "https://www.coldnerd.com";

export const seoPages: SeoPage[] = [
  // ---------------------------------------------------------------- Company
  {
    slug: "what-is-coldnerd",
    label: "What Is ColdNerd?",
    group: "company",
    metaTitle: "What Is ColdNerd? AI Instagram Outreach & DM Automation Software",
    metaDescription:
      "ColdNerd is AI-powered Instagram outreach software that finds prospects, writes personalized DMs, sends follow-ups and tracks replies — with built-in account safety.",
    eyebrow: "About ColdNerd",
    h1: "What Is ColdNerd?",
    intro:
      "ColdNerd is an AI-powered Instagram outreach platform. It finds the right prospects, analyzes their profiles, writes personalized direct messages, sends smart follow-ups and shows you exactly which conversations turn into leads — while protecting your accounts with warmup and human-like sending limits.",
    sections: [
      {
        heading: "ColdNerd in one sentence",
        body: [
          "ColdNerd turns Instagram into a predictable lead-generation channel by automating the repetitive parts of outreach — finding people, writing first messages and following up — so you can spend your time on the conversations that matter.",
        ],
      },
      {
        heading: "Who ColdNerd is for",
        bullets: [
          "Agencies running outreach for themselves or for dozens of client accounts.",
          "Freelancers and consultants who find clients on Instagram.",
          "Coaches, creators and personal brands booking calls through DMs.",
          "E-commerce brands recruiting influencers, ambassadors and wholesale partners.",
          "B2B and local businesses reaching decision-makers who are active on Instagram.",
        ],
      },
      {
        heading: "How ColdNerd works",
        steps: [
          { title: "Find your audience", text: "Discover prospects from competitor followers, post likers, commenters and hashtags that match your ideal customer." },
          { title: "Analyze and personalize", text: "AI reads each prospect's bio and recent posts, then writes a first message that references something real about them." },
          { title: "Send safely", text: "Messages go out with human-like timing, daily limits and automatic account warmup to reduce the risk of restrictions." },
          { title: "Follow up automatically", text: "Timed follow-ups are sent to people who haven't replied, and stop the moment someone responds." },
          { title: "Track and improve", text: "Analytics show sends, replies and reply rates per campaign so you can double down on what works." },
        ],
      },
      {
        heading: "Core features",
        bullets: [
          "Prospect discovery from followers, likers, commenters and hashtags",
          "AI profile analysis and AI-personalized messages",
          "Automated follow-up sequences",
          "Multi-account management (3, 15 or unlimited accounts depending on plan)",
          "Safe account warmup, daily limits and human-like send timing",
          "Humanized voice-note DMs (Agency plan)",
          "Team members, client workspaces and API access (Agency plan)",
          "Campaign analytics and reply tracking",
        ],
      },
      {
        heading: "Why teams choose ColdNerd",
        body: [
          "Most outreach tools either blast identical messages or require hours of manual work. ColdNerd sits in the middle: it automates the volume while keeping every message personal. Safety is built in rather than bolted on, and pricing scales from solo users to agencies managing many clients.",
        ],
      },
    ],
    faqs: [
      { q: "Is ColdNerd a chatbot?", a: "No. Chatbots reply to people who message you first. ColdNerd is an outbound outreach tool: it helps you start conversations with new prospects and follow up with them." },
      { q: "Does ColdNerd use AI?", a: "Yes. ColdNerd uses AI to analyze prospect profiles and write personalized messages, so each DM references something relevant to the person receiving it." },
      { q: "How many Instagram accounts can I connect?", a: "Starter supports 3 accounts, Growth supports 15 and Agency supports unlimited accounts." },
      { q: "Is ColdNerd safe for my Instagram account?", a: "ColdNerd is designed to reduce risk with automatic warmup, daily sending limits and human-like timing. As with any automation, following sensible volumes and writing genuine messages is still important." },
    ],
    related: ["instagram-outreach", "instagram-dm-automation", "for-agencies"],
  },

  // ---------------------------------------------------------------- Learn
  {
    slug: "instagram-outreach",
    label: "Instagram Outreach",
    group: "learn",
    metaTitle: "Instagram Outreach: The Complete Guide to Getting Replies (2026)",
    metaDescription:
      "Learn how to do Instagram outreach that gets replies: targeting, personalized DMs, follow-ups, safety limits and how to scale with ColdNerd.",
    eyebrow: "Learn",
    h1: "Instagram Outreach: How to Start Conversations That Turn Into Customers",
    intro:
      "Instagram outreach is the practice of proactively messaging the right people on Instagram to build relationships, land clients, find partners or book sales calls. Done well, it's one of the most direct and cost-effective growth channels available. This guide covers how to do it — and how to scale it without losing the personal touch.",
    sections: [
      {
        heading: "What is Instagram outreach?",
        body: [
          "Instagram outreach means starting conversations instead of waiting for them. Rather than relying only on posts and ads, you reach out directly via DMs to prospects who match your ideal customer: business owners, creators, potential partners or buyers.",
          "Because Instagram is where many people spend their attention, a thoughtful DM can reach decision-makers faster than email — and often feels more personal.",
        ],
      },
      {
        heading: "Why Instagram outreach works",
        bullets: [
          "Direct access: most profiles accept message requests, and DMs are read on mobile.",
          "Context: you can see someone's content before messaging, so personalization is easy.",
          "Low cost: no ad spend — just time, or software that saves it.",
          "Relationship signals: conversations improve how often your content appears for that person.",
        ],
      },
      {
        heading: "A proven Instagram outreach process",
        steps: [
          { title: "Define your ideal prospect", text: "Be specific about niche, size, location and the problem you solve. The tighter the target, the better your reply rate." },
          { title: "Build a targeted list", text: "Source prospects from competitor followers, engaged likers and commenters, and niche hashtags." },
          { title: "Warm up before you pitch", text: "Engage with a post or story first so your name is familiar when your DM arrives." },
          { title: "Send a personalized first message", text: "Reference something real, explain why you're reaching out and ask a low-pressure question. No hard pitch." },
          { title: "Follow up", text: "Many replies come from the second or third touch. Space follow-ups a few days apart and add value each time." },
          { title: "Measure and iterate", text: "Track reply and positive-reply rates per message and keep improving the best performers." },
        ],
      },
      {
        heading: "Instagram outreach best practices",
        bullets: [
          "Keep first messages short — two to four sentences.",
          "Personalize the opening line for every prospect.",
          "Never send identical copy to large lists.",
          "Ramp volume gradually on new or quiet accounts.",
          "Stop following up as soon as someone replies or declines.",
        ],
      },
      {
        heading: "Scaling Instagram outreach with ColdNerd",
        body: [
          "Manual outreach works until it doesn't — finding prospects, writing messages and tracking follow-ups quickly takes hours a day. ColdNerd automates prospect discovery, writes AI-personalized messages, schedules follow-ups and enforces safe sending limits across multiple accounts, so you can scale from dozens to thousands of conversations.",
        ],
      },
    ],
    faqs: [
      { q: "Is Instagram outreach the same as spam?", a: "No. Spam is irrelevant, identical messages sent in bulk. Good outreach is targeted, personalized and offers value to the recipient." },
      { q: "How many DMs should I send per day?", a: "It depends on your account's age and history. Start low on new accounts, increase gradually and keep volume consistent. ColdNerd manages warmup and daily limits automatically." },
      { q: "What's a good reply rate for Instagram outreach?", a: "It varies by niche and offer. Highly targeted, personalized campaigns typically perform far better than generic ones — test and track your own numbers." },
      { q: "Can I do Instagram outreach for B2B?", a: "Yes. Many founders, agency owners and local business owners are active on Instagram, making it a strong B2B channel when your targeting is precise." },
    ],
    related: ["instagram-prospecting", "instagram-lead-generation", "instagram-dm-automation"],
  },
  {
    slug: "instagram-prospecting",
    label: "Instagram Prospecting",
    group: "learn",
    metaTitle: "Instagram Prospecting: How to Find Qualified Leads on Instagram",
    metaDescription:
      "A practical guide to Instagram prospecting: where to find ideal prospects, how to qualify them and how ColdNerd automates discovery and AI profile analysis.",
    eyebrow: "Learn",
    h1: "Instagram Prospecting: How to Find the Right People to Message",
    intro:
      "Instagram prospecting is the process of finding and qualifying people on Instagram who are likely to need what you offer. Great outreach starts here: the best message in the world won't work if it's sent to the wrong person.",
    sections: [
      {
        heading: "What is Instagram prospecting?",
        body: [
          "Prospecting is research. You identify accounts that match your ideal customer profile, check that they're a good fit and organize them into lists for outreach. On Instagram, public profiles, bios, posts and engagement give you rich signals to qualify prospects before you ever send a message.",
        ],
      },
      {
        heading: "Where to find prospects on Instagram",
        bullets: [
          "Followers of competitors or complementary brands in your niche.",
          "People who like and comment on relevant posts — they're active and engaged.",
          "Niche and location hashtags your customers use.",
          "Tagged posts, collaborations and accounts featured by industry leaders.",
          "Your own engaged followers who haven't become customers yet.",
        ],
      },
      {
        heading: "How to qualify a prospect",
        steps: [
          { title: "Check the bio", text: "Does it mention the role, niche, location or problem you serve? Is there a business link or contact option?" },
          { title: "Look at recent activity", text: "Active accounts reply more. Recent posts also give you a natural, personal opening line." },
          { title: "Gauge size and stage", text: "Follower count and content quality hint at budget and needs. Match prospects to the offer that fits them." },
          { title: "Spot buying signals", text: "Hiring posts, launches, new locations or complaints about a problem you solve are strong signals." },
        ],
      },
      {
        heading: "Common prospecting mistakes",
        bullets: [
          "Targeting too broadly — 'business owners' isn't a niche.",
          "Messaging inactive or private accounts.",
          "Skipping qualification to chase volume.",
          "Not segmenting lists, so every prospect gets the same message.",
        ],
      },
      {
        heading: "Automate Instagram prospecting with ColdNerd",
        body: [
          "ColdNerd's prospect discovery pulls targeted lists from followers, likers, commenters and hashtags. AI profile analysis then reads each prospect's bio and recent content so you can filter for fit and generate personalized openers automatically — turning hours of research into minutes.",
        ],
      },
    ],
    faqs: [
      { q: "Is Instagram prospecting allowed?", a: "Viewing public profiles and messaging people is normal Instagram use. Keep your outreach relevant, respectful and within sensible volumes." },
      { q: "How big should a prospect list be?", a: "Quality matters more than size. A few hundred well-qualified prospects usually outperform thousands of random accounts." },
      { q: "What is AI profile analysis?", a: "It's ColdNerd's feature that reads a prospect's bio and posts to understand who they are and what to mention in a personalized message. It's limited on Starter and full on Growth and Agency." },
    ],
    related: ["instagram-outreach", "instagram-lead-generation", "what-is-coldnerd"],
  },
  {
    slug: "instagram-lead-generation",
    label: "Instagram Lead Generation",
    group: "learn",
    metaTitle: "Instagram Lead Generation: Strategies That Fill Your Pipeline",
    metaDescription:
      "Generate leads from Instagram with outbound DMs, smart follow-ups and content that converts. See how ColdNerd turns Instagram conversations into qualified leads.",
    eyebrow: "Learn",
    h1: "Instagram Lead Generation: Turn Conversations Into Qualified Leads",
    intro:
      "Instagram lead generation is about turning attention on Instagram into real business opportunities: booked calls, sales conversations, partnerships and customers. The fastest route is combining strong content with proactive, personalized DM outreach.",
    sections: [
      {
        heading: "Inbound vs. outbound lead generation on Instagram",
        body: [
          "Inbound lead generation relies on people finding you — through content, Reels, ads or your bio link — and messaging first. Outbound lead generation means you start the conversation with prospects who fit your ideal customer profile.",
          "Inbound compounds over time but is slow and unpredictable. Outbound is fast and controllable. The best results come from doing both: content builds credibility, outreach creates conversations.",
        ],
      },
      {
        heading: "An Instagram lead generation system",
        steps: [
          { title: "Optimize your profile", text: "A clear bio, proof and a single call to action make prospects trust you when they check your profile after your DM." },
          { title: "Target the right prospects", text: "Build lists of people who match your best customers, sourced from relevant followers, engagers and hashtags." },
          { title: "Open with value", text: "Lead with a relevant observation, idea or resource rather than a pitch." },
          { title: "Qualify in the conversation", text: "Ask about goals and challenges to understand fit before proposing a call." },
          { title: "Follow up consistently", text: "Automated, well-spaced follow-ups recover many leads that would otherwise go cold." },
          { title: "Hand off and track", text: "Move qualified leads to a call or your CRM and track which campaigns produce them." },
        ],
      },
      {
        heading: "Metrics that matter",
        bullets: [
          "Reply rate — are your first messages landing?",
          "Positive-reply rate — are the right people interested?",
          "Leads or calls booked per campaign.",
          "Conversion from lead to customer.",
        ],
      },
      {
        heading: "Generate Instagram leads with ColdNerd",
        body: [
          "ColdNerd automates the outbound side of Instagram lead generation: it finds prospects, writes AI-personalized messages, sends follow-ups that stop when someone replies, and tracks results per campaign. Agencies can run it across many accounts and client workspaces from one place.",
        ],
      },
    ],
    faqs: [
      { q: "Can Instagram generate B2B leads?", a: "Yes. Many founders, agency owners and local business owners use Instagram daily. With precise targeting, it's an effective B2B lead source." },
      { q: "How quickly can I get leads from Instagram outreach?", a: "Outbound outreach can produce conversations within days of launching a campaign, unlike content-only strategies that take months to build." },
      { q: "Do I need ads for Instagram lead generation?", a: "No. Ads can help, but outbound DM outreach generates leads without ad spend." },
    ],
    related: ["instagram-outreach", "instagram-prospecting", "for-freelancers"],
  },
  {
    slug: "instagram-dm-automation",
    label: "Instagram DM Automation",
    group: "learn",
    metaTitle: "Instagram DM Automation: Send Personalized DMs at Scale Safely",
    metaDescription:
      "How Instagram DM automation works, how to keep it safe and personal, and how ColdNerd automates AI-personalized DMs, follow-ups and voice notes.",
    eyebrow: "Learn",
    h1: "Instagram DM Automation: Personal Messages, Automated Safely",
    intro:
      "Instagram DM automation uses software to send, schedule and follow up on direct messages so you can reach more people without typing every message by hand. The key is automating the repetitive work while keeping every message personal and your accounts safe.",
    sections: [
      {
        heading: "What can you automate in Instagram DMs?",
        bullets: [
          "Finding and organizing prospects to message.",
          "Writing personalized first messages from each prospect's profile.",
          "Sending messages with human-like timing.",
          "Follow-up sequences for people who haven't replied.",
          "Stopping sequences when someone responds.",
          "Tracking sends, replies and reply rates.",
        ],
      },
      {
        heading: "Outbound DM automation vs. auto-reply bots",
        body: [
          "Auto-reply tools respond when someone comments a keyword or messages you first — useful for inbound engagement. Outbound DM automation, which ColdNerd focuses on, starts new conversations with prospects you choose. Many businesses use both.",
        ],
      },
      {
        heading: "How to automate Instagram DMs safely",
        steps: [
          { title: "Warm up accounts", text: "New or quiet accounts should ramp activity gradually before running campaigns." },
          { title: "Respect daily limits", text: "Consistent, moderate volume is safer than sudden spikes." },
          { title: "Use human-like timing", text: "Randomized delays and activity spread through the day look natural." },
          { title: "Personalize and vary messages", text: "Identical copy sent to many people is a spam signal — and gets fewer replies." },
          { title: "Watch for warnings", text: "If Instagram shows an action warning, pause and lower volume." },
        ],
      },
      {
        heading: "Instagram DM automation with ColdNerd",
        body: [
          "ColdNerd combines AI personalization with built-in safety: automatic warmup, daily limits and human-like sending. Follow-ups run on schedule and stop when a prospect replies. On the Agency plan you can also send humanized voice-note DMs and manage team members and client workspaces.",
        ],
      },
    ],
    faqs: [
      { q: "Is Instagram DM automation safe?", a: "Automation always carries some risk, but it can be reduced significantly with warmup, sensible daily limits, human-like timing and genuinely personalized messages — all built into ColdNerd." },
      { q: "Will automated DMs sound robotic?", a: "Not with AI personalization. ColdNerd writes each message using details from the prospect's own profile and content." },
      { q: "Can I automate voice-note DMs?", a: "Yes, humanized voice notes are available on the Agency plan." },
      { q: "How many DMs can I automate?", a: "Starter includes 3,000 DMs per month. Growth and Agency include unlimited DMs." },
    ],
    related: ["instagram-outreach", "what-is-coldnerd", "for-agencies"],
  },

  // ---------------------------------------------------------------- Solutions
  {
    slug: "for-agencies",
    label: "For Agencies",
    group: "solutions",
    metaTitle: "ColdNerd for Agencies: Instagram Outreach for Every Client",
    metaDescription:
      "Run Instagram outreach for your agency and your clients: unlimited accounts, client workspaces, team members, voice notes and API access with ColdNerd Agency.",
    eyebrow: "Solutions",
    h1: "Instagram Outreach Software Built for Agencies",
    intro:
      "Whether you're landing clients for your own agency or running outreach as a service, ColdNerd gives you one place to manage unlimited Instagram accounts, separate client workspaces and a team — with safety controls on every account.",
    sections: [
      {
        heading: "Why agencies use ColdNerd",
        bullets: [
          "Unlimited Instagram accounts on the Agency plan.",
          "Client workspaces to keep each client's accounts, campaigns and results separate.",
          "Team members so your staff can run campaigns without sharing logins.",
          "AI personalization that keeps messages on-brand for every client.",
          "Humanized voice-note DMs to stand out in crowded inboxes.",
          "API access to connect ColdNerd with your own tools and reporting.",
          "Dedicated support.",
        ],
      },
      {
        heading: "Offer Instagram outreach as a service",
        body: [
          "Outbound Instagram outreach is a high-value service for coaches, local businesses, e-commerce brands and B2B companies. ColdNerd lets a small team deliver it across many clients: set up a workspace per client, connect their accounts, launch campaigns and report on replies and leads.",
        ],
      },
      {
        heading: "A simple agency workflow",
        steps: [
          { title: "Create a client workspace", text: "Keep accounts, prospect lists and campaigns separated for each client." },
          { title: "Connect and warm up accounts", text: "ColdNerd ramps new accounts gradually and enforces safe daily limits." },
          { title: "Launch personalized campaigns", text: "Use AI personalization and follow-up sequences tailored to each client's offer." },
          { title: "Assign your team", text: "Give team members access to the workspaces they manage." },
          { title: "Report results", text: "Use advanced analytics to show clients replies, conversations and leads." },
        ],
      },
      {
        heading: "Land more clients for your own agency",
        body: [
          "ColdNerd isn't only for client work. Many agencies use it to fill their own pipeline by reaching business owners on Instagram with personalized offers and consistent follow-ups.",
        ],
      },
    ],
    faqs: [
      { q: "How many client accounts can an agency manage?", a: "The Agency plan includes unlimited Instagram accounts and client workspaces." },
      { q: "Can my team use ColdNerd?", a: "Yes. The Agency plan includes team members, so staff can work in ColdNerd without sharing personal logins." },
      { q: "Does ColdNerd have an API?", a: "Yes, API access is included on the Agency plan." },
    ],
    related: ["for-freelancers", "instagram-lead-generation", "instagram-dm-automation"],
  },
  {
    slug: "for-freelancers",
    label: "For Freelancers",
    group: "solutions",
    metaTitle: "ColdNerd for Freelancers: Find Clients on Instagram on Autopilot",
    metaDescription:
      "Freelancers use ColdNerd to find clients on Instagram: discover prospects, send AI-personalized DMs and automate follow-ups — starting with the affordable Starter plan.",
    eyebrow: "Solutions",
    h1: "Find Freelance Clients on Instagram — Without Spending All Day in DMs",
    intro:
      "Designers, editors, marketers, developers and consultants are landing clients on Instagram every day. ColdNerd helps freelancers do it consistently by automating prospect discovery, personalized first messages and follow-ups.",
    sections: [
      {
        heading: "Why Instagram works for freelancers",
        bullets: [
          "Your future clients — creators, coaches and small businesses — are active on Instagram.",
          "You can see exactly what they need from their content before reaching out.",
          "Your own portfolio is one tap away from your DM.",
          "No platform fees or bidding wars like on freelance marketplaces.",
        ],
      },
      {
        heading: "A client-finding routine that runs itself",
        steps: [
          { title: "Pick a niche", text: "For example: 'video editing for fitness coaches' beats 'video editing for anyone'." },
          { title: "Discover prospects", text: "Pull prospects from niche hashtags and followers of accounts your clients follow." },
          { title: "Send a value-first DM", text: "Point out a specific improvement or idea for their content and ask if they'd like to see more." },
          { title: "Follow up automatically", text: "ColdNerd sends polite follow-ups and stops as soon as someone replies." },
          { title: "Convert on a call", text: "Spend your time on interested prospects, not on finding them." },
        ],
      },
      {
        heading: "Start small, scale when you're ready",
        body: [
          "The Starter plan includes 3 Instagram accounts, prospect discovery, AI personalization, follow-ups and 3,000 DMs per month — plenty for a solo freelancer. When you're ready to scale, Growth unlocks 15 accounts, full AI profile analysis and unlimited DMs.",
        ],
      },
    ],
    faqs: [
      { q: "Which plan is best for freelancers?", a: "Most freelancers start on Starter. Upgrade to Growth if you want more accounts, full AI profile analysis or unlimited DMs." },
      { q: "Do I need a business account?", a: "A professional or creator account is recommended because it makes your profile look credible to prospects." },
      { q: "How much time does ColdNerd save?", a: "It removes most manual work — finding prospects, writing first messages and remembering follow-ups — so you only handle replies." },
    ],
    related: ["for-agencies", "instagram-prospecting", "instagram-outreach"],
  },
];

export const seoPageBySlug = (slug: string) => seoPages.find((p) => p.slug === slug);
export const seoPagesInGroup = (group: SeoPage["group"]) => seoPages.filter((p) => p.group === group);
