/**
 * FAQ copy for the SEO landing pages, extracted so a single array feeds BOTH the
 * rendered FAQ section and the FAQPage JSON-LD (runtime + build-time prerender).
 */
export const LANDING_FAQS: Record<string, { q: string; a: string }[]> = {
  "/en/kickstarter-agency": [
    { q: "How is this different from a Kickstarter PR or video agency?", a: "PR agencies pitch journalists; video agencies make the campaign film. Both are valuable, neither builds the backer audience the algorithm rewards. We do the audience layer — the demand side of the campaign. We're often hired alongside a video studio or PR firm, not instead of one." },
    { q: "What does it cost — and do you take a percentage of pledges?", a: "Fixed monthly fee of $1,500 (PLN equivalent for Polish creators). No revenue share, no percentage of pledges, no success fee. You own 100% of what you raise. Ad budget is separate — typical campaigns spend $3k–$15k on paid traffic over 90 days." },
    { q: "We have 6 weeks until launch. Can we still work together?", a: "Tight but possible for simpler products. The framework is built for 90 days; in 6 weeks we compress the discover phase and accept slightly higher CPLs. For complex hardware, we'd recommend pushing launch back 4 weeks rather than running a half-baked MVA." },
    { q: "Do you only work with hardware/product campaigns or also tabletop, games, and creative?", a: "All Kickstarter categories. Tabletop games and creative projects often have the highest MVA leverage because backer communities are tightly clustered (BoardGameGeek, Reddit r/boardgames, Discord servers) — exactly where MVA targeting excels." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with creators globally. Weekly sync, async daily updates, monthly strategy review." },
  ],
  "/en/kickstarter-marketing-agency": [
    { q: "What's the ad budget you recommend?", a: "Typical 90-day Kickstarter MVA runs $3k–$15k in paid spend, with most going to Meta (broad reach) and Reddit (niche communities). Hardware and design products skew higher; tabletop and creative often hit goal on the lower end thanks to dense community channels." },
    { q: "Do you only run Meta ads, or other channels too?", a: "Meta, Reddit, niche newsletters, Discord and Slack community drops, and selectively LinkedIn for B2B-adjacent products. Channel mix is decided during Discover based on where your ICP actually lives — we don't force a default stack." },
    { q: "What if our ad creative isn't ready?", a: "We script and direct the creative — short-form video, static, and copy. You provide product footage and brand assets; we shape it into ad units. For complex hardware we coordinate with your video studio so the campaign film and ad creative use the same source material." },
    { q: "What does it cost — and do you take a percentage of pledges?", a: "Fixed $1,500/month. No revenue share, no percentage of pledges, no success fee. Ad budget is separate." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with creators globally." },
  ],
  "/en/crowdfunding-agency": [
    { q: "Kickstarter, Indiegogo or Gamefound — which one is right for us?", a: "Hardware, design and consumer products: usually Kickstarter (largest audience, strongest algorithm). Tabletop, board games and tabletop RPGs: increasingly Gamefound (lower fees, category focus, late-pledge tooling). Indiegogo: best for flexible funding, post-Kickstarter continuation, and categories Kickstarter restricts. We pick during the Discover phase based on your ICP and category, not a default preference." },
    { q: "How is this different from a PR or video production agency?", a: "PR pitches press; video studios make the campaign film. Both valuable, neither builds the audience the algorithm needs. We build the demand side. We're commonly hired alongside a video studio and a PR firm — three vendors, three jobs." },
    { q: "What does it cost?", a: "Fixed $1,500/month (PLN equivalent for Polish creators). No revenue share, no success fee. Ad budget is separate — typical campaigns spend $3k–$15k on paid traffic over 90 days." },
    { q: "Does this work for late-pledge and reorder campaigns?", a: "Yes. MVA logic applies to Late Pledge, Indiegogo InDemand and Gamefound's post-campaign tools. We rebuild the audience signal from the original campaign and run a compressed 30–45 day activation." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with creators globally." },
  ],
  "/en/product-launch-agency": [
    { q: "What kinds of products do you launch?", a: "Hardware, software, DTC, B2B SaaS, creator products, marketplaces, and crowdfunded products. The MVA framework holds; channels and lead-magnet shape change by category. We're a poor fit for pure local services, single-city restaurants, and anything with sub-$100k LTV at a sub-$500 ACV." },
    { q: "How is this different from a launch PR or growth agency?", a: "PR agencies pitch press for launch week. Growth agencies optimize a launched product. Neither builds the demand side before launch. MVA fills that gap — and once you've launched and CAC stabilizes, a growth agency is the right next vendor." },
    { q: "What does it cost?", a: "Fixed $1,500/month. No revenue share, no success fee. Ad budget is separate — typical launches spend $5k–$20k on paid traffic over 90 days." },
    { q: "Can you work with our existing brand, agency, or product team?", a: "Yes. We're a dedicated launch layer, not a full-service replacement. We coordinate with your existing brand studio, PR firm, and product team. We bring the demand strategy, audience build and launch playbook." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with founders globally." },
  ],
  "/en/launchboom-alternative": [
    { q: "Are you saying LaunchBoom doesn't work?", a: "No — the opposite. LaunchBoom built the modern pre-launch playbook for Kickstarter and their results speak for themselves. We respect the work. The reason creators end up on this page is almost always commercial: the percentage of pledges doesn't fit their margin model, the minimum spend is out of reach, or they want the senior person on the call to also be the senior person on the campaign. If those things don't bother you, LaunchBoom is a perfectly valid pick." },
    { q: "Do you offer a TYP-style reservation page like LaunchBoom?", a: "Yes, with options. We run three reservation models depending on your category: full deposit (hardware with strong margin), $1 hold (most products), pure email opt-in (creative, tabletop, lower AOV). The point isn't to copy a specific UI — it's to match the friction level to your buyer's intent." },
    { q: "Are you a smaller team — does that mean less capacity?", a: "Yes and yes. JAY-23 is intentionally a small operator-led shop, not an agency at scale. We cap concurrent campaigns so the founder can actually run each one. If we're booked, we say so." },
    { q: "What happens after the campaign ends?", a: "The MailerLite list, the ad accounts, the landing page and the funnel are all on your domain and your tools. We hand over everything; you keep the audience and re-use it for product #2. No data lock-in." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with creators globally." },
  ],
  "/en/agency-2-0-alternative": [
    { q: "Is Agency 2.0 bad?", a: "No. They're one of the most established crowdfunding agencies and their portfolio is real. They're built for a specific tier of campaign — typically large hardware, high-AOV consumer products, and creators with existing audiences. If you fit that profile and the commercial terms work, they're a strong pick. The reason you'd land on this page is almost always that your campaign size or budget is below their threshold." },
    { q: "What's the largest campaign you've worked on?", a: "Our top single-campaign result is $332,694 (Woolet on Kickstarter). Across 46 campaigns we've raised $1.2M+. We're transparent that we're not a fit for $5M hardware launches — for those, Agency 2.0 or LaunchBoom at their top tier is the right call." },
    { q: "Do you take a percentage of what we raise?", a: "No. Fixed $1,500/month, period. Ad budget is separate and goes directly to your Meta/Reddit account on your card." },
    { q: "Do you work on Indiegogo, not just Kickstarter?", a: "Yes — Kickstarter, Indiegogo and Gamefound. Platform recommendation is part of the Discover phase based on your category and ICP, not a default." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with creators globally." },
  ],
  "/en/jellop-alternative": [
    { q: "Is Jellop bad?", a: "No. They're one of the most respected paid-media operators in crowdfunding and they do their specific job well. The point isn't that Jellop is wrong — it's that paid-to-live-page is one layer of a Kickstarter campaign, and it only works when there's already momentum to scale. If you're trying to figure out who builds the momentum in the first place, that's a different vendor." },
    { q: "Can we run MVA before launch and Jellop after?", a: "Yes, and that's a sensible stack for larger campaigns. MVA builds the audience and runs days 1–3; once the campaign is on Popular and has organic compounding, a performance-paid specialist scaling Meta and Google can extract additional ROI. We're explicit about that hand-off and don't try to monopolize the engagement." },
    { q: "Do you take a percentage of pledges or ad-attributed revenue?", a: "No. Fixed $1,500/month, period. Ad spend goes directly to Meta/Reddit on your card — no markup, no performance cut." },
    { q: "What if our campaign goes live next week and we never did pre-launch?", a: "Then MVA isn't the right fit and we'll say so on the first call. A live-campaign performance specialist (Jellop, Funded Today, etc.) is a better choice for a campaign already in-market. We'll tell you that for free." },
    { q: "Where are you based?", a: "JAY-23 is JAY23 LLC, a Wyoming, USA company. We work remotely with creators globally." },
  ],
};
