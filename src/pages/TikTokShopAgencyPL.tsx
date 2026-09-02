import { Video, Users, Radio, TrendingUp } from "lucide-react";
import SeoLandingTemplate, { type SeoLandingContent } from "@/components/mva/SeoLandingTemplate";

const content: SeoLandingContent = {
  metaTitle: "Agencja TikTok Shop — video, live i influencerzy | JAY-23",
  metaDescription: "Agencja TikTok Shop dla marek sprzedających przez twórców, shoppable video i live. Dwa miesiące za darmo, potem prowizja od revenue. Bez retainera.",
  canonical: "/pl/tiktok-shop-agency",
  breadcrumbName: "Agencja TikTok Shop",
  serviceType: "Agencja TikTok Shop",
  eyebrow: "Agencja TikTok Shop · Commerce przez twórców",
  h1Lead: "Agencja TikTok Shop oparta na",
  h1Accent: "twórcach, video i live",
  heroSub: "Uruchamiamy i skalujemy TikTok Shopy przez shoppable video i live selling z influencerami. Pierwsze dwa miesiące pracujemy bez wynagrodzenia — potem rozliczamy się prowizyjnie od revenue, które wygenerujemy. Zero retainera, zero ryzyka jeśli nie sprzedaje.",
  bookSource: "tiktok-shop-agency-pl",
  problemEyebrow: "Pułapka TikTok Shopa",
  problemTitle: "Większość marek otwiera TikTok Shop i patrzy, jak nic się nie dzieje.",
  problemParas: [
    "TikTok Shop nie jest marketplace'em, gdzie klienci sami przychodzą po produkt — to silnik treści. Jeśli twórcy nie kręcą o twoim produkcie shoppable video i nie prowadzą live'ów każdego dnia, sklep pozostaje pusty. Wystawienie SKU to najprostsza część; wrzucenie go do 200 filmów twórców miesięcznie to cała gra.",
    "Większość marek próbuje to rozwiązać jednym postem influencera, paid Spark Ads albo in-house live'ami z 12 widzami. Nic się nie kumuluje. Affiliate Program leży nieużywany, prośby o sample się piętrzą, a po 60 dniach pada werdykt: 'TikTok Shop nie działa dla naszej kategorii' — a tak naprawdę nikt nie zbudował pipeline'u twórców.",
    "Sprzedaż przez twórców działa, gdy trzy warstwy pracują jednocześnie: stale odświeżana roster affiliate'ów kręcących video, cykl live'ów (twoich i ich) oraz shoppable ads wzmacniające treści, które już konwertują. To budujemy — i bierzemy pieniądze dopiero, gdy generujemy revenue.",
  ],
  reasonsEyebrow: "Dlaczego ten model",
  reasonsTitle: "Cztery powody, dla których marki wybierają nas zamiast standardowej agencji TikToka.",
  reasons: [
    { icon: Users, label: "Pipeline twórców", title: "Stale odświeżana roster sprzedających twórców", body: "Rekrutujemy, briefujemy, wysyłamy sample i zarządzamy 40–150 affiliate'ami miesięcznie przez TikTok Creator Marketplace i direct outreach. Każdy z nich to maszyna do shoppable video — nie pojedynczy post." },
    { icon: Video, label: "Shoppable video", title: "Video pod For You Page, nie pod brand reels", body: "Hooki, demo, before/after, problem-rozwiązanie. Coachujemy twórców na formaty, które konwertują na TikTok Shopie, i zabijamy te, które nie działają. Wygrywające angle skalujemy w Spark Ads w drugim tygodniu." },
    { icon: Radio, label: "Live selling", title: "Live shopping, który naprawdę sprzedaje, a nie tylko streamuje", body: "Prowadzimy twój cykl live'ów (2–5×/tydzień) i bookujemy topowych affiliate'ów na live'y gościnne. Skryptowane drabinki ofert, on-screen urgency, real-time dropy stocku. Live staje się przewidywalnym kanałem, nie eksperymentem." },
    { icon: TrendingUp, label: "Płatne od wyniku", title: "Dwa miesiące za darmo, potem prowizja od revenue", body: "Bierzemy na siebie koszt buildu: setup, rekrutacja twórców, content systems, pierwsze live'y. Od trzeciego miesiąca płacisz prowizję od revenue TikTok Shopa, które wygenerowaliśmy. Nie sprzedaje — nie płacisz." },
  ],
  phasesTitle: "Jak przekuwamy cichy TikTok Shop w kanał napędzany twórcami.",
  phases: [
    { n: "01", title: "Discover — audyt sklepu, ICP twórcy, oferta", body: "Audyt setupu, sygnały product-market fit, budżet na prowizje i sample, persona twórcy, bank hooków. Wybieramy 1–2 SKU z największym potencjałem virala i reverse-engineerujemy wygrywające video konkurencji." },
    { n: "02", title: "Build — pipeline affiliate'ów + silnik treści", body: "Otwieramy Affiliate Program z właściwymi prowizjami, rekrutujemy pierwszych 40 twórców, wysyłamy sample, briefujemy na hooki, ustawiamy podstawy live studio, instalujemy analitykę. Konto Spark Ads rozgrzane i gotowe." },
    { n: "03", title: "Sell — video na ilość, cykl live, skalowanie zwycięzców", body: "Codzienny output video twórców, tygodniowy cykl live'ów, tygodniowy przegląd zwycięzców. Top performujące video idą w Spark Ads na whitelistowanych kontach twórców. Optymalizujemy prowizję, hook i ofertę aż ROAS staje się przewidywalny." },
  ],
  deliverablesTitle: "Co konkretnie dostajesz.",
  deliverables: [
    "Audyt setupu TikTok Shopa i kategorii",
    "Konfiguracja Affiliate Program + strategia prowizji",
    "Rekrutacja twórców (40–150/mc, TCM + direct DM)",
    "Logistyka sampli i onboarding twórców",
    "Bank hooków + dokumenty briefingowe per produkt",
    "Cykl live selling (twój + bookowani twórcy gościnni)",
    "Spark Ads na top performujących video twórców",
    "Tygodniowy raport revenue, ROAS i pipeline'u twórców",
  ],
  comparisonEyebrow: "Nasz model vs typowa agencja TikToka",
  comparisonTitle: "Ten sam TikTok Shop, dwa modele rozliczeń, kompletnie inny P&L.",
  comparisonRightLabel: "Typowa agencja",
  comparison: [
    { row: "Pierwsze dwa miesiące", mva: "Za darmo — budujemy", cold: "3–10k zł/mc retainera" },
    { row: "Stała opłata", mva: "% od revenue TikTok Shopa", cold: "Flat retainer niezależnie od sprzedaży" },
    { row: "Twórców aktywowanych /mc", mva: "40–150", cold: "5–15" },
    { row: "Live selling w pakiecie", mva: true, cold: false },
    { row: "Spark Ads na video twórcy", mva: true, cold: "Czasem" },
    { row: "Ryzyko jeśli nie sprzedaje", mva: "Nasze", cold: "Twoje" },
    { row: "Cykl raportowania", mva: "Tygodniowo revenue + ROAS", cold: "Miesięcznie vanity metrics" },
  ],
  faqs: [
    { q: "Jak dokładnie działa model 'dwa miesiące za darmo'?", a: "Miesiące 1 i 2: nie płacisz fee agencyjnego. Pokrywasz sample dla twórców, budżet ads jeśli odpalamy Spark Ads i prowizje affiliate, które twórcy zarabiają na sprzedaży. Od miesiąca 3 naliczamy prowizję od netto revenue TikTok Shopa, które atrybujemy. Dokładny procent zależy od marży i kategorii — ustalamy go na piśmie przed startem." },
    { q: "Dla jakich kategorii to działa najlepiej?", a: "Beauty, skincare, suplementy, dom, gadżety kuchenne, akcesoria fashion, pet i wizualnie demonstrowalne produkty fizyczne poniżej 300 zł. Kategorie, które dobrze pokazują się w 15–30 sek i konwertują na impulsie. Ciężki B2B, custom services czy produkty wymagające długiej decyzji to zły fit." },
    { q: "Czy musimy mieć własnych twórców albo zasięgi, żeby zacząć?", a: "Nie. Twórców dowozimy przez TikTok Creator Marketplace, direct outreach i naszą sieć. Wiele naszych marek startuje z zerowym followingiem brandu — roster twórców robi robotę, a konto marki rośnie równolegle." },
    { q: "Na jakich rynkach operujecie?", a: "TikTok Shop UK, US i wybrane rynki EU (Polska po pełnym rolloucie). Pracujemy zdalnie z markami globalnie. Live'y planujemy w strefie czasowej rynku docelowego." },
    { q: "Ile stocku trzeba mieć przygotowane?", a: "Tyle, żeby pokryć 90 dni prognozowanego popytu plus bufor na sample (typowo 100–300 sztuk na seeding twórców). Jeden z najczęstszych failów to stock-out podczas viralowego skoku, więc prognozujemy konserwatywnie i stress-testujemy supply chain w pierwszym tygodniu." },
    { q: "Czy jest minimalny okres współpracy?", a: "6 miesięcy. Pierwsze dwa za darmo; od trzeciego naliczamy prowizję. Bierzemy ten czas, bo pipeline'y twórców i cykl live'ów kumulują się — wyjście w 4. miesiącu zostawia pieniądze na stole dla wszystkich." },
  ],
  ctaLead: "Gotowy na TikTok Shop, który",
  ctaAccent: "dowozi revenue co tydzień",
  ctaSub: "30 minut. Bezpłatnie. Wychodzisz z planem TikTok Shopa opartego na twórcach i jasną odpowiedzią, czy model 'dwa miesiące za darmo' pasuje do twoich marż.",
  hreflangOverrides: { en: "/en/tiktok-shop-agency", pl: "/pl/tiktok-shop-agency" },
};

const TikTokShopAgencyPL = () => <SeoLandingTemplate content={content} lang="pl" />;
export default TikTokShopAgencyPL;
