import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Click2Pack PL group
const LIVE_GROUP_ID = '191139495358236092';
const NOTIFY_TO = 'marek@jay23.com';

const esc = (v: unknown) =>
  String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MAILERLITE_API_KEY = Deno.env.get('MAILERLITE_API_KEY');
    if (!MAILERLITE_API_KEY) {
      throw new Error('MAILERLITE_API_KEY is not configured');
    }

    const payload = await req.json();
    const {
      name, brand, email, shop, category, revenue, selling, message,
      locale, calculator_result, page_url, form_type,
    } = payload ?? {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !emailRegex.test(String(email))) {
      return new Response(
        JSON.stringify({ error: 'Valid name and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const s = (v: unknown, n = 200) => String(v ?? '').trim().slice(0, n);

    // 1. MailerLite subscriber
    const mlRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: s(email, 320),
        fields: {
          name: s(name),
          company: s(brand),
          live_brand: s(brand),
          live_shop: s(shop, 300),
          live_category: s(category, 100),
          live_revenue: s(revenue, 100),
          live_selling: s(selling, 100),
          live_message: s(message, 1000),
          live_calc_result: calculator_result != null ? String(calculator_result).slice(0, 40) : '',
          live_lang: locale === 'en' ? 'en' : 'pl',
          signup_source: form_type === 'live_training' ? 'jay23-live-training' : 'jay23-live-audit',
        },
        groups: [LIVE_GROUP_ID],
        status: 'active',
      }),
    });

    const mlData = await mlRes.json().catch(() => ({}));
    if (!mlRes.ok) {
      console.error('MailerLite API error:', JSON.stringify(mlData));
      throw new Error(`MailerLite API call failed [${mlRes.status}]: ${JSON.stringify(mlData)}`);
    }

    // 2. Notification email (best effort — never blocks the lead)
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const FROM = Deno.env.get('EMAIL_FROM') ?? 'Jay23 LIVE <noreply@jay23.com>';
    let notified = false;
    if (RESEND_API_KEY) {
      try {
        const rows = [
          ['Imię', name], ['Marka', brand], ['E-mail', email], ['Sklep', shop],
          ['Kategoria', category], ['Obrót online', revenue], ['TikTok Shop', selling],
          ['Wynik kalkulatora', calculator_result], ['Język', locale],
          ['Formularz', form_type], ['Strona', page_url], ['Wiadomość', message],
        ]
          .filter(([, v]) => v !== undefined && v !== null && String(v) !== '')
          .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666">${esc(k)}</td><td style="padding:6px 12px"><strong>${esc(v)}</strong></td></tr>`)
          .join('');

        const mailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: FROM,
            to: [NOTIFY_TO],
            reply_to: s(email, 320),
            subject: `Jay23 LIVE — nowy lead: ${s(brand) || s(name)}`,
            html: `<h2 style="font-family:sans-serif">Nowy lead z Jay23 LIVE</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
          }),
        });
        if (!mailRes.ok) {
          console.error('Resend error:', mailRes.status, await mailRes.text());
        } else {
          notified = true;
        }
      } catch (mailErr) {
        console.error('Notification email failed:', mailErr);
      }
    } else {
      console.warn('RESEND_API_KEY not configured — skipping notification email');
    }

    return new Response(
      JSON.stringify({ success: true, notified }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error: unknown) {
    console.error('live-audit-subscribe error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
