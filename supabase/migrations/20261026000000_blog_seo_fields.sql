-- ColdNerd blog: SEO fields, clean URLs, new titles/descriptions and 5 new articles (26 Oct 2026)
-- Run once in Supabase → SQL Editor. Safe to run again (it skips work that's already done).
-- Saving here triggers the Vercel rebuild, so the site updates about a minute later.

-- 1. Extra "SEO & meta tags" fields used by the CMS editor --------------------
alter table public.blog_posts add column if not exists focus_keyword text;
alter table public.blog_posts add column if not exists og_image_url text;
alter table public.blog_posts add column if not exists canonical_url text;
alter table public.blog_posts add column if not exists noindex boolean not null default false;

-- 2. Clean URLs: drop the doubled "blog-" prefix (old URLs 301-redirect in vercel.json)
update public.blog_posts p
set slug = substring(p.slug from 6)
where p.slug like 'blog-%'
  and not exists (select 1 from public.blog_posts q where q.slug = substring(p.slug from 6));

-- 3. New SEO titles + meta descriptions (Bing / Search Console fix lists) -----
update public.blog_posts set
  title = 'How to Get 10K Instagram Followers in 2026',
  seo_title = 'How to Get 10K Instagram Followers in 2026 (Step-by-Step)',
  seo_description = 'A practical 2026 plan to reach 10K Instagram followers: content, Reels, hashtags, collabs and outreach that grows a real, engaged audience.'
where slug = 'how-to-get-10k-instagram-followers';

update public.blog_posts set
  seo_title = 'Instagram Account Warm-Up: How to Do It Safely (2026)',
  seo_description = 'Why new and automated Instagram accounts need warming up, a day-by-day warm-up schedule, and the limits that help keep your account safe.'
where slug = 'account-warmup-why-its-critical';

update public.blog_posts set
  seo_title = 'ColdNerd vs PhantomBuster for Instagram (2026)',
  seo_description = 'PhantomBuster vs ColdNerd for Instagram outreach: features, safety, setup and how each handles prospecting and DMs. See which fits you.'
where slug = 'coldnerd-vs-phantombuster';

update public.blog_posts set
  seo_title = 'Cold DM Outreach: The Complete Guide for Instagram',
  seo_description = 'How to do cold DM outreach on Instagram: finding prospects, writing DMs that get replies, follow-up timing and staying safe at scale.'
where slug = 'cold-dm-outreach-complete-guide';

update public.blog_posts set
  seo_title = 'Instagram Cold Outreach: How to DM Prospects (2026 Guide)',
  seo_description = 'How to do cold outreach on Instagram: find prospects, write DMs that get replies, follow up and avoid spam filters, with real examples.'
where slug = 'instagram-cold-outreach-the-complete-guide';

-- 4. Five new articles (SEO Content Pack, 25 Oct 2026) --------------------------
insert into public.blog_posts
  (slug, title, excerpt, content, category, author_name, read_time_minutes, status, featured, position, published_at, seo_title, seo_description, focus_keyword)
select v.slug, v.title, v.excerpt, v.content, v.category, 'ColdNerd Team', v.read_time, 'published', false,
       (select coalesce(min(position), 0) - 1 from public.blog_posts), now(), v.seo_title, v.excerpt, v.focus_keyword
from (values
(
  'how-to-automate-instagram-dms',
  'How to Automate Instagram DMs Without Getting Your Account Restricted',
  'A step-by-step guide to automating Instagram DMs safely: what to automate, what to keep human, daily limits, warm-up and follow-ups.',
  $html$<p>Automating Instagram DMs can save hours a day, but done carelessly it gets accounts restricted and burns your reputation with prospects. The goal is not to send more messages. It is to send better messages more consistently, while a tool handles the repetitive parts. This guide is part of our <a href="/instagram-dm-automation">Instagram DM automation</a> series.</p>
<h2>What you should automate</h2>
<ul><li><p>Finding and filtering prospects (by niche, location, follower count, activity).</p></li><li><p>Personalising the first line of each message using details from the prospect's profile.</p></li><li><p>Scheduling sends across the day instead of in bursts.</p></li><li><p>Follow-ups to people who have not replied after a set number of days.</p></li><li><p>Tracking replies and tagging leads by status.</p></li></ul>
<h2>What you should keep human</h2>
<ul><li><p>Replies to anyone who answers. A real conversation converts; a bot reply kills it.</p></li><li><p>Your offer and positioning. Write these yourself and test them.</p></li><li><p>Final review of templates before a campaign goes live.</p></li></ul>
<h2>Step 1: Warm up the account</h2>
<p>New or quiet accounts that suddenly send many DMs look suspicious. Start with a small number of messages per day, combine them with normal activity (posting, liking, replying to comments) and increase volume gradually over two to three weeks. See <a href="/blog/account-warmup-why-its-critical">why account warm-up is critical</a>.</p>
<h2>Step 2: Build a tight prospect list</h2>
<p>Automation multiplies whatever you feed it. A list of 200 well-matched prospects beats 2,000 random accounts. Filter for accounts that are active, in your niche, and likely to need what you sell.</p>
<h2>Step 3: Write a template with real personalisation</h2>
<p>Use one personalised opening line (something specific from their profile or recent post), one sentence on why you are reaching out, and a low-pressure question. Avoid links in the first message.</p>
<h2>Step 4: Pace your sends</h2>
<p>Spread messages through the day with natural gaps. Stay well under Instagram's limits rather than testing them; the cost of a restriction is far higher than a slightly slower campaign.</p>
<h2>Step 5: Automate follow-ups, not conversations</h2>
<p>Most replies come after a follow-up. Set one or two polite follow-ups a few days apart, then stop. As soon as someone replies, take over manually.</p>
<h2>Step 6: Measure and adjust</h2>
<p>Track reply rate per template and per audience. If a template underperforms after a fair sample, change one element at a time: the opener, the reason, or the question.</p>
<blockquote><p>ColdNerd handles prospect finding, AI-personalised first lines, paced sending, follow-ups and reply tracking, with account-safety limits built in. Start a free trial and run your first campaign today: <a href="/pricing">see plans</a> or read our <a href="/instagram-outreach">Instagram outreach guide</a>.</p></blockquote>$html$,
  'Automation', 3,
  'How to Automate Instagram DMs Safely (Step-by-Step)',
  'how to automate instagram dms'
),
(
  'avoid-instagram-dms-going-to-spam',
  'How to Keep Your Instagram Outreach DMs Out of Message Requests and Spam',
  'Why Instagram outreach DMs get filtered or ignored, and 9 practical fixes to keep your cold messages visible and getting replies.',
  $html$<p>Cold DMs from accounts a person does not follow land in Message Requests by default, and some are moved to the hidden requests folder. You cannot fully avoid this, but you can make your messages far more likely to be seen and opened. For the full process, see our <a href="/instagram-outreach">Instagram outreach guide</a>.</p>
<h2>Why outreach DMs get filtered</h2>
<ul><li><p>The account is new, has few posts, or looks incomplete.</p></li><li><p>Many near-identical messages are sent in a short time.</p></li><li><p>The first message contains links, prices or salesy phrases.</p></li><li><p>Recipients ignore, delete or report your messages.</p></li></ul>
<h2>9 ways to stay visible</h2>
<ol><li><p>Complete your profile: clear photo, bio, link and at least 9 quality posts.</p></li><li><p>Warm up new accounts slowly before running outreach.</p></li><li><p>Engage first: like or comment on a recent post before you message.</p></li><li><p>Personalise the opening line so every message is unique.</p></li><li><p>Leave links out of the first message; share them after a reply.</p></li><li><p>Keep the first message short, ideally under 60 words.</p></li><li><p>Spread sends across the day instead of sending in bursts.</p></li><li><p>Stop messaging anyone who does not reply after one or two follow-ups.</p></li><li><p>Watch your reply and block rates; if they drop, pause and fix your targeting or copy.</p></li></ol>
<h2>What to do if your account gets restricted</h2>
<p>Stop all outreach for the restriction period, keep using the account normally, and restart at a lower volume with a better-targeted list.</p>
<blockquote><p>ColdNerd paces your sends, personalises every message and keeps you inside safe limits automatically. <a href="/pricing">See ColdNerd plans</a>.</p></blockquote>$html$,
  'Safety', 2,
  'Keep Instagram Outreach DMs Out of Spam (9 Fixes)',
  'instagram outreach spam'
),
(
  'instagram-dm-reply-rate-benchmarks',
  'What Is a Good Instagram Cold DM Reply Rate? (and How to Improve Yours)',
  'How to measure your Instagram cold DM reply rate, what affects it, and practical ways to improve replies for local business and agency outreach.',
  $html$<p>Reply rate is the single most useful number in Instagram outreach. It tells you whether your targeting and your message are working, long before you see sales. It is the core metric in our <a href="/instagram-outreach">Instagram outreach guide</a>.</p>
<h2>How to calculate it</h2>
<p>Reply rate = replies / messages delivered x 100. Track it per campaign and per template, and count only real replies (not auto-responses).</p>
<h2>Why there is no universal benchmark</h2>
<p>Reply rates vary widely by niche, offer, account trust and how well the list is targeted. Local businesses often reply more than large brands; warm audiences reply more than cold ones. The most useful benchmark is your own previous campaign. Aim to beat it.</p>
<h2>What moves reply rate the most</h2>
<ul><li><p><strong>Targeting:</strong> the right person with a real need beats any copywriting trick.</p></li><li><p><strong>The opening line:</strong> specific, personal and about them, not you.</p></li><li><p><strong>The ask:</strong> a simple question is easier to answer than a meeting request.</p></li><li><p><strong>Follow-ups:</strong> a polite follow-up often produces a large share of replies.</p></li><li><p><strong>Account trust:</strong> a complete, active profile gets opened more.</p></li></ul>
<h2>From replies to sign-ups</h2>
<p>Track the whole funnel: messages sent, replies, positive replies, calls or trials, and customers. If replies are good but sign-ups are low, the issue is your offer or your follow-through, not your outreach.</p>
<blockquote><p>ColdNerd tracks replies per campaign and template so you can see exactly what is working. <a href="/pricing">See ColdNerd plans</a>.</p></blockquote>$html$,
  'Strategy', 2,
  'Instagram Cold DM Reply Rate: Benchmarks & How to Improve',
  'instagram dm reply rate'
),
(
  'instagram-dm-etiquette-first-message',
  'Instagram Cold DM Etiquette: How to Write a First Message People Answer',
  'The do''s and don''ts of cold DMs on Instagram, with a simple permission-based opener framework and examples for local businesses and brands.',
  $html$<p>A cold DM interrupts someone's personal inbox. Good etiquette is not just politeness; it is what earns a reply. These rules fit into the wider process in our <a href="/instagram-outreach">Instagram outreach guide</a>.</p>
<h2>The do's</h2>
<ul><li><p>Show you looked at their profile with one specific detail.</p></li><li><p>Explain in one sentence why you are messaging them.</p></li><li><p>Ask permission before pitching: "Mind if I share an idea?"</p></li><li><p>Keep it short and easy to read on a phone.</p></li><li><p>Follow up once or twice, politely, then stop.</p></li></ul>
<h2>The don'ts</h2>
<ul><li><p>No long pitches, price lists or links in the first message.</p></li><li><p>No fake compliments that could apply to anyone.</p></li><li><p>No voice notes or calls to strangers.</p></li><li><p>No guilt-trips in follow-ups.</p></li></ul>
<h2>A simple permission-based opener</h2>
<p><strong>1. Noticed:</strong> a specific detail from their profile. <strong>2. Reason:</strong> why that made you reach out. <strong>3. Permission question:</strong> ask if they are open to an idea.</p>
<p><em>Example (local business):</em> "Hi Sara, saw your new autumn menu post, the photos look great. I help cafes in Leeds turn Instagram followers into bookings. Would you be open to a quick idea for that menu launch?"</p>
<p><em>Example (fashion accessories brand):</em> "Hey team, loved the new beaded bag drop. I work with small accessory brands on Instagram partnerships. Open to me sending over two creator ideas that fit this collection?"</p>
<h2>Does location matter?</h2>
<p>Yes. Mentioning a shared city, region or local event makes a message feel relevant and increases trust, especially for local businesses.</p>
<blockquote><p>ColdNerd writes AI-personalised openers from each prospect's profile so every first message follows these rules. <a href="/pricing">See ColdNerd plans</a>.</p></blockquote>$html$,
  'Templates', 2,
  'Instagram Cold DM Etiquette: Write a First Message That Works',
  'instagram dm etiquette'
),
(
  'find-decision-maker-small-business-instagram',
  'How to Find the Decision Maker at a Small Business on Instagram',
  'Stop messaging the wrong person. How to identify owners and decision makers behind small business Instagram accounts before you send a DM.',
  $html$<p>Messaging a brand account is not always messaging a person who can say yes. A few minutes of research before you DM can double the value of every message. It is a key step in <a href="/instagram-prospecting">Instagram prospecting</a>.</p>
<h2>Where to look</h2>
<ul><li><p>The bio: owners often tag their personal account ("Founder: @name").</p></li><li><p>Tagged photos and Reels: the owner usually appears in behind-the-scenes content.</p></li><li><p>Highlights titled "About", "Team" or "Our story".</p></li><li><p>The website linked in the bio: About or Contact pages.</p></li><li><p>LinkedIn or Google Business Profile for the business name.</p></li></ul>
<h2>Brand account or personal account?</h2>
<p>For very small businesses, the brand account is usually run by the owner, so messaging it is fine. For larger teams, message the founder or marketing lead directly and mention the brand.</p>
<h2>Signs you have found the right person</h2>
<ul><li><p>They post about running the business, hiring or launches.</p></li><li><p>They are tagged as founder, owner or director.</p></li><li><p>They respond to comments on the brand's posts.</p></li></ul>
<h2>Then personalise</h2>
<p>Use what you found: their launch, their team, their city. A message to the right person with a relevant detail is the highest-converting cold DM you can send. See our <a href="/instagram-outreach">Instagram outreach guide</a> for the next steps.</p>
<blockquote><p>ColdNerd helps you filter prospects and personalise each message from their profile, so your DMs reach the people who decide. <a href="/pricing">See ColdNerd plans</a>.</p></blockquote>$html$,
  'Outreach', 2,
  'Find the Decision Maker at a Small Business on Instagram',
  'find decision maker instagram'
)
) as v(slug, title, excerpt, content, category, read_time, seo_title, focus_keyword)
where not exists (select 1 from public.blog_posts b where b.slug = v.slug);
