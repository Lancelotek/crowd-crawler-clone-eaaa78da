
ALTER TABLE public.saved_leads
  ADD COLUMN IF NOT EXISTS x_handle text,
  ADD COLUMN IF NOT EXISTS x_url text,
  ADD COLUMN IF NOT EXISTS x_bio text,
  ADD COLUMN IF NOT EXISTS x_followers text,
  ADD COLUMN IF NOT EXISTS recent_x_posts text,
  ADD COLUMN IF NOT EXISTS email_found text,
  ADD COLUMN IF NOT EXISTS email_source text,
  ADD COLUMN IF NOT EXISTS project_mentions text,
  ADD COLUMN IF NOT EXISTS product_stage text;
