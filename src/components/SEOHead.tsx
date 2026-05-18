import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedAt?: string;
  author?: string;
  /** Prefer `noIndex`. `noindex` kept for backward compatibility. */
  noIndex?: boolean;
  noindex?: boolean;
  noHreflang?: boolean;
  /** Prefer `schemaJson`. `jsonLd` kept for backward compatibility. */
  schemaJson?: Record<string, unknown> | Record<string, unknown>[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  lang?: string;
  hreflangOverrides?: { en: string; pl: string };
}

const BASE_URL = "https://jay23.com";
const DEFAULT_OG = "https://jay23.com/og-default.jpg";

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG,
  type = "website",
  publishedAt,
  author,
  noIndex,
  noindex,
  noHreflang = false,
  schemaJson,
  jsonLd,
  lang,
  hreflangOverrides,
}: SEOHeadProps) => {
  const isNoIndex = noIndex ?? noindex ?? false;
  const schema = schemaJson ?? jsonLd;
  const fullTitle = title.includes("MVA") || title.includes("JAY-23") ? title : `${title} | MVA Framework by JAY-23`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  let enUrl: string | undefined;
  let plUrl: string | undefined;
  if (canonical && !noHreflang) {
    if (hreflangOverrides) {
      enUrl = `${BASE_URL}${hreflangOverrides.en}`;
      plUrl = `${BASE_URL}${hreflangOverrides.pl}`;
    } else {
      const pathWithoutLang = canonical.replace(/^\/(en|pl)/, "");
      enUrl = `${BASE_URL}/en${pathWithoutLang}`;
      plUrl = `${BASE_URL}/pl${pathWithoutLang}`;
    }
  }
  const selfUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  const selfLang = lang || "en";

  const jsonLdItems = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      {lang && <html lang={lang} />}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={isNoIndex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}
      />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="JAY-23 — MVA Framework" />
      <meta property="og:locale" content={lang === "pl" ? "pl_PL" : "en_US"} />
      <meta property="og:locale:alternate" content={lang === "pl" ? "en_US" : "pl_PL"} />
      <meta property="og:url" content={canonicalUrl || BASE_URL} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {type === "article" && publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {author && <meta property="article:author" content={author} />}

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {canonical && !noHreflang && enUrl && <link rel="alternate" hrefLang="en" href={enUrl} />}
      {canonical && !noHreflang && plUrl && <link rel="alternate" hrefLang="pl" href={plUrl} />}
      {canonical && !noHreflang && enUrl && <link rel="alternate" hrefLang="x-default" href={enUrl} />}
      {canonical && noHreflang && selfUrl && <link rel="alternate" hrefLang={selfLang} href={selfUrl} />}
      {canonical && noHreflang && selfUrl && <link rel="alternate" hrefLang="x-default" href={selfUrl} />}

      {jsonLdItems.map((item, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(item)}</script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
