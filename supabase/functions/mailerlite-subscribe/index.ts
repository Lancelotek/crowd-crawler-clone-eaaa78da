import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MAILERLITE_API_KEY = Deno.env.get('MAILERLITE_API_KEY');
    if (!MAILERLITE_API_KEY) {
      throw new Error('MAILERLITE_API_KEY is not configured');
    }

    const { name, email, quizData } = await req.json();

    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: 'Name and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const fields: Record<string, string> = { name };

    if (quizData) {
      if (quizData.product) fields.quiz_product = String(quizData.product);
      if (quizData.revenue) fields.quiz_revenue = String(quizData.revenue);
      if (quizData.price) fields.quiz_price = String(quizData.price);
      if (quizData.niche) fields.quiz_niche = String(quizData.niche);
      if (quizData.uvp) fields.quiz_uvp = String(quizData.uvp);
      if (quizData.targetAudience) fields.quiz_target = String(quizData.targetAudience);
      if (quizData.currentAudience) fields.quiz_audience = String(quizData.currentAudience);
      if (quizData.stage) fields.quiz_stage = String(quizData.stage);
      if (quizData.mvaResult != null) fields.quiz_mva_result = String(quizData.mvaResult);
    }

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        fields,
        groups: ['95856922778929103'],
        status: 'active',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MailerLite API error:', JSON.stringify(data));
      throw new Error(`MailerLite API call failed [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
