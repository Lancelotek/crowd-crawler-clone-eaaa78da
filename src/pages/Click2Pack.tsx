import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Check,
  Package,
  Users,
  Radio,
  Clapperboard,
  Store,
  Truck,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ──────────────────────────────────────────────────────────────────────────
   click2pack — creator commerce ecosystem (platforma, nie agencja live).
   /pl/click2pack · /en/click2pack
   Nie ruszać /pl/live i /en/live — to osobny produkt (usługa 9% GMV).
   ────────────────────────────────────────────────────────────────────────── */

const MAKE_WEBHOOK = import.meta.env.VITE_MAKE_C2P_WEBHOOK_URL as string | undefined;

function c2pEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (typeof (window as { gtag?: unknown }).gtag === "function") {
    (window as unknown as { gtag: (a: string, b: string, c: unknown) => void }).gtag("event", name, params);
  }
}

const COPY = {
  pl: {
    seoTitle: "click2pack — commerce dla twórców | katalog i sklepy",
    seoDesc:
      "Katalog produktów wielu dostawców, sieć twórców i system, który obsługuje zamówienia z transmisji, filmów i sklepów twórców. Beauty na start.",
    ogTitle: "click2pack — commerce dla twórców",
    ogDesc: "Jeden katalog. Sieć twórców. Każdy sprzedaje po swojemu.",
    nav: {
      how: "Jak to działa",
      network: "Sieć",
      brands: "Dla marek",
      creators: "Dla twórców",
    },
    hero: {
      eyebrow: "CLICK2PACK · COMMERCE DLA TWÓRCÓW",
      h1: "Jeden katalog. Sieć twórców. Każdy sprzedaje po swojemu.",
      lead: "Łączymy producentów, importerów i hurtownie z twórcami, którzy zamieniają swoją społeczność w kanał sprzedaży. Produkty trafiają do ich transmisji, filmów i własnych sklepów. Click2pack spina katalog, zamówienia, logistykę, tracking i rozliczenia w jednym systemie.",
      differentiator:
        "Nie robimy reklamowych transmisji. Robimy treści, które ludzie chcą oglądać — a dobrze dobrane produkty są ich naturalną częścią.",
      ctaBrand: "Mam produkty",
      ctaCreator: "Jestem twórcą",
    },
    ecosystem: {
      eyebrow: "Jak to działa",
      h2: "Schemat ekosystemu",
      suppliers: "PRODUCENCI · IMPORTERZY · HURTOWNIE",
      hub: "CLICK2PACK",
      hubSub: "katalog · zamówienia · logistyka · tracking · rozliczenia",
      network: "SIEĆ TWÓRCÓW",
      channels: ["TikTok LIVE", "TikTok filmy", "sklep twórcy", "IG · FB · YT"],
      customer: "KLIENT",
      blocks: [
        {
          h3: "Katalog jest wspólny.",
          p: "Dostawcy wrzucają produkty, stany i ceny przez API, XML albo CSV. Jeden magazyn danych dla całej sieci — twórca nie negocjuje z każdą marką osobno.",
        },
        {
          h3: "Twórca wybiera, co chce sprzedawać.",
          p: "Nie przydzielamy produktów do twórców odgórnie. Twórca przegląda katalog i bierze to, co pasuje do niego i do jego widowni. Jeśli nie wierzy w produkt, nie sprzeda go i tak.",
        },
        {
          h3: "System zamyka pętlę.",
          p: "Zamówienie z dowolnego kanału trafia do click2pack, stamtąd do właściwego miejsca realizacji, a prowizja twórcy nalicza się automatycznie.",
        },
      ],
    },
    contentFirst: {
      eyebrow: "Format",
      h2: "Najpierw powód, żeby oglądać. Potem możliwość kupienia.",
      p1: "Nie budujemy transmisji wokół produktu. Budujemy formaty wokół ludzi, tematów i rozmów. Prowadzący dyskutuje, żartuje, odpowiada na pytania albo po prostu pokazuje kawałek swojego dnia. Produkt pojawia się tam, gdzie pasuje — jako coś, czego twórca używa, co lubi albo o co ktoś właśnie zapytał w komentarzu.",
      p2: "Dzięki TikTok Shop widz nie musi wychodzić z transmisji. Jeśli produkt go zainteresuje, kupuje od razu.",
      exampleTitle: "Przykład",
      example:
        "Dwoje prowadzących robi transmisję pod tytułem „Czy można przyjaźnić się z byłym?”. Rozmawiają, przekrzykują się, czytają komentarze. W pewnym momencie jedna osoba mówi: „A, właśnie — kilka osób pytało, co to jest. Mam podpięte pod live. Używam od tygodnia i naprawdę mi się podoba.” I wracają do rozmowy.",
      exampleNote:
        "Produkt jest dostępny przez cały czas trwania transmisji. Nikt nie musi go oglądać, żeby zostać.",
      closing: "Produkt nie jest tematem transmisji. Produkt jest częścią świata twórcy.",
      honesty:
        "Ten model buduje sprzedaż wolniej niż transmisja zbudowana jak telezakup. Wybieramy go, bo twórca, który raz w tygodniu robi reklamę, odpada po miesiącu — a twórca, który robi swój program, zostaje. Regularność jest tu ważniejsza niż wynik pojedynczej transmisji.",
    },
    network: {
      eyebrow: "Skala",
      h2: "Nie jeden prowadzący. Sieć prowadzących.",
      lead: "Klasyczna agencja ma kilku hostów i sprzedaje marce osiem transmisji miesięcznie. To jest kalendarz eventów, nie kanał sprzedaży.",
      compareLeft: "Agencja transmisji",
      compareRight: "Click2pack",
      rows: [
        ["kilku hostów na etacie", "sieć niezależnych twórców"],
        ["marka kupuje pakiet transmisji", "twórca sam decyduje, ile nadaje"],
        ["osiem transmisji miesięcznie", "minimum 2 transmisje tygodniowo na twórcę"],
        ["skala rośnie przez zatrudnianie", "skala rośnie przez dołączanie twórców"],
      ],
      keyParagraph:
        "Podstawą aktywności twórcy w sieci jest minimum dwie transmisje tygodniowo — to próg, poniżej którego algorytm TikToka przestaje dowozić zasięg. „Minimum” jest tu dosłowne: część twórców robi trzy, pięć, siedem, część nadaje codziennie. Nie sprzedajemy marce pakietu transmisji. Budujemy sieć, w której każdy twórca ma własny rytm powyżej tego progu.",
      scaleRow: "TWÓRCA",
      scaleValue: "min. 2 LIVE / tydzień",
    },
    engines: {
      eyebrow: "Dwa silniki",
      h2: "Transmisje sprzedają dziś. Filmy sprzedają miesiącami.",
      p1: "Transmisja żyje godzinę i kończy się razem z ostatnim komentarzem. Film zostaje. Nagranie wrzucone dziś może sprzedać jutro, za tydzień i za trzy miesiące — bo TikTok podaje je dalej, a produkt jest do niego podpięty przez cały ten czas.",
      p2: "Twórcy w sieci robią jedno i drugie. Z każdym miesiącem rośnie biblioteka treści, które sprzedają bez udziału kogokolwiek. To jest różnica między kalendarzem transmisji a aktywem.",
      cards: [
        {
          title: "LIVE",
          desc: "Sprzedaż tu i teraz. Komentarze, pytania, oferta ograniczona czasowo, koszyk w transmisji. Buduje relację i domyka szybko.",
        },
        {
          title: "Filmy",
          desc: "Sprzedaż odroczona. Produkt podpięty na stałe, zasięg wraca falami. Buduje bibliotekę, która pracuje po godzinach.",
        },
      ],
    },
    storefront: {
      eyebrow: "Sklep twórcy",
      h2: "Twórca dostaje swój sklep. Nie tylko link afiliacyjny.",
      p1: "Twórca wybiera produkty z katalogu, a system tworzy mu sklep pod własnym adresem — z jego nazwą, jego kolorami, jego wyborem asortymentu. Zamówienia, płatności, wysyłka i zwroty idą przez click2pack.",
      p2: "To wyprowadza jego sprzedaż poza TikToka. Ten sam sklep linkuje z Instagrama, z opisu filmu na YouTube, z Facebooka i z bio — więc monetyzuje całą swoją społeczność, a nie tylko tę jej część, która akurat ogląda transmisje.",
      exampleLabel: "przykład adresu",
    },
    fulfilment: {
      eyebrow: "Realizacja zamówień",
      h2: "Zamówienie idzie najkrótszą drogą, nie przez nasz magazyn.",
      p1: "Nie wozimy każdej paczki przez własny magazyn tylko dlatego, że tak jest prościej opowiedzieć. System sprawdza, kto ma dany produkt, i kieruje zamówienie do właściwego miejsca realizacji — do nas, do producenta, do importera albo do hurtowni. Stamtąd paczka jedzie prosto do klienta.",
      p2: "Dzięki temu ten sam katalog obsługuje produkty, których fizycznie nigdy nie dotykamy. To jest warunek skali.",
      order: "ZAMÓWIENIE (z LIVE, filmu albo sklepu twórcy)",
      hub: "CLICK2PACK — sprawdza źródło produktu",
      nodes: ["NASZ MAGAZYN", "MARKA", "IMPORTER", "HURTOWNIA"],
      customer: "KLIENT",
      note: "Twórca widzi status każdego zamówienia i naliczoną prowizję w swoim panelu. Marka widzi to samo po swojej stronie.",
    },
    market: {
      eyebrow: "Dwie strony rynku",
      brands: {
        title: "Dla marek i dostawców",
        items: [
          "Dostęp do twórców bez negocjowania z każdym osobno",
          "Jedna integracja katalogu — API, XML albo CSV",
          "Sprzedaż w transmisjach, filmach i sklepach twórców z jednego zasilenia",
          "Rozliczenie prowizji i raport GMV po stronie click2pack",
          "Realizacja z Waszego magazynu albo z naszego — jak wygodniej",
        ],
        cta: "Podłącz katalog",
      },
      creators: {
        title: "Dla twórców",
        items: [
          "Katalog produktów bez własnego magazynu i bez inwestycji",
          "Własny sklep pod swoim adresem, generowany automatycznie",
          "Sprzedaż z transmisji, z filmów i z linka w bio",
          "Prowizja naliczana automatycznie, wypłata w jednym miejscu",
          "Obsługa klienta, zwroty i reklamacje po naszej stronie",
        ],
        cta: "Dołącz jako twórca",
      },
    },
    categories: {
      eyebrow: "Od czego zaczynamy",
      h2: "Zaczynamy od beauty. Model nie kończy się na beauty.",
      p1: "Pierwszą kategorią jest beauty i skincare — bo demonstracja na żywo ma tam sens, produkt kupuje się ponownie, a marża udźwignie prowizje. To dobra kategoria na start, nie granica systemu.",
      p2: "Katalog, sklepy twórców i realizacja zamówień działają tak samo dla mody, akcesoriów, home decor, fitnessu i lifestyle'u. Kolejne kategorie otwieramy wtedy, gdy mamy w nich twórców, którzy chcą sprzedawać — nie odwrotnie.",
      active: "BEAUTY & SKINCARE",
      upcoming: ["MODA", "AKCESORIA", "HOME", "FITNESS", "LIFESTYLE"],
    },
    benchmarks: {
      eyebrow: "Dlaczego to działa",
      h2: "Rynek dopiero się buduje. To jest moment na wejście.",
      rows: [
        ["11,2 mln", "użytkowników TikToka w Polsce, ponad 60% w wieku 18–34", "dane rynkowe PL, 2026"],
        ["17%", "udział LIVE w GMV TikTok Shop na dojrzałych rynkach UE", "Lengow, Q2 2026"],
        ["70%", "GMV TikTok Shop w UE pochodzi od twórców afiliacyjnych", "Lengow, Q2 2026"],
        ["<2%", "udział social commerce w polskim e-commerce — rynek dopiero się buduje", "dane rynkowe PL, 2026"],
      ],
      sourceLabel: "Źródło",
      launch:
        "TikTok Shop ruszył w Polsce 15 czerwca 2026. Prowizja platformy 9%, przez pierwsze 90 dni 2%.",
    },
    faq: {
      eyebrow: "FAQ",
      h2: "Częste pytania",
      items: [
        ["Czym to się różni od agencji influencerskiej?", "Agencja szuka influencera do konkretnej kampanii i płaci mu za post. My prowadzimy katalog, z którego twórcy sami wybierają, co chcą sprzedawać, i zarabiają z prowizji od tego, co faktycznie sprzedali. Marka nie kupuje zasięgu, tylko dostęp do sieci."],
        ["Kto decyduje, jakie produkty pokazuje twórca?", "Twórca. Możemy podpowiadać na podstawie tego, co sprzedaje się w jego kategorii, ale wyboru nie narzucamy. Twórca, który nie wierzy w produkt, i tak go nie sprzeda."],
        ["Musimy oddać Wam logistykę?", "Nie. System kieruje zamówienie tam, gdzie produkt fizycznie jest — do Waszego magazynu, do importera, do hurtowni albo do nas. Wybieracie wariant przy podłączaniu katalogu."],
        ["Sprzedajemy już na TikTok Shop. Co nam to daje?", "Katalog podpięty do click2pack trafia do twórców, do których sami byście nie dotarli, i sprzedaje się dodatkowo w ich filmach i sklepach. Wasze konto działa jak działało."],
        ["Ile to kosztuje?", "Rozliczamy się od sprzedaży. Konkretne stawki zależą od kategorii, marży i wariantu realizacji — ustalamy je przy podłączaniu katalogu."],
        ["Jestem twórcą. Ile muszę nadawać?", "Podstawa to minimum dwie transmisje tygodniowo, bo poniżej tego algorytm przestaje dowozić zasięg. Ile powyżej — Twoja decyzja. Filmy liczą się osobno i sprzedają niezależnie od transmisji."],
        ["Muszę mieć dużą widownię?", "Nie. Mikro-twórcy dowożą najwyższy zwrot, bo mają realną relację z widownią. Liczy się regularność i to, czy ludzie Cię słuchają."],
        ["Czy to znaczy, że mam robić reklamy na swoim kanale?", "Nie. Robisz swoje treści. Produkty pojawiają się tam, gdzie pasują — jako coś, czego używasz albo o co ktoś zapytał. Jeśli transmisja zamieni się w reklamę, przestaną ją oglądać i stracimy na tym oboje."],
      ],
    },
    forms: {
      brand: {
        title: "Podłącz katalog",
        sub: "Zostaw kontakt — wrócimy z pytaniami o katalog i integrację.",
        name: "Imię i nazwisko",
        company: "Firma",
        email: "E-mail służbowy",
        shopUrl: "Adres sklepu / katalogu (opcjonalnie)",
        role: "Rola",
        roleOpts: ["Producent", "Importer", "Hurtownia", "Marka DTC"],
        category: "Kategoria",
        categoryOpts: ["Beauty", "Moda", "Akcesoria", "Home", "Fitness", "Lifestyle", "Inna"],
        sku: "Liczba SKU",
        skuOpts: ["do 50", "50–500", "500–5000", "powyżej 5000"],
        fulfilment: "Realizacja zamówień",
        fulfilmentOpts: ["Wysyłamy sami", "Chcemy oddać na zewnątrz", "Do ustalenia"],
        consent: "Wyrażam zgodę na kontakt w sprawie usług click2pack (RODO).",
        submit: "Podłącz katalog",
        sending: "Wysyłanie…",
        success: "Mamy to. Odezwiemy się w ciągu jednego dnia roboczego z pytaniami o katalog i integrację.",
        error: "Coś poszło nie tak. Spróbuj ponownie lub napisz na hello@jay23.com.",
        selectPlaceholder: "Wybierz…",
      },
      creator: {
        title: "Dołącz jako twórca",
        sub: "Opowiedz nam o sobie — sprawdzimy profil i wrócimy z propozycją.",
        name: "Imię / nazwa",
        email: "E-mail",
        tiktok: "Profil TikTok (@handle)",
        channels: "Inne kanały (IG / YT / FB, opcjonalnie)",
        audience: "Wielkość widowni",
        audienceOpts: ["do 1 tys.", "1–10 tys.", "10–50 tys.", "50–500 tys.", "powyżej 500 tys."],
        live: "Czy nadajesz na żywo?",
        liveOpts: ["Regularnie", "Czasem", "Jeszcze nie"],
        what: "Co chcesz sprzedawać? (opcjonalnie)",
        consent: "Wyrażam zgodę na kontakt w sprawie współpracy z click2pack (RODO).",
        submit: "Dołącz jako twórca",
        sending: "Wysyłanie…",
        success: "Dzięki. Sprawdzimy Twój profil i wrócimy z propozycją produktów, które mogą do Ciebie pasować.",
        error: "Coś poszło nie tak. Spróbuj ponownie lub napisz na hello@jay23.com.",
        selectPlaceholder: "Wybierz…",
      },
      required: "To pole jest wymagane.",
      invalidEmail: "Podaj poprawny adres e-mail.",
      invalidUrl: "Podaj poprawny adres (https://…).",
      consentRequired: "Zgoda jest wymagana.",
    },
    footer: {
      tagline: "Commerce dla twórców — katalog, sieć, sklepy, realizacja · Polska & CEE",
      copy: "© 2026 click2pack. Część grupy JAY-23.",
    },
  },
  en: {
    seoTitle: "click2pack — creator commerce catalogue & storefronts",
    seoDesc:
      "A multi-supplier product catalogue, a network of creators and one system handling orders from streams, videos and creator storefronts. Starting with beauty.",
    ogTitle: "click2pack — creator commerce",
    ogDesc: "One catalogue. A network of creators. Each one sells their own way.",
    nav: {
      how: "How it works",
      network: "Network",
      brands: "For brands",
      creators: "For creators",
    },
    hero: {
      eyebrow: "CLICK2PACK · CREATOR COMMERCE",
      h1: "One catalogue. A network of creators. Each one sells their own way.",
      lead: "We connect manufacturers, importers and wholesalers with creators who turn their audience into a sales channel. Products go into their streams, their videos and their own storefronts. Click2pack handles the catalogue, the orders, the fulfilment, the tracking and the payouts.",
      differentiator:
        "We don't make ad breaks. We make content people choose to watch — and the right products belong in it.",
      ctaBrand: "I have products",
      ctaCreator: "I'm a creator",
    },
    ecosystem: {
      eyebrow: "How it works",
      h2: "The ecosystem at a glance",
      suppliers: "MANUFACTURERS · IMPORTERS · WHOLESALERS",
      hub: "CLICK2PACK",
      hubSub: "catalogue · orders · logistics · tracking · payouts",
      network: "CREATOR NETWORK",
      channels: ["TikTok LIVE", "TikTok videos", "creator storefront", "IG · FB · YT"],
      customer: "CUSTOMER",
      blocks: [
        {
          h3: "One shared catalogue.",
          p: "Suppliers push products, stock and prices via API, XML or CSV. One data warehouse for the whole network — creators don't negotiate with each brand separately.",
        },
        {
          h3: "Creators choose what to sell.",
          p: "We don't assign products top-down. Creators browse the catalogue and pick what fits them and their audience. If they don't believe in a product, they won't sell it anyway.",
        },
        {
          h3: "The system closes the loop.",
          p: "An order from any channel lands in click2pack, gets routed to the right fulfilment point, and the creator's commission is calculated automatically.",
        },
      ],
    },
    contentFirst: {
      eyebrow: "Format",
      h2: "First a reason to watch. Then a way to buy.",
      p1: "We don't build streams around a product. We build formats around people, topics and conversations. The host debates, jokes, answers questions or simply shows a slice of their day. The product appears where it fits — as something the creator uses, likes, or someone just asked about in the comments.",
      p2: "With TikTok Shop, viewers never leave the stream. If a product catches their eye, they buy on the spot.",
      exampleTitle: "Example",
      example:
        "Two hosts run a stream titled “Can you stay friends with your ex?”. They argue, talk over each other, read the comments. At some point one of them says: “Oh, right — a few people asked what this is. It's linked under the live. I've been using it for a week and I genuinely like it.” And they go back to the conversation.",
      exampleNote:
        "The product stays available for the entire stream. Nobody has to watch it to stay.",
      closing: "The product isn't the subject of the stream. The product is part of the creator's world.",
      honesty:
        "This model builds sales more slowly than a stream staged like a shopping channel. We choose it because a creator who runs an ad once a week quits after a month — and a creator who runs their own show stays. Consistency matters more here than the result of any single stream.",
    },
    network: {
      eyebrow: "Scale",
      h2: "Not one host. A network of them.",
      lead: "A classic agency has a few hosts and sells a brand eight streams a month. That's an event calendar, not a sales channel.",
      compareLeft: "Streaming agency",
      compareRight: "Click2pack",
      rows: [
        ["a few salaried hosts", "a network of independent creators"],
        ["the brand buys a stream package", "each creator decides how often to go live"],
        ["eight streams a month", "a minimum of two streams a week per creator"],
        ["scale grows by hiring", "scale grows by creators joining"],
      ],
      keyParagraph:
        "The baseline activity for a creator in the network is a minimum of two streams a week — the threshold below which TikTok's algorithm stops delivering reach. “Minimum” is literal: some creators do three, five, seven, some stream daily. We don't sell brands a package of streams. We build a network where every creator keeps their own rhythm above that threshold.",
      scaleRow: "CREATOR",
      scaleValue: "min. 2 LIVE / week",
    },
    engines: {
      eyebrow: "Two engines",
      h2: "Streams sell today. Videos sell for months.",
      p1: "A stream lives for an hour and ends with the last comment. A video stays. A clip posted today can sell tomorrow, next week and three months from now — because TikTok keeps serving it, and the product stays linked the whole time.",
      p2: "Creators in the network do both. Every month the library of content that sells with nobody involved grows. That's the difference between a stream calendar and an asset.",
      cards: [
        {
          title: "LIVE",
          desc: "Sales here and now. Comments, questions, time-limited offers, an in-stream basket. Builds the relationship and closes fast.",
        },
        {
          title: "Videos",
          desc: "Deferred sales. Product permanently linked, reach returns in waves. Builds a library that works after hours.",
        },
      ],
    },
    storefront: {
      eyebrow: "Creator storefront",
      h2: "Creators get a storefront, not just an affiliate link.",
      p1: "A creator picks products from the catalogue and the system generates a storefront under their own address — with their name, their colours, their choice of range. Orders, payments, shipping and returns run through click2pack.",
      p2: "That takes their sales beyond TikTok. The same storefront gets linked from Instagram, from a YouTube description, from Facebook and from their bio — so they monetise their entire community, not just the part that happens to watch streams.",
      exampleLabel: "example address",
    },
    fulfilment: {
      eyebrow: "Order fulfilment",
      h2: "Orders take the shortest route, not a detour through our warehouse.",
      p1: "We don't haul every parcel through our own warehouse just because it's easier to explain. The system checks who holds the product and routes the order to the right fulfilment point — to us, to the manufacturer, to the importer or to the wholesaler. From there the parcel goes straight to the customer.",
      p2: "That way one catalogue covers products we physically never touch. That's the precondition for scale.",
      order: "ORDER (from a stream, a video or a creator storefront)",
      hub: "CLICK2PACK — checks the product source",
      nodes: ["OUR WAREHOUSE", "BRAND", "IMPORTER", "WHOLESALER"],
      customer: "CUSTOMER",
      note: "The creator sees the status of every order and their accrued commission in their dashboard. The brand sees the same on its side.",
    },
    market: {
      eyebrow: "Two sides of the market",
      brands: {
        title: "For brands and suppliers",
        items: [
          "Access to creators without negotiating with each one",
          "One catalogue integration — API, XML or CSV",
          "Sales across streams, videos and creator storefronts from a single feed",
          "Commission settlement and GMV reporting on the click2pack side",
          "Fulfilment from your warehouse or ours — whichever suits you",
        ],
        cta: "Connect your catalogue",
      },
      creators: {
        title: "For creators",
        items: [
          "A product catalogue with no warehouse and no upfront investment",
          "Your own storefront under your own address, generated automatically",
          "Sell from streams, videos and the link in your bio",
          "Commission calculated automatically, paid out in one place",
          "Customer support, returns and complaints handled by us",
        ],
        cta: "Join as a creator",
      },
    },
    categories: {
      eyebrow: "Where we start",
      h2: "We start with beauty. The model doesn't stop there.",
      p1: "The first category is beauty and skincare — because live demonstration makes sense there, the product gets repurchased, and the margin carries the commissions. It's a good starting category, not the limit of the system.",
      p2: "The catalogue, creator storefronts and order fulfilment work the same way for fashion, accessories, home decor, fitness and lifestyle. We open new categories when we have creators in them who want to sell — not the other way round.",
      active: "BEAUTY & SKINCARE",
      upcoming: ["FASHION", "ACCESSORIES", "HOME", "FITNESS", "LIFESTYLE"],
    },
    benchmarks: {
      eyebrow: "Why it works",
      h2: "The market is just forming. This is the time to enter.",
      rows: [
        ["11.2M", "TikTok users in Poland, over 60% aged 18–34", "PL market data, 2026"],
        ["17%", "LIVE share of TikTok Shop GMV in mature EU markets", "Lengow, Q2 2026"],
        ["70%", "of TikTok Shop GMV in the EU comes from affiliate creators", "Lengow, Q2 2026"],
        ["<2%", "social commerce share of Polish e-commerce — the market is just forming", "PL market data, 2026"],
      ],
      sourceLabel: "Source",
      launch:
        "TikTok Shop launched in Poland on 15 June 2026. Platform commission is 9%, with 2% for the first 90 days.",
    },
    faq: {
      eyebrow: "FAQ",
      h2: "Common questions",
      items: [
        ["How is this different from an influencer agency?", "An agency finds an influencer for a specific campaign and pays them for a post. We run a catalogue where creators choose what they want to sell and earn commission on what they actually sold. A brand doesn't buy reach — it buys access to the network."],
        ["Who decides which products a creator shows?", "The creator. We can suggest based on what sells in their category, but we never impose the choice. A creator who doesn't believe in a product won't sell it anyway."],
        ["Do we have to hand over logistics?", "No. The system routes each order to where the product physically is — your warehouse, the importer, the wholesaler or us. You pick the option when connecting your catalogue."],
        ["We already sell on TikTok Shop. What does this add?", "A catalogue connected to click2pack reaches creators you wouldn't reach on your own, and sells additionally in their videos and storefronts. Your account keeps working as before."],
        ["How much does it cost?", "We charge on sales. Exact rates depend on category, margin and fulfilment option — we agree them when connecting your catalogue."],
        ["I'm a creator. How much do I have to stream?", "The baseline is a minimum of two streams a week, because below that the algorithm stops delivering reach. Anything above that is your call. Videos count separately and sell independently of streams."],
        ["Do I need a big audience?", "No. Micro-creators deliver the highest return because they have a real relationship with their audience. What matters is consistency and whether people actually listen to you."],
        ["Does this mean I'll be running ads on my channel?", "No. You make your content. Products appear where they fit — as something you use or someone asked about. If a stream turns into an ad, people stop watching and we both lose."],
      ],
    },
    forms: {
      brand: {
        title: "Connect your catalogue",
        sub: "Leave your details — we'll come back with questions about your catalogue and integration.",
        name: "Full name",
        company: "Company",
        email: "Work email",
        shopUrl: "Store / catalogue URL (optional)",
        role: "Role",
        roleOpts: ["Manufacturer", "Importer", "Wholesaler", "DTC brand"],
        category: "Category",
        categoryOpts: ["Beauty", "Fashion", "Accessories", "Home", "Fitness", "Lifestyle", "Other"],
        sku: "Number of SKUs",
        skuOpts: ["up to 50", "50–500", "500–5000", "over 5000"],
        fulfilment: "Order fulfilment",
        fulfilmentOpts: ["We ship ourselves", "We want to outsource it", "To be decided"],
        consent: "I agree to be contacted about click2pack services (GDPR).",
        submit: "Connect your catalogue",
        sending: "Sending…",
        success: "Got it. We'll get back to you within one business day with questions about your catalogue and integration.",
        error: "Something went wrong. Try again or email hello@jay23.com.",
        selectPlaceholder: "Select…",
      },
      creator: {
        title: "Join as a creator",
        sub: "Tell us about yourself — we'll review your profile and come back with a proposal.",
        name: "Name",
        email: "Email",
        tiktok: "TikTok profile (@handle)",
        channels: "Other channels (IG / YT / FB, optional)",
        audience: "Audience size",
        audienceOpts: ["under 1k", "1–10k", "10–50k", "50–500k", "over 500k"],
        live: "Do you stream live?",
        liveOpts: ["Regularly", "Sometimes", "Not yet"],
        what: "What would you like to sell? (optional)",
        consent: "I agree to be contacted about working with click2pack (GDPR).",
        submit: "Join as a creator",
        sending: "Sending…",
        success: "Thanks. We'll review your profile and come back with product suggestions that could fit you.",
        error: "Something went wrong. Try again or email hello@jay23.com.",
        selectPlaceholder: "Select…",
      },
      required: "This field is required.",
      invalidEmail: "Enter a valid email address.",
      invalidUrl: "Enter a valid URL (https://…).",
      consentRequired: "Consent is required.",
    },
    footer: {
      tagline: "Creator commerce — catalogue, network, storefronts, fulfilment · Poland & CEE",
      copy: "© 2026 click2pack. Part of the JAY-23 group.",
    },
  },
};

type Lang = keyof typeof COPY;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

/* ─── Page ─────────────────────────────────────────────────────────────── */
const Click2Pack = () => {
  const { lang, langPrefix } = useLanguage();
  const c = COPY[lang as Lang];
  const canonical = `https://jay23.com${langPrefix}/click2pack`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  // Same source of truth as the build-time pre-rendered <head> (see src/seo/prerenderRoutes.ts)
  const preMeta = getPrerenderRoute(`${langPrefix}/click2pack`);

  return (
    <div className="min-h-screen bg-[#F6F6F9] text-[#0B0B0F]">
      <SEOHead
        title={preMeta?.title ?? c.seoTitle}
        description={preMeta?.description ?? c.seoDesc}
        canonical={`${langPrefix}/click2pack`}
        lang={lang}
        ogImage={preMeta?.ogImage ?? "https://jay23.com/og/click2pack.jpg"}
        ogImageAlt={preMeta?.ogImageAlt ?? c.ogTitle}
        hreflangOverrides={{ en: "/en/click2pack", pl: "/pl/click2pack" }}
        schemaJson={faqSchema}
      />


      <C2PNav nav={c.nav} langPrefix={langPrefix} />
      <Hero c={c.hero} />
      <EcosystemSection c={c.ecosystem} />
      <ContentFirstSection c={c.contentFirst} />
      <NetworkSection c={c.network} />
      <EnginesSection c={c.engines} />
      <StorefrontSection c={c.storefront} />
      <FulfilmentSection c={c.fulfilment} />
      <MarketSection c={c.market} />
      <CategoriesSection c={c.categories} />
      <BenchmarksSection c={c.benchmarks} />
      <FAQ c={c.faq} />
      <FormsSection forms={c.forms} lang={lang as Lang} />
      <C2PFooter c={c.footer} />
    </div>
  );
};

export default Click2Pack;

/* ─── Shared bits ──────────────────────────────────────────────────────── */
const Logo = ({ light = false }: { light?: boolean }) => (
  <span className={`font-display font-bold text-xl tracking-tight ${light ? "text-white" : "text-[#0B0B0F]"}`}>
    click<span className="text-emerald-500">2</span>pack
  </span>
);

const SectionHeader = ({
  eyebrow,
  h2,
  sub,
  dark = false,
  eyebrowColor = "text-emerald-500",
}: {
  eyebrow: string;
  h2: string;
  sub?: string;
  dark?: boolean;
  eyebrowColor?: string;
}) => (
  <div className="max-w-3xl">
    <span className={`inline-block text-xs font-semibold tracking-[0.18em] uppercase ${eyebrowColor} mb-4`}>
      {eyebrow}
    </span>
    <h2 className={`font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.08] ${dark ? "text-white" : "text-[#0B0B0F]"}`}>
      {h2}
    </h2>
    {sub && <p className={`mt-4 text-base md:text-lg leading-relaxed ${dark ? "text-white/65" : "text-[#0B0B0F]/65"}`}>{sub}</p>}
  </div>
);

const Arrow = ({ dark = true }: { dark?: boolean }) => (
  <div className="flex justify-center py-1" aria-hidden="true">
    <ChevronDown size={20} className={dark ? "text-emerald-400" : "text-emerald-600"} />
  </div>
);

/* ─── Navigation ───────────────────────────────────────────────────────── */
const C2PNav = ({ nav, langPrefix }: { nav: typeof COPY.pl.nav; langPrefix: string }) => (
  <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0A0A12]/85 border-b border-white/5">
    <div className="container mx-auto max-w-6xl flex items-center justify-between h-16 px-6">
      <a href="#top" className="flex items-center" aria-label="click2pack">
        <Logo light />
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
        <a href="#jak-to-dziala" className="hover:text-white transition-colors">{nav.how}</a>
        <a href="#siec" className="hover:text-white transition-colors">{nav.network}</a>
        <a href="#dla-marek" className="hover:text-white transition-colors">{nav.brands}</a>
        <a href="#dla-tworcow" className="hover:text-white transition-colors">{nav.creators}</a>
      </nav>
      <div className="flex items-center gap-3">
        <Link to={langPrefix} className="hidden sm:inline text-xs text-white/40 hover:text-white/70 transition-colors">
          ← jay23.com
        </Link>
        <a
          href="#dla-tworcow"
          onClick={() => c2pEvent("c2p_nav_cta")}
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          {nav.creators} <ArrowRight size={14} />
        </a>
      </div>
    </div>
  </header>
);

/* ─── 1. Hero ──────────────────────────────────────────────────────────── */
const Hero = ({ c }: { c: typeof COPY.pl.hero }) => (
  <section
    id="top"
    className="relative overflow-hidden text-white"
    style={{ background: "linear-gradient(135deg, #0A0A12 0%, #110029 100%)" }}
  >
    <div
      className="absolute inset-0 opacity-40 pointer-events-none"
      style={{
        background:
          "radial-gradient(60% 50% at 80% 0%, rgba(103,61,255,0.35) 0%, transparent 60%), radial-gradient(40% 40% at 10% 100%, rgba(16,185,129,0.25) 0%, transparent 70%)",
      }}
    />
    <div className="relative container mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
        <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-emerald-400 mb-5">
          {c.eyebrow}
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
          {c.h1}
        </h1>
        <p className="mt-7 text-lg md:text-xl text-[#A78BFA] font-medium leading-relaxed max-w-2xl">
          {c.differentiator}
        </p>
        <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">{c.lead}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#dla-marek"
            onClick={() => c2pEvent("c2p_hero_cta", { target: "brands" })}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-[0_10px_30px_-10px_rgba(16,185,129,0.6)]"
          >
            {c.ctaBrand} <ArrowRight size={16} />
          </a>
          <a
            href="#dla-tworcow"
            onClick={() => c2pEvent("c2p_hero_cta", { target: "creators" })}
            className="inline-flex items-center gap-2 bg-[#673DFF] hover:bg-[#5730e0] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-[0_10px_30px_-10px_rgba(103,61,255,0.6)]"
          >
            {c.ctaCreator} <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── 2. Ecosystem diagram ─────────────────────────────────────────────── */
const DiagramBox = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <div
    className={`rounded-2xl border px-5 py-4 text-center text-sm font-semibold tracking-wide ${
      accent
        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
        : "border-white/10 bg-white/[0.04] text-white/85"
    }`}
  >
    {children}
  </div>
);

const EcosystemSection = ({ c }: { c: typeof COPY.pl.ecosystem }) => (
  <section id="jak-to-dziala" className="bg-[#0A0A12] text-white py-20 md:py-28 border-t border-white/5">
    <div className="container mx-auto max-w-6xl px-6">
      <SectionHeader eyebrow={c.eyebrow} h2={c.h2} dark />

      {/* Diagram — HTML/CSS, horizontally scrollable on small screens */}
      <div className="mt-12 overflow-x-auto -mx-6 px-6">
        <div className="min-w-[560px] max-w-3xl mx-auto">
          <DiagramBox>{c.suppliers}</DiagramBox>
          <Arrow />
          <div
            className="rounded-2xl px-6 py-6 text-center border border-emerald-500/30"
            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.16) 0%, rgba(103,61,255,0.16) 100%)" }}
          >
            <div className="font-display font-bold text-2xl text-white">{c.hub}</div>
            <div className="text-xs text-white/60 mt-1.5 tracking-wide">{c.hubSub}</div>
          </div>
          <Arrow />
          <DiagramBox accent>{c.network}</DiagramBox>
          <Arrow />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {c.channels.map((ch) => (
              <DiagramBox key={ch}>{ch}</DiagramBox>
            ))}
          </div>
          <Arrow />
          <DiagramBox accent>{c.customer}</DiagramBox>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-14">
        {c.blocks.map((b, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
          >
            <h3 className="font-display text-lg font-bold mb-3 normal-case tracking-tight text-emerald-400">
              {b.h3}
            </h3>
            <p className="text-white/65 text-sm leading-relaxed">{b.p}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── 3. Content-first LIVE ────────────────────────────────────────────── */
const ContentFirstSection = ({ c }: { c: typeof COPY.pl.contentFirst }) => (
  <section className="text-white py-20 md:py-28" style={{ background: "linear-gradient(160deg, #150b28 0%, #0A0A12 70%)" }}>
    <div className="container mx-auto max-w-4xl px-6">
      <SectionHeader eyebrow={c.eyebrow} eyebrowColor="text-[#A78BFA]" h2={c.h2} dark />
      <p className="mt-8 text-white/75 text-base md:text-lg leading-relaxed">{c.p1}</p>
      <p className="mt-4 text-white/75 text-base md:text-lg leading-relaxed">{c.p2}</p>

      <motion.figure
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-10 rounded-2xl border border-[#673DFF]/30 bg-[#673DFF]/[0.06] p-7 md:p-9"
      >
        <figcaption className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A78BFA] mb-4">
          {c.exampleTitle}
        </figcaption>
        <blockquote className="text-white/80 text-base md:text-lg leading-relaxed italic">
          {c.example}
        </blockquote>
        <p className="mt-4 text-sm text-white/55 leading-relaxed">{c.exampleNote}</p>
      </motion.figure>

      <p className="mt-10 font-display text-xl md:text-2xl font-bold tracking-tight text-emerald-400">
        {c.closing}
      </p>
      <p className="mt-8 text-sm text-white/45 leading-relaxed max-w-2xl border-l-2 border-white/15 pl-4">
        {c.honesty}
      </p>
    </div>
  </section>
);

/* ─── 4. Network of hosts ──────────────────────────────────────────────── */
const NetworkSection = ({ c }: { c: typeof COPY.pl.network }) => (
  <section id="siec" className="bg-white text-[#0B0B0F] py-20 md:py-28">
    <div className="container mx-auto max-w-6xl px-6">
      <SectionHeader eyebrow={c.eyebrow} h2={c.h2} sub={c.lead} />

      <div className="mt-12 rounded-2xl border border-[#E7E8EF] overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="px-6 py-4 bg-[#F6F6F9] font-semibold text-sm text-[#0B0B0F]/60">{c.compareLeft}</div>
          <div className="px-6 py-4 bg-[#0A0A12] font-semibold text-sm text-emerald-400">{c.compareRight}</div>
        </div>
        {c.rows.map(([left, right], i) => (
          <div key={i} className="grid grid-cols-2 border-t border-[#E7E8EF]">
            <div className="px-6 py-4 text-sm text-[#0B0B0F]/65 bg-[#F6F6F9]/60">{left}</div>
            <div className="px-6 py-4 text-sm text-[#0B0B0F] font-medium">{right}</div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-base md:text-lg text-[#0B0B0F]/75 leading-relaxed max-w-3xl">
        {c.keyParagraph}
      </p>

      {/* Scaling visual — no creator counts */}
      <div className="mt-12 max-w-md space-y-3" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-[#E7E8EF] bg-[#F6F6F9] px-5 py-3.5"
          >
            <span className="font-display font-bold text-sm tracking-wide">{c.scaleRow}</span>
            <span className="text-sm text-emerald-600 font-semibold">{c.scaleValue}</span>
          </div>
        ))}
        <div className="flex items-center justify-between px-5 py-2 text-[#0B0B0F]/35">
          <span className="text-xl leading-none">⋮</span>
          <span className="text-xl leading-none">⋮</span>
        </div>
      </div>
    </div>
  </section>
);

/* ─── 5. Two engines ───────────────────────────────────────────────────── */
const EnginesSection = ({ c }: { c: typeof COPY.pl.engines }) => {
  const icons = [Radio, Clapperboard];
  return (
    <section className="bg-[#F6F6F9] text-[#0B0B0F] py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={c.eyebrow} eyebrowColor="text-[#673DFF]" h2={c.h2} />
        <p className="mt-8 text-[#0B0B0F]/75 text-base md:text-lg leading-relaxed max-w-3xl">{c.p1}</p>
        <p className="mt-4 text-[#0B0B0F]/75 text-base md:text-lg leading-relaxed max-w-3xl">{c.p2}</p>

        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {c.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-[#E7E8EF] bg-white p-8 hover:border-[#673DFF]/30 transition-colors"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#673DFF]/10 text-[#673DFF] mb-5">
                  <Icon size={20} />
                </span>
                <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">{card.title}</h3>
                <p className="text-sm text-[#0B0B0F]/65 leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─── 6. Creator storefront ────────────────────────────────────────────── */
const StorefrontSection = ({ c }: { c: typeof COPY.pl.storefront }) => (
  <section className="bg-[#0A0A12] text-white py-20 md:py-28">
    <div className="container mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <SectionHeader eyebrow={c.eyebrow} h2={c.h2} dark />
        <p className="mt-8 text-white/70 text-base leading-relaxed">{c.p1}</p>
        <p className="mt-4 text-white/70 text-base leading-relaxed">{c.p2}</p>
      </div>
      {/* TODO: potwierdzić, czy sklepy twórców są już uruchomione — jeśli nie, dodać etykietę „w budowie" */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </div>
          <div className="rounded-lg bg-[#0A0A12] border border-white/10 px-4 py-3 flex items-center gap-3">
            <Store size={15} className="text-emerald-400 shrink-0" />
            <span className="font-mono text-sm text-white/85 select-all">
              nazwa-tworcy<span className="text-emerald-400">.click2pack.pl</span>
            </span>
          </div>
          <p className="mt-3 text-xs text-white/40 tracking-wide">{c.exampleLabel}</p>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── 7. Fulfilment routing ────────────────────────────────────────────── */
const FulfilmentSection = ({ c }: { c: typeof COPY.pl.fulfilment }) => (
  <section className="bg-white text-[#0B0B0F] py-20 md:py-28">
    <div className="container mx-auto max-w-6xl px-6">
      <SectionHeader eyebrow={c.eyebrow} h2={c.h2} />
      <p className="mt-8 text-[#0B0B0F]/75 text-base md:text-lg leading-relaxed max-w-3xl">{c.p1}</p>
      <p className="mt-4 text-[#0B0B0F]/75 text-base md:text-lg leading-relaxed max-w-3xl">{c.p2}</p>

      <div className="mt-12 overflow-x-auto -mx-6 px-6">
        <div className="min-w-[560px] max-w-3xl mx-auto">
          <DiagramBoxLight>{c.order}</DiagramBoxLight>
          <Arrow dark={false} />
          <div className="rounded-2xl px-6 py-5 text-center text-white border border-emerald-600/30"
            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.9) 0%, rgba(103,61,255,0.9) 100%)" }}
          >
            <span className="font-display font-bold text-lg">{c.hub}</span>
          </div>
          <Arrow dark={false} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {c.nodes.map((n) => (
              <DiagramBoxLight key={n}>{n}</DiagramBoxLight>
            ))}
          </div>
          <Arrow dark={false} />
          <DiagramBoxLight accent>{c.customer}</DiagramBoxLight>
        </div>
      </div>

      <p className="mt-10 text-sm text-[#0B0B0F]/60 leading-relaxed max-w-2xl">{c.note}</p>
    </div>
  </section>
);

const DiagramBoxLight = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <div
    className={`rounded-2xl border px-5 py-4 text-center text-sm font-semibold tracking-wide ${
      accent
        ? "border-emerald-600/40 bg-emerald-500/10 text-emerald-700"
        : "border-[#E7E8EF] bg-[#F6F6F9] text-[#0B0B0F]/80"
    }`}
  >
    {children}
  </div>
);

/* ─── 8. Two sides of the market ───────────────────────────────────────── */
const MarketSection = ({ c }: { c: typeof COPY.pl.market }) => (
  <section className="bg-[#0A0A12] text-white py-20 md:py-28">
    <div className="container mx-auto max-w-6xl px-6">
      <SectionHeader eyebrow={c.eyebrow} h2={c.eyebrow} dark />
      <div className="grid md:grid-cols-2 gap-5 mt-12">
        {([c.brands, c.creators] as const).map((side, i) => (
          <motion.div
            key={i}
            id={i === 0 ? "dla-marek" : "dla-tworcow"}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className={`rounded-2xl p-8 md:p-10 border scroll-mt-24 ${
              i === 0
                ? "border-emerald-500/30 bg-emerald-500/[0.05]"
                : "border-[#673DFF]/30 bg-[#673DFF]/[0.06]"
            }`}
          >
            <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-6 ${
              i === 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-[#673DFF]/15 text-[#A78BFA]"
            }`}>
              {i === 0 ? <Package size={20} /> : <Users size={20} />}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-7 tracking-tight">{side.title}</h3>
            <ul className="space-y-3.5">
              {side.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-sm text-white/80 leading-relaxed">
                  <Check size={17} className={`shrink-0 mt-0.5 ${i === 0 ? "text-emerald-400" : "text-[#A78BFA]"}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={i === 0 ? "#formularz-marki" : "#formularz-tworcy"}
              onClick={() => c2pEvent("c2p_market_cta", { side: i === 0 ? "brand" : "creator" })}
              className={`mt-8 inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-white transition-colors ${
                i === 0 ? "bg-emerald-500 hover:bg-emerald-600" : "bg-[#673DFF] hover:bg-[#5730e0]"
              }`}
            >
              {side.cta} <ArrowRight size={15} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── 9. Categories ────────────────────────────────────────────────────── */
const CategoriesSection = ({ c }: { c: typeof COPY.pl.categories }) => (
  <section className="bg-[#F6F6F9] text-[#0B0B0F] py-20 md:py-28">
    <div className="container mx-auto max-w-6xl px-6">
      <SectionHeader eyebrow={c.eyebrow} eyebrowColor="text-[#673DFF]" h2={c.h2} />
      <p className="mt-8 text-[#0B0B0F]/75 text-base md:text-lg leading-relaxed max-w-3xl">{c.p1}</p>
      <p className="mt-4 text-[#0B0B0F]/75 text-base md:text-lg leading-relaxed max-w-3xl">{c.p2}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <span className="rounded-full bg-emerald-500 text-white text-xs font-bold tracking-[0.12em] px-5 py-2.5">
          {c.active}
        </span>
        {c.upcoming.map((cat) => (
          <span
            key={cat}
            className="rounded-full border border-[#E7E8EF] bg-white text-[#0B0B0F]/40 text-xs font-semibold tracking-[0.12em] px-5 py-2.5"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ─── 10. Benchmarks ───────────────────────────────────────────────────── */
const BenchmarksSection = ({ c }: { c: typeof COPY.pl.benchmarks }) => (
  <section className="bg-white text-[#0B0B0F] py-20 md:py-28">
    <div className="container mx-auto max-w-6xl px-6">
      <SectionHeader eyebrow={c.eyebrow} h2={c.h2} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {c.rows.map(([num, label, source], i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-[#E7E8EF] bg-[#F6F6F9] p-7"
          >
            <div className="font-display font-bold text-3xl md:text-4xl text-emerald-600 tracking-tight">
              {num}
            </div>
            <p className="text-[#0B0B0F]/70 text-sm mt-2 leading-snug">{label}</p>
            <p className="text-[#0B0B0F]/40 text-xs mt-3">
              {c.sourceLabel}: {source}
            </p>
          </motion.div>
        ))}
      </div>
      <p className="mt-10 text-sm text-[#0B0B0F]/60 leading-relaxed max-w-3xl">
        <Truck size={15} className="inline mr-2 text-emerald-600 -mt-0.5" />
        {c.launch}
      </p>
    </div>
  </section>
);

/* ─── 11. FAQ ──────────────────────────────────────────────────────────── */
const FAQ = ({ c }: { c: typeof COPY.pl.faq }) => (
  <section className="bg-[#F6F6F9] text-[#0B0B0F] py-20 md:py-28">
    <div className="container mx-auto max-w-[760px] px-6">
      <SectionHeader eyebrow={c.eyebrow} h2={c.h2} />
      <Accordion type="single" collapsible className="w-full mt-10">
        {c.items.map(([q, a], i) => (
          <AccordionItem key={i} value={`c2p-faq-${i}`} className="border-[#E7E8EF]">
            <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-5">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-[#0B0B0F]/65 leading-relaxed pb-5">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

/* ─── 12. Forms ────────────────────────────────────────────────────────── */
const inputCls =
  "w-full rounded-xl border border-[#E7E8EF] bg-white px-4 py-3 text-sm text-[#0B0B0F] placeholder:text-[#0B0B0F]/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition";
const labelCls = "block text-xs font-semibold text-[#0B0B0F]/70 mb-1.5";
const errCls = "text-xs text-red-600 mt-1";

async function submitLead(payload: Record<string, unknown>) {
  // Source of truth: click2pack_leads table.
  const { error } = await supabase.from("click2pack_leads" as never).insert({
    name: String(payload.name ?? "").slice(0, 200),
    brand: String(payload.company ?? payload.tiktok ?? "").slice(0, 200) || null,
    email: String(payload.email ?? "").slice(0, 320),
    monthly_revenue: String(payload.sku ?? payload.audience ?? "") || null,
    lang: payload.locale,
    source: String(payload.form_type ?? "click2pack"),
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
    referrer: typeof document !== "undefined" ? document.referrer.slice(0, 500) : null,
  } as never);
  if (error) throw error;

  // MailerLite (group 191139495358236092) via edge function — non-blocking.
  try {
    await supabase.functions.invoke("click2pack-subscribe", {
      body: {
        name: payload.name,
        email: payload.email,
        brand: payload.company ?? payload.tiktok,
        monthly_revenue: payload.sku ?? payload.audience,
        lang: payload.locale,
      },
    });
  } catch (e) {
    console.error("click2pack-subscribe failed:", e);
  }

  // Optional Make.com webhook.
  if (MAKE_WEBHOOK) {
    try {
      await fetch(MAKE_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error("Make webhook failed:", e);
    }
  }
}

const RadioGroup = ({
  options,
  value,
  onChange,
  name,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) => (
  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
    {options.map((opt) => (
      <button
        type="button"
        key={opt}
        role="radio"
        aria-checked={value === opt}
        onClick={() => onChange(opt)}
        className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
          value === opt
            ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
            : "border-[#E7E8EF] bg-white text-[#0B0B0F]/60 hover:border-[#0B0B0F]/25"
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

const FormsSection = ({ forms, lang }: { forms: typeof COPY.pl.forms; lang: Lang }) => (
  <section className="bg-[#0A0A12] py-20 md:py-28">
    <div className="container mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-8 items-start">
      <BrandForm c={forms.brand} shared={forms} lang={lang} />
      <CreatorForm c={forms.creator} shared={forms} lang={lang} />
    </div>
  </section>
);

type BrandFormCopy = typeof COPY.pl.forms.brand;
type CreatorFormCopy = typeof COPY.pl.forms.creator;
type SharedFormCopy = typeof COPY.pl.forms;

const BrandForm = ({ c, shared, lang }: { c: BrandFormCopy; shared: SharedFormCopy; lang: Lang }) => {
  const schema = z.object({
    name: z.string().trim().min(1, shared.required).max(100),
    company: z.string().trim().min(1, shared.required).max(200),
    email: z.string().trim().email(shared.invalidEmail).max(255),
    shopUrl: z.string().trim().url(shared.invalidUrl).max(500).optional().or(z.literal("")),
    role: z.string().min(1, shared.required),
    category: z.string().min(1, shared.required),
    sku: z.string().min(1, shared.required),
    fulfilment: z.string().min(1, shared.required),
    consent: z.literal(true, { errorMap: () => ({ message: shared.consentRequired }) }),
  });
  type BrandData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<BrandData>({ resolver: zodResolver(schema), defaultValues: { consent: false as unknown as true } });

  const fulfilment = watch("fulfilment");
  const consent = watch("consent");

  const onSubmit = async (data: BrandData) => {
    const payload = {
      ...data,
      form_type: "c2p_supplier",
      locale: lang,
      page_url: typeof window !== "undefined" ? window.location.href : "",
    };
    c2pEvent("c2p_form_submit", { form_type: "c2p_supplier", locale: lang });
    await submitLead(payload);
  };

  return (
    <div id="formularz-marki" className="rounded-3xl bg-[#F6F6F9] p-7 md:p-10 scroll-mt-24">
      <h3 className="font-display text-2xl font-bold tracking-tight text-[#0B0B0F]">{c.title}</h3>
      <p className="mt-2 text-sm text-[#0B0B0F]/60">{c.sub}</p>

      {isSubmitSuccessful ? (
        <div className="mt-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-sm text-emerald-800 leading-relaxed">
          {c.success}
        </div>
      ) : (
        <form
          className="mt-7 space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit, (errs) =>
            c2pEvent("c2p_form_validation_error", { form_type: "c2p_supplier", fields: Object.keys(errs).join(",") })
          )}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls} htmlFor="bf-name">{c.name}</label>
              <input id="bf-name" className={inputCls} {...register("name")} />
              {errors.name && <p className={errCls}>{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="bf-company">{c.company}</label>
              <input id="bf-company" className={inputCls} {...register("company")} />
              {errors.company && <p className={errCls}>{errors.company.message}</p>}
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="bf-email">{c.email}</label>
            <input id="bf-email" type="email" className={inputCls} {...register("email")} />
            {errors.email && <p className={errCls}>{errors.email.message}</p>}
          </div>
          <div>
            <label className={labelCls} htmlFor="bf-url">{c.shopUrl}</label>
            <input id="bf-url" type="url" className={inputCls} placeholder="https://…" {...register("shopUrl")} />
            {errors.shopUrl && <p className={errCls}>{errors.shopUrl.message}</p>}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls} htmlFor="bf-role">{c.role}</label>
              <select id="bf-role" className={inputCls} {...register("role")}>
                <option value="">{c.selectPlaceholder}</option>
                {c.roleOpts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.role && <p className={errCls}>{errors.role.message}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="bf-category">{c.category}</label>
              <select id="bf-category" className={inputCls} {...register("category")}>
                <option value="">{c.selectPlaceholder}</option>
                {c.categoryOpts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.category && <p className={errCls}>{errors.category.message}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="bf-sku">{c.sku}</label>
              <select id="bf-sku" className={inputCls} {...register("sku")}>
                <option value="">{c.selectPlaceholder}</option>
                {c.skuOpts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.sku && <p className={errCls}>{errors.sku.message}</p>}
            </div>
          </div>
          <div>
            <span className={labelCls}>{c.fulfilment}</span>
            <RadioGroup options={c.fulfilmentOpts} value={fulfilment ?? ""} onChange={(v) => setValue("fulfilment", v, { shouldValidate: true })} name={c.fulfilment} />
            {errors.fulfilment && <p className={errCls}>{errors.fulfilment.message}</p>}
          </div>
          <label className="flex items-start gap-3 text-xs text-[#0B0B0F]/60 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              checked={!!consent}
              onChange={(e) => setValue("consent", e.target.checked as true, { shouldValidate: true })}
              className="mt-0.5 accent-emerald-600"
            />
            {c.consent}
          </label>
          {errors.consent && <p className={errCls}>{errors.consent.message}</p>}
          {errors.root && <p className={errCls}>{c.error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            {isSubmitting ? c.sending : c.submit} <ArrowRight size={15} />
          </button>
        </form>
      )}
    </div>
  );
};

const CreatorForm = ({ c, shared, lang }: { c: CreatorFormCopy; shared: SharedFormCopy; lang: Lang }) => {
  const schema = z.object({
    name: z.string().trim().min(1, shared.required).max(100),
    email: z.string().trim().email(shared.invalidEmail).max(255),
    tiktok: z.string().trim().min(1, shared.required).max(100),
    channels: z.string().trim().max(300).optional(),
    audience: z.string().min(1, shared.required),
    live: z.string().min(1, shared.required),
    what: z.string().trim().max(1000).optional(),
    consent: z.literal(true, { errorMap: () => ({ message: shared.consentRequired }) }),
  });
  type CreatorData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CreatorData>({ resolver: zodResolver(schema), defaultValues: { consent: false as unknown as true } });

  const live = watch("live");
  const consent = watch("consent");

  const onSubmit = async (data: CreatorData) => {
    const payload = {
      ...data,
      form_type: "c2p_creator",
      locale: lang,
      page_url: typeof window !== "undefined" ? window.location.href : "",
    };
    c2pEvent("c2p_form_submit", { form_type: "c2p_creator", locale: lang });
    await submitLead(payload);
  };

  return (
    <div id="formularz-tworcy" className="rounded-3xl bg-white p-7 md:p-10 scroll-mt-24 border border-[#673DFF]/20">
      <h3 className="font-display text-2xl font-bold tracking-tight text-[#0B0B0F]">{c.title}</h3>
      <p className="mt-2 text-sm text-[#0B0B0F]/60">{c.sub}</p>

      {isSubmitSuccessful ? (
        <div className="mt-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-sm text-emerald-800 leading-relaxed">
          {c.success}
        </div>
      ) : (
        <form
          className="mt-7 space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit, (errs) =>
            c2pEvent("c2p_form_validation_error", { form_type: "c2p_creator", fields: Object.keys(errs).join(",") })
          )}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls} htmlFor="cf-name">{c.name}</label>
              <input id="cf-name" className={inputCls} {...register("name")} />
              {errors.name && <p className={errCls}>{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-email">{c.email}</label>
              <input id="cf-email" type="email" className={inputCls} {...register("email")} />
              {errors.email && <p className={errCls}>{errors.email.message}</p>}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls} htmlFor="cf-tiktok">{c.tiktok}</label>
              <input id="cf-tiktok" className={inputCls} placeholder="@…" {...register("tiktok")} />
              {errors.tiktok && <p className={errCls}>{errors.tiktok.message}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-channels">{c.channels}</label>
              <input id="cf-channels" className={inputCls} {...register("channels")} />
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="cf-audience">{c.audience}</label>
            <select id="cf-audience" className={inputCls} {...register("audience")}>
              <option value="">{c.selectPlaceholder}</option>
              {c.audienceOpts.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {errors.audience && <p className={errCls}>{errors.audience.message}</p>}
          </div>
          <div>
            <span className={labelCls}>{c.live}</span>
            <RadioGroup options={c.liveOpts} value={live ?? ""} onChange={(v) => setValue("live", v, { shouldValidate: true })} name={c.live} />
            {errors.live && <p className={errCls}>{errors.live.message}</p>}
          </div>
          <div>
            <label className={labelCls} htmlFor="cf-what">{c.what}</label>
            <textarea id="cf-what" rows={3} className={inputCls} {...register("what")} />
          </div>
          <label className="flex items-start gap-3 text-xs text-[#0B0B0F]/60 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              checked={!!consent}
              onChange={(e) => setValue("consent", e.target.checked as true, { shouldValidate: true })}
              className="mt-0.5 accent-emerald-600"
            />
            {c.consent}
          </label>
          {errors.consent && <p className={errCls}>{errors.consent.message}</p>}
          {errors.root && <p className={errCls}>{c.error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#673DFF] hover:bg-[#5730e0] disabled:opacity-60 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            {isSubmitting ? c.sending : c.submit} <ArrowRight size={15} />
          </button>
        </form>
      )}
    </div>
  );
};

/* ─── Footer ───────────────────────────────────────────────────────────── */
const C2PFooter = ({ c }: { c: typeof COPY.pl.footer }) => (
  <footer className="bg-[#0A0A12] border-t border-white/5 text-white py-12">
    <div className="container mx-auto max-w-6xl px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <Logo light />
        <p className="text-white/45 text-xs mt-2 max-w-md leading-relaxed">{c.tagline}</p>
      </div>
      <p className="text-white/35 text-xs">{c.copy}</p>
    </div>
  </footer>
);
