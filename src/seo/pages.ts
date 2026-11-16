/**
 * SEO landing pages (linked from the footer). This file is plain data so it can
 * be used both by the React pages and by the build step that pre-renders static
 * HTML for search engines and AI crawlers (see vite.config.ts).
 *
 * To edit a page's text, change it here. To add a page, add an entry and a
 * footer link in FooterSection.tsx.
 */

/** A two-size WebP illustration in public/: `${src}-800.webp` and `${src}-1600.webp` (16:9). */
export interface SeoImage {
  src: string;
  alt: string;
}

/** A diagram drawn in HTML (crawlable, sharp on every screen) in the style of the content PDFs. */
export interface SeoFigure {
  /** cards: 3 numbered cards · grid: 2×2 numbered cards · funnel: bars by value · flow: 2 steps, then 2 outcomes */
  kind: "cards" | "grid" | "funnel" | "flow";
  title: string;
  subtitle: string;
  items: { title: string; text?: string; value?: number }[];
  caption: string;
}

/** One piece of a section, rendered in order. */
export type SeoBlock =
  | { p: string }
  | { h3: string }
  | { quote: string }
  | { list: string[] }
  | { figure: SeoFigure }
  | { image: SeoImage }
  | { callout: string; href: string };

export interface SeoSection {
  heading: string;
  body?: string[];
  bullets?: string[];
  steps?: { title: string; text: string }[];
  /** Richer layout (used instead of body/bullets/steps): paragraphs, H3s, templates, diagrams, images, links. */
  blocks?: SeoBlock[];
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
  /** Date the page text last changed (sitemap lastmod). */
  updated?: string;
  metaTitle: string;
  metaDescription: string;
  /** Social share image (og:image), path in public/. */
  shareImage?: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Large illustration shown under the page header. */
  heroImage?: SeoImage;
  sections: SeoSection[];
  /** FAQ heading (default "Frequently asked questions"). */
  faqHeading?: string;
  faqs: SeoFaq[];
  /** Highlighted link after the FAQs. */
  closing?: { text: string; href: string };
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
    updated: "2026-11-16",
    metaTitle: "Instagram Outreach: Strategy & DM Templates | ColdNerd",
    metaDescription:
      "Learn how to find the right prospects on Instagram, write first DMs and follow-ups, and track which conversations turn into booked calls.",
    shareImage: "/images/guides/instagram-outreach-prospect-list-og.jpg",
    eyebrow: "Outreach guide",
    h1: "Instagram Outreach: A Practical Guide to Getting Clients",
    intro:
      "Instagram outreach is the practice of starting relevant conversations with potential clients or partners on Instagram. A good first DM gives the recipient a clear reason to respond, even if they have never heard of you. Start with one audience, one offer and one next step so you can see what gets a response.",
    heroImage: {
      src: "/images/guides/instagram-outreach-prospect-list",
      alt: "A shortlist of Instagram prospects with a personalised first DM ready to send",
    },
    sections: [
      {
        heading: "1. Define who to contact and why now",
        blocks: [
          {
            p: "Write your audience as a sentence your team could use to make a decision. A video editing agency might look for Pilates studio owners who have announced an upcoming class launch and already publish short instructor demos. The audience is the studio owner. The timing signal is the launch. The offer is turning one existing clip into a short launch Reel.",
          },
          {
            figure: {
              kind: "cards",
              title: "Would you send this DM?",
              subtitle: "A three-question check before you start a conversation",
              items: [
                { title: "Buyer fit", text: "Pilates studio owner who publishes instructor videos" },
                { title: "Public signal", text: "The studio announced a new beginner class" },
                { title: "Useful next step", text: "Offer two ideas for a short launch Reel" },
              ],
              caption: "Three checks for an Instagram prospect: buyer fit, a recent public signal and a useful next step.",
            },
          },
        ],
      },
      {
        heading: "2. Build a shortlist with evidence",
        blocks: [
          {
            p: "Look at public business profiles, industry directories, event speaker lists, local business pages and partnerships. Record the profile URL, decision maker or business contact, the public signal you noticed, and the date you checked it. Recent activity can tell you where to look, while follower count alone tells you little about budget or intent.",
          },
          {
            p: "Before writing, confirm that the business fits your offer, that your observation is accurate, and that you can explain the connection in one sentence. Skip accounts with no clear fit, people who have declined, and prospects already in a conversation with your team.",
          },
          { callout: "Ready to build a list? Read the Instagram prospecting guide.", href: "/instagram-prospecting" },
        ],
      },
      {
        heading: "3. Write a first DM that earns a reply",
        blocks: [
          {
            p: "Use three parts: a verified observation, a connection to a specific outcome, and a small question. You can offer something easy to assess, such as two ideas or a short outline. Save a calendar link, portfolio reel or long pitch for when the person asks for more.",
          },
          {
            figure: {
              kind: "cards",
              title: "Anatomy of a first DM",
              subtitle: "A video editor reaches out to a Pilates studio",
              items: [
                { title: "Verified observation", text: "Hey Priya, saw you're launching a beginner class next month." },
                { title: "Relevant offer", text: "Your instructor demo gave me two ideas for a short launch Reel." },
                { title: "Small question", text: "Want me to send them here?" },
              ],
              caption: "An annotated first DM shows the public signal, a relevant offer and a question the prospect can answer quickly.",
            },
          },
          { h3: "Template for a freelancer or agency" },
          {
            quote:
              "Hey [name], saw that [public launch or announcement]. I edit short videos for [relevant niche], and your [existing asset] gave me an idea for [specific outcome]. Want me to send two quick concepts here?",
          },
          { h3: "Template for a local B2B service" },
          {
            quote:
              "Hi [name], congrats on opening [location]. I work with [type of business] on [specific outcome]. I noticed [verified public detail] and had one idea for [opportunity]. Would a short note here be useful?",
          },
          { h3: "Template for a creator partnership" },
          {
            quote:
              "Hey [name], your post on [specific topic] made me think of a short [format] we could make together for [shared audience]. I can handle [your contribution]. Want the two-sentence outline?",
          },
          {
            p: "Read the DM aloud. If the opening would work on 20 unrelated accounts, make it more specific. If you name a problem you cannot verify, present it as a question. If you offer an example, prepare it before anyone replies.",
          },
        ],
      },
      {
        heading: "4. Follow up only when you have something to add",
        blocks: [
          {
            p: "If someone hasn't replied and a follow-up is appropriate, wait a few business days and send one useful extra. For the Pilates studio, you could share an example hook: “One idea for the launch Reel: open with three seconds of the class in motion, then put the date on screen before the first instruction.”",
          },
          {
            p: "A silent thread can end there. Close it in your tracker instead of chasing the person across channels. If someone declines or asks you to stop, update your shared contact list so another teammate doesn't message them again.",
          },
          {
            figure: {
              kind: "cards",
              title: "What to do after the first DM",
              subtitle: "Use the recipient's response to choose the next action",
              items: [
                { title: "Interested", text: "Send what you promised, then ask one fit question." },
                { title: "Declines", text: "Acknowledge and close the thread." },
                { title: "No reply", text: "If appropriate, send one useful follow-up. Then close." },
              ],
              caption: "Workflow for an interested reply, a decline or silence after an Instagram outreach message.",
            },
          },
        ],
      },
      {
        heading: "5. Turn interest into the right next step",
        blocks: [
          {
            p: "If they say “send it,” share what you promised in the DM. Then ask one question that helps you understand fit, such as “Is the goal trial bookings, or awareness for the new class?” Once you understand the goal, suggest a short call only if it would help both sides make a decision.",
          },
          { h3: "A reply you can adapt" },
          {
            quote:
              "Here are the two hooks I had in mind. The first leads with the class experience. The second leads with the timetable. Which feels closer to your launch? If you want help choosing footage, I can walk through it with you in 15 minutes.",
          },
          {
            p: "Keep one owner on the thread. Record what you promised, your next action and its date. Use clear statuses such as ready, contacted, replied, interested, call booked and closed so a teammate can pick up where you left off.",
          },
          {
            image: {
              src: "/images/guides/instagram-outreach-conversation",
              alt: "Two people reviewing an Instagram conversation together on a laptop",
            },
          },
        ],
      },
      {
        heading: "6. Measure outcomes by audience and offer",
        blocks: [
          {
            p: "Compare batches from the week you first contacted each prospect. Pick a consistent reply window, such as seven days, and count each person once. Use a spreadsheet with columns for audience segment, offer, first-contact date, reply status, positive reply, call booked and outcome. Mark “positive” only when there is actual interest or a request for more information.",
          },
          {
            figure: {
              kind: "funnel",
              title: "Track the path to booked calls",
              subtitle: "Illustrative example using 40 unique contacts",
              items: [
                { title: "Contacted", value: 40 },
                { title: "Replied", value: 8 },
                { title: "Positive replies", value: 4 },
                { title: "Booked calls", value: 2 },
              ],
              caption: "Illustrative funnel from 40 contacted prospects to 8 replies, 4 positive replies and 2 booked calls.",
            },
          },
          {
            p: "The illustration uses example data. Reply rate is 8 ÷ 40 = 20%. Positive reply rate is 4 ÷ 40 = 10%. Booked call rate is 2 ÷ 40 = 5%. In your records, separate interested replies from declines and log calls held separately from calls booked.",
          },
          {
            p: "Few replies? Recheck the audience and the specificity of the opening. Plenty of replies but little interest? Test whether the offer solves a problem that matters now. Interested replies with few bookings? Review what happens after they ask for more. Change one variable at a time and treat small samples as directional.",
          },
        ],
      },
    ],
    faqHeading: "Instagram outreach FAQs",
    faqs: [
      {
        q: "Is Instagram outreach useful for B2B?",
        a: "It's a fit when buyers actively use business profiles and publicly share useful context. If buyers rarely check their DMs, choose the contact channel they make available.",
      },
      {
        q: "How many DMs should I send per day?",
        a: "There's no universal safe number. Your starting point should be how many prospects you can research and respond to thoughtfully. Respect Instagram's rules and stop if the platform restricts an action.",
      },
    ],
    closing: {
      text: "Start with a shortlist you can review. Explore ColdNerd for prospect discovery and message drafting.",
      href: "/what-is-coldnerd",
    },
    related: ["instagram-prospecting", "instagram-lead-generation", "instagram-dm-automation"],
  },
  {
    slug: "instagram-prospecting",
    label: "Instagram Prospecting",
    group: "learn",
    metaTitle: "Instagram Prospecting: Find Qualified Leads Fast | ColdNerd",
    metaDescription:
      "How to prospect on Instagram: find the right accounts by niche, hashtag and followers, qualify them, and turn them into conversations.",
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
    updated: "2026-11-16",
    metaTitle: "Instagram DM Automation: Workflows & Setup | ColdNerd",
    metaDescription:
      "Learn what to automate in Instagram DMs, how comment-to-DM and inbound replies work, and how to test workflows before you switch them on.",
    shareImage: "/images/guides/instagram-dm-automation-inbox-og.jpg",
    eyebrow: "Automation guide",
    h1: "Instagram DM Automation: A Practical Setup Guide",
    intro:
      "Instagram DM automation uses rules or software to answer common messages, share requested resources and assign conversations. Define what triggers the message, what the recipient expects and who takes over when automation ends.",
    heroImage: {
      src: "/images/guides/instagram-dm-automation-inbox",
      alt: "An Instagram DM inbox with conversations listed and a reply in progress",
    },
    sections: [
      {
        heading: "Inbound automation, comment-to-DM and outbound outreach",
        blocks: [
          {
            figure: {
              kind: "cards",
              title: "What starts the conversation?",
              subtitle: "Identify the entry point before you pick an Instagram DM tool",
              items: [
                { title: "Inbound DM", text: "Someone sends your account a message." },
                { title: "Comment-to-DM", text: "Someone leaves an eligible comment on your content." },
                { title: "Outbound outreach", text: "Your business decides whom to contact." },
              ],
              caption: "Three Instagram messaging workflows compare an inbound DM, an eligible comment and a business-initiated outreach conversation.",
            },
          },
          { h3: "Inbound DM replies" },
          {
            p: "The person messages your professional account first. You can reply to “PRICING” with a price guide, answer a common question or route the thread to a teammate.",
          },
          { h3: "Comment-to-DM" },
          {
            p: "Someone comments on an eligible post or Reel. A private reply can deliver the resource named in the post. If the person replies, you can continue the exchange within the rules for that messaging path.",
          },
          { h3: "Outbound outreach" },
          {
            p: "The business chooses whom to contact and starts the conversation. The standard Instagram Send API requires the recipient to have messaged your professional account first. Before enabling outbound sending, ask the tool provider what sending method it uses and what rules and permissions apply.",
          },
          { callout: "Planning business-initiated conversations? Read the Instagram outreach guide.", href: "/instagram-outreach" },
        ],
      },
      {
        heading: "How to set up comment-to-DM automation",
        blocks: [
          {
            p: "Start with one post and one expected result. A studio could publish a Reel with “Comment CLASS for the beginner timetable.” Configure a matching trigger for that Reel, set an owner for replies, and send the timetable in the first private reply.",
          },
          {
            figure: {
              kind: "flow",
              title: "From a comment to a useful reply",
              subtitle: "Example: deliver a Pilates studio's beginner timetable",
              items: [
                { title: "Comment", text: "Someone comments CLASS." },
                { title: "Private reply", text: "Send the timetable they asked for." },
                { title: "Recipient replies", text: "Route class questions to a teammate." },
                { title: "No response", text: "Send nothing further." },
              ],
              caption: "Comment-to-DM sequence sends the requested timetable, then routes a reply to a person or closes the flow if there is no response.",
            },
          },
          {
            p: "Meta's private reply rules allow one initial private reply for an eligible comment. For posts and Reels, send it within seven days of the comment. Continue only if the recipient responds, and keep ordinary automated follow-ups within the 24-hour messaging window following their message. Instagram Live has a separate rule tied to the live broadcast. Check Meta's current documentation and the tool's permissions when configuring a flow.",
          },
          { h3: "Example first response" },
          {
            quote:
              "Thanks for commenting CLASS. Here's the beginner timetable: [link]. If you'd like help picking a class, reply with the day that works for you.",
          },
          { h3: "Example human handoff" },
          {
            p: "If the person says they're free Saturday and asks whether a class suits beginners, assign the thread to a teammate. Pass along the requested resource, available day and open question so the person doesn't have to repeat anything.",
          },
          {
            p: "Give each workflow a clear end. Close it after the requested resource is sent unless the person replies and the conversation is eligible to continue. A new campaign or tag should never reopen a thread after an opt-out.",
          },
          {
            callout: "Meta's Instagram private reply rules",
            href: "https://developers.facebook.com/documentation/business-messaging/instagram-messaging/features/private-replies",
          },
        ],
      },
      {
        heading: "Test the workflow before you enable it",
        blocks: [
          {
            p: "Use a test account and publish a test post where appropriate. Confirm which Instagram professional account is connected, which event starts the flow, what permissions the integration has and who owns the inbox. Give the person responsible for the inbox a way to pause the flow if it behaves unexpectedly.",
          },
          {
            figure: {
              kind: "grid",
              title: "Four tests before you go live",
              subtitle: "Check what the recipient sees and what your team can control",
              items: [
                { title: "Correct keyword", text: "One correct message" },
                { title: "Repeat event", text: "No duplicate messages" },
                { title: "Recipient reply", text: "A teammate takes over" },
                { title: "Opt-out", text: "Suppress queued messages" },
              ],
              caption: "Pre-launch tests cover the correct keyword, repeat events, a customer reply and a request to stop.",
            },
          },
          { h3: "Test the normal path and the edge cases" },
          {
            list: [
              "Expected keyword: The right person gets exactly one response with the correct link.",
              "Wrong or missing keyword: No campaign message is sent.",
              "Repeat comment or event: The same person and campaign don't generate duplicate messages.",
              "Recipient reply: The queued automation yields to the teammate handling the conversation.",
              "Opt-out or expired window: A queued message is suppressed and the reason is recorded.",
              "Failed link or action restriction: The operator can see the issue and pause the affected flow.",
            ],
          },
          { h3: "Keep AI drafts grounded in what you know" },
          {
            p: "Review replies if they mention pricing, eligibility, deadlines or information unique to a customer. Give the person taking over the last inbound message and the resource already sent. Limit stored data to what the workflow needs and keep permissions scoped to the teammates who work on it.",
          },
          {
            p: "Keep a record of each run's trigger, message status, handoff, and any reason it stopped. Review duplicates, wrong answers and missed handoffs alongside response and completion rates. A flow that drives more replies can still create more work if nobody is available to handle them.",
          },
          {
            image: {
              src: "/images/guides/instagram-dm-automation-checklist",
              alt: "A pre-launch checklist next to a phone running an automated Instagram DM workflow",
            },
          },
        ],
      },
      {
        heading: "Choose an Instagram DM tool based on the job",
        blocks: [
          {
            p: "Match the tool to your main task: answer support questions, deliver a requested resource or manage outreach for clients.",
          },
          {
            figure: {
              kind: "cards",
              title: "Match the tool to the task",
              subtitle: "Ask the provider to demonstrate your actual workflow",
              items: [
                { title: "Support team", text: "Shared inbox and a clear owner for each conversation" },
                { title: "Creator", text: "Comment trigger and private resource delivery" },
                { title: "Outreach agency", text: "Prospect review, draft approval and campaign reporting" },
              ],
              caption: "Tool requirements for support teams, creators sharing resources and agencies managing outreach.",
            },
          },
          {
            p: "Ask the provider to demo your trigger, permissions, reply handling, opt-outs and pause controls. Check which features your plan includes and which depend on Instagram's messaging rules.",
          },
        ],
      },
    ],
    faqHeading: "Instagram DM automation FAQs",
    faqs: [
      {
        q: "Is Instagram DM automation allowed?",
        a: "It depends on the sending method, permissions and use case. Review Meta's requirements for the workflow you want before enabling automated sending.",
      },
      {
        q: "Is there a universal daily DM limit?",
        a: "There's no universal safe daily number. A vendor's plan allowance and Meta's rules for a particular messaging path are separate limits.",
      },
      {
        q: "Can I automate AI replies or voice notes?",
        a: "If your tool supports AI drafts or voice notes, check the message for accuracy. Use a voice you have permission to use and make the sender's identity clear.",
      },
      {
        q: "Where does ColdNerd fit?",
        a: "ColdNerd focuses on outbound campaign work, including prospect discovery, AI-assisted draft personalization, follow-up scheduling and campaign reporting. Review the sending method before enabling automatic delivery.",
      },
    ],
    closing: { text: "Compare ColdNerd plans and features.", href: "/#pricing" },
    related: ["instagram-outreach", "what-is-coldnerd", "for-agencies"],
  },
  // ---------------------------------------------------------------- Solutions
  {
    slug: "for-agencies",
    label: "For Agencies",
    group: "solutions",
    metaTitle: "Instagram Outreach Tool for Agencies | Manage Client Accounts",
    metaDescription:
      "Run Instagram outreach for multiple clients from one dashboard: prospecting, AI-personalised DMs, follow-ups and reporting per account.",
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
    metaTitle: "Find Freelance Clients on Instagram | ColdNerd",
    metaDescription:
      "Land freelance clients on Instagram without living in your DMs. ColdNerd finds prospects, writes personalised DMs and handles follow-ups.",
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

// Menu/footer links and browser-only page heads live in links.ts (small, needed on every page).
export { appPageMeta, comparisonLinks, learnLinks } from "./links";

/**
 * Internal linking plan: each feature page ("hub") lists its guides in a
 * "Related guides" section, and each of those articles links back to the hub.
 * Blog slugs are the public ones (without the old "blog-" prefix).
 */
export const guideHubs: { page: string; anchor: string; posts: string[] }[] = [
  {
    page: "instagram-outreach",
    anchor: "Instagram outreach guide",
    posts: [
      "cold-dm-outreach-complete-guide",
      "instagram-cold-outreach-the-complete-guide",
      "instagram-outreach-mistakes",
      "best-instagram-outreach-tools",
      "dm-templates-40-percent-reply-rates",
      "write-instagram-cold-dms-that-get-replies",
      "how-to-get-10k-instagram-followers",
      "instagram-algorithm-what-actually-matters",
      "avoid-instagram-dms-going-to-spam",
      "instagram-dm-etiquette-first-message",
      "instagram-dm-reply-rate-benchmarks",
    ],
  },
  {
    page: "instagram-dm-automation",
    anchor: "Instagram DM automation",
    posts: [
      "instagram-dm-automation-what-to-automate",
      "safely-automate-instagram-dms",
      "account-warmup-why-its-critical",
      "smart-follow-ups-boost-response-rate",
      "personalized-cold-dms-at-scale",
      "instagram-cold-outreach-ai-automation",
      "scaling-dm-strategy-100-to-10000",
      "coldnerd-vs-manychat",
      "how-to-automate-instagram-dms",
    ],
  },
  {
    page: "instagram-prospecting",
    anchor: "Instagram prospecting",
    posts: [
      "instagram-prospecting-guide-agencies",
      "find-ideal-clients-instagram",
      "find-high-quality-leads-instagram",
      "coldnerd-vs-phantombuster",
      "find-decision-maker-small-business-instagram",
    ],
  },
  {
    page: "instagram-lead-generation",
    anchor: "Instagram lead generation",
    posts: ["instagram-lead-generation-for-saas-companies-2026-guide", "instagram-lead-generation-system"],
  },
  {
    page: "for-agencies",
    anchor: "Instagram outreach for agencies",
    posts: ["instagram-outreach-for-agencies", "how-agencies-manage-50-client-accounts", "instagram-prospecting-guide-agencies"],
  },
  {
    page: "for-freelancers",
    anchor: "find clients on Instagram",
    posts: ["instagram-outreach-for-freelancers-get-your-first-clients"],
  },
];

/** The feature page an article belongs to (first match), for its link back up. */
export const hubForPost = (slug: string) => {
  const hub = guideHubs.find((h) => h.posts.includes(slug));
  const page = hub && seoPageBySlug(hub.page);
  return hub && page ? { ...hub, label: page.label } : undefined;
};

/** Articles listed under a feature page, in plan order. */
export const guidesForPage = <T extends { slug: string }>(page: string, posts: T[]) => {
  const slugs = guideHubs.find((h) => h.page === page)?.posts ?? [];
  return slugs.map((slug) => posts.find((p) => p.slug === slug)).filter((p): p is T => !!p);
};
