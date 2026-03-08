import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import SEOHead from "@/components/SEOHead";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  read_time: string | null;
  published_at: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_image, category, author, read_time, published_at")
        .order("published_at", { ascending: false });

      if (!error && data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog — Audience Building & Launch Strategy Articles"
        description="Expert articles on audience building, product launches, crowdfunding, and the MVA Framework. Actionable strategies for founders and creators."
        canonical="/blog"
      />
      <MvaNavbar />

      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Articles by<br />
              <span className="text-primary">CrowdFunding Zone</span>
            </h1>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-card border border-border bg-card animate-pulse">
                  <div className="aspect-[16/10] bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-6 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground text-lg">No posts yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block rounded-card border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
                  >
                    {post.cover_image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        {post.category && (
                          <span className="text-xs font-semibold text-primary">{post.category}</span>
                        )}
                        {post.read_time && (
                          <span className="text-xs text-muted-foreground">{post.read_time}</span>
                        )}
                      </div>
                      <h2 className="font-display text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      {post.author && (
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          {post.author}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Blog;
