export type Lang = "en" | "pl";

export const translations = {
  // ─── Navbar ──────────────────────────────────────────────
  nav: {
    framework: { en: "Framework", pl: "Framework" },
    caseStudies: { en: "Case Studies", pl: "Case Studies" },
    blog: { en: "Blog", pl: "Blog" },
    bookCall: { en: "Book a Call", pl: "Umów rozmowę" },
    getStarted: { en: "Get Started →", pl: "Zacznij →" },
  },

  // ─── Hero ────────────────────────────────────────────────
  hero: {
    eyebrow: { en: "MVA Framework · 90-day program", pl: "MVA Framework · program 90 dni" },
    h1_line1: { en: "Build your first", pl: "Zbuduj swoich pierwszych" },
    h1_line2: { en: "1,000 true fans", pl: "1 000 prawdziwych fanów" },
    h1_line3: { en: "in 90 days.", pl: "w 90 dni." },
    hook: { en: "Stop launching to silence. We build you a list of", pl: "Przestań startować w ciszy. Zbudujemy Ci listę" },
    hookBold: { en: "paying Early Bird subscribers", pl: "płacących subskrybentów Early Bird" },
    hookEnd: { en: "— before your Kickstarter or launch day.", pl: "— zanim ruszy Twój Kickstarter lub prelaunch produktu lub usługi." },
    ctaPrimary: { en: "Book a free consultation →", pl: "Umów bezpłatną konsultację →" },
    ctaSecondary: { en: "Calculate how many fans you need ↓", pl: "Oblicz ilu fanów potrzebujesz ↓" },
    trustedBy: { en: "Trusted by 98+ founders", pl: "Zaufało nam 98+ founderów" },
    raised: { en: "$600K+ raised by MVA clients", pl: "$600K+ zebranych przez klientów MVA" },
    leads: { en: "Avg. 3,000+ leads per campaign", pl: "Śr. 3000+ leadów na kampanię" },
    campaignLabel: { en: "Your campaign · Day 47 of 90", pl: "Twoja kampania · Dzień 47 z 90" },
    totalLeads: { en: "TOTAL LEADS", pl: "ŁĄCZNIE LEADÓW" },
    earlyBird: { en: "EARLY BIRD ($1)", pl: "EARLY BIRD ($1)" },
    quizCR: { en: "QUIZ CR", pl: "QUIZ CR" },
    subscribers: { en: "Subscribers", pl: "Subskrybenci" },
    payments: { en: "Payments", pl: "Płatności" },
    stripeLabel: { en: "Stripe · Early Bird payments", pl: "Stripe · Płatności Early Bird" },
    stripeValue: { en: "94 × $1.00 collected", pl: "94 × $1.00 zebranych" },
    live: { en: "Live", pl: "Na żywo" },
    liveFooter: { en: "Live · 3 new leads in the last hour", pl: "Na żywo · 3 nowe leady w ciągu godziny" },
    demandSignal: { en: "DEMAND SIGNAL", pl: "SYGNAŁ POPYTU" },
  },

  // ─── Social Proof ────────────────────────────────────────
  socialProof: {
    eyebrow: { en: "Social Proof", pl: "Dowody społeczne" },
    title: { en: "Creators Are Launching", pl: "Twórcy startują" },
    titleAccent: { en: "With Demand", pl: "Ze zbudowaną społecznością" },
    metric1Value: { en: "12,000+", pl: "12 000+" },
    metric1Label: { en: "Waitlist subscribers built", pl: "Subskrybentów waitlist" },
    metric2Value: { en: "$500K+", pl: "$500K+" },
    metric2Label: { en: "Product launches", pl: "Premiery produktów" },
    metric3Value: { en: "3,000+", pl: "3 000+" },
    metric3Label: { en: "Creators using MVA", pl: "Twórców korzysta z MVA" },
    metric4Value: { en: "90 days", pl: "90 dni" },
    metric4Label: { en: "Avg. validation cycle", pl: "Śr. cykl walidacji" },
  },

  // ─── Problem ─────────────────────────────────────────────
  problem: {
    eyebrow: { en: "The Problem", pl: "Problem" },
    title: { en: "Most Products Launch", pl: "Większość produktów startuje" },
    titleAccent: { en: "To Silence", pl: "bez zbudowanej społeczności" },
    p1Title: { en: "No Audience", pl: "Brak odbiorców" },
    p1Desc: { en: "You build something great but nobody is waiting to see it.", pl: "Budujesz coś świetnego, ale nikt nie czeka, żeby to zobaczyć." },
    p2Title: { en: "No Validation", pl: "Brak walidacji" },
    p2Desc: { en: "You don't know if people actually want what you're creating.", pl: "Nie wiesz, czy ludzie naprawdę chcą tego, co tworzysz." },
    p3Title: { en: "No Demand", pl: "Brak popytu" },
    p3Desc: { en: "Marketing starts only after launch — when it's already too late.", pl: "Marketing zaczyna się dopiero po starcie — kiedy jest już za późno." },
  },

  // ─── Solution ────────────────────────────────────────────
  solution: {
    eyebrow: { en: "The MVA Framework", pl: "Framework MVA" },
    title: { en: "From Discovery", pl: "Od odkrycia" },
    titleAccent: { en: "To Launch", pl: "Do startu" },
    desc: { en: "Instead of building first and hoping people show up, the MVA framework focuses on building a small but highly engaged audience before launch.", pl: "Zamiast budować produkt i liczyć, że ludzie się pojawią, framework MVA skupia się na budowaniu małej, ale zaangażowanej publiczności przed startem." },
    s1: { en: "Discovery", pl: "Odkrycie" },
    s1Desc: { en: "Find a niche with real demand and unmet needs.", pl: "Znajdź niszę z realnym popytem i niezaspokojonymi potrzebami." },
    s2: { en: "Audience Growth", pl: "Wzrost odbiorców" },
    s2Desc: { en: "Publish ideas that attract your future audience organically.", pl: "Publikuj treści, które organicznie przyciągną Twoją przyszłą publiczność." },
    s3: { en: "Demand Signals", pl: "Sygnały popytu" },
    s3Desc: { en: "Measure what resonates through real engagement data.", pl: "Mierz, co rezonuje, na podstawie realnych danych o zaangażowaniu." },
    s4: { en: "Community", pl: "Społeczność" },
    s4Desc: { en: "Build a tight group of early fans who trust you.", pl: "Zbuduj bliską grupę wczesnych fanów, którzy Ci ufają." },
    s5: { en: "Launch", pl: "Start" },
    s5Desc: { en: "Release your product to an audience already waiting.", pl: "Wypuść produkt do publiczności, która już czeka." },
  },

  // ─── Case Studies ────────────────────────────────────────
  caseStudies: {
    eyebrow: { en: "Case Studies", pl: "Case Studies" },
    title: { en: "Successful Launches Using", pl: "Udane starty dzięki" },
    titleAccent: { en: "Audience-First Strategy", pl: "strategii Audience-First" },
    fundsRaised: { en: "Total Funds Raised", pl: "Łącznie zebranych środków" },
  },

  // ─── Founder ─────────────────────────────────────────────
  founder: {
    eyebrow: { en: "About The Creators", pl: "O twórcach" },
    title: { en: "Built By", pl: "Stworzony przez" },
    titleAccent: { en: "Launch Strategists", pl: "strategów launchu" },
    marekDesc1: { en: "Built multiple successful launches and helped founders validate ideas before building products. Focused on audience-first product development and demand validation strategies.", pl: "Przeprowadził wiele udanych startów i pomógł founderom walidować pomysły przed budową produktów. Skupiony na strategiach audience-first i walidacji popytu." },
    marekDesc2: { en: "The MVA Framework was born from years of experience working with creators and startups — seeing the same pattern over and over: products launched to silence because the audience wasn't built first.", pl: "Framework MVA narodził się z lat doświadczenia z twórcami i startupami — widząc wciąż ten sam wzorzec: produkty startowały w ciszę, bo publiczność nie została zbudowana wcześniej." },
    marekH1: { en: "Multiple successful product launches", pl: "Wiele udanych premier produktów" },
    marekH2: { en: "Audience growth strategies for 3,000+ founders", pl: "Strategie wzrostu dla 3000+ founderów" },
    marekH3: { en: "Creator & founder mentoring programs", pl: "Programy mentoringowe dla twórców" },
    marekH4: { en: "Demand validation specialist", pl: "Specjalista od walidacji popytu" },
    maciejDesc1: { en: "Maciej is the technical engine behind the MVA Framework. Years of shipping products — from AI tools to mobile apps to data platforms — mean your landing pages, funnels, and automations get built fast and built right.", pl: "Maciej to silnik techniczny MVA Framework. Lata dostarczania produktów — od narzędzi AI po aplikacje mobilne — oznaczają, że Twoje landing page, funnele i automatyzacje powstają szybko i solidnie." },
    maciejDesc2: { en: "While Marek designs the audience strategy, Maciej turns it into reality: high-converting pages, email sequences, AI-powered lead scoring, analytics dashboards — whatever your launch needs to actually work.", pl: "Podczas gdy Marek projektuje strategię, Maciej zamienia ją w rzeczywistość: strony o wysokiej konwersji, sekwencje email, scoring leadów AI, dashboardy analityczne — wszystko, czego potrzebuje Twój launch." },
    maciejH1: { en: "Ships production-ready MVPs in weeks, not months", pl: "Dostarcza gotowe MVP w tygodnie, nie miesiące" },
    maciejH2: { en: "Builds landing pages, funnels & automation from scratch", pl: "Buduje landing page, funnele i automatyzacje od zera" },
  },

  // ─── Final CTA ───────────────────────────────────────────
  finalCTA: {
    title: { en: "Stop Launching To Silence.", pl: "Przestań startować w ciszę." },
    subtitle: { en: "Start Building Demand.", pl: "Zacznij budować popyt." },
    calcBtn: { en: "Calculate Your MVA", pl: "Oblicz swoje MVA" },
    quizBtn: { en: "Find Your Growth Strategy", pl: "Znajdź swoją strategię wzrostu" },
  },

  // ─── Sticky CTA ──────────────────────────────────────────
  stickyCTA: {
    btn: { en: "Get Started", pl: "Zacznij" },
  },

  // ─── Footer ──────────────────────────────────────────────
  footer: {
    desc: { en: "JAY-23 helps founders build their Minimum Viable Audience using growth hacking, precision ads, and AI content systems.", pl: "JAY-23 pomaga founderom budować Minimum Viable Audience za pomocą growth hackingu, precyzyjnych reklam i systemów treści AI." },
    framework: { en: "FRAMEWORK", pl: "FRAMEWORK" },
    howItWorks: { en: "How It Works", pl: "Jak to działa" },
    mvaCalc: { en: "MVA Calculator", pl: "Kalkulator MVA" },
    strategyQuiz: { en: "Strategy Quiz", pl: "Quiz strategii" },
    process: { en: "90-Day Process", pl: "Proces 90 dni" },
    bookCall: { en: "Book a Call", pl: "Umów rozmowę" },
    resources: { en: "RESOURCES", pl: "ZASOBY" },
    privacyPolicy: { en: "Privacy Policy", pl: "Polityka prywatności" },
    termsOfService: { en: "Terms of Service", pl: "Regulamin" },
    impressum: { en: "Impressum", pl: "Impressum" },
    copyright: { en: "All rights reserved.", pl: "Wszelkie prawa zastrzeżone." },
    tagline: { en: "MVA Framework — Build demand before you build product.", pl: "MVA Framework — Buduj popyt, zanim zbudujesz produkt." },
    language: { en: "Language", pl: "Język" },
  },

  // ─── Book Call ───────────────────────────────────────────
  bookCall: {
    title: { en: "Book Your Free Strategy Call", pl: "Umów bezpłatną rozmowę strategiczną" },
    desc: { en: "Pick a time that works for you. 30 minutes, no strings attached.", pl: "Wybierz termin, który Ci odpowiada. 30 minut, bez zobowiązań." },
    back: { en: "Back to homepage", pl: "Wróć na stronę główną" },
    seoTitle: { en: "Book a Free Strategy Call — JAY-23", pl: "Umów bezpłatną rozmowę — JAY-23" },
    seoDesc: { en: "Schedule a free 30-minute strategy call to review your audience growth plan and get personalized recommendations.", pl: "Umów bezpłatną 30-minutową rozmowę strategiczną, aby omówić plan wzrostu odbiorców i uzyskać spersonalizowane rekomendacje." },
    eyebrow: { en: "Free strategy call · 30 minutes", pl: "Bezpłatna rozmowa strategiczna · 30 minut" },
    h1_1: { en: "Find out if your product", pl: "Dowiedz się, czy Twój produkt" },
    h1_2: { en: "is ready for MVA.", pl: "jest gotowy na MVA." },
    subtitle: { en: "We'll analyse your idea, define your target audience and show you", pl: "Przeanalizujemy Twój pomysł, zdefiniujemy grupę docelową i pokażemy Ci," },
    subtitleBold: { en: "how many leads you can collect in 90 days", pl: "ile leadów możesz zebrać w 90 dni" },
    subtitleEnd: { en: "— before you spend a cent on ads.", pl: "— zanim wydasz złotówkę na reklamy." },
    bullet1Title: { en: "Product-market fit assessment", pl: "Ocena product-market fit" },
    bullet1Desc: { en: "We'll tell you honestly whether your niche is large enough to build 1,000 paying fans before launch.", pl: "Powiemy Ci szczerze, czy Twoja nisza jest wystarczająco duża, by zbudować 1000 płacących fanów przed premierą." },
    bullet2Title: { en: "Estimated CPL and campaign budget", pl: "Szacowany CPL i budżet kampanii" },
    bullet2Desc: { en: "Concrete numbers, not guesswork. You leave the call with a realistic cost-per-lead figure in hand.", pl: "Konkretne liczby, nie zgadywanie. Wyjdziesz z rozmowy z realistycznym kosztem pozyskania leada." },
    bullet3Title: { en: "Your 90-day action plan", pl: "Twój plan działania na 90 dni" },
    bullet3Desc: { en: "Whether you work with JAY-23 or not — the plan is yours to keep.", pl: "Niezależnie, czy będziesz pracować z JAY-23 — plan zostaje z Tobą." },
    socialProof: { en: "4 founders had a call with us last week", pl: "4 founderów rozmawiało z nami w zeszłym tygodniu" },
    rating: { en: "Avg. rating: ★ 4.9 / 5", pl: "Śr. ocena: ★ 4,9 / 5" },
    ctaBtn: { en: "Pick your free slot", pl: "Wybierz swój termin" },
    ctaSub: { en: "30 minutes · no commitment · no pitch", pl: "30 minut · bez zobowiązań · bez pitchu" },
    slotsLeft: { en: "Only {slots} slots left this week", pl: "Zostały tylko {slots} miejsca w tym tygodniu" },
    slotsOpen: { en: "{slots} open of 10", pl: "{slots} wolnych z 10" },
    slotsLabel: { en: "Available slots — March 2026", pl: "Dostępne terminy — marzec 2026" },
    guarantee: { en: "Value guarantee", pl: "Gwarancja wartości" },
    guaranteeDesc: { en: "If you leave the call without at least one concrete idea for generating your first leads — we'll schedule another session, on us, until you do.", pl: "Jeśli wyjdziesz z rozmowy bez przynajmniej jednego konkretnego pomysłu na generowanie leadów — umówimy kolejną sesję na nasz koszt." },
    bookedCall: { en: "booked a call", pl: "umówił rozmowę" },
  },

  // ─── Process ─────────────────────────────────────────────
  process: {
    back: { en: "Back to home", pl: "Wróć na stronę główną" },
    eyebrow: { en: "How it works", pl: "Jak to działa" },
    h1_1: { en: "90 days.", pl: "90 dni." },
    h1_2: { en: "A paying audience,", pl: "Płacąca publiczność," },
    h1_3: { en: "before you launch.", pl: "zanim ruszysz." },
    desc: { en: "Three focused months. Each phase builds on the last — no wasted days, no guessing. Here's exactly what happens, and who does what.", pl: "Trzy skoncentrowane miesiące. Każda faza buduje na poprzedniej — zero zmarnowanych dni. Oto dokładnie co się dzieje i kto co robi." },
    calcMVA: { en: "Calculate your MVA", pl: "Oblicz swoje MVA" },
    seoTitle: { en: "Our 90-Day Process — JAY-23 MVA Framework", pl: "Nasz proces 90 dni — JAY-23 MVA Framework" },
    seoDesc: { en: "See exactly how the MVA Framework works over 90 days: Build, Drive, Launch. Three phases to a paying audience before you launch.", pl: "Zobacz dokładnie jak działa MVA Framework przez 90 dni: Buduj, Napędzaj, Startuj. Trzy fazy do płacącej publiczności." },
  },

  // ─── Blog ────────────────────────────────────────────────
  blog: {
    title: { en: "Articles by", pl: "Artykuły od" },
    titleAccent: { en: "CrowdFunding Zone", pl: "CrowdFunding Zone" },
    noPosts: { en: "No posts yet. Check back soon!", pl: "Brak postów. Sprawdź wkrótce!" },
    seoTitle: { en: "Blog — Audience Building & Launch Strategy Articles", pl: "Blog — Artykuły o budowaniu odbiorców i strategiach launchu" },
    seoDesc: { en: "Expert articles on audience building, product launches, crowdfunding, and the MVA Framework.", pl: "Eksperckie artykuły o budowaniu odbiorców, premiery produktów, crowdfunding i MVA Framework." },
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(section: TranslationKey, key: string, lang: Lang): string {
  const s = translations[section] as Record<string, Record<Lang, string>>;
  return s?.[key]?.[lang] ?? s?.[key]?.["en"] ?? key;
}
