
CREATE TABLE public.saved_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  domain TEXT,
  founder_name TEXT,
  founder_title TEXT,
  founder_linkedin TEXT,
  linkedin_url TEXT,
  company_linkedin TEXT,
  email_pattern TEXT,
  email_confidence TEXT,
  employees TEXT,
  employee_count TEXT,
  product_description TEXT,
  company_description TEXT,
  funding_stage TEXT,
  kickstarter_signal TEXT,
  buying_signal TEXT NOT NULL DEFAULT 'COLD',
  signal_reason TEXT,
  recent_news TEXT,
  data_confidence INTEGER DEFAULT 0,
  source_url TEXT,
  notes TEXT,
  enriched BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to saved_leads" ON public.saved_leads
  FOR ALL TO anon, authenticated
  USING (true)
  WITH CHECK (true);
