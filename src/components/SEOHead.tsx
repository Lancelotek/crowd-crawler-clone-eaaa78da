import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedAt?: string;
  author?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = "https://jay23.com";
const DEFAULT_OG = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c643dc2e-a0ce-4c0b-a6d0-862a393851b2/id-preview-ad86e95c--f7ebc2bd-7b48-4d18-bace-faa12c1a5096.lovable.app-1771157652360.png";

const setMeta = (attr: string, key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG,
  type = "website",
  publishedAt,
  author,
  noindex = false,
  jsonLd,
}: SEOHeadProps) => {
  useEffect(() => {
    const fullTitle = title.includes("MVA") || title.includes("JAY-23") ? title : `${title} | MVA Framework by JAY-23`;
    document.title = fullTitle;

    // Standard meta
    setMeta("name", "description", description);
    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:site_name", "JAY-23 — MVA Framework");
    setMeta("property", "og:locale", "en_US");
    setMeta("property", "og:url", canonical ? `${BASE_URL}${canonical}` : BASE_URL);

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Article-specific
    if (type === "article" && publishedAt) {
      setMeta("property", "article:published_time", publishedAt);
    }
    if (author) {
      setMeta("property", "article:author", author);
    }

    // Canonical
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
    if (canonicalUrl) {
      setLink("canonical", canonicalUrl);
    }

    // Dynamic JSON-LD
    if (jsonLd) {
      const existingScript = document.querySelector('script[data-seo-jsonld]');
      if (existingScript) existingScript.remove();
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
      return () => { script.remove(); };
    }
  }, [title, description, canonical, ogImage, type, publishedAt, author, noindex, jsonLd]);

  return null;
};

export default SEOHead;
