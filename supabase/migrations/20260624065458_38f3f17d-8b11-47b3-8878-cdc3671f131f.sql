
CREATE TABLE public.click2pack_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  brand text,
  email text NOT NULL,
  monthly_revenue text,
  lang text NOT NULL DEFAULT 'pl',
  source text DEFAULT 'click2pack-landing',
  user_agent text,
  referrer text
);

GRANT INSERT ON public.click2pack_leads TO anon, authenticated;
GRANT ALL ON public.click2pack_leads TO service_role;

ALTER TABLE public.click2pack_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a click2pack lead"
  ON public.click2pack_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 200
    AND char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );
