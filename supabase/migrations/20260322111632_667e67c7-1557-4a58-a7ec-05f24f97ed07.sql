CREATE TABLE public.blog_posts_pl (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  cover_image text,
  category text DEFAULT 'Marketing',
  author text DEFAULT 'Marek Cieśla',
  read_time text DEFAULT '2 min',
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts_pl ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read polish blog posts" ON public.blog_posts_pl
  FOR SELECT TO anon, authenticated USING (true);