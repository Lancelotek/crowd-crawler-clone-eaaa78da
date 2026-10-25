import { mvaOfferCopy } from "../content/mvaOffer";

export type Lang = "en" | "pl";

export const translations = {
  // ─── Navbar ──────────────────────────────────────────────
  nav: {
    framework: { en: "How It Works", pl: "Framework" },
    caseStudies: { en: "Case Studies", pl: "Case Studies" },
    process: { en: "Process", pl: "Proces" },
    blog: { en: "Blog", pl: "Blog" },
    mobileBookCall: { en: "Book a call", pl: "Umów rozmowę" },
    bookCall: { en: "Free Strategy Call", pl: "Umów bezpłatną konsultację" },
    getStarted: { en: "Get Started →", pl: "Zacznij →" },
    about: { en: "About", pl: "O nas" },
    faq: { en: "FAQ", pl: "FAQ" },
  },

  // ─── Hero ────────────────────────────────────────────────
  hero: {
    eyebrow: { en: "JAY-23 · MVA Framework", pl: "AGENCJA KICKSTARTER POLSKA · MVA FRAMEWORK" },

    h1_line1: { en: "Pre-Launch Marketing for SaaS & eCommerce ", pl: "Agencja Pre-Launch Marketingu" },
    h1_line2: { en: "Founders.", pl: "Zero zimnych startów." },
    h1_line3: { en: "", pl: "" },
    hook: { en: "We build your audience before you launch: an email list, a VIP group and people who already paid $1 for early access. Then the ads go to people who look like them.", pl: "Budujemy Ci publiczność przed kampanią na Kickstarterze: listę mailową, grupę VIP i ludzi, którzy już zapłacili $1 za wcześniejszy dostęp. Reklamy trafiają potem do osób podobnych do nich." },
    hookBold: { en: "46 client campaigns, $1.2M+ raised.", pl: "46 kampanii klientów, $1,2M+ zebrane." },
    hookEnd: { en: "", pl: "" },
    ctaPrimary: { en: "Book a call with Marek →", pl: "Umów rozmowę z Markiem →" },
    ctaSecondary: { en: "Or check your numbers in the 2-minute MVA quiz", pl: "Albo sprawdź swoje liczby w 2-minutowym quizie MVA" },
    trustBar: { en: "30 minutes, free. Marek replies within 24h.", pl: "30 minut, bezpłatnie. Marek odpowiada w 24h." },
    trustedBy: { en: "98+ founders served", pl: "Zaufało nam 98+ founderów" },
    raised: { en: "$1.2M+ raised by client campaigns", pl: "$1,2M+ zebrane przez kampanie klientów" },
    leads: { en: "46 campaigns launched", pl: "46 przeprowadzonych kampanii" },
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
    title: { en: "Campaigns we've worked on", pl: "Kampanie, przy których pracowaliśmy" },
    titleAccent: { en: "", pl: "" },
    metric1Value: { en: "46", pl: "46" },
    metric1Label: { en: "Campaigns launched", pl: "Przeprowadzonych kampanii" },
    metric2Value: { en: "$1.2M+", pl: "$1,2M+" },
    metric2Label: { en: "Raised across 46 client campaigns", pl: "Zebrane przez 46 kampanii klientów" },
    metric3Value: { en: "98+", pl: "98+" },
    metric3Label: { en: "Founders went through MVA", pl: "Founderów przeszło przez MVA" },
    metric4Value: { en: "90", pl: "90" },
    metric4Label: { en: "Days. Three phases. One launch.", pl: "Dni. Trzy fazy. Jeden launch." },
  },

  // ─── Cold Launch Trap ────────────────────────────────────
  coldLaunchTrap: {
    label: { en: "THE COLD LAUNCH TRAP", pl: "PUŁAPKA ZIMNEGO STARTU" },
    headline1: { en: "Most launches don't fail on launch day.", pl: "Większość premier nie przegrywa w dniu startu." },
    headline2: { en: "They fail the day the founder decides to build first and find customers later.", pl: "Przegrywa w dniu, w którym founder postanawia najpierw budować, a klientów szukać później." },
    p1: { en: "You spend 6 months building the product.\nYou write the landing page.\nYou set up the ads.", pl: "Spędzasz 6 miesięcy budując produkt.\nPiszesz landing page.\nUstawiasz reklamy." },
    p2: { en: "Launch day: 23 sales.\nWeek two: 4 sales.\nWeek three: silence.", pl: "Dzień startu: 23 sprzedaże.\nTydzień drugi: 4 sprzedaże.\nTydzień trzeci: cisza." },
    p3: { en: "Not because the product was bad.\nBecause Meta had nobody to show it to.", pl: "Nie dlatego, że produkt był zły.\nBo Meta nie miała komu go pokazać." },
    p4: { en: "The Cold Launch Trap kills 97% of product launches before they start — not on launch day, but on the day the founder decided to build first and find customers later.", pl: "Pułapka Zimnego Startu zabija 97% premier produktów zanim się zaczną — nie w dniu startu, ale w dniu, gdy founder zdecydował się budować najpierw, a klientów szukać później." },
    p5: { en: "Meta's algorithm needs signal, and signal comes from people who already engaged with you. That audience takes 90 days to build.", pl: "Algorytm Meta potrzebuje sygnału, a sygnał dają ludzie, którzy już weszli z Tobą w interakcję. Zbudowanie takiej publiczności zajmuje 90 dni." },
    p6: { en: "Most founders give Meta a blank audience on day one, then wonder why a sale costs $180.", pl: "Większość founderów daje Meta pustą publiczność w dniu pierwszym, a potem dziwi się, że sprzedaż kosztuje $180." },
    highlight: { en: "The MVA Framework reverses the order.", pl: "MVA Framework odwraca kolejność." },
    p7: { en: "You build the audience first.\nMeta gets signal from day one.\nYou launch to people who already paid $1 to be on your list.", pl: "Najpierw budujesz publiczność.\nMeta dostaje sygnał od pierwszego dnia.\nStartujesz do ludzi, którzy już zapłacili $1 za miejsce na Twojej liście." },
    cta: { en: "Book a call with Marek →", pl: "Umów rozmowę z Markiem →" },
  },

  // ─── Framework Comparison ────────────────────────────────
  frameworkComparison: {
    headline: { en: "Same product, same budget, different order", pl: "Ten sam produkt, ten sam budżet, inna kolejność" },
    oldWay: { en: "Cold launch", pl: "Zimny start" },
    mvaWay: { en: "MVA launch", pl: "Start z MVA" },
    old1: { en: "Build product", pl: "Zbuduj produkt" },
    old2: { en: "Find audience (after launch)", pl: "Znajdź publiczność (po starcie)" },
    old3: { en: "Run ads to cold traffic", pl: "Reklamy na zimny ruch" },
    old4: { en: "High CPC, low CVR, burn budget", pl: "Wysoki CPC, niski CVR, przepalony budżet" },
    old5: { en: "Give up or pivot", pl: "Poddaj się lub pivotuj" },
    oldResult: { en: "$180 per customer", pl: "$180 za klienta" },
    mva1: { en: "Research demand first", pl: "Najpierw zbadaj popyt" },
    mva2: { en: "Build $1 Early Bird waitlist", pl: "Zbuduj waitlistę Early Bird za $1" },
    mva3: { en: "Warm audience before ads", pl: "Rozgrzej publiczność przed reklamami" },
    mva4: { en: "Meta gets signal from engaged subscribers", pl: "Meta dostaje sygnał od zaangażowanych subskrybentów" },
    mva5: { en: "Run ads to Lookalikes of paying subscribers", pl: "Reklamy do Lookalike'ów płacących subskrybentów" },
    mvaResult: { en: "$12-25 per customer", pl: "$12-25 za klienta" },
    bodyP1: { en: "Cold traffic costs $180 per customer because Meta has to find your buyers from scratch. A warm list of 1,000 Early Birds shows it who converts, and the cost drops to $12-25.", pl: "Zimny ruch kosztuje $180 za klienta, bo Meta musi znaleźć kupujących od zera. Rozgrzana lista 1 000 Early Birdów pokazuje algorytmowi, kto kupuje, i koszt spada do $12-25." },
    bodyP2: { en: "When you run ads to a cold audience, Meta charges you $180 to test who might want your product.", pl: "Gdy puszczasz reklamy na zimną publiczność, Meta kasuje $180 za testowanie, kto może chcieć Twojego produktu." },
    bodyP3: { en: "When you run ads to a warm audience of 1,000 Early Birds, Meta charges you $12-25 — because it already knows who converts.", pl: "Gdy puszczasz reklamy na rozgrzaną publiczność 1 000 Early Birdów, Meta kasuje $12-25 — bo już wie, kto konwertuje." },
    bodyP4: { en: "That's the framework: 90 days, three phases and a launch with buyers already waiting.", pl: "Tym jest MVA Framework: 90 dni, trzy fazy i launch z kupującymi, którzy już czekają." },
  },

  // ─── Case Study Deep Dive ────────────────────────────────
  caseStudyDeep: {
    label: { en: "CASE STUDY", pl: "CASE STUDY" },
    headline: { en: "How Woolet raised $330K by advertising only to people who had already paid $1", pl: "Jak Woolet zebrał $330K, reklamując się tylko osobom, które już zapłaciły $1" },
    subheadline: { en: "Our own smart wallet, launched on Kickstarter to a pre-built audience.", pl: "Nasz własny inteligentny portfel, wystartował na Kickstarterze do gotowej publiczności." },
    body1: { en: "Woolet is our own product: a $99 smart wallet.\n\nWe had a landing page and a product. Nobody was waiting to buy it.", pl: "Woolet to nasz własny produkt: inteligentny portfel za $99.\n\nMieliśmy landing page i produkt. Nikt nie czekał na zakup." },
    body2: { en: "Before MVA: cold traffic, $4.20 CPC, 0.8% conversion, $200+ per backer.", pl: "Przed MVA: zimny ruch, CPC $4.20, konwersja 0,8%, ponad $200 za backera." },
    body3: { en: "", pl: "" },
    phase1: { en: "Weeks 1-4\nEmail waitlist through a quiz funnel. 2,400 subscribers in 30 days, 340 paid $1 Early Bird deposits.", pl: "Tygodnie 1-4\nLista mailowa przez quiz funnel. 2 400 subskrybentów w 30 dni, 340 płatnych depozytów Early Bird po $1." },
    phase2: { en: "Weeks 5-8\nAds to Lookalikes of the Early Bird payers. CPC fell from $4.20 to $0.80, conversion rose to 4.2%.", pl: "Tygodnie 5-8\nReklamy do Lookalike'ów płacących Early Birdów. CPC spadł z $4.20 do $0.80, konwersja wzrosła do 4,2%." },
    phase3: { en: "Weeks 9-12\n1,847 backers on day one, $330K raised by the end of the campaign.", pl: "Tygodnie 9-12\n1 847 backerów w pierwszym dniu, $330K zebrane do końca kampanii." },
    result1Value: { en: "$330K", pl: "$330K" },
    result1Label: { en: "raised in campaign", pl: "zebranych w kampanii" },
    result2Value: { en: "1,847", pl: "1 847" },
    result2Label: { en: "backers day one", pl: "backerów w dniu 1" },
    result3Value: { en: "$18", pl: "$18" },
    result3Label: { en: "per backer, down from $200+", pl: "za backera, wcześniej ponad $200" },
    result4Value: { en: "11x", pl: "11x" },
    result4Label: { en: "ROAS on total ad spend", pl: "ROAS na całych wydatkach reklamowych" },
    closing: { en: "Same product, different order: the audience came before the launch.", pl: "Ten sam produkt, inna kolejność: publiczność powstała przed launchem." },
  },

  // ─── Pricing Value Stack ─────────────────────────────────
  pricingValue: {
    label: { en: "WHAT YOU GET IN 90 DAYS", pl: "CO OTRZYMUJESZ W 90 DNI" },
    headline: { en: "One program, four months", pl: "Jeden program, cztery miesiące" },
    price: { en: mvaOfferCopy.en.duration, pl: mvaOfferCopy.pl.duration },
    priceNote: { en: mvaOfferCopy.en.billing, pl: mvaOfferCopy.pl.billing },
    item1Name: { en: "Audience Research Kit", pl: "Zestaw badań odbiorców" },
    item1Value: { en: "$500 value", pl: "wartość 2 000 PLN" },
    item1Desc: { en: "Persona canvas + demand validation framework", pl: "Persona canvas + framework walidacji popytu" },
    item2Name: { en: "Quiz funnel + landing page, built for you", pl: "Quiz funnel + landing page, zbudowane dla Ciebie" },
    item2Value: { en: "$2,000 value", pl: "wartość 8 000 PLN" },
    item2Desc: { en: "Opt-in page with a segmentation quiz, built for your product", pl: "Strona opt-in z quizem segmentacyjnym, zbudowana pod Twój produkt" },
    item3Name: { en: "5-email Early Bird sequence", pl: "5-emailowa sekwencja Early Bird" },
    item3Value: { en: "$800 value", pl: "wartość 3 200 PLN" },
    item3Desc: { en: "Turns subscribers into paid $1 deposits", pl: "Zamienia subskrybentów w płatne depozyty po $1" },
    item4Name: { en: "Meta + TikTok ads management, weeks 5-12", pl: "Zarządzanie reklamami Meta + TikTok, tygodnie 5-12" },
    item4Value: { en: "$6,000 value", pl: "wartość 24 000 PLN" },
    item4Desc: { en: "Full campaign setup, creative briefs, weekly optimization", pl: "Pełna konfiguracja kampanii, briefy kreatywne, tygodniowa optymalizacja" },
    item5Name: { en: "Weekly coaching calls, 12 sessions", pl: "Cotygodniowe sesje coachingowe, 12 spotkań" },
    item5Value: { en: "$3,600 value", pl: "wartość 14 400 PLN" },
    item5Desc: { en: "Strategy adjusted every week, not a pre-recorded course", pl: "Strategia korygowana co tydzień, nie nagrany kurs" },
    item6Name: { en: "Direct access to Marek, who raised $600K+ for his own products", pl: "Bezpośredni dostęp do Marka - $600K+ zebrane we własnych projektach" },
    item6Value: { en: "Included", pl: "W cenie" },
    item6Desc: { en: "Marek Cieśla - 46 campaigns, Woolet $330K, Crowder.pro 3M PLN", pl: "Marek Cieśla - 46 kampanii, Woolet $330K, Crowder.pro 3M PLN" },
    item7Name: { en: "Lookalike audience from your Early Bird list", pl: "Lookalike audience z Twojej listy Early Bird" },
    item7Value: { en: "Priceless", pl: "Bezcenne" },
    item7Desc: { en: "Launch ads to people who look like your paying subscribers", pl: "Reklamy do ludzi podobnych do Twoich płacących subskrybentów" },
    totalValue: { en: "Total value: $12,900+", pl: "Łączna wartość: 51 600+ PLN" },
    yourInvestment: { en: "Your investment:", pl: "Twoja inwestycja:" },
    investmentAmount: { en: mvaOfferCopy.en.investmentAmount, pl: mvaOfferCopy.pl.investmentAmount },
    investmentNote: { en: mvaOfferCopy.en.investmentNote, pl: mvaOfferCopy.pl.investmentNote },
    guaranteeLabel: { en: "Guarantee", pl: "Gwarancja" },
    guaranteeP1: { en: "No working waitlist with 50+ subscribers and first Early Bird payments by the end of month one? We extend the program for free until you have it.", pl: "Brak działającej waitlisty z 50+ subskrybentami i pierwszymi płatnościami Early Bird do końca pierwszego miesiąca? Przedłużamy program za darmo, aż je masz." },
    guaranteeP2: { en: "", pl: "" },
    cta: { en: "Book a call with Marek →", pl: "Umów rozmowę z Markiem →" },
    ctaTrust: { en: "30 minutes, free. Marek replies within 24h.", pl: "30 minut, bezpłatnie. Marek odpowiada w 24h." },
  },

  // ─── LP Page ─────────────────────────────────────────────
  lp: {
    announcementBar: { en: "46 Client Campaigns · $1.2M+ Raised by Client Campaigns · 90-Day MVA Program ·", pl: "46 kampanii klientów · $1,2M+ zebrane przez kampanie klientów · 90-dniowy program MVA ·" },
    announcementCta: { en: "Book a Free Call →", pl: "Umów bezpłatne spotkanie →" },
    resultsLabel: { en: "Results from MVA campaigns", pl: "Wyniki kampanii MVA" },
    finalHeadline: { en: "Ready to build your audience before your launch?", pl: "Gotowy zbudować publiczność przed startem?" },
    finalCta: { en: "Book a Free Strategy Call →", pl: "Umów bezpłatną konsultację →" },
    finalTrust: { en: "30 min · no commitment · no pitch", pl: "30 min · bez zobowiązań · bez pitchu" },
  },

  // ─── Problem ─────────────────────────────────────────────
  problem: {
    eyebrow: { en: "The Problem", pl: "Problem" },
    title: { en: "97% of Product Launches Fail.", pl: "Większość produktów startuje" },
    titleAccent: { en: "Here's Why.", pl: "bez zbudowanej społeczności" },
    p1Title: { en: "No Audience", pl: "Brak odbiorców" },
    p1Desc: { en: "Most founders build first, then scramble to find customers. By then, it's too late.", pl: "Budujesz coś świetnego, ale nikt nie czeka, żeby to zobaczyć." },
    p2Title: { en: "No Validation", pl: "Brak walidacji" },
    p2Desc: { en: "They spend months building something nobody asked for — or is willing to pay for.", pl: "Nie wiesz, czy ludzie naprawdę chcą tego, co tworzysz." },
    p3Title: { en: "No Demand", pl: "Brak popytu" },
    p3Desc: { en: "Launch day arrives with zero waitlist, zero buzz, zero momentum.", pl: "Marketing zaczyna się dopiero po starcie — kiedy jest już za późno." },
    transition: { en: "The MVA Framework flips the script. You build demand FIRST.", pl: "Framework MVA odwraca kolejność. Najpierw budujesz popyt." },
  },

  // ─── How It Works (90-day) ───────────────────────────────
  howItWorks: {
    eyebrow: { en: "How It Works", pl: "Jak to działa" },
    title: { en: "90 days, three phases", pl: "90 dni, trzy fazy" },
    titleAccent: { en: "", pl: "" },
    phase1Label: { en: "Days 1-30", pl: "Dni 1-30" },
    phase1Title: { en: "Discover", pl: "Odkryj" },
    phase1Desc: { en: "We build your ICP, test ad angles on small budgets and keep the message that converts. You get the audience research kit and positioning canvas.", pl: "Budujemy ICP, testujemy kąty reklamowe na małych budżetach i zostawiamy przekaz, który konwertuje. Dostajesz zestaw badań odbiorców i canvas pozycjonowania." },
    phase2Label: { en: "Days 31-60", pl: "Dni 31-60" },
    phase2Title: { en: "Build", pl: "Buduj" },
    phase2Desc: { en: "The waitlist, VIP group and $1 early-access offer go live. Conversion ads run from day one, even at $1 a day.", pl: "Startują waitlista, grupa VIP i oferta wcześniejszego dostępu za $1. Reklamy konwersyjne działają od pierwszego dnia, nawet za $1 dziennie." },
    phase3Label: { en: "Days 61-90", pl: "Dni 61-90" },
    phase3Title: { en: "Launch", pl: "Startuj" },
    phase3Desc: { en: "Early Birds get first access. Ads go to Lookalikes of your paying subscribers, and we optimise every week through launch.", pl: "Early Birdzi dostają pierwszy dostęp. Reklamy idą do Lookalike'ów płacących subskrybentów, a my optymalizujemy co tydzień aż do startu." },
    cta: { en: "Calculate your MVA", pl: "Oblicz swoje MVA" },
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
    title: { en: "Campaigns and what they raised", pl: "Kampanie i ile zebrały" },
    titleAccent: { en: "", pl: "" },
    fundsRaised: { en: "raised", pl: "zebrane" },
  },

  // ─── What You Get ────────────────────────────────────────
  whatYouGet: {
    eyebrow: { en: "What's Included", pl: "Co otrzymujesz" },
    title: { en: "What's included", pl: "Co jest w programie" },
    titleAccent: { en: "", pl: "" },
    f1Title: { en: "Free MVA Calculator", pl: "Darmowy kalkulator MVA" },
    f1Desc: { en: "Score your pre-launch readiness in 2 minutes.", pl: "Oceń gotowość do launchu w 2 minuty." },
    f2Title: { en: "90-Day Action Plan", pl: "Plan działania na 90 dni" },
    f2Desc: { en: "Week-by-week tasks, templates, and milestones.", pl: "Zadania tydzień po tygodniu, szablony i kamienie milowe." },
    f3Title: { en: "Audience Research Kit", pl: "Zestaw badań odbiorców" },
    f3Desc: { en: "Find your 1,000 true fans with a repeatable method.", pl: "Znajdź 1000 prawdziwych fanów powtarzalną metodą." },
    f4Title: { en: "Email Sequence Templates", pl: "Szablony sekwencji email" },
    f4Desc: { en: "Nurture flows that turn a waitlist into customers.", pl: "Sekwencje, które zamieniają waitlistę w klientów." },
    f5Title: { en: "1:1 Strategy Calls", pl: "Konsultacje 1:1" },
    f5Desc: { en: "Direct access to a founder who raised $600K+ for his own products", pl: "Bezpośredni dostęp do foundera - $600K+ zebrane we własnych projektach Marka" },
    f6Title: { en: "Landing Page Templates", pl: "Szablony landing page" },
    f6Desc: { en: "Page templates that turn visitors into subscribers.", pl: "Szablony stron, które zamieniają odwiedzających w subskrybentów." },
  },

  // ─── Founder ─────────────────────────────────────────────
  founder: {
    eyebrow: { en: "About The Creator", pl: "O twórcach" },
    title: { en: "Who you'll work with", pl: "Z kim pracujesz" },
    titleAccent: { en: "", pl: "" },
    marekDesc1: { en: "Serial entrepreneur with 20+ years of experience. Raised $330K for Woolet, built Crowder.pro to 3M PLN revenue and helped 98+ founders launch.", pl: "Przeprowadził wiele udanych startów i pomógł founderom walidować pomysły przed budową produktów. Skupiony na strategiach audience-first i walidacji popytu." },
    marekDesc2: { en: "Creator of the Product Launch 101 newsletter (2,108 subscribers). The MVA Framework was born from years of seeing the same pattern: products launched to silence because the audience wasn't built first.", pl: "Framework MVA narodził się z lat doświadczenia z twórcami i startupami — widząc wciąż ten sam wzorzec: produkty startowały w ciszę, bo publiczność nie została zbudowana wcześniej." },
    marekH1: { en: "Oxford Brookes MBA", pl: "Wiele udanych premier produktów" },
    marekH2: { en: "20+ Years Experience", pl: "Strategie wzrostu dla 3000+ founderów" },
    marekH3: { en: "$600K+ raised in Marek's own projects", pl: "$600K+ zebrane we własnych projektach Marka" },
    marekH4: { en: "98+ Founders Served", pl: "Specjalista od walidacji popytu" },
    maciejDesc1: { en: "Maciej is the technical side of the MVA Framework. He has shipped AI tools, mobile apps and data platforms, so your landing pages, funnels and automations get built fast and work on day one.", pl: "Maciej odpowiada za technikę w MVA Framework. Dostarczał narzędzia AI, aplikacje mobilne i platformy danych, więc Twoje landing page, funnele i automatyzacje powstają szybko i działają od pierwszego dnia." },
    maciejDesc2: { en: "Marek designs the audience strategy, Maciej builds it: landing pages, email sequences, AI lead scoring and analytics dashboards.", pl: "Marek projektuje strategię publiczności, Maciej ją buduje: landing page, sekwencje email, scoring leadów AI i dashboardy analityczne." },
    maciejH1: { en: "Ships production-ready MVPs in weeks, not months", pl: "Dostarcza gotowe MVP w tygodnie, nie miesiące" },
    maciejH2: { en: "Builds landing pages, funnels & automation from scratch", pl: "Buduje landing page, funnele i automatyzacje od zera" },
  },

  // ─── FAQ ─────────────────────────────────────────────────
  faq: {
    eyebrow: { en: "FAQ", pl: "FAQ" },
    title: { en: "Questions founders ask before the call", pl: "Pytania, które founderzy zadają przed rozmową" },
    titleAccent: { en: "", pl: "" },
    q1: { en: "What is the MVA Framework?", pl: "Czym jest MVA Framework?" },
    a1: { en: "MVA stands for Minimum Viable Audience, inspired by Kevin Kelly's 1,000 True Fans. It's a 90-day program that builds your audience before your product launches.", pl: "MVA to Minimum Viable Audience, inspirowane koncepcją 1000 prawdziwych fanów Kevina Kelly'ego. To 90-dniowy program, który buduje publiczność przed startem produktu." },
    q2: { en: "Who is this for?", pl: "Dla kogo jest ten program?" },
    a2: { en: "Early-stage founders (25–45) preparing a product launch, building initial audiences from scratch, or seeking a systematic framework to validate ideas through community engagement.", pl: "Founderzy na wczesnym etapie (25–45 lat) przygotowujący launch produktu, budujący odbiorców od zera lub szukający systematycznego frameworka do walidacji pomysłów." },
    q3: { en: "How much does it cost?", pl: "Ile to kosztuje?" },
    a3: { en: `${mvaOfferCopy.en.duration} · ${mvaOfferCopy.en.billing}. No hidden costs. Book a free strategy call to discuss details.`, pl: `${mvaOfferCopy.pl.duration} · ${mvaOfferCopy.pl.billing}. Bez ukrytych kosztów. Umów bezpłatną rozmowę, by omówić szczegóły.` },
    q4: { en: "What if I already have a product?", pl: "Co jeśli mam już produkt?" },
    a4: { en: "The framework works before and after launch, for founders who need to build an audience or bring an old one back.", pl: "Framework działa przed launchem i po nim, dla founderów, którzy muszą zbudować publiczność albo ożywić starą." },
    q5: { en: "How is this different from a marketing course?", pl: "Czym to się różni od kursu marketingu?" },
    a5: { en: "It's not a course. It's a 90-day hands-on program with templates, tools, weekly coaching calls and a real launch at the end.", pl: "To nie kurs. To 90-dniowy praktyczny program z szablonami, narzędziami, cotygodniowym coachingiem i prawdziwym launchem na końcu." },
  },

  // ─── Final CTA ───────────────────────────────────────────
  finalCTA: {
    title: { en: "Bring your product and your launch date.", pl: "Przyjdź z produktem i datą startu." },
    subtitle: { en: "Leave with the number of fans you need.", pl: "Wyjdź z liczbą fanów, których potrzebujesz." },
    desc: { en: "30 minutes with Marek. You get your MVA number, an estimated cost per lead and a 90-day plan, whether you work with us or not.", pl: "30 minut z Markiem. Dostajesz swoją liczbę MVA, szacowany koszt leada i plan na 90 dni, niezależnie od tego, czy z nami pracujesz." },
    calcBtn: { en: "Book a call with Marek", pl: "Umów rozmowę z Markiem" },
    quizBtn: { en: "Or take the 2-minute MVA quiz", pl: "Albo wypełnij 2-minutowy quiz MVA" },
    trust: { en: "30 minutes, free. Marek replies within 24h.", pl: "30 minut, bezpłatnie. Marek odpowiada w 24h." },
  },

  // ─── Sticky CTA ──────────────────────────────────────────
  stickyCTA: {
    btn: { en: "Book a call with Marek", pl: "Umów rozmowę z Markiem" },
  },

  // ─── Footer ──────────────────────────────────────────────
  footer: {
    desc: { en: "JAY-23 helps founders build their Minimum Viable Audience using growth hacking, precision ads, and AI content systems.", pl: "JAY-23 pomaga founderom budować Minimum Viable Audience za pomocą growth hackingu, precyzyjnych reklam i systemów treści AI." },
    framework: { en: "FRAMEWORK", pl: "FRAMEWORK" },
    howItWorks: { en: "How It Works", pl: "Jak to działa" },
    mvaCalc: { en: "MVA Calculator", pl: "Kalkulator MVA" },
    strategyQuiz: { en: "Free Strategy Call", pl: "Bezpłatna rozmowa strategiczna" },
    process: { en: "90-Day Process", pl: "Proces 90 dni" },
    packages: { en: "Packages", pl: "Pakiety" },
    bookCall: { en: "Book a Call", pl: "Umów rozmowę" },
    founderInfluencer: { en: "Founder Influencer", pl: "Founder Influencer" },
    resources: { en: "RESOURCES", pl: "ZASOBY" },
    services: { en: "SERVICES", pl: "USŁUGI" },
    ecommerce: { en: "eCommerce Pre-Launch", pl: "Pre-launch eCommerce" },
    saas: { en: "SaaS Pre-Launch", pl: "Pre-launch SaaS" },
    privacyPolicy: { en: "Privacy Policy", pl: "Polityka prywatności" },
    termsOfService: { en: "Terms of Service", pl: "Regulamin" },
    impressum: { en: "Impressum", pl: "Impressum" },
    copyright: { en: "All rights reserved.", pl: "Wszelkie prawa zastrzeżone." },
    tagline: { en: "MVA Framework: build demand before you build product.", pl: "MVA Framework: buduj popyt, zanim zbudujesz produkt." },
    language: { en: "Language", pl: "Język" },
    newsletter: { en: "Join 2,108 founders getting weekly launch strategies", pl: "Dołącz do 2108 founderów otrzymujących cotygodniowe strategie launchu" },
  },

  // ─── Book Call ───────────────────────────────────────────
  bookCall: {
    title: { en: "Book Your Free Strategy Call", pl: "Umów bezpłatną rozmowę strategiczną" },
    desc: { en: "Pick a time that works for you. 30 minutes, no strings attached.", pl: "Wybierz termin, który Ci odpowiada. 30 minut, bez zobowiązań." },
    back: { en: "Back to homepage", pl: "Wróć na stronę główną" },
    seoTitle: { en: "Book a Free Kickstarter Strategy Call | JAY-23", pl: "Konsultacja Kickstarter — 30 minut, bezpłatnie | JAY-23" },
    seoDesc: { en: "30-minute free call with a Kickstarter prelaunch expert. We'll audit your funnel, estimate your CPL, and map a 90-day plan to 1,000 fans.", pl: "Umów bezpłatną 30-minutową konsultację Kickstarter. Pokażemy Ci, ilu fanów potrzebujesz przed launchem i jak ich zebrać w 90 dni." },
    eyebrow: { en: "Free strategy call · 30 minutes", pl: "Bezpłatna rozmowa strategiczna · 30 minut" },
    h1_1: { en: "Find out if your product", pl: "Dowiedz się, czy Twój produkt" },
    h1_2: { en: "is ready for MVA.", pl: "jest gotowy na Kickstarter." },
    subtitle: { en: "We'll analyse your idea, define your target audience and show you", pl: "Przeanalizujemy Twój pomysł na kampanię Kickstarter, zdefiniujemy grupę docelową i pokażemy Ci," },
    subtitleBold: { en: "how many leads you can collect in 90 days", pl: "ilu fanów musisz zebrać w 90 dni" },
    subtitleEnd: { en: "— before you spend a cent on ads.", pl: "— zanim klikniesz Launch." },
    bullet1Title: { en: "Product-market fit assessment", pl: "Ocena product-market fit" },
    bullet1Desc: { en: "We'll tell you honestly whether your niche is large enough to build 1,000 paying fans before launch.", pl: "Powiemy Ci szczerze, czy Twoja nisza jest wystarczająco duża, by zbudować 1000 płacących fanów przed kampanią Kickstarter." },

    bullet2Title: { en: "Estimated CPL and campaign budget", pl: "Szacowany CPL i budżet kampanii" },
    bullet2Desc: { en: "Concrete numbers, not guesswork. You leave the call with a realistic cost-per-lead figure in hand.", pl: "Konkretne liczby, nie zgadywanie. Wyjdziesz z rozmowy z realistycznym kosztem pozyskania leada." },
    bullet3Title: { en: "Your 90-day action plan", pl: "Twój plan działania na 90 dni" },
    bullet3Desc: { en: "Whether you work with JAY-23 or not — the plan is yours to keep.", pl: "Niezależnie, czy będziesz pracować z JAY-23 — plan zostaje z Tobą." },
    socialProof: { en: "46 founders talked to us this year", pl: "46 founderów rozmawiało z nami w tym roku" },
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
    seoTitle: { en: "How to Promote a Kickstarter — 90-Day Process | JAY-23", pl: "Jak Promować Kickstarter — Proces 90 Dni | JAY-23" },
    seoDesc: { en: "The exact 90-day process to promote a Kickstarter: persona research, Meta Ads with the Andromeda framework, email funnel, and launch-day push.", pl: "Dokładny proces 90 dni promocji kampanii Kickstarter: research person, Meta Ads (framework Andromeda), lejek email i mobilizacja na dzień startu." },
  },

  // ─── Blog ────────────────────────────────────────────────
  blog: {
    title: { en: "Pre-Launch & Crowdfunding ", pl: "Artykuły o prelaunch " },
    titleAccent: { en: "Marketing Articles", pl: "i crowdfundingu" },
    noPosts: { en: "No posts yet. Check back soon!", pl: "Brak postów. Sprawdź wkrótce!" },
    seoTitle: { en: "Pre-Launch Marketing Blog — Kickstarter & SaaS | JAY-23", pl: "Blog: Kickstarter, TikTok Shop, SaaS i Sales Growth | JAY-23" },
    seoDesc: { en: "Tactics for Kickstarter, TikTok Shop and SaaS launches: audience, Meta Ads, email funnels. Lessons from 46 campaigns and $1.2M+ raised by client campaigns.", pl: "Taktyki dla Kickstarter, TikTok Shop i SaaS: budowanie publiczności, Meta Ads, lejki email. Wnioski z 46 kampanii i $1,2M+ zebrane przez kampanie klientów." },
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(section: TranslationKey, key: string, lang: Lang): string {
  const s = translations[section] as Record<string, Record<Lang, string>>;
  return s?.[key]?.[lang] ?? s?.[key]?.["en"] ?? key;
}
