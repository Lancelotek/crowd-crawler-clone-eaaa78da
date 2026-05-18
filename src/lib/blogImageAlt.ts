/**
 * Auto-generate descriptive alt text + image metadata for blog cover images
 * based on the post's title, category and language.
 *
 * Goal: every cover gets a unique, keyword-rich, human-readable alt that
 * doubles as og:image:alt and schema.org ImageObject caption — without
 * requiring manual entry per post.
 */

export type BlogImageMeta = {
  alt: string;
  caption: string;
  title: string;
};

type MinimalPost = {
  title: string;
  excerpt?: string | null;
  category?: string | null;
};

/** Strip trailing punctuation and collapse whitespace. */
function clean(s: string): string {
  return s.replace(/\s+/g, " ").replace(/[.\s]+$/g, "").trim();
}

/** Hard cap at maxLen, cutting on the last whitespace before the limit. */
function clamp(s: string, maxLen: number): string {
  if (s.length <= maxLen) return s;
  const cut = s.slice(0, maxLen - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > maxLen - 20 ? cut.slice(0, lastSpace) : cut) + "…";
}

/**
 * Build an alt text from post metadata. Format:
 *   "{Title} — {category context}, JAY-23 blog cover"  (EN)
 *   "{Title} — {category context}, okładka artykułu JAY-23"  (PL)
 */
export function buildBlogImageAlt(post: MinimalPost, lang: "en" | "pl"): BlogImageMeta {
  const isPl = lang === "pl";
  const title = clean(post.title);
  const category = post.category ? clean(post.category) : "";

  const categoryContext = category
    ? isPl
      ? `kategoria ${category.toLowerCase()}`
      : `${category.toLowerCase()} insights`
    : isPl
      ? "MVA Framework"
      : "MVA Framework";

  const suffix = isPl ? "okładka artykułu JAY-23" : "JAY-23 blog cover";

  const rawAlt = `${title} — ${categoryContext}, ${suffix}`;
  const alt = clamp(rawAlt, 125); // safely under the 125-char a11y ceiling

  const caption = isPl
    ? clamp(post.excerpt ? clean(post.excerpt) : `${title} — JAY-23`, 200)
    : clamp(post.excerpt ? clean(post.excerpt) : `${title} — JAY-23`, 200);

  const imageTitle = clamp(title, 80);

  return { alt, caption, title: imageTitle };
}
