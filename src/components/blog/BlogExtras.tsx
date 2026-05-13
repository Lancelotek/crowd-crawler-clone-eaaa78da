import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Linkedin } from "lucide-react";

export type FAQ = { q: string; a: string };
export type HowToStep = { name: string; text: string };

export type BlogStructuredExtras = {
  faqs?: FAQ[];
  howTo?: { name: string; description: string; totalTime?: string; steps: HowToStep[] };
  heroAlt?: string;
};

/**
 * Per-slug structured data extras for blog posts.
 * Adding entries here injects FAQ/HowTo schema + visible FAQ accordion.
 */
export const BLOG_EXTRAS: Record<string, BlogStructuredExtras> = {
  "60-dni-do-1000-zapisow-plan-prelaunch": {
    heroAlt:
      "60 dni do 1000 zapisów — plan prelaunch JAY-23 z czterema etapami: najbliższy krąg, ciepłe społeczności, build in public, referral loop.",
    howTo: {
      name: "Jak zbudować waitlist 1000 osób w 60 dni przed launchem produktu",
      description:
        "Czteroetapowy plan prelaunch przeprowadzający founderów z 0 do 1000 zapisów w 60 dni.",
      totalTime: "P60D",
      steps: [
        {
          name: "Etap 1: Pierwsze 10 zapisów z najbliższego kręgu (dni 1–2)",
          text: "Wypisz 30 osób z życia. Wyślij każdej personalizowaną wiadomość z linkiem do waitlistu. Cel: 10 zapisów w 48 godzin.",
        },
        {
          name: "Etap 2: 40 zapisów z ciepłych społeczności (tydzień 1–2)",
          text: "Wybierz 3–5 grup gdzie spędzasz czas od miesięcy. Wrzucaj historie problemu, nie pitche. Cel: ~50 zapisów łącznie.",
        },
        {
          name: "Etap 3: Build in public z zasadą 70/30 (tydzień 3–6)",
          text: "Otwórz X i LinkedIn jako dziennik budowy. 70% komentarzy na cudzych postach, 30% własne. Cel: ~100 zapisów.",
        },
        {
          name: "Etap 4: Referral loop 100 → 1000 (tydzień 7–8)",
          text: "Każdy zapisany dostaje unikalny link i nagrody za polecenia. Niski próg na start. Cel: 1000 zapisów.",
        },
      ],
    },
    faqs: [
      {
        q: "Po co budować waitlist 60 dni przed launchem?",
        a: "Konwersja dobrze przygotowanego waitlistu w dniu launcha to 15–35%. Konwersja zimnego ruchu — 1–2%. Bez 60-dniowego prelaunch w dniu premiery nie masz komu sprzedać.",
      },
      {
        q: "Ile zapisów potrzebuję na waitlist przed launchem?",
        a: "1000 zapisów z gorącą intencją wystarczy do udanego launcha. Ważniejsza od liczby jest jakość — 200 osób które naprawdę chcą Twój produkt bije 2000 zimnych adresów.",
      },
      {
        q: "Co to jest reguła 70/30 w build in public?",
        a: "70% Twojej aktywności na X/LinkedIn to wartościowe komentarze na cudzych postach, 30% to własne posty. Konta stosujące tę regułę rosną ~10% miesięcznie vs. 2–5% dla kont publikujących tylko własne treści.",
      },
      {
        q: "Jak działa referral loop w prelaunch waitlist?",
        a: "Każdy zapisany dostaje unikalny link, za polecenia otrzymuje konkretną nagrodę (wczesny dostęp, rabat, bonus). Średnio referral loop podnosi tempo wzrostu listy o ~17%.",
      },
      {
        q: "Jakie narzędzia do prelaunch waitlist polecasz?",
        a: "Waitlister, LaunchList, GetWaitlist, Viral Loops, KickoffLabs — wszystkie mają wbudowane referral mechanics. Alternatywnie prosty Make.com webhook + MailerLite.",
      },
    ],
  },
};

export function BlogFAQ({ faqs, isPl }: { faqs: FAQ[]; isPl: boolean }) {
  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
        {isPl ? "Najczęstsze pytania" : "Frequently asked questions"}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border">
            <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5">
              <h3 className="text-base font-semibold m-0">{f.q}</h3>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function AuthorBio({ isPl, langPrefix }: { isPl: boolean; langPrefix: string }) {
  const bio = isPl
    ? "W 2019 zebrałem $330,000 w miesiąc na Woolet (smart wallet, raised via crowdfunding). Skalowałem Crowder.pro do 3M PLN przychodu. Dziś pomagam founderom budować 1000 true fans przed launchem przez 90-dniowy program MVA w JAY-23."
    : "In 2019 I raised $330,000 in a month for Woolet (a smart wallet, via crowdfunding). I scaled Crowder.pro to 3M PLN in revenue. Today I help founders build 1,000 true fans before launch through the 90-day MVA program at JAY-23.";

  return (
    <section className="mt-12 pt-10 border-t border-border">
      <div className="rounded-card border border-border bg-card p-6 md:p-8">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display font-bold text-xl shrink-0">
            MC
          </div>
          <div className="flex-1 min-w-[260px]">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              {isPl ? "O autorze" : "About the author"}
            </p>
            <h3 className="font-display text-xl font-bold mb-2">Marek Cieśla</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{bio}</p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.linkedin.com/in/marekciesla/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-label="Marek Cieśla on LinkedIn"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://medium.com/@marekciesla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Medium
              </a>
              <a
                href={`${langPrefix}/process`}
                className="ml-auto inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                {isPl ? "Zobacz program MVA →" : "See the MVA program →"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function buildBlogJsonLd(opts: {
  post: { title: string; excerpt: string | null; published_at: string; slug: string; author: string | null };
  langPrefix: string;
  lang: string;
  absoluteImage?: string;
  extras?: BlogStructuredExtras;
}) {
  const { post, langPrefix, lang, absoluteImage, extras } = opts;
  const url = `https://jay23.com${langPrefix}/blog/${post.slug}`;
  const inLanguage = lang === "pl" ? "pl-PL" : "en-US";

  const blogPosting: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description:
      post.excerpt ||
      (lang === "pl"
        ? `Przeczytaj "${post.title}" na blogu MVA Framework.`
        : `Read "${post.title}" on the MVA Framework blog.`),
    image: absoluteImage
      ? { "@type": "ImageObject", url: absoluteImage, width: 1200, height: 630 }
      : undefined,
    datePublished: post.published_at,
    dateModified: post.published_at,
    inLanguage,
    author: {
      "@type": "Person",
      name: post.author || "Marek Cieśla",
      url: "https://www.linkedin.com/in/marekciesla/",
      sameAs: ["https://www.linkedin.com/in/marekciesla/", "https://medium.com/@marekciesla"],
    },
    publisher: { "@id": "https://jay23.com/#organization" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const graph: Record<string, unknown>[] = [blogPosting];

  if (extras?.howTo) {
    graph.push({
      "@type": "HowTo",
      name: extras.howTo.name,
      description: extras.howTo.description,
      ...(extras.howTo.totalTime ? { totalTime: extras.howTo.totalTime } : {}),
      step: extras.howTo.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    });
  }

  if (extras?.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: extras.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
