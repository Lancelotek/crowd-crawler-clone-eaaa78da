import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mode, postIds, skipIndexNow } = await req.json();
    // mode: "translate" | "expand" | "both"
    // skipIndexNow: optional boolean — disables IndexNow ping after updates

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Fetch target posts
    let query = supabase.from("blog_posts").select("*");
    if (postIds?.length) {
      query = query.in("id", postIds);
    }
    const { data: posts, error } = await query;
    if (error) throw error;

    const results: any[] = [];

    for (const post of posts!) {
      const contentLength = post.content.length;
      const isPolish = /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(post.title + post.content);
      const isShort = contentLength < 500;

      if (mode === "translate" && !isPolish) continue;
      if (mode === "expand" && !isShort) continue;
      if (mode === "both" && !isPolish && !isShort) continue;

      let prompt = "";

      if (isPolish && isShort) {
        prompt = `You are an expert SEO content writer for a blog about crowdfunding, Kickstarter campaigns, and audience-building (MVA Framework by JAY-23).

The following blog post is in POLISH and is too short. Do TWO things:
1. Translate everything to fluent, natural English
2. Expand the content to 1500+ words, making it comprehensive, SEO-optimized, and valuable

Original title: ${post.title}
Original slug: ${post.slug}
Original excerpt: ${post.excerpt || ""}
Original category: ${post.category || ""}
Original content:
${post.content}

Return a JSON object with these fields:
- title: SEO-optimized English title (under 60 chars)
- slug: English SEO-friendly slug (lowercase, hyphens)
- excerpt: Compelling meta description in English (under 160 chars)
- content: Full article in Markdown (1500+ words), well-structured with H2/H3 headings, actionable insights, examples
- category: Keep or improve the category in English`;
      } else if (isPolish) {
        prompt = `You are an expert SEO content writer. Translate this Polish blog post to fluent, natural English. Maintain the same structure but improve SEO optimization.

Original title: ${post.title}
Original slug: ${post.slug}
Original excerpt: ${post.excerpt || ""}
Original category: ${post.category || ""}
Original content:
${post.content}

Return a JSON object with these fields:
- title: SEO-optimized English title (under 60 chars)
- slug: English SEO-friendly slug (lowercase, hyphens)
- excerpt: Compelling meta description in English (under 160 chars)
- content: Full article in Markdown, well-structured, SEO-optimized. If content is short (<500 words), expand to 1500+ words.
- category: Category in English`;
      } else if (isShort) {
        prompt = `You are an expert SEO content writer for a blog about crowdfunding, Kickstarter campaigns, and audience-building (MVA Framework by JAY-23).

This blog post is too short and needs to be expanded for SEO. Expand it to 1500+ words while keeping the original topic and perspective.

Original title: ${post.title}
Original slug: ${post.slug}  
Original excerpt: ${post.excerpt || ""}
Original category: ${post.category || ""}
Original content:
${post.content}

Return a JSON object with these fields:
- title: SEO-optimized title (under 60 chars, keep similar to original)
- slug: Keep the same slug: ${post.slug}
- excerpt: Compelling meta description (under 160 chars)
- content: Full expanded article in Markdown (1500+ words), well-structured with H2/H3 headings, actionable insights, real examples
- category: Keep: ${post.category}`;
      }

      if (!prompt) continue;

      console.log(`Processing post: ${post.slug} (polish: ${isPolish}, short: ${isShort})`);

      const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: "You are an expert SEO content writer." },
            { role: "user", content: prompt },
          ],
          tools: [{
            type: "function",
            function: {
              name: "update_blog_post",
              description: "Update a blog post with optimized content",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "SEO-optimized title under 60 chars" },
                  slug: { type: "string", description: "URL-friendly slug" },
                  excerpt: { type: "string", description: "Meta description under 160 chars" },
                  content: { type: "string", description: "Full article in Markdown, 1500+ words" },
                  category: { type: "string", description: "Article category in English" },
                },
                required: ["title", "slug", "excerpt", "content", "category"],
                additionalProperties: false,
              },
            },
          }],
          tool_choice: { type: "function", function: { name: "update_blog_post" } },
          temperature: 0.7,
        }),
      });

      if (!aiResponse.ok) {
        const errText = await aiResponse.text();
        console.error(`AI error for ${post.slug}: ${aiResponse.status} ${errText}`);
        results.push({ id: post.id, slug: post.slug, status: "error", error: errText });
        continue;
      }

      const aiData = await aiResponse.json();
      let parsed: any;
      try {
        const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
        parsed = JSON.parse(toolCall.function.arguments);
      } catch {
        console.error(`Failed to parse tool call for ${post.slug}`);
        results.push({ id: post.id, slug: post.slug, status: "parse_error" });
        continue;
      }

      // Update the post
      const { error: updateError } = await supabase
        .from("blog_posts")
        .update({
          title: parsed.title || post.title,
          slug: parsed.slug || post.slug,
          excerpt: parsed.excerpt || post.excerpt,
          content: parsed.content || post.content,
          category: parsed.category || post.category,
        })
        .eq("id", post.id);

      if (updateError) {
        console.error(`Update error for ${post.slug}:`, updateError);
        results.push({ id: post.id, slug: post.slug, status: "update_error", error: updateError.message });
      } else {
        console.log(`✅ Updated: ${post.slug} → ${parsed.slug}`);
        results.push({ id: post.id, oldSlug: post.slug, newSlug: parsed.slug, status: "success" });
      }

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 2000));
    }

    // Notify IndexNow (Bing/Yandex) about new/updated EN blog URLs.
    // The blog-optimizer writes to the EN `blog_posts` table, so we ping /en/blog/<slug>.
    let indexnow: any = { skipped: true };
    if (!skipIndexNow) {
      const successUrls = results
        .filter((r) => r.status === "success" && r.newSlug)
        .map((r) => `https://jay23.com/en/blog/${r.newSlug}`);

      if (successUrls.length > 0) {
        try {
          const pingRes = await fetch(
            `${Deno.env.get("SUPABASE_URL")}/functions/v1/indexnow-ping`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
              },
              body: JSON.stringify({ urls: successUrls }),
            },
          );
          indexnow = {
            skipped: false,
            submitted: successUrls.length,
            status: pingRes.status,
            body: await pingRes.json().catch(() => null),
          };
          console.log(`[blog-optimizer] IndexNow pinged ${successUrls.length} url(s) → ${pingRes.status}`);
        } catch (pingErr) {
          console.error("[blog-optimizer] IndexNow ping failed:", pingErr);
          indexnow = { skipped: false, error: pingErr instanceof Error ? pingErr.message : String(pingErr) };
        }
      } else {
        indexnow = { skipped: true, reason: "no successful updates" };
      }
    }

    return new Response(JSON.stringify({ results, indexnow }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("blog-optimizer error:", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
