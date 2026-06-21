INSERT INTO public.blog_posts (slug, title, excerpt, content, cover_image, category, author, read_time, published_at)
VALUES
(
  'saas-launch-playbook-pre-launch-to-day-one',
  'SaaS Launch Playbook: From Pre-Launch to Day-One Revenue',
  'A field-tested 90-day playbook for SaaS founders who want paying users on launch day, not month four.',
  $md$# SaaS Launch Playbook: From Pre-Launch to Day-One Revenue

Most SaaS launches die in silence. Not because the product is bad — usually it is fine — but because the audience is built **after** the product instead of **before** it. By launch day, the founder is asking strangers to discover, evaluate and pay for a product in the same 24-hour window. The math does not work.

This playbook is the version that does work. It is the same 90-day framework we run as a [pre-launch marketing agency for SaaS founders](/en/saas-prelaunch-marketing-agency), distilled into a step-by-step guide you can execute in-house.

## The default SaaS launch is broken

The default playbook looks like this:

1. Build for 6–12 months
2. Polish the marketing site the week before launch
3. Post on Product Hunt, X and a few subreddits
4. Hope #1 of the day, watch MRR plateau at $4k

The structural bug is timing. Day-one cold launches concentrate 100% of risk on a single 24-hour window. A weak hook, a competitor launching the same day, or a Tuesday with no engagement and the launch is dead.

The fix is not a better tweet. It is an audience that already exists when you press publish.

## The 90-day SaaS pre-launch framework

The framework has three phases. Each is 30 days.

### Phase 1 — Discover (days 1–30)

Goal: Pin down ICP, message, and lead magnet that pull signups at $1.50–$4 CPL.

- Pick the ICP narrow enough that one landing page hook can speak to it. "B2B SaaS" is not an ICP. "VP of Engineering at 50–250-person Series B fintech" is.
- Map adjacent SaaS that already monetize the same audience. Read their landing copy, their G2 reviews, their churn complaints. The gap is your wedge.
- Design a lead magnet that is genuinely useful — a template, a benchmark report, a mini-tool. Generic ebooks pull garbage leads.
- Write three message angles. You do not know which works. Paid traffic will tell you in week three.

### Phase 2 — Build (days 31–60)

Goal: Working funnel with paid ads driving qualified leads.

- One landing page on your domain. Above the fold: who it is for, what it does, and the lead magnet CTA. Nothing else.
- Meta + LinkedIn paid ad funnels (add Reddit if your ICP lives there). $30–$80/day to start.
- MailerLite or Customer.io sequence — five to nine emails over four weeks, written like one human to another.
- Tagged event layer in GA4 + Plausible so day-one cohorts are tracked from day one.

### Phase 3 — Launch (days 61–90)

Goal: Activate the audience across four waves.

- T-7 days: warm-up email and a Loom video from the founder explaining what is shipping.
- Launch day: four staggered email waves to the MVA, retargeting to engaged non-openers, drops in the Slack and Discord communities you have been showing up in.
- Week one: founder-led DMs to the top 5% engaged leads. Onboarding loops. Weekly close calls if your ACV justifies it.

## What you should expect

Across 46 campaigns, the median MVA size is 1,200–2,500 leads, with day-one paid conversion at 8–14% (vs 2–3% for cold launches). For a $99/mo SaaS that is 100–350 paying users on day one, with a known CAC and a working channel mix.

The investor narrative also changes. Instead of "we hope this works," you walk into the next conversation with: ICP validated, message-market fit attested by paid signal, CPL benchmark, and a launch-day cohort with measurable retention.

## The decision filter

Pre-launch marketing applies if at least two of these are true:

- You have not launched yet, or you launched and stalled
- You have 60+ days before a hard deadline (funding, partnership, season)
- You have $3,000–$8,000 in media budget for the 90-day cycle
- You can dedicate one founder for two hours a day to async work

If you do not have those, skip the framework. Get to a working prototype, ship to ten friends, iterate, and come back.

## What this playbook does not cover

- Post-launch retention loops (different framework)
- Product-led growth virality (works after PMF, not before)
- Outbound for high-ACV B2B (modify: 100-account named list, not 1,000-lead MVA)
- Founder content as a primary channel (covered in our [founder influencer](/founder-influencer) playbook)

## Next step

If you want a 30-minute pressure-test on whether MVA fits your specific SaaS, [book a free strategy call](/en/book?source=blog-saas-playbook). You walk out with a concrete plan whether or not we work together. Or if you prefer to read the agency angle first, see the full [pre-launch marketing agency for SaaS founders](/en/saas-prelaunch-marketing-agency) page.
$md$,
  NULL, 'SaaS', 'Marek Cieśla', '8 min read', NOW()
),
(
  'go-to-market-strategy-template-saas',
  'Go-to-Market Strategy Template for SaaS Founders (with Pre-Launch Logic)',
  'Most GTM templates are decks for board meetings. This one is a working document for founders who actually have to ship a launch.',
  $md$# Go-to-Market Strategy Template for SaaS Founders (with Pre-Launch Logic)

Most go-to-market templates are slide decks designed to survive a board meeting. They have TAM diagrams, SAM/SOM triangles, and personas with stock photos. None of it tells you what to do on Monday.

This template is different. It is the working document we use when we run [pre-launch marketing for SaaS founders](/en/saas-prelaunch-marketing-agency). It produces decisions, not slides.

## Why most GTM templates fail

The standard template asks for inputs the founder does not have:

- Detailed ICP — not validated yet
- Channel-CAC ranking — not measured yet
- Sales motion — not built yet
- Positioning — not tested yet

The founder fills it in with assumptions, the deck looks complete, and then launch day arrives and none of it survives contact with reality. The template was a fiction-writing exercise.

A useful GTM template assumes you do not know the answers and routes your decisions toward generating evidence quickly.

## The five sections that matter

### 1. Wedge

One sentence: which customer, which pain, which substitute they will leave for you.

Wrong: "We help B2B SaaS companies streamline operations."

Right: "We help VP-Eng at Series B fintech replace their patchwork of Datadog + PagerDuty + Notion runbooks with a single on-call console."

If you cannot write this in one sentence, the rest of the template is premature.

### 2. Wedge evidence

Three artifacts that prove the wedge is real:

- 5+ recorded customer interviews where the substitute pain came up unprompted
- Adjacent products' G2 reviews showing the gap
- A landing-page test pulling sub-$4 CPL on the wedge message

If you have zero of three, you are guessing. Run the tests before continuing.

### 3. Channel hypothesis

Rank candidate channels by how cheaply they can produce signal **this quarter**, not how much they can scale next year:

- Paid social (Meta, LinkedIn, Reddit) — fast signal, $30–$80/day
- Founder-led content — slow signal, compounding
- Cold outbound — high control, low scale
- Communities — narrow, high-trust, hard to measure
- SEO — slow, compounding, leveraged

Pick two. One fast-signal, one compounding. Discipline yourself out of the rest until phase 1 evidence lands.

### 4. Pre-launch motion

This is the section most templates skip. It is the section that decides whether launch day produces revenue or silence.

The motion: 90 days, three phases — Discover, Build, Launch. Output is a Minimum Viable Audience: 1,000+ self-identified buyers, ranked by intent, ready to be activated in four waves on launch day. Full breakdown in our [SaaS launch playbook](/blog/saas-launch-playbook-pre-launch-to-day-one).

If your GTM template does not specify how the audience will exist before launch, you do not have a GTM strategy — you have a launch hope.

### 5. Day-one and week-one plan

Concrete, dated:

- T-7 days: warm-up email + founder Loom
- Day 0, 9am: email wave 1 to MVA
- Day 0, 1pm: wave 2 to non-openers
- Day 0, 5pm: wave 3 with social proof from morning buyers
- Day 1, 9am: wave 4 + retargeting layer turns on
- Days 2–7: founder-led DMs, onboarding loops, weekly close calls

If launch day is not on a calendar with hour-level granularity by week 12, you are unprepared.

## What to delete

A useful GTM template is short. Delete:

- TAM/SAM/SOM diagrams (irrelevant pre-revenue)
- Stock photo personas (replace with quotes from real interviews)
- Multi-year roadmap timelines (90 days is the only horizon that matters now)
- Competitor "battle cards" before you have a single closed deal

## How this connects to the rest of the GTM stack

The template above is the front end of GTM. The back end — onboarding, activation, retention — comes after. They are separate systems and should not be planned at the same time. Most early-stage founders try to plan everything simultaneously and ship nothing.

Sequence: validate wedge → build MVA → launch → measure activation → then design retention loops. Not before.

## Want a copy of this as a working doc?

The full template, with prompts and example fills, is part of the strategy call. [Book 30 minutes here](/en/book?source=blog-gtm-template). Or read the [pre-launch marketing agency](/en/saas-prelaunch-marketing-agency) overview to see how we run it for clients.
$md$,
  NULL, 'GTM Strategy', 'Marek Cieśla', '7 min read', NOW()
),
(
  'product-launch-checklist-ecommerce-crowdfunding',
  'Product Launch Checklist for eCommerce & Crowdfunding (2026)',
  '52 items split across 90 days, ordered by what actually fails first when founders skip them. Calibrated on 46 campaigns.',
  $md$# Product Launch Checklist for eCommerce & Crowdfunding (2026)

Generic launch checklists list 200 items in alphabetical order and tell you nothing about which ones decide the launch. This one is different. The order matters: items earlier in the list are the ones that, when skipped, kill more launches than the rest combined.

It is calibrated on 46 campaigns we have run as a [pre-launch agency for eCommerce and crowdfunding founders](/en/ecommerce-prelaunch-agency), totaling $1.2M+ in committed revenue.

## How to use this checklist

Three phases, 30 days each. Do not parallelize phases — the outputs of phase 1 are inputs to phase 2. Founders who try to compress 90 days into 30 typically launch with no audience, blame the platform, and quit physical products.

## Phase 1 — Validate (days 1–30)

The phase that decides the launch. Skip these and the rest does not matter.

1. One sentence wedge: which buyer, which use case, which substitute they leave for you
2. Five interviews with target buyers about how they currently solve the problem
3. Pricing hypothesis with a 30% margin floor on landed cost-of-goods
4. Competitive teardown: 5 adjacent products on Kickstarter, Gamefound, Amazon, DTC
5. Lead magnet decision: sample, deposit page, discount tier, or guide
6. Domain + brand basics (you can iterate the brand; you cannot iterate the domain mid-campaign)
7. Landing page wireframe with one CTA, not three
8. Three message angles written for paid testing
9. MailerLite or Klaviyo account set up with welcome flow
10. Meta Pixel + GA4 + UTM convention agreed in writing
11. $1,500–$3,000 ad-test budget reserved for weeks 3–4
12. Founder calendar block: 2 hours/day for the next 60 days, non-negotiable

If items 1–6 are not done by day 14, stop and finish them before moving on.

## Phase 2 — Build (days 31–60)

Working funnel that pulls signal.

13. Landing page live with deposit or waitlist mechanic
14. Privacy policy, terms, refund policy linked in footer
15. Three Meta ad variants (image, UGC-style video, carousel) — same hook, different formats
16. TikTok Spark Ads tested if your buyer is under 35
17. Pinterest tested if your buyer is over 30 and product is visual
18. Google Search tested only if intent keywords already exist
19. Daily ad spend live for 14 days minimum (less is not enough signal)
20. Email sequence drafted: welcome, story, social proof, scarcity, launch announce
21. UGC creator outreach — 5 micro-creators in your niche
22. Founder-led video #1 published (behind-the-scenes, not promo)
23. CPL tracked daily; red line at 2× target CPL kills the variant
24. Landing-page conversion rate above 8% on paid traffic before scaling spend
25. Lead-quality spot check: 10 leads emailed manually, response rate above 30%
26. Production timeline locked with the factory; deposit paid only after MVA hits 60% of target size
27. Customer support address live and monitored
28. Inventory plan documented: minimum order, lead time, shipping cost per unit
29. Launch-day platform decision finalized: Kickstarter, Gamefound, Indiegogo, or Shopify pre-order
30. If crowdfunding: campaign page draft started, copy and gallery
31. Backer-only rewards tier designed (early bird, retail, super-backer)
32. Shipping calculator built or imported
33. Tax and customs basics for top three destination countries

If CPL is still 2× target by day 60, the message is wrong, not the spend. Go back to phase 1.

## Phase 3 — Launch (days 61–90)

Activation, not preparation. If you are still preparing in phase 3, the launch is going to underperform.

34. T-14 days: founder Loom video #2 to MVA — what is shipping, what is at stake
35. T-10 days: scarcity tier announced (early bird capped, deadline visible)
36. T-7 days: warm-up email + behind-the-scenes content drop
37. T-3 days: countdown email + retargeting layer turned on
38. T-1 day: final reminder email + Stories/Reels go live
39. Day 0 — 9am: wave 1 email to MVA hot segment
40. Day 0 — 1pm: wave 2 to non-openers (different subject line)
41. Day 0 — 5pm: wave 3 with morning buyers' social proof
42. Day 0: live ad spend doubled, no creative changes for first 48h
43. Day 1: wave 4 with funding velocity update (if crowdfunding)
44. Day 2–7: daily founder updates (video preferred, text minimum)
45. Daily ROAS review; pause variants below 1.5× by day 3
46. Lookalikes from day-one buyers turned on day 5
47. Influencer outreach activated for week two — not week one (week one belongs to the MVA)
48. Customer support inbox checked twice daily; sub-12-hour response
49. If crowdfunding: stretch goals announced once 80% funded
50. If DTC: Late Pledge / Late Bird / pre-order extension page ready by day 14
51. Post-launch debrief documented at day 30 with metrics, mistakes and channel-by-channel ROAS
52. Retention loop or repeat-buyer flow shipped before day 60 post-launch

## What kills launches that are not on this list

- Hiring a "Kickstarter agency" with no MVA logic at week 4 (too late to build an audience)
- Skipping pricing validation and locking margins after deposits are taken
- Running cold conversion ads with no email warmup
- Treating the campaign page as the marketing — it is not, the audience is

## Free 30-minute pressure test

If you want this checklist applied to your specific product, [book a free strategy call](/en/book?source=blog-ecom-checklist). Or read the full [eCommerce pre-launch agency](/en/ecommerce-prelaunch-agency) breakdown for how we run it as a 90-day engagement.
$md$,
  NULL, 'eCommerce', 'Marek Cieśla', '10 min read', NOW()
);