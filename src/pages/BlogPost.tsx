import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { BLOG_EXTRAS, BlogFAQ, AuthorBio, buildBlogJsonLd } from "@/components/blog/BlogExtras";
import { buildBlogImageAlt } from "@/lib/blogImageAlt";

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  read_time: string | null;
  published_at: string;
};

// Legacy posts that should be noindex'd and excluded from sitemap/hreflang
const LEGACY_SLUGS = new Set([
  "reversible-zip-hoodies-as-one-of-the-best-multifunctional-clothes",
  "how-smart-is-a-smart-jacket",
  "anxious-about-money-change-worries-to-financial-action-plan",
  "glaze-a-superhero-prosthetic-arm",
  "the-problem-of-an-open-drink-in-a-can",
  "safety-is-in-fashion-this-hat-replaces-a-helmet",
  "the-best-travel-jacket-what-should-it-have",
  "smart-outfit-in-2021-what-is-a-reversible-hoodie",
  "woolet-classic-2-0-review-the-ultra-slim-trackable-wallet",
  "climbstation-review-17-reasons-why-its-the-future-of-indoor-climbing",
  "unlock-customer-needs-maximize-product-impact-discovery-roxart",
  "buying-an-electronic-chess-board-a-comprehensive-comparison",
  "motorhead-3d-collection---official-self-crowdfunded-tribute-for-fans-collectors-and-3d-print-enthusiasts",
  "kuduare-offline-reflex-trainer-gamers-esports-kickstarter",
  "twistpod-the-ultimate-8-in-1-outdoor-station-redefining-adventure-gear-kickstarter",
  "no-scroll-journal---a-new-kickstarter-project-that-helps-you-reclaim-time-and-focus",
  "top-meta-quest-2-accessories-for-2023",
  "best-fire-extinguishers-of-2022-crowdfunding-zone",
]);

/** Duplicate/legacy URLs that must consolidate onto the canonical slug. */
const SLUG_ALIASES: Record<string, string> = {
  "co-to-jest-minimum-viable-audience-mva-przewodnik-dla-founderow":
    "co-to-jest-minimum-viable-audience-mva-przewodnik",
};


/** Hand-written SEO titles (<=60 chars) for posts whose editorial title is too long. */
const SEO_TITLE_OVERRIDES: Record<string, string> = {
  "go-to-market-strategy-template-saas": "Go-to-Market Strategy Template for SaaS Founders (2026)",
  "product-launch-strategy-90-day-framework": "Product Launch Strategy: The 90-Day Framework",
};

/** Build SEO title kept within 60 chars, never cutting mid-word. */
function buildSeoTitle(title: string, slug?: string): string {
  const override = slug ? SEO_TITLE_OVERRIDES[slug] : undefined;
  if (override) return override;
  const suffix = " | JAY-23";
  const max = 60;
  if (title.length + suffix.length <= max) return `${title}${suffix}`;
  if (title.length <= max) return title;
  const cut = title.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 30 ? cut.slice(0, lastSpace) : cut).replace(/[\s—–\-–(,:;]+$/, "");
}


/** Slugs forming the "Kickstarter pre-launch" content cluster (EN). */
const PRELAUNCH_CLUSTER: { slug: string; anchor: string }[] = [
  { slug: "kickstarter-pre-launch-page-12-elements", anchor: "Kickstarter pre-launch page: 12 elements that convert" },
  { slug: "how-to-launch-kickstarter-campaign-2025-complete-guide", anchor: "How to launch a Kickstarter campaign (2026 guide)" },
  { slug: "hardware-startup-marketing-strategy-pre-launch", anchor: "Hardware startup marketing: pre-launch strategy" },
  { slug: "prelaunch-strategy-waitlist-conversion-framework", anchor: "Prelaunch waitlist conversion framework" },
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, langPrefix } = useLanguage();
  const isPl = lang === "pl";
  const [post, setPost] = useState<(Post & { counterpart_slug?: string | null }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasCounterpart, setHasCounterpart] = useState(false);
  const [related, setRelated] = useState<Pick<Post, "slug" | "title" | "excerpt" | "cover_image" | "category" | "read_time">[]>([]);

  const isLegacy = slug ? LEGACY_SLUGS.has(slug) : false;
  const aliasTarget = slug ? SLUG_ALIASES[slug] : undefined;




  useEffect(() => {
    const fetchPost = async () => {
      if (!slug || aliasTarget) return;

      const table = isPl ? "blog_posts_pl" : "blog_posts";
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) setPost(data as any);

      // Fetch related: same category first, then fallback to most recent
      if (data) {
        const cat = (data as any).category;
        let rel: any[] = [];
        if (cat) {
          const { data: sameCat } = await supabase
            .from(table)
            .select("slug, title, excerpt, cover_image, category, read_time")
            .eq("category", cat)
            .neq("slug", slug)
            .order("published_at", { ascending: false })
            .limit(3);
          rel = sameCat || [];
        }
        if (rel.length < 3) {
          const need = 3 - rel.length;
          const haveSlugs = [slug, ...rel.map((r) => r.slug)];
          const { data: fillers } = await supabase
            .from(table)
            .select("slug, title, excerpt, cover_image, category, read_time")
            .not("slug", "in", `(${haveSlugs.map((s) => `"${s}"`).join(",")})`)
            .order("published_at", { ascending: false })
            .limit(need);
          rel = [...rel, ...(fillers || [])];
        }
        setRelated(rel);
      }

      // Check counterpart: first by counterpart_slug, then by same slug
      if (!isLegacy && data) {
        const counterpartSlug = (data as any).counterpart_slug;
        const otherTable = isPl ? "blog_posts" : "blog_posts_pl";
        
        if (counterpartSlug) {
          const { data: cp } = await supabase
            .from(otherTable)
            .select("slug")
            .eq("slug", counterpartSlug)
            .maybeSingle();
          setHasCounterpart(!!cp);
        } else {
          const { data: cp } = await supabase
            .from(otherTable)
            .select("slug")
            .eq("slug", slug)
            .maybeSingle();
          setHasCounterpart(!!cp);
        }
      }

      setLoading(false);
    };
    fetchPost();
  }, [slug, isPl, isLegacy, aliasTarget]);

  if (aliasTarget) {
    return <Navigate to={`${langPrefix}/blog/${aliasTarget}`} replace />;
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-background">
        <MvaNavbar />
        <div className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-[800px] animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-12 bg-muted rounded w-full" />
            <div className="aspect-[16/9] bg-muted rounded-card" />
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded" style={{ width: `${70 + Math.random() * 30}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <MvaNavbar />
        <div className="pt-32 pb-16 px-6 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">{isPl ? "Nie znaleziono artykułu" : "Post not found"}</h1>
          <Link to={`${langPrefix}/blog`} className="text-primary hover:underline">{isPl ? "← Wróć do bloga" : "← Back to blog"}</Link>
        </div>
      </div>
    );
  }

  const counterpartSlug = post.counterpart_slug;
  const hreflangOverrides = counterpartSlug && hasCounterpart
    ? {
        en: isPl ? `/en/blog/${counterpartSlug}` : `/en/blog/${post.slug}`,
        pl: isPl ? `/pl/blog/${post.slug}` : `/pl/blog/${counterpartSlug}`,
      }
    : undefined;

  const absoluteImage = post.cover_image
    ? post.cover_image.startsWith("http")
      ? post.cover_image
      : `https://jay23.com${post.cover_image.startsWith("/") ? "" : "/"}${post.cover_image}`
    : undefined;

  const extras = BLOG_EXTRAS[post.slug];
  const autoImageMeta = buildBlogImageAlt(post, lang as "en" | "pl");
  const heroAlt = extras?.heroAlt || autoImageMeta.alt;
  const jsonLd = buildBlogJsonLd({ post, langPrefix, lang, absoluteImage, imageAlt: heroAlt, extras });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={buildSeoTitle(post.title, post.slug)}
        description={post.excerpt || (isPl ? `Przeczytaj "${post.title}" na blogu MVA Framework.` : `Read "${post.title}" on the MVA Framework blog.`)}
        canonical={`${langPrefix}/blog/${post.slug}`}
        ogImage={absoluteImage}
        ogImageAlt={heroAlt}
        type="article"
        publishedAt={post.published_at}
        lang={lang}
        author={post.author || "JAY-23"}
        noindex={isLegacy}
        noHreflang={isLegacy || !hasCounterpart}
        hreflangOverrides={hreflangOverrides}
        jsonLd={jsonLd}
      />
      <MvaNavbar />

      <article className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-[680px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to={`${langPrefix}/blog`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft size={16} />
              {isPl ? "Wróć do artykułów" : "Back to articles"}
            </Link>

            <div className="flex items-center gap-3 mb-5">
              {post.category && (
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              )}
              {post.read_time && (
                <span className="text-xs text-muted-foreground">{post.read_time}</span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight mb-6" style={{ textTransform: 'none' }}>
              {post.title}
            </h1>

            <div className="flex items-center gap-3 mb-10 pb-8 border-b border-border">
              {post.author && (
                <span className="text-sm font-semibold text-foreground">{post.author}</span>
              )}
              <span className="text-sm text-muted-foreground">
                {new Date(post.published_at).toLocaleDateString(isPl ? "pl-PL" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {post.cover_image && (
              <figure className="rounded-card overflow-hidden mb-12 -mx-4 md:-mx-10">
                <img
                  src={post.cover_image}
                  alt={heroAlt}
                  title={autoImageMeta.title}
                  width={1200}
                  height={675}
                  loading="eager"
                  decoding="async"
                  // @ts-expect-error fetchpriority is valid HTML
                  fetchpriority="high"
                  className="w-full h-auto"
                />
              </figure>
            )}

            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
            />

            {extras?.faqs?.length ? <BlogFAQ faqs={extras.faqs} isPl={isPl} /> : null}

            <AuthorBio isPl={isPl} langPrefix={langPrefix} />
          </motion.div>
        </div>
      </article>

      {/* Kickstarter Pre-Launch Cluster — internal linking for SEO */}
      {!isPl && PRELAUNCH_CLUSTER.some((c) => c.slug === post.slug) && (
        <section className="pb-12 px-6 border-t border-border pt-12">
          <div className="container mx-auto max-w-[680px]">
            <h2 className="font-display text-xl md:text-2xl font-bold mb-4">Read next — Kickstarter pre-launch playbook</h2>
            <ul className="space-y-2.5 text-[15px]">
              {PRELAUNCH_CLUSTER.filter((c) => c.slug !== post.slug).map((c) => (
                <li key={c.slug}>
                  <Link to={`/en/blog/${c.slug}`} className="text-primary hover:underline">{c.anchor}</Link>
                </li>
              ))}
              <li>
                <Link to="/en/quiz" className="text-primary hover:underline font-semibold">Calculate your MVA — free MVA calculator →</Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="pb-16 px-6 border-t border-border pt-16">
          <div className="container mx-auto max-w-[1200px]">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
              {isPl ? "Powiazane artykuly" : "Related articles"}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`${langPrefix}/blog/${r.slug}`}
                  className="group block rounded-card border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  {r.cover_image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={r.cover_image}
                        alt={buildBlogImageAlt(r, lang as "en" | "pl").alt}
                        width={1200}
                        height={750}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      {r.category && (
                        <span className="text-xs font-semibold text-primary">{r.category}</span>
                      )}
                      {r.read_time && (
                        <span className="text-xs text-muted-foreground">{r.read_time}</span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-[800px]">
          <div className="rounded-card border border-primary/20 bg-primary/5 p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              {isPl ? "Gotowy, żeby zbudować swoją publiczność?" : "Ready to Launch Your Campaign?"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              {isPl
                ? "MVA Framework od JAY-23 pomaga twórcom i founderom budować publiczność, optymalizować kampanie i maksymalizować przychody."
                : "The MVA Framework by JAY-23 helps hardware startups and crowdfunding creators build audiences, optimize campaigns, and maximize revenue."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={`${langPrefix}/book`} className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors">
                {isPl ? "Umów bezpłatną konsultację" : "Book a Free Strategy Call"}
              </Link>
              <Link to={`${langPrefix}/process`} className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 font-semibold hover:bg-accent transition-colors">
                {isPl ? "Zobacz nasz proces" : "See Our Process"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

/** Simple markdown-to-HTML converter */
function markdownToHtml(md: string): string {
  // Extract and convert tables first (before paragraph processing)
  const tableRegex = /(?:^|\n)((?:\|[^\n]+\|\n?)+)/g;
  let processed = md.replace(tableRegex, (match) => {
    const rows = match.trim().split('\n').filter(r => r.trim());
    if (rows.length < 2) return match;

    const isSeparator = (row: string) => /^\|[\s\-:|]+\|$/.test(row.trim());
    const hasSeparator = rows.length >= 2 && isSeparator(rows[1]);

    const parseRow = (row: string) =>
      row.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());

    let html = '<div class="table-wrapper"><table>';

    if (hasSeparator) {
      const headerCells = parseRow(rows[0]);
      html += '<thead><tr>' + headerCells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
      for (let i = 2; i < rows.length; i++) {
        const cells = parseRow(rows[i]);
        html += '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
      }
      html += '</tbody>';
    } else {
      html += '<tbody>';
      for (const row of rows) {
        const cells = parseRow(row);
        html += '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
      }
      html += '</tbody>';
    }

    html += '</table></div>';
    return '\n' + html + '\n';
  });

  processed = processed
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" width="1200" height="675" loading="lazy" decoding="async" style="width:100%;height:auto;" />')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h2>$1</h2>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br />");

  processed = processed.replace(/(<li>.*?<\/li>(\s*<br \/>)?)+/g, (match) => `<ul>${match}</ul>`);

  return `<p>${processed}</p>`;
}

export default BlogPost;
