import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, langPrefix } = useLanguage();
  const isPl = lang === "pl";
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const table = isPl ? "blog_posts_pl" : "blog_posts";
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) setPost(data as Post);
      setLoading(false);
    };
    fetchPost();
  }, [slug, isPl]);

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

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.title}
        description={post.excerpt || (isPl ? `Przeczytaj "${post.title}" na blogu MVA Framework.` : `Read "${post.title}" on the MVA Framework blog.`)}
        canonical={`${langPrefix}/blog/${post.slug}`}
        ogImage={post.cover_image || undefined}
        type="article"
        publishedAt={post.published_at}
        lang={lang}
        author={post.author || "JAY-23"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt || (isPl ? `Przeczytaj "${post.title}" na blogu MVA Framework.` : `Read "${post.title}" on the MVA Framework blog.`),
          "image": post.cover_image || undefined,
          "datePublished": post.published_at,
          "dateModified": post.published_at,
          "author": { "@type": "Person", "name": post.author || "Marek Cieśla", "url": "https://jay23.com" },
          "publisher": { "@type": "Organization", "name": "JAY-23", "logo": { "@type": "ImageObject", "url": "https://jay23.com/logo.png" } },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://jay23.com${langPrefix}/blog/${post.slug}` },
          "inLanguage": lang,
        }}
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
              <div className="rounded-card overflow-hidden mb-12 -mx-4 md:-mx-10">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
            />
          </motion.div>
        </div>
      </article>

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
  let html = md
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // H3
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    // H2
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    // H1
    .replace(/^# (.+)$/gm, "<h2>$1</h2>")
    // Unordered lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Paragraphs
    .replace(/\n\n/g, "</p><p>")
    // Line breaks
    .replace(/\n/g, "<br />");

  // Wrap list items
  html = html.replace(/(<li>.*?<\/li>(\s*<br \/>)?)+/g, (match) => `<ul>${match}</ul>`);

  return `<p>${html}</p>`;
}

export default BlogPost;
