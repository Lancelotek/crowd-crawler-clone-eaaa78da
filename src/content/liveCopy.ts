/**
 * Copy for /pl/live and /en/live.
 * PL and EN are two independent texts for two markets — not translations of each other.
 * Only numbers explicitly approved by the client appear here.
 */

export type Verdict = "green" | "amber" | "red";

export interface LiveCopy {
  meta: { title: string; description: string; canonical: string };
  hero: {
    eyebrow: string;
    h1: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    micro: string;
  };
  stats: { value: string; label: string }[];
  statsSource: string;
  problem: { heading: string; paragraphs: string[] };
  how: { heading: string; steps: { title: string; body: string }[] };
  calc: {
    heading: string;
    lead: string;
    fields: { gmv: string; margin: string; creator: string; discount: string; logistics: string; affiliate: string };
    promoLabel: string;
    advanced: string;
    rows: { grossMargin: string; platform: string; creators: string; discount: string; logistics: string; jay23: string; result: string };
    verdicts: Record<Verdict, string>;
    cta: string;
    disclaimer: string;
    currency: string;
    locale: string;
  };
  pricing: {
    heading: string;
    quote: string;
    cards: { title: string; body: string }[];
    onboardingTitle: string;
    onboarding: string;
  };
  channels: { heading: string; items: { name: string; badge: string; body: string }[] };
  fit: {
    heading: string;
    yesTitle: string;
    yes: string[];
    noTitle: string;
    no: string[];
    closing: string;
  };
  training: {
    heading: string;
    product: string;
    price: string;
    lead: string;
    agendaHead: { time: string; block: string; outcome: string };
    agenda: { time: string; block: string; outcome: string }[];
    deliverablesTitle: string;
    deliverables: string[];
    details: string;
    cta: string;
    micro: string;
  };
  faq: { heading: string; items: { q: string; a: string }[] };
  contact: { heading: string; lead: string };
  form: {
    name: string;
    brand: string;
    email: string;
    shop: string;
    category: string;
    categories: string[];
    revenue: string;
    revenues: string[];
    selling: string;
    sellingOptions: string[];
    message: string;
    consent: string;
    privacyHref: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
    invalidEmail: string;
    choose: string;
  };
  trainingForm: {
    title: string;
    fullName: string;
    company: string;
    email: string;
    phone: string;
    participants: string;
    participantOptions: string[];
    format: string;
    formatOptions: string[];
    timing: string;
    timingOptions: string[];
    consent: string;
    submit: string;
    success: string;
    close: string;
  };
  nav: { live: string };
}

export const livePl: LiveCopy = {
  meta: {
    title: "Sprzedaż na żywo dla marek e-commerce — TikTok Shop, Meta, YouTube | Jay23",
    description:
      "Prowadzimy transmisje sprzedażowe na TikTok Shop, Instagramie i YouTube. Płacisz 9% od sprzedaży, bez abonamentu. Szkolenie dla firm od 2 900 PLN.",
    canonical: "/pl/live",
  },
  hero: {
    eyebrow: "Jay23 LIVE",
    h1: "Sprzedaż na żywo dla Twojej marki. Płacisz od wyniku.",
    lead:
      "TikTok Shop ruszył w Polsce 15 czerwca 2026. Prowadzimy transmisje sprzedażowe, rekrutujemy twórców i pilnujemy liczb. Bierzemy 9% od tego, co sprzedamy. Bez abonamentu.",
    ctaPrimary: "Umów bezpłatny audyt kanału",
    ctaSecondary: "Policz swoją marżę",
    micro: "30 minut. Bez prezentacji. Sprawdzamy Twoje liczby i mówimy, czy to ma sens.",
  },
  stats: [
    { value: "11,2 mln", label: "aktywnych użytkowników TikToka w Polsce" },
    { value: "17%", label: "udział LIVE w GMV TikTok Shop na dojrzałych rynkach UE" },
    { value: "<2%", label: "udział social commerce w polskim e-commerce — rynek dopiero się buduje" },
    { value: "9%", label: "tyle bierze TikTok. Tyle bierzemy my. Tylko od sprzedaży" },
  ],
  statsSource: "Dane: TikTok Shop, Lengow Q2 2026, raporty rynku PL 2026.",
  problem: {
    heading: "Kanał, którego nikt nie obsadza",
    paragraphs: [
      "Marki wchodzą na TikTok Shop, wrzucają katalog i czekają. Product card sprzedaje trochę, shoppable video sprzedaje więcej, a LIVE — najbardziej dochodowa część tego stacka — stoi puste. Nie dlatego, że nie działa. Dlatego, że wymaga człowieka przed kamerą dwa razy w tygodniu przez półtorej godziny, scenariusza, hosta i kogoś, kto ogarnie komentarze na żywo.",
      "To jest niewygodne. I dokładnie dlatego jest tam jeszcze miejsce.",
      "Algorytm TikToka nagradza konta transmitujące regularnie — minimum dwa razy w tygodniu. Jedna transmisja na miesiąc to nie jest kanał, to jest wydarzenie. My robimy z tego kanał.",
    ],
  },
  how: {
    heading: "Jak to działa",
    steps: [
      {
        title: "Audyt liczb",
        body:
          "Liczymy marżę kanałową na Twoich SKU. Wychodzi lista produktów, które w ogóle wolno sprzedawać na LIVE. Zwykle 2–4 z całego katalogu.",
      },
      {
        title: "Setup",
        body:
          "Seller Center, integracja z BaseLinker / Shopify / API, katalog, plan afiliacyjny, InPost i BLIK. Certyfikaty produktowe (CPNP, CE) przed startem, nie po.",
      },
      {
        title: "Twórcy",
        body:
          "Rekrutujemy mikro-twórców w Twojej kategorii. Nano i micro dowożą najwyższy ROAS — nie płacisz za zasięg, którego nikt nie konwertuje.",
      },
      {
        title: "Transmisje",
        body:
          "Scenariusz, host, moderacja komentarzy, oferty ograniczone czasowo. Dwa razy w tygodniu, bo poniżej tego algorytm przestaje dowozić.",
      },
      {
        title: "Rozliczenie",
        body:
          "Raport z Seller Center co miesiąc. Widzisz to samo, co my. Faktura od GMV netto, po zwrotach.",
      },
    ],
  },
  calc: {
    heading: "Policz, czy Ci się to opłaca",
    lead:
      "Nie każdy produkt nadaje się na LIVE. Wpisz swoje liczby — kalkulator pokaże, co zostaje po wszystkich prowizjach.",
    fields: {
      gmv: "Miesięczne GMV (PLN)",
      margin: "Marża brutto (%)",
      creator: "Średnia prowizja twórcy (%)",
      discount: "Rabat na LIVE (%)",
      logistics: "Logistyka + zwroty (%)",
      affiliate: "Udział sprzedaży afiliacyjnej w GMV (%)",
    },
    promoLabel: "Pierwsze 90 dni na TikTok Shop (prowizja platformy 2% zamiast 9%)",
    advanced: "Zaawansowane",
    rows: {
      grossMargin: "Marża brutto",
      platform: "Prowizja TikTok Shop",
      creators: "Prowizja twórców",
      discount: "Rabaty na LIVE",
      logistics: "Logistyka i zwroty",
      jay23: "Jay23 (9%)",
      result: "Zostaje Tobie",
    },
    verdicts: {
      green: "Model działa. Przy tych liczbach LIVE zarabia od pierwszego miesiąca.",
      amber:
        "Na granicy. Da się to poprawić — wyższym AOV, niższym rabatem albo lepszym doborem SKU. Pogadajmy.",
      red:
        "Przy tych liczbach nie wchodzimy. Marża jest za niska, żeby kanał się spiął. Powiemy to na pierwszej rozmowie, nie po trzech miesiącach.",
    },
    cta: "Sprawdź to na moich prawdziwych liczbach",
    disclaimer:
      "Kalkulator szacunkowy. Nie uwzględnia budżetu reklamowego, sampli dla twórców ani kosztów produkcji. Rabat liczony od GMV brutto — w rzeczywistym rozliczeniu obniża GMV. Prowizja Jay23 naliczana od GMV netto po zwrotach.",
    currency: "PLN",
    locale: "pl-PL",
  },
  pricing: {
    heading: "Jedna stawka. Bez abonamentu.",
    quote: "TikTok bierze 9% za dostęp do ludzi. My bierzemy 9% za to, żeby ci ludzie kupili.",
    cards: [
      {
        title: "Od czego liczymy",
        body:
          "Od GMV netto z kanałów wymienionych w umowie — LIVE, shoppable video i product card na koncie, które prowadzimy. Po zwrotach, anulacjach i rabatach platformy. Bez VAT.",
      },
      {
        title: "Czego nie liczymy",
        body:
          "Sprzedaży z kampanii, których nie prowadzimy. Retailu offline. B2B i hurtu. Marketplace'ów spoza umowy. Zamówień zwróconych.",
      },
      {
        title: "Jak rozliczamy",
        body:
          "Faktura do 10. dnia miesiąca, na podstawie raportu z Seller Center — masz do niego dostęp w roli Analyst. Zwroty korygujemy w kolejnym cyklu, więc nie płacisz za sprzedaż, która wróciła.",
      },
    ],
    onboardingTitle: "Start współpracy",
    onboarding:
      "Onboarding to jednorazowe 4 900 PLN płatne przy podpisaniu umowy — pokrywa setup konta, integrację, certyfikaty produktowe, rekrutację pierwszej grupy twórców i pierwsze cztery transmisje. Potem tylko 9% i nic poza tym. Umowa na minimum 3 miesiące, bo poniżej ok. 24 transmisji nie da się uczciwie ocenić kanału. Jeśli byłeś na naszym szkoleniu, 2 900 PLN zaliczamy na poczet onboardingu.",
  },
  channels: {
    heading: "Trzy kanały, trzy różne mechanizmy",
    items: [
      {
        name: "TikTok Shop",
        badge: "pełny lejek",
        body:
          "Jedyny kanał w Polsce z koszykiem wewnątrz transmisji. Widz kupuje bez wychodzenia z LIVE. Prowizja platformy 9% (2% przez pierwsze 90 dni), afiliacja twórców 5–30%, dostawa InPost, płatność BLIK. Tu prowadzimy pełną sprzedaż.",
      },
      {
        name: "Instagram i Facebook",
        badge: "komentarz → DM",
        body:
          "Meta usunęła tagowanie produktów w transmisji w 2023 i wygasiła natywny checkout. W transmisji nie ma koszyka — i nikt Ci tego nie sprzeda inaczej. Działa co innego: widz pisze słowo w komentarzu, automat wysyła mu DM z linkiem, zakup domyka się w Twoim sklepie. Budujemy ten tor i mierzymy go linkami.",
      },
      {
        name: "YouTube",
        badge: "zasięg + link",
        body:
          "Program YouTube Shopping affiliate nie obejmuje Polski ani UE — działa w 10 krajach, żaden z nich nie jest europejski. Zostaje YouTube Live z przypiętym linkiem i UTM-ami do Twojego sklepu. Traktujemy to jako kanał zasięgowy i retargetingowy, nie sprzedażowy.",
      },
    ],
  },
  fit: {
    heading: "Dla kogo — i dla kogo nie",
    yesTitle: "Wchodzimy, jeśli:",
    yes: [
      "marża brutto co najmniej 55%, komfortowo 65%+",
      "średnia wartość koszyka od 80 PLN, docelowo 100–150 PLN",
      "kategoria: beauty, suplementy, akcesoria, moda, home decor",
      "co najmniej 10 SKU i jeden jasny hero product",
      "wysyłka w maksymalnie 4 dni robocze",
      "certyfikaty produktowe gotowe (CPNP dla kosmetyków, CE dla elektroniki)",
    ],
    noTitle: "Odpuszczamy, jeśli:",
    no: [
      "marża brutto poniżej 50% — prowizje zjedzą całość",
      "elektronika i sprzęt niskomarżowy",
      "koszyk poniżej 60 PLN",
      "brak kogokolwiek gotowego stanąć przed kamerą i brak zgody na hosta z zewnątrz",
      "oczekiwanie wyników w 30 dni",
    ],
    closing:
      "Mówimy „nie” częściej niż „tak”. Trzy miesiące pracy na kanale, który się nie spina, to strata czasu obu stron.",
  },
  training: {
    heading: "Wolisz robić to sam? Nauczymy Twój zespół w jeden dzień.",
    product: "LIVE Sprint",
    price: "2 900 PLN netto — za całą firmę, do 8 osób",
    lead:
      "To nie jest wykład o TikToku. To jeden dzień pracy na Waszym koncie, Waszych produktach i Waszych liczbach. Wychodzicie z pierwszą transmisją za sobą.",
    agendaHead: { time: "Czas", block: "Blok", outcome: "Efekt" },
    agenda: [
      { time: "60 min", block: "Liczby, zanim cokolwiek nagramy", outcome: "Arkusz marży + wybrany hero product" },
      { time: "60 min", block: "Konto i integracja", outcome: "Skonfigurowane konto + plan afiliacyjny" },
      { time: "90 min", block: "Scenariusz transmisji", outcome: "Gotowy scenariusz na pierwszy LIVE" },
      { time: "90 min", block: "Nagrywamy na żywo", outcome: "Pierwsza transmisja za Wami" },
      { time: "60 min", block: "Twórcy i kalendarz", outcome: "Lista 20 twórców + kalendarz na miesiąc" },
      { time: "30 min", block: "Co dalej", outcome: "Które liczby oglądać i kiedy" },
    ],
    deliverablesTitle: "Co zostaje firmie",
    deliverables: [
      "kalkulator marży wypełniony Waszymi danymi",
      "szablon i gotowy scenariusz transmisji",
      "checklista techniczna",
      "szablon wiadomości do twórcy + tabela stawek",
      "kalendarz transmisji na 4 tygodnie",
      "nagranie próbnej transmisji",
      "30 dni wsparcia mailowego",
    ],
    details: "6 godzin · u Was lub online · do 8 osób · pracujemy na Waszym koncie",
    cta: "Zapytaj o termin szkolenia",
    micro:
      "Jeśli w ciągu 60 dni po szkoleniu wejdziecie w model 9%, te 2 900 PLN zaliczamy na poczet onboardingu.",
  },
  faq: {
    heading: "Najczęstsze pytania",
    items: [
      {
        q: "Ile trwa zanim zobaczymy pierwsze wyniki?",
        a: "Setup zajmuje około 45 dni: konto, integracja, certyfikaty, rekrutacja twórców, pierwsze transmisje. Pierwsze sensowne liczby po 8–10 transmisjach, czyli po mniej więcej 5 tygodniach nadawania. Dlatego umowa jest na minimum 3 miesiące.",
      },
      {
        q: "Czy musimy sami stawać przed kamerą?",
        a: "Nie musicie, ale to zwykle działa lepiej. Ludzie kupują od ludzi z marki. Jeśli nie ma nikogo chętnego — dajemy hosta, to osobna pozycja w wycenie.",
      },
      {
        q: "Co jeśli mamy już agencję od TikToka?",
        a: "Świetnie. My robimy LIVE, oni robią to, co robią. Umowa obejmuje tylko kanały wymienione w załączniku, więc nie ma kolizji ani sporu o atrybucję.",
      },
      {
        q: "Skąd wiadomo, ile faktycznie sprzedaliście?",
        a: "Z raportu Seller Center, do którego macie dostęp w roli Analyst. Widzicie dokładnie ten sam plik, na podstawie którego wystawiamy fakturę.",
      },
      {
        q: "A jeśli klienci zwrócą towar?",
        a: "Nie płacicie od zwróconych zamówień. Zwroty korygujemy w kolejnym cyklu rozliczeniowym.",
      },
      {
        q: "Czy 9% to dużo?",
        a: "Agencje TikTok Shop w USA i UK biorą 10–20% GMV albo abonament 12–40 tys. PLN miesięcznie. Bierzemy mniej i tylko od sprzedaży.",
      },
      {
        q: "Sprzedajemy elektronikę, wejdziecie w to?",
        a: "Prawdopodobnie nie. Prowizja TikToka dla elektroniki to 7%, ale marże w tej kategorii są zbyt niskie, żeby kanał się spiął po doliczeniu twórców i rabatów. Wpiszcie swoje liczby w kalkulator — pokaże to od razu.",
      },
      {
        q: "Możemy zacząć od szkolenia?",
        a: "Tak, i często to najlepsza kolejność. Po dniu wspólnej pracy obie strony wiedzą, czy chcą iść dalej. A 2 900 PLN zalicza się na poczet onboardingu.",
      },
    ],
  },
  contact: {
    heading: "Sprawdźmy Twoje liczby",
    lead:
      "30 minut rozmowy. Bez prezentacji. Patrzymy na Twoją marżę, katalog i logistykę i mówimy wprost, czy ten kanał ma u Ciebie sens.",
  },
  form: {
    name: "Imię",
    brand: "Marka / firma",
    email: "E-mail",
    shop: "Adres sklepu",
    category: "Kategoria",
    categories: ["Beauty i pielęgnacja", "Suplementy", "Moda", "Akcesoria", "Home decor", "Inna"],
    revenue: "Miesięczny obrót online",
    revenues: ["do 50 tys. PLN", "50–150 tys.", "150–500 tys.", "powyżej 500 tys."],
    selling: "Czy sprzedajecie już na TikTok Shop?",
    sellingOptions: ["Tak, aktywnie", "Konto założone, nie sprzedajemy", "Jeszcze nie"],
    message: "Wiadomość",
    consent:
      "Wyrażam zgodę na kontakt w sprawie mojego zapytania. Dane przetwarzamy zgodnie z polityką prywatności.",
    privacyHref: "/pl/privacy-policy",
    submit: "Umów audyt",
    sending: "Wysyłamy…",
    success: "Dzięki. Odpisujemy w ciągu jednego dnia roboczego — z konkretnym terminem, nie z ofertą.",
    error: "Nie udało się wysłać. Spróbuj ponownie albo napisz na hello@jay23.com.",
    required: "To pole jest wymagane",
    invalidEmail: "Podaj poprawny adres e-mail",
    choose: "Wybierz",
  },
  trainingForm: {
    title: "LIVE Sprint — zapytanie o termin",
    fullName: "Imię i nazwisko",
    company: "Firma",
    email: "E-mail służbowy",
    phone: "Telefon",
    participants: "Liczba uczestników",
    participantOptions: ["1–3", "4–6", "7–8", "więcej niż 8"],
    format: "Forma",
    formatOptions: ["U nas w firmie", "Online"],
    timing: "Preferowany termin",
    timingOptions: ["W tym miesiącu", "W przyszłym miesiącu", "Jeszcze nie wiem"],
    consent:
      "Wyrażam zgodę na kontakt w sprawie mojego zapytania. Dane przetwarzamy zgodnie z polityką prywatności.",
    submit: "Wyślij zapytanie",
    success: "Mamy to. Odezwiemy się z wolnymi terminami w ciągu jednego dnia roboczego.",
    close: "Zamknij",
  },
  nav: { live: "LIVE" },
};

export const liveEn: LiveCopy = {
  meta: {
    title: "Live Selling for E-commerce Brands — TikTok Shop, Meta, YouTube | Jay23",
    description:
      "We run live shopping streams on TikTok Shop, Instagram and YouTube. You pay 9% of sales, no retainer. One-day team training available.",
    canonical: "/en/live",
  },
  hero: {
    eyebrow: "Jay23 LIVE",
    h1: "Your brand, sold live. You pay on results.",
    lead:
      "TikTok Shop launched in Poland on 15 June 2026 and across four more EU markets this year. We run the streams, recruit the creators and watch the numbers. We take 9% of what we sell. No retainer.",
    ctaPrimary: "Book a channel audit",
    ctaSecondary: "Run the numbers",
    micro: "30 minutes. No deck. We look at your numbers and tell you whether this channel adds up.",
  },
  stats: [
    { value: "€500M", label: "TikTok Shop GMV across DE, FR, ES, IT in Q2 2026" },
    { value: "17%", label: "share of that GMV from LIVE" },
    { value: "11.2M", label: "TikTok users in Poland, the newest EU marketplace" },
    { value: "9%", label: "what TikTok takes. What we take. Results only" },
  ],
  statsSource: "Sources: TikTok Shop, Lengow Q2 2026, PL market reports 2026.",
  problem: {
    heading: "The shift nobody is covering",
    paragraphs: [
      "Brands list their catalogue on TikTok Shop and wait. Product cards move some units, shoppable video moves more, and LIVE — the part with the highest intent — sits empty. Not because it doesn't work. Because it needs a person on camera twice a week for ninety minutes, a script, a host and someone reading comments in real time.",
      "That's inconvenient. Which is exactly why there's still room.",
      "The algorithm rewards accounts that stream on a schedule — twice a week is the floor. One stream a month is an event, not a channel. We run it as a channel.",
    ],
  },
  how: {
    heading: "How it works",
    steps: [
      {
        title: "Audit the numbers",
        body:
          "We model channel margin on your SKUs. The output is the list of products you are actually allowed to sell live. Usually 2–4 out of the whole catalogue.",
      },
      {
        title: "Setup",
        body:
          "Seller Center, catalogue integration with your stack, affiliate plan, local shipping and payment methods. Product certifications (CPNP, CE) before launch, not after.",
      },
      {
        title: "Creators",
        body:
          "We recruit micro-creators inside your category. Nano and micro deliver the best ROAS — you don't pay for reach that never converts.",
      },
      {
        title: "Streams",
        body:
          "Script, host, comment moderation, time-boxed offers. Twice a week, because below that the algorithm stops distributing.",
      },
      {
        title: "Settlement",
        body:
          "A Seller Center report every month. You see exactly what we see. We invoice on net GMV, after returns.",
      },
    ],
  },
  calc: {
    heading: "Run your own numbers",
    lead:
      "Not every product belongs on a live stream. Enter your numbers — the calculator shows what is left after every fee.",
    fields: {
      gmv: "Monthly GMV (PLN)",
      margin: "Gross margin (%)",
      creator: "Average creator commission (%)",
      discount: "LIVE discount (%)",
      logistics: "Logistics + returns (%)",
      affiliate: "Affiliate share of GMV (%)",
    },
    promoLabel: "First 90 days on TikTok Shop (platform fee 2% instead of 9%)",
    advanced: "Advanced",
    rows: {
      grossMargin: "Gross margin",
      platform: "TikTok Shop fee",
      creators: "Creator commission",
      discount: "LIVE discounts",
      logistics: "Logistics and returns",
      jay23: "Jay23 (9%)",
      result: "What you keep",
    },
    verdicts: {
      green: "The model works. At these numbers LIVE pays from month one.",
      amber:
        "Borderline. It can be fixed — higher AOV, a smaller discount or a better SKU selection. Let's talk.",
      red:
        "At these numbers we don't take the account. The margin is too thin for the channel to add up. We'll say that on the first call, not after three months.",
    },
    cta: "Check this against my real numbers",
    disclaimer:
      "Estimate only. It excludes ad budget, creator samples and production costs. The discount is applied to gross GMV — in real settlement it reduces GMV. The Jay23 fee is charged on net GMV after returns.",
    currency: "PLN",
    locale: "pl-PL",
  },
  pricing: {
    heading: "One rate. No retainer.",
    quote: "TikTok takes 9% for access to the audience. We take 9% for turning that audience into orders.",
    cards: [
      {
        title: "What we charge on",
        body:
          "Net GMV from the channels named in the contract — LIVE, shoppable video and product cards on the account we run. After returns, cancellations and platform discounts. Excluding VAT.",
      },
      {
        title: "What we don't charge on",
        body:
          "Campaigns we don't run. Offline retail. B2B and wholesale. Marketplaces outside the contract. Returned orders.",
      },
      {
        title: "How we settle",
        body:
          "Invoice by the 10th of the month, based on the Seller Center report — you hold Analyst access to it. Returns are corrected in the next cycle, so you never pay for sales that came back.",
      },
    ],
    onboardingTitle: "Getting started",
    onboarding:
      "Onboarding is a one-off €1,150 / 4,900 PLN — it covers the Seller Center setup, catalogue integration, product certifications, the first creator cohort and your first four streams. After that it's 9% and nothing else. Minimum term is three months, because under roughly 24 streams there is no honest way to judge a channel. If your team took our LIVE Sprint, the 2,900 PLN comes off this.",
  },
  channels: {
    heading: "Three channels, three different mechanics",
    items: [
      {
        name: "TikTok Shop",
        badge: "full funnel",
        body:
          "The only channel in the EU with checkout inside the stream. Platform fee 9% (2% for the first 90 days), creator affiliate 5–30%. This is where we run full sales.",
      },
      {
        name: "Instagram & Facebook",
        badge: "comment to DM",
        body:
          "Meta removed live product tagging in 2023 and retired native checkout. There is no cart inside the stream, and nobody should tell you otherwise. What works: viewer comments a keyword, an automation DMs the link, the sale closes on your site. We build and track that path.",
      },
      {
        name: "YouTube",
        badge: "reach and links",
        body:
          "YouTube Shopping affiliate runs in ten countries, none of them European. In the EU it's YouTube Live plus a pinned link and UTMs to your store. Reach and retargeting, not checkout.",
      },
    ],
  },
  fit: {
    heading: "Who this is for — and who it isn't",
    yesTitle: "We take it on if:",
    yes: [
      "gross margin of at least 55%, comfortably 65%+",
      "average order value from 80 PLN, ideally 100–150 PLN",
      "category: beauty, supplements, accessories, fashion, home decor",
      "at least 10 SKUs and one clear hero product",
      "dispatch within four working days",
      "product certifications ready (CPNP for cosmetics, CE for electronics)",
    ],
    noTitle: "We pass if:",
    no: [
      "gross margin below 50% — the fees eat all of it",
      "electronics and other low-margin hardware",
      "basket below 60 PLN",
      "nobody on the team will go on camera and an external host is off the table",
      "results are expected in 30 days",
    ],
    closing: "We say no more often than yes. Three months on a channel that doesn't add up wastes everyone's time.",
  },
  training: {
    heading: "Rather run it yourself? We'll train your team in one day.",
    product: "LIVE Sprint",
    price: "€690 / 2,900 PLN per company — up to 8 people",
    lead:
      "This is not a talk about TikTok. It's one day of work on your account, your products and your numbers. You finish with your first stream behind you.",
    agendaHead: { time: "Time", block: "Block", outcome: "Outcome" },
    agenda: [
      { time: "60 min", block: "The numbers, before we film anything", outcome: "Margin sheet + chosen hero product" },
      { time: "60 min", block: "Account and integration", outcome: "Configured account + affiliate plan" },
      { time: "90 min", block: "Stream script", outcome: "A finished script for your first LIVE" },
      { time: "90 min", block: "We go live", outcome: "First stream done" },
      { time: "60 min", block: "Creators and calendar", outcome: "A list of 20 creators + one month of scheduling" },
      { time: "30 min", block: "What next", outcome: "Which numbers to watch and when" },
    ],
    deliverablesTitle: "What the company keeps",
    deliverables: [
      "margin calculator filled with your data",
      "stream template and a finished script",
      "technical checklist",
      "creator outreach template + rate table",
      "four-week stream calendar",
      "recording of the practice stream",
      "30 days of email support",
    ],
    details: "6 hours · on site or online · up to 8 people · we work on your account",
    cta: "Ask about available dates",
    micro:
      "If you move to the 9% model within 60 days of the training, the 2,900 PLN comes off onboarding.",
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        q: "How long before we see the first results?",
        a: "Setup takes around 45 days: account, integration, certifications, creator recruitment, first streams. The first meaningful numbers arrive after 8–10 streams, roughly five weeks of broadcasting. That's why the minimum term is three months.",
      },
      {
        q: "Do we have to be on camera ourselves?",
        a: "You don't have to, but it usually performs better. People buy from people inside the brand. If nobody is willing, we provide a host — that's a separate line in the quote.",
      },
      {
        q: "What if we already work with a TikTok agency?",
        a: "Good. We run LIVE, they keep doing what they do. The contract covers only the channels listed in the annex, so there is no overlap and no attribution dispute.",
      },
      {
        q: "How do we know what you actually sold?",
        a: "From the Seller Center report, which you access as an Analyst. You see the exact file we invoice from.",
      },
      {
        q: "What happens with returns?",
        a: "You don't pay on returned orders. Returns are corrected in the next billing cycle.",
      },
      {
        q: "Is 9% expensive?",
        a: "TikTok Shop agencies in the US and UK charge 10–20% of GMV or a monthly retainer of 12,000–40,000 PLN. We charge less, and only on sales.",
      },
      {
        q: "We sell electronics — would you take it?",
        a: "Probably not. TikTok's electronics fee is 7%, but margins in that category are too thin for the channel to work once creators and discounts are added. Put your numbers into the calculator and it shows immediately.",
      },
      {
        q: "Can we start with the training?",
        a: "Yes, and it's often the better order. After a day of working together both sides know whether to continue. And the 2,900 PLN comes off onboarding.",
      },
    ],
  },
  contact: {
    heading: "Let's look at your numbers",
    lead:
      "A 30-minute call. No deck. We look at your margin, catalogue and logistics and tell you straight whether this channel makes sense for you.",
  },
  form: {
    name: "First name",
    brand: "Brand / company",
    email: "Email",
    shop: "Store URL",
    category: "Category",
    categories: ["Beauty & skincare", "Supplements", "Fashion", "Accessories", "Home decor", "Other"],
    revenue: "Monthly online revenue",
    revenues: ["up to 50k PLN", "50–150k", "150–500k", "above 500k"],
    selling: "Are you already selling on TikTok Shop?",
    sellingOptions: ["Yes, actively", "Account created, not selling", "Not yet"],
    message: "Message",
    consent:
      "I agree to be contacted about my enquiry. Data is processed in line with the privacy policy.",
    privacyHref: "/en/privacy-policy",
    submit: "Book the audit",
    sending: "Sending…",
    success: "Thanks. You'll hear back within one working day — with a concrete slot, not a pitch.",
    error: "Sending failed. Please try again or email hello@jay23.com.",
    required: "This field is required",
    invalidEmail: "Enter a valid email address",
    choose: "Select",
  },
  trainingForm: {
    title: "LIVE Sprint — date enquiry",
    fullName: "Full name",
    company: "Company",
    email: "Work email",
    phone: "Phone",
    participants: "Number of participants",
    participantOptions: ["1–3", "4–6", "7–8", "more than 8"],
    format: "Format",
    formatOptions: ["On site", "Online"],
    timing: "Preferred timing",
    timingOptions: ["This month", "Next month", "Not sure yet"],
    consent:
      "I agree to be contacted about my enquiry. Data is processed in line with the privacy policy.",
    submit: "Send enquiry",
    success: "Got it. We'll come back with available dates within one working day.",
    close: "Close",
  },
  nav: { live: "LIVE" },
};
