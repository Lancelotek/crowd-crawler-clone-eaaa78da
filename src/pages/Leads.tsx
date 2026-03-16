import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import {
  Lock, Search, Download, Flame, ThermometerSun, Snowflake,
  Loader2, Terminal, Sparkles, Mail, Linkedin, User,
  ChevronDown, ChevronUp, Send, Eye, EyeOff, Trash2,
  Copy, Check, RefreshCw, FileText, FileJson
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import jay23Logo from "@/assets/jay23-logo.png";

const PASSWORD = "woolet";

const DEFAULT_QUERIES = [
  'hardware startup "Kickstarter" "pre-launch" 2025 2026 wearables OR gadgets OR EDC site:linkedin.com OR site:kickstarter.com',
  'seed funded hardware startup crowdfunding prototype 2025 smart gadget OR wearable OR "smart home"',
  '"launching on Kickstarter" OR "Kickstarter campaign" hardware gadget startup 2026',
  'site:producthunt.com upcoming hardware gadget "coming soon" 2025 2026',
  'site:indiegogo.com "coming soon" smart hardware wearable outdoor gear',
  '"Series A" OR "seed round" hardware startup consumer electronics 2024 2025 crowdfunding',
  'hardware startup "hiring" "community manager" OR "marketing manager" Kickstarter pre-launch',
];

interface Lead {
  company_name: string;
  domain: string;
  founder_name: string;
  founder_linkedin: string;
  employees: string;
  product_description: string;
  funding_stage: string;
  kickstarter_signal: string;
  buying_signal: "HOT" | "WARM" | "COLD";
  signal_reason: string;
  source_url: string;
  notes: string;
  founder_title?: string;
  linkedin_url?: string;
  company_linkedin?: string;
  email_pattern?: string;
  email_confidence?: string;
  employee_count?: string;
  company_description?: string;
  recent_news?: string;
  data_confidence?: number;
  enriched?: boolean;
  // Deep enrichment fields
  x_handle?: string;
  x_url?: string;
  x_bio?: string;
  x_followers?: string;
  recent_x_posts?: string;
  email_found?: string;
  email_source?: string;
  project_mentions?: string;
  product_stage?: string;
}

interface EmailSequence {
  lead: Lead;
  sequence: {
    touch1: { subject: string; body: string; send_day: number };
    touch2: { subject: string; body: string; send_day: number };
    touch3: { subject: string; body: string; send_day: number };
  };
  first_name: string;
  last_name: string;
  email: string;
}

// ─── CSV exports ─────────────────────────────────────
const LEAD_CSV_FIELDS: (keyof Lead)[] = [
  "company_name", "domain", "founder_name", "founder_title",
  "x_handle", "x_url", "x_bio", "x_followers",
  "founder_linkedin", "linkedin_url", "company_linkedin",
  "email_found", "email_pattern", "email_confidence", "email_source",
  "employees", "employee_count", "product_description", "company_description",
  "funding_stage", "kickstarter_signal", "buying_signal", "signal_reason",
  "product_stage", "recent_news", "project_mentions", "recent_x_posts",
  "data_confidence", "source_url", "notes",
];

function exportLeadCSV(leads: Lead[]) {
  const header = LEAD_CSV_FIELDS.join(",");
  const rows = leads.map((l) =>
    LEAD_CSV_FIELDS.map((f) => `"${(String(l[f] ?? "")).replace(/"/g, '""')}"`).join(",")
  );
  downloadCSV(header + "\n" + rows.join("\n"), "leads");
}

const SEQ_CSV_FIELDS = [
  "first_name", "last_name", "email", "company", "domain", "buying_signal",
  "subject_1", "body_1", "delay_1",
  "subject_2", "body_2", "delay_2",
  "subject_3", "body_3", "delay_3",
];

function exportSequenceCSV(sequences: EmailSequence[]) {
  const header = SEQ_CSV_FIELDS.join(",");
  const rows = sequences.map((s) => {
    const vals: Record<string, string> = {
      first_name: s.first_name,
      last_name: s.last_name,
      email: s.email,
      company: s.lead.company_name,
      domain: s.lead.domain,
      buying_signal: s.lead.buying_signal,
      subject_1: s.sequence.touch1?.subject || "",
      body_1: s.sequence.touch1?.body || "",
      delay_1: "0",
      subject_2: s.sequence.touch2?.subject || "",
      body_2: s.sequence.touch2?.body || "",
      delay_2: "4",
      subject_3: s.sequence.touch3?.subject || "",
      body_3: s.sequence.touch3?.body || "",
      delay_3: "9",
    };
    return SEQ_CSV_FIELDS.map((f) => `"${(vals[f] || "").replace(/"/g, '""')}"`).join(",");
  });
  downloadCSV(header + "\n" + rows.join("\n"), "sequences");
}

function downloadCSV(content: string, prefix: string) {
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${prefix}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Shared components ──────────────────────────────
function SignalBadge({ signal }: { signal: string }) {
  if (signal === "HOT")
    return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 gap-1"><Flame className="w-3 h-3" /> HOT</Badge>;
  if (signal === "WARM")
    return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 gap-1"><ThermometerSun className="w-3 h-3" /> WARM</Badge>;
  return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 gap-1"><Snowflake className="w-3 h-3" /> COLD</Badge>;
}

function ConfidenceBadge({ value }: { value?: number }) {
  if (value === undefined || value === null) return null;
  const v = Number(value);
  const color = v >= 70 ? "text-green-400 bg-green-500/20 border-green-500/30"
    : v >= 40 ? "text-amber-400 bg-amber-500/20 border-amber-500/30"
    : "text-red-400 bg-red-500/20 border-red-500/30";
  return <Badge className={`${color} gap-1 text-xs`}>{v}%</Badge>;
}

function val(v?: string) {
  return v && v !== "UNKNOWN" ? v : null;
}

function LogToggle({ label, logs, show, toggle }: { label: string; logs: string[]; show: boolean; toggle: () => void }) {
  return (
    <div>
      <button onClick={toggle} className="flex items-center gap-2 text-sm text-white/50 hover:text-white/70 transition-colors">
        <Terminal className="w-4 h-4" />
        {show ? "Hide" : "Show"} {label} ({logs.length})
      </button>
      {show && (
        <pre className="mt-2 p-4 bg-black/40 rounded-lg text-xs text-green-400/80 font-mono overflow-x-auto max-h-60 overflow-y-auto">
          {logs.join("\n")}
        </pre>
      )}
    </div>
  );
}

function Detail({ label, value, isLink, confidence }: { label: string; value: string | null; isLink?: boolean; confidence?: string | null }) {
  return (
    <div>
      <p className="text-white/40 uppercase tracking-wider mb-0.5 text-xs">{label}</p>
      {value ? (
        isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary break-all text-xs">{value}</a>
        ) : (
          <p className="text-white/80 break-words text-xs">
            {value}
            {confidence && <span className="text-white/40 ml-1">({confidence})</span>}
          </p>
        )
      ) : (
        <p className="text-white/20 text-xs">—</p>
      )}
    </div>
  );
}

// ─── Main component ─────────────────────────────────
export default function Leads() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  // Research state
  const [queries, setQueries] = useState(DEFAULT_QUERIES.join("\n"));
  const [leadsTarget, setLeadsTarget] = useState(20);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [enriching, setEnriching] = useState(false);
  const [enrichLogs, setEnrichLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [showEnrichLogs, setShowEnrichLogs] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Sequencer state
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [seqLogs, setSeqLogs] = useState<string[]>([]);
  const [showSeqLogs, setShowSeqLogs] = useState(false);
  const [generatingSeqs, setGeneratingSeqs] = useState(false);
  const [regeneratingLead, setRegeneratingLead] = useState<string | null>(null);
  const [hotOnly, setHotOnly] = useState(false);
  const [seqConfig, setSeqConfig] = useState({
    senderName: "Marek",
    caseStudy: "Bluetooth tracking smart wallet – $330K raised on Kickstarter after we built their pre-launch community from 0",
    extraCaseStudy: "",
    language: "English",
  });
  const [expandedSeq, setExpandedSeq] = useState<number | null>(null);
  const [seqProgress, setSeqProgress] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAuth = () => {
    if (pw === PASSWORD) { setAuthed(true); setPwError(false); } else { setPwError(true); }
  };

  // Load saved leads from DB on auth
  useEffect(() => {
    if (!authed) return;
    (async () => {
      const { data } = await supabase.from("saved_leads").select("*").order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setLeads(data.map((r: any) => ({ ...r, enriched: r.enriched ?? false })));
      }
    })();
  }, [authed]);

  // Save leads to DB whenever they change
  const saveLeadsToDB = useCallback(async (leadsToSave: Lead[]) => {
    if (leadsToSave.length === 0) return;
    // Upsert by company_name
    for (const lead of leadsToSave) {
      const { company_name, ...rest } = lead;
      await supabase.from("saved_leads").upsert(
        { company_name, ...rest },
        { onConflict: "company_name" }
      );
    }
  }, []);

  const clearAllLeads = useCallback(async () => {
    if (!confirm("Na pewno usunąć wszystkie leady z bazy?")) return;
    await supabase.from("saved_leads").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    setLeads([]);
    setSequences([]);
  }, []);

  const runSearch = useCallback(async () => {
    setLoading(true);
    setLogs([]);
    try {
      const queryList = queries.split("\n").map((q) => q.trim()).filter(Boolean);
      const { data, error } = await supabase.functions.invoke("lead-researcher", {
        body: { queries: queryList, leadsTarget, alreadyFound: leads.map((l) => l.company_name) },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      const newLeads = data.leads || [];
      setLeads((prev) => [...prev, ...newLeads]);
      setLogs(data.logs || []);
      await saveLeadsToDB(newLeads);
    } catch (e: any) {
      setLogs((prev) => [...prev, `Error: ${e.message}`]);
    } finally {
      setLoading(false);
    }
  }, [queries, leadsTarget, leads]);

  const runEnrichment = useCallback(async () => {
    const unenriched = leads.filter((l) => !l.enriched);
    if (unenriched.length === 0) return;
    setEnriching(true);
    setEnrichLogs([`Starting enrichment of ${unenriched.length} leads...`]);
    try {
      const { data, error } = await supabase.functions.invoke("lead-enricher", {
        body: { leads: unenriched },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      const enrichedLeads = (data.leads || []).map((l: any) => ({ ...l, enriched: true }));
      setLeads((prev) => {
        const enrichedNames = new Set(enrichedLeads.map((l: Lead) => l.company_name));
        const updated = [...prev.filter((l) => !enrichedNames.has(l.company_name)), ...enrichedLeads];
        return updated;
      });
      setEnrichLogs(data.logs || []);
      await saveLeadsToDB(enrichedLeads);
    } catch (e: any) {
      setEnrichLogs((prev) => [...prev, `Error: ${e.message}`]);
    } finally {
      setEnriching(false);
    }
  }, [leads]);

  const runSequencer = useCallback(async () => {
    let eligible = leads.filter((l) => val(l.email_pattern));
    if (hotOnly) eligible = eligible.filter((l) => l.buying_signal === "HOT");
    if (eligible.length === 0) return;

    setGeneratingSeqs(true);
    setSeqProgress(0);
    setSeqLogs([`Generating sequences for ${eligible.length} leads...`]);
    try {
      const { data, error } = await supabase.functions.invoke("email-sequencer", {
        body: { leads: eligible, config: seqConfig },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setSequences(data.sequences || []);
      setSeqLogs(data.logs || []);
      setSeqProgress(100);
    } catch (e: any) {
      setSeqLogs((prev) => [...prev, `Error: ${e.message}`]);
    } finally {
      setGeneratingSeqs(false);
    }
  }, [leads, hotOnly, seqConfig]);

  const regenerateOne = useCallback(async (companyName: string) => {
    const lead = leads.find((l) => l.company_name === companyName);
    if (!lead) return;
    setRegeneratingLead(companyName);
    try {
      const { data, error } = await supabase.functions.invoke("email-sequencer", {
        body: { singleLead: lead, config: seqConfig },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setSequences((prev) =>
        prev.map((s) => s.lead.company_name === companyName ? data.sequence : s)
      );
      toast({ title: "Sekwencja odświeżona", description: companyName });
    } catch (e: any) {
      toast({ title: "Błąd", description: e.message, variant: "destructive" });
    } finally {
      setRegeneratingLead(null);
    }
  }, [leads, seqConfig]);

  const copyEmail = useCallback((subject: string, body: string, id: string) => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const exportSequenceJSON = useCallback(() => {
    const json = JSON.stringify(sequences.map((s) => ({ lead: s.lead, sequence: s.sequence })), null, 2);
    downloadCSV(json, "sequences_json");
  }, [sequences]);

  const exportSequenceTXT = useCallback(() => {
    const lines = sequences.map((s) => {
      const divider = "─".repeat(50);
      const header = `${divider}\n${s.lead.company_name} | ${s.first_name} ${s.last_name} | ${s.email} | ${s.lead.buying_signal}\n${divider}`;
      const touches = (["touch1", "touch2", "touch3"] as const).map((t, i) => {
        const touch = s.sequence[t];
        if (!touch) return "";
        return `\n[Touch ${i + 1} · Day ${touch.send_day}]\nSubject: ${touch.subject}\n\n${touch.body}`;
      }).join("");
      return header + touches + "\n";
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sequences_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [sequences]);

  const hot = leads.filter((l) => l.buying_signal === "HOT").length;
  const warm = leads.filter((l) => l.buying_signal === "WARM").length;
  const cold = leads.filter((l) => l.buying_signal === "COLD").length;
  const enrichedCount = leads.filter((l) => l.enriched).length;
  const unenrichedCount = leads.length - enrichedCount;
  const withEmail = leads.filter((l) => val(l.email_pattern)).length;

  const sortedLeads = [...leads].sort((a, b) => {
    const order = { HOT: 0, WARM: 1, COLD: 2 };
    return (order[a.buying_signal] ?? 3) - (order[b.buying_signal] ?? 3);
  });

  // ─── Password Gate ───────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[hsl(var(--dark-bg))] flex items-center justify-center px-4">
        <Card className="w-full max-w-sm bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))]">
          <CardHeader className="text-center space-y-4">
            <img src={jay23Logo} alt="JAY-23" className="h-8 mx-auto opacity-70" />
            <CardTitle className="text-white text-lg font-medium flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" /> Lead Researcher
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              className="bg-[hsl(var(--dark-bg))] border-[hsl(var(--dark-border))] text-white"
            />
            {pwError && <p className="text-red-400 text-sm text-center">Wrong password</p>}
            <Button onClick={handleAuth} className="w-full bg-primary hover:bg-primary/90">Access</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Main UI ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[hsl(var(--dark-bg))] text-white">
      {/* Header */}
      <header className="border-b border-[hsl(var(--dark-border))] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={jay23Logo} alt="JAY-23" className="h-6 opacity-70" />
          <span className="text-white/60 text-sm font-mono">/ Lead Researcher</span>
          <a href="https://airtable.com/appOwc6kWVZuq167g/shrMmIpcwU1V3noqK" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="bg-transparent border-[hsl(var(--dark-border))] text-white/60 hover:text-white hover:bg-white/5 gap-2">
              <FileText className="w-4 h-4" /> Airtable
            </Button>
          </a>
        </div>
        <div className="flex items-center gap-3">
          {leads.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={runEnrichment} disabled={enriching || unenrichedCount === 0}
                className="border-[hsl(var(--dark-border))] text-white/80 hover:text-white bg-transparent gap-2">
                {enriching ? <><Loader2 className="w-4 h-4 animate-spin" /> Enriching...</>
                  : <><Sparkles className="w-4 h-4" /> Enrich {unenrichedCount > 0 ? `(${unenrichedCount})` : ""}</>}
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportLeadCSV(leads)}
                className="border-[hsl(var(--dark-border))] text-white/80 hover:text-white bg-transparent gap-2">
                <Download className="w-4 h-4" /> Leads CSV
              </Button>
              <Button variant="outline" size="sm" onClick={clearAllLeads}
                className="border-destructive/50 text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent gap-2">
                <Trash2 className="w-4 h-4" /> Clear All
              </Button>
            </>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Tabs defaultValue="research" className="space-y-6">
          <TabsList className="bg-[hsl(var(--dark-card))] border border-[hsl(var(--dark-border))]">
            <TabsTrigger value="research" className="data-[state=active]:bg-primary/20 data-[state=active]:text-white text-white/50">
              <Search className="w-4 h-4 mr-2" /> Research
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-primary/20 data-[state=active]:text-white text-white/50">
              <Eye className="w-4 h-4 mr-2" /> Szablony
            </TabsTrigger>
            <TabsTrigger value="sequences" className="data-[state=active]:bg-primary/20 data-[state=active]:text-white text-white/50">
              <Send className="w-4 h-4 mr-2" /> Sequences {sequences.length > 0 && `(${sequences.length})`}
            </TabsTrigger>
            <TabsTrigger value="domains" className="data-[state=active]:bg-primary/20 data-[state=active]:text-white text-white/50">
              <Mail className="w-4 h-4 mr-2" /> Domains
            </TabsTrigger>
          </TabsList>

          {/* ─── RESEARCH TAB ─── */}
          <TabsContent value="research" className="space-y-8">
            <div className="grid md:grid-cols-[1fr_300px] gap-6">
              <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))]">
                <CardHeader><CardTitle className="text-white text-base">Search Queries</CardTitle></CardHeader>
                <CardContent>
                  <Textarea value={queries} onChange={(e) => setQueries(e.target.value)} rows={8}
                    className="bg-[hsl(var(--dark-bg))] border-[hsl(var(--dark-border))] text-white/90 text-sm font-mono"
                    placeholder="One Brave Search query per line..." />
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))]">
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">Target leads</label>
                      <Input type="number" value={leadsTarget} onChange={(e) => setLeadsTarget(Number(e.target.value))}
                        min={1} max={100} className="bg-[hsl(var(--dark-bg))] border-[hsl(var(--dark-border))] text-white" />
                    </div>
                    <Button onClick={runSearch} disabled={loading} className="w-full bg-primary hover:bg-primary/90 gap-2">
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Researching...</> : <><Search className="w-4 h-4" /> Run Research</>}
                    </Button>
                  </CardContent>
                </Card>

                {leads.length > 0 && (
                  <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))]">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div><p className="text-2xl font-bold text-red-400">{hot}</p><p className="text-xs text-white/40 uppercase">Hot</p></div>
                        <div><p className="text-2xl font-bold text-amber-400">{warm}</p><p className="text-xs text-white/40 uppercase">Warm</p></div>
                        <div><p className="text-2xl font-bold text-blue-400">{cold}</p><p className="text-xs text-white/40 uppercase">Cold</p></div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-[hsl(var(--dark-border))] grid grid-cols-3 gap-3 text-center">
                        <div><p className="text-lg font-bold text-white">{leads.length}</p><p className="text-xs text-white/40 uppercase">Total</p></div>
                        <div><p className="text-lg font-bold text-emerald-400">{enrichedCount}</p><p className="text-xs text-white/40 uppercase">Enriched</p></div>
                        <div><p className="text-lg font-bold text-violet-400">{withEmail}</p><p className="text-xs text-white/40 uppercase">w/ Email</p></div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {logs.length > 0 && <LogToggle label="Research logs" logs={logs} show={showLogs} toggle={() => setShowLogs(!showLogs)} />}
            {enrichLogs.length > 0 && <LogToggle label="Enrichment logs" logs={enrichLogs} show={showEnrichLogs} toggle={() => setShowEnrichLogs(!showEnrichLogs)} />}

            {/* Results table */}
            {leads.length > 0 && (
              <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[hsl(var(--dark-border))]">
                        <th className="text-left px-4 py-3 text-white/50 font-medium text-xs uppercase">Signal</th>
                        <th className="text-left px-4 py-3 text-white/50 font-medium text-xs uppercase">Company</th>
                        <th className="text-left px-4 py-3 text-white/50 font-medium text-xs uppercase">Founder</th>
                        <th className="text-left px-4 py-3 text-white/50 font-medium text-xs uppercase">Contact</th>
                        <th className="text-left px-4 py-3 text-white/50 font-medium text-xs uppercase">Product</th>
                        <th className="text-left px-4 py-3 text-white/50 font-medium text-xs uppercase">KS Signal</th>
                        <th className="text-left px-4 py-3 text-white/50 font-medium text-xs uppercase">Conf.</th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedLeads.map((lead, i) => (
                        <LeadRow key={i} lead={lead} index={i} expanded={expandedRow === i}
                          onToggle={() => setExpandedRow(expandedRow === i ? null : i)} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {!loading && leads.length === 0 && (
              <div className="text-center py-20 text-white/30">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Configure queries and hit Run Research</p>
                <p className="text-sm mt-1">Results will appear here sorted by buying signal</p>
              </div>
            )}
          </TabsContent>

          {/* ─── TEMPLATES TAB ─── */}
          <TabsContent value="templates" className="space-y-6">
            <div className="bg-white/[0.03] rounded-lg p-4 text-sm text-white/60 leading-relaxed">
              <p className="text-white/80 font-medium mb-1">Jak działają szablony</p>
              <p>AI generuje każdy email na żywo, używając tych struktur jako szkieletu. Zmienne <code className="text-primary/70 text-xs bg-white/5 px-1 rounded">{'{firma}'}</code>, <code className="text-primary/70 text-xs bg-white/5 px-1 rounded">{'{imie}'}</code>, <code className="text-primary/70 text-xs bg-white/5 px-1 rounded">{'{produkt}'}</code> są wypełniane danymi z enrichmentu.</p>
            </div>

            {/* Touch 1 */}
            <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))] overflow-hidden">
              <div className="px-5 py-3 bg-white/[0.02] flex items-center justify-between border-b border-[hsl(var(--dark-border))]">
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-500/15 text-blue-400">Touch 1 · Dzień 0</span>
                <span className="text-xs text-white/40">Personalizacja + problem framing</span>
              </div>
              <div className="px-5 py-4 text-sm text-white/50 whitespace-pre-wrap leading-relaxed font-mono">
{`Subject: {imie}, launching {produkt} to silence?

{personalizowana obserwacja z danych leada — 1 zdanie}

Most hardware founders spend 2 years building, then launch to an empty room.

JAY-23 fixes that. We build your Early Bird waitlist before launch day — so you hit Kickstarter with demand, not hope.

Avg result: 3,000+ subscribers, 90 days.

Worth a 15-min call? → jay23.com/call

Marek`}
              </div>
            </Card>

            {/* Touch 2 */}
            <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))] overflow-hidden">
              <div className="px-5 py-3 bg-white/[0.02] flex items-center justify-between border-b border-[hsl(var(--dark-border))]">
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-500/15 text-amber-400">Touch 2 · Dzień +4</span>
                <span className="text-xs text-white/40">Case study + konkretny wynik</span>
              </div>
              <div className="px-5 py-4 text-sm text-white/50 whitespace-pre-wrap leading-relaxed font-mono">
{`Subject: $330K on Day 1 — here's what they did differently

One of our clients launched a Bluetooth tracking wallet on Kickstarter.

Before launch: 0 audience.
After 90 days with JAY-23's MVA Framework: $330K raised.

The difference? They had 1,000+ paying Early Birds waiting on Day 1.

{nawiązanie do sytuacji firmy — 1 zdanie}

15 minutes to see if MVA fits {firma}? → jay23.com/call

Marek`}
              </div>
            </Card>

            {/* Touch 3 */}
            <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))] overflow-hidden">
              <div className="px-5 py-3 bg-white/[0.02] flex items-center justify-between border-b border-[hsl(var(--dark-border))]">
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-white/10 text-white/50">Touch 3 · Dzień +9</span>
                <span className="text-xs text-white/40">Breakup — jedno pytanie</span>
              </div>
              <div className="px-5 py-4 text-sm text-white/50 whitespace-pre-wrap leading-relaxed font-mono">
{`Subject: Still planning the {produkt} launch?

{imie} — still on the roadmap for {rok}?

Marek`}
              </div>
            </Card>
          </TabsContent>

          {/* ─── SEQUENCES TAB ─── */}
          <TabsContent value="sequences" className="space-y-8">
            <div className="grid md:grid-cols-[1fr_300px] gap-6">
              <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))]">
                <CardHeader>
                  <CardTitle className="text-white text-base">Konfiguracja sekwencji</CardTitle>
                  <p className="text-white/40 text-xs">Messaging JAY-23 · MVA Framework · Early Bird angle</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">Twoje imię</label>
                      <Input value={seqConfig.senderName} onChange={(e) => setSeqConfig((c) => ({ ...c, senderName: e.target.value }))}
                        className="bg-[hsl(var(--dark-bg))] border-[hsl(var(--dark-border))] text-white" />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">Język</label>
                      <select value={seqConfig.language} onChange={(e) => setSeqConfig((c) => ({ ...c, language: e.target.value }))}
                        className="w-full h-10 px-3 rounded-md bg-[hsl(var(--dark-bg))] border border-[hsl(var(--dark-border))] text-white text-sm">
                        <option value="English">English</option>
                        <option value="Polish">Polski</option>
                      </select>
                    </div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3 text-xs text-white/50 leading-relaxed">
                    <p className="text-white/70 font-medium mb-1">Messaging załadowany automatycznie:</p>
                    <p>• Hero: "Build Your First 1,000 True Fans in 90 Days"</p>
                    <p>• Proof: 98+ founders, $600K+ raised, avg 3,000+ leads/campaign</p>
                    <p>• Case study: $330K Bluetooth wallet</p>
                    <p>• CTA: Free Strategy Call · jay23.com/call</p>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">Dodatkowy case study (opcjonalnie)</label>
                    <Input value={seqConfig.extraCaseStudy} onChange={(e) => setSeqConfig((c) => ({ ...c, extraCaseStudy: e.target.value }))}
                      placeholder="np. Swimmo – 2,400 early birds w 60 dni"
                      className="bg-[hsl(var(--dark-bg))] border-[hsl(var(--dark-border))] text-white" />
                  </div>
                </CardContent>
              </Card>

              {/* Instrukcje wysyłki */}
              <Card className="bg-amber-500/5 border-amber-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-amber-400 text-sm flex items-center gap-2">⚠️ Strategia wysyłki — ochrona domeny</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-white/60 space-y-3 leading-relaxed">
                  <div>
                    <p className="text-white/80 font-medium mb-1">🚫 Nigdy nie wysyłaj cold emaili z głównej domeny</p>
                    <p>Główna domena (np. jay23.com) = do klientów i transakcji. Kup 2–3 sending domains:</p>
                    <ul className="list-disc ml-4 mt-1 space-y-0.5 text-white/50">
                      <li><code className="text-amber-400/80">jay-23.com</code> ← sending #1</li>
                      <li><code className="text-amber-400/80">jay23.co</code> ← sending #2</li>
                      <li><code className="text-amber-400/80">getjay23.com</code> ← sending #3 (backup)</li>
                    </ul>
                    <p className="mt-1">~$10–15/rok każda. Ustaw MX + SPF + DKIM + DMARC (Smartlead/Instantly robią to auto).</p>
                  </div>
                  <div>
                    <p className="text-white/80 font-medium mb-1">🔥 Warmup — 3–4 tygodnie przed wysyłką</p>
                    <ul className="list-disc ml-4 space-y-0.5 text-white/50">
                      <li>Tydzień 1–2: max <span className="text-white/70">20 emaili/dzień</span> per domena</li>
                      <li>Tydzień 3: max <span className="text-white/70">50/dzień</span></li>
                      <li>Tydzień 4+: max <span className="text-white/70">80–100/dzień</span> (bezpieczny sufit)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white/80 font-medium mb-1">📬 Open rate — zasady</p>
                    <ul className="list-disc ml-4 space-y-0.5 text-white/50">
                      <li><span className="text-white/70">Marek &lt;marek@jay-23.com&gt;</span> bije "JAY-23 Team" zawsze</li>
                      <li>Subject max 6 słów, bez ?! w tym samym</li>
                      <li>Brak słów-triggerów: free, guarantee, limited time, strategy call</li>
                      <li>Plain text &gt; HTML (mniej filtrów, bardziej ludzki)</li>
                      <li>Max 1 link w całym emailu</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))]">
                  <CardContent className="pt-6 space-y-4">
                    <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                      <input type="checkbox" checked={hotOnly} onChange={(e) => setHotOnly(e.target.checked)}
                        className="rounded border-[hsl(var(--dark-border))]" />
                      Tylko HOT leady
                    </label>
                    <div className="text-xs text-white/40">
                      {withEmail} leadów z emailem
                      {hotOnly && ` (${leads.filter((l) => l.buying_signal === "HOT" && val(l.email_pattern)).length} HOT)`}
                    </div>
                    <Button onClick={runSequencer} disabled={generatingSeqs || withEmail === 0}
                      className="w-full bg-primary hover:bg-primary/90 gap-2">
                      {generatingSeqs ? <><Loader2 className="w-4 h-4 animate-spin" /> Generuję...</>
                        : <><Send className="w-4 h-4" /> Generuj sekwencje</>}
                    </Button>
                    {generatingSeqs && (
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/60 rounded-full transition-all duration-500" style={{ width: `${seqProgress}%` }} />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {sequences.length > 0 && (
                  <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))]">
                    <CardContent className="pt-6 space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div><p className="text-2xl font-bold text-white">{sequences.length}</p><p className="text-xs text-white/40 uppercase">Sekwencje</p></div>
                        <div><p className="text-2xl font-bold text-primary">{sequences.length * 3}</p><p className="text-xs text-white/40 uppercase">Emaile</p></div>
                      </div>
                      <div className="space-y-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => exportSequenceCSV(sequences)}
                          className="w-full border-[hsl(var(--dark-border))] text-white/80 hover:text-white bg-transparent gap-2">
                          <Download className="w-4 h-4" /> CSV — Smartlead / Lemlist
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" onClick={exportSequenceJSON}
                            className="border-[hsl(var(--dark-border))] text-white/60 hover:text-white bg-transparent gap-1">
                            <FileJson className="w-3 h-3" /> JSON
                          </Button>
                          <Button variant="outline" size="sm" onClick={exportSequenceTXT}
                            className="border-[hsl(var(--dark-border))] text-white/60 hover:text-white bg-transparent gap-1">
                            <FileText className="w-3 h-3" /> TXT
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {seqLogs.length > 0 && <LogToggle label="Sequencer logs" logs={seqLogs} show={showSeqLogs} toggle={() => setShowSeqLogs(!showSeqLogs)} />}

            {/* Sequence cards */}
            {sequences.length > 0 && (
              <div className="space-y-4">
                {sequences.map((s, i) => {
                  const touchColors = {
                    touch1: { bg: "bg-blue-500/15", text: "text-blue-400", label: "Touch 1 · Dzień 0" },
                    touch2: { bg: "bg-amber-500/15", text: "text-amber-400", label: "Touch 2 · Dzień +4" },
                    touch3: { bg: "bg-white/10", text: "text-white/50", label: "Touch 3 · Dzień +9" },
                  };
                  const isRegen = regeneratingLead === s.lead.company_name;

                  return (
                    <Card key={i} className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))] overflow-hidden">
                      <div className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => setExpandedSeq(expandedSeq === i ? null : i)}>
                        <div className="flex items-center gap-3">
                          <SignalBadge signal={s.lead.buying_signal} />
                          <div>
                            <span className="font-medium text-white">{s.lead.company_name}</span>
                            <span className="text-white/30 ml-2 text-xs">To: {s.email} · {s.first_name} {s.last_name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" size="sm" disabled={isRegen}
                            className="text-white/40 hover:text-white h-7 px-2 gap-1"
                            onClick={(e) => { e.stopPropagation(); regenerateOne(s.lead.company_name); }}>
                            {isRegen ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                            <span className="text-xs">Regeneruj</span>
                          </Button>
                          {expandedSeq === i ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                        </div>
                      </div>
                      {expandedSeq === i && (
                        <div className="border-t border-[hsl(var(--dark-border))]">
                          {(["touch1", "touch2", "touch3"] as const).map((touch) => {
                            const t = s.sequence[touch];
                            if (!t) return null;
                            const colors = touchColors[touch];
                            const copyId = `${s.lead.company_name}-${touch}`;
                            const isCopied = copiedId === copyId;
                            return (
                              <div key={touch} className="border-b border-[hsl(var(--dark-border))]/50 last:border-b-0">
                                <div className="px-5 py-3 bg-white/[0.02] flex items-center justify-between gap-3 flex-wrap">
                                  <div className="flex items-center gap-3">
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                                      {colors.label}
                                    </span>
                                    <span className="text-white/60 text-sm truncate max-w-md">
                                      Subject: {t.subject}
                                    </span>
                                  </div>
                                  <Button variant="outline" size="sm"
                                    className="h-6 px-2 text-xs border-[hsl(var(--dark-border))] text-white/50 hover:text-white bg-transparent gap-1"
                                    onClick={() => copyEmail(t.subject, t.body, copyId)}>
                                    {isCopied ? <><Check className="w-3 h-3" /> Skopiowano</> : <><Copy className="w-3 h-3" /> Kopiuj</>}
                                  </Button>
                                </div>
                                <div className="px-5 py-4 text-sm text-white/70 whitespace-pre-wrap leading-relaxed">
                                  {t.body}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}

            {!generatingSeqs && sequences.length === 0 && (
              <div className="text-center py-20 text-white/30">
                <Send className="w-12 h-12 mx-auto mb-4 opacity-30" />
                {leads.length === 0 ? (
                  <>
                    <p className="text-lg">Brak leadów</p>
                    <p className="text-sm mt-1">Przejdź do zakładki Research żeby znaleźć leady</p>
                  </>
                ) : withEmail === 0 ? (
                  <>
                    <p className="text-lg">Brak leadów z emailem</p>
                    <p className="text-sm mt-1">Wzbogać leady żeby odkryć wzorce emaili</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg">Skonfiguruj i wygeneruj sekwencje emailowe</p>
                    <p className="text-sm mt-1">{withEmail} leadów z emailem gotowych do sekwencji</p>
                  </>
                )}
              </div>
            )}
          </TabsContent>

          {/* ─── DOMAINS TAB ─── */}
          <TabsContent value="domains" className="space-y-6">
            <div className="bg-white/[0.03] rounded-lg p-4 text-sm text-white/60 leading-relaxed">
              <p className="text-white/80 font-medium mb-1">📧 Sending Infrastructure — Setup Guide</p>
              <p>Kliknij każdą sekcję żeby rozwinąć szczegóły. Cały setup zajmuje ~30 minut.</p>
            </div>

            {/* Cost summary */}
            <Card className="bg-emerald-500/5 border-emerald-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-emerald-400 text-sm">💰 Podsumowanie kosztów dla JAY-23</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-white/60 space-y-2 leading-relaxed">
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  <span>Cloudflare — 3 domeny × ~$9</span><span className="text-white/80 text-right">$27/rok</span>
                  <span>Instantly Growth</span><span className="text-white/80 text-right">$37/mies.</span>
                  <span>Google Workspace — 3 × $6</span><span className="text-white/80 text-right">$18/mies.</span>
                </div>
                <div className="border-t border-emerald-500/20 pt-2 mt-2 flex justify-between font-medium text-white/80">
                  <span>Razem:</span>
                  <span>~$57/mies. + $27 jednorazowo</span>
                </div>
                <p className="text-white/50 mt-2">Przy 3 domenach × 3 skrzynki możesz wysyłać do <span className="text-white/70">270 emaili/dzień</span> bezpiecznie — to wystarczy na <span className="text-white/70">1,000+ kontaktów miesięcznie</span> przy 3-touch sekwencji.</p>
              </CardContent>
            </Card>

            {/* Accordion sections */}
            <DomainAccordion
              title="1. Kup sending domains na Cloudflare"
              items={[
                "Nigdy nie wysyłaj cold emaili z głównej domeny (jay23.com) — to domena do klientów i transakcji.",
                "Kup 2–3 sending domains podobne do głównej: jay-23.com, jay23.co, getjay23.com",
                "Koszt: ~$9–12/rok per domena na Cloudflare",
                "Cloudflare jest najlepszy, bo potem łatwo ustawisz DNS rekordy (SPF, DKIM, DMARC)",
              ]}
            />
            <DomainAccordion
              title="2. Załóż Google Workspace na każdej domenie"
              items={[
                "Google Workspace ($6/mies. per mailbox) — najlepsza deliverability",
                "Na każdej domenie stwórz 2–3 skrzynki: marek@jay-23.com, m@jay-23.com, hello@jay-23.com",
                "Ustaw profesjonalny podpis i avatar — to wpływa na open rate",
                "Nie używaj aliasów — każda skrzynka musi być osobnym kontem",
              ]}
            />
            <DomainAccordion
              title="3. Ustaw DNS (SPF + DKIM + DMARC)"
              items={[
                "SPF — mówi serwerom kto może wysyłać z Twojej domeny",
                "DKIM — podpis cyfrowy na każdym emailu",
                "DMARC — polityka co robić z emailami które nie przejdą weryfikacji",
                "Instantly i Smartlead robią to automatycznie przy onboardingu — podłączasz domenę i klikasz 'Setup DNS'",
              ]}
            />
            <DomainAccordion
              title="4. Warmup (3–4 tygodnie)"
              items={[
                "Tydzień 1–2: max 20 emaili/dzień per domena",
                "Tydzień 3: max 50/dzień",
                "Tydzień 4+: max 80–100/dzień (bezpieczny sufit dla cold)",
                "Instantly ma wbudowany auto-warmup — włącz go od razu po dodaniu kont",
                "Nie wysyłaj do prawdziwych prospektów dopóki warmup się nie skończy!",
              ]}
            />
            <DomainAccordion
              title="5. Instantly — setup kampanii"
              items={[
                "Instantly Growth plan ($37/mies.) — wystarczy na start",
                "Import CSV z Email Sequencera — format jest już kompatybilny (first_name, last_name, email, company + zmienne {{subject_1}} itd.)",
                "Leady z Airtable też można importować bezpośrednio jako CSV",
                "Ustaw sending limit per konto: 30–50/dzień na początek",
                "Dodaj 3-touch sekwencję z zakładki Szablony",
              ]}
            />
            <DomainAccordion
              title="6. Open rate — zasady"
              items={[
                "Marek <marek@jay-23.com> bije 'JAY-23 Team <hello@jay23.com>' zawsze — osobiste nadawcy wygrywają",
                "Subject max 6 słów, bez ?! w tym samym",
                "Brak słów-triggerów spamu: free, guarantee, limited time, strategy call w subject",
                "Plain text > HTML (mniej filtrów, bardziej ludzki)",
                "Max 1 link w całym emailu",
                "Nie trackuj otwarć na zimnych domenach — tracking pixel = niższy deliverability",
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ─── Lead table row ─────────────────────────────────
function LeadRow({ lead, index, expanded, onToggle }: { lead: Lead; index: number; expanded: boolean; onToggle: () => void }) {
  return (
    <>
      <tr className="border-b border-[hsl(var(--dark-border))]/50 hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={onToggle}>
        <td className="px-4 py-3"><SignalBadge signal={lead.buying_signal} /></td>
        <td className="px-4 py-3">
          <div className="font-medium text-white">{lead.company_name}</div>
          {val(lead.domain) && (
            <a href={lead.domain.startsWith("http") ? lead.domain : `https://${lead.domain}`}
              target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary text-xs"
              onClick={(e) => e.stopPropagation()}>{lead.domain}</a>
          )}
        </td>
        <td className="px-4 py-3">
          <div className="text-white/80">
            {val(lead.founder_name) ? (
              <span>{lead.founder_name}{val(lead.founder_title) && <span className="text-white/40 text-xs ml-1">({lead.founder_title})</span>}</span>
            ) : "—"}
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {(val(lead.linkedin_url) || val(lead.founder_linkedin)) && (
              <a href={val(lead.linkedin_url) || lead.founder_linkedin} target="_blank" rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300" onClick={(e) => e.stopPropagation()}>
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {val(lead.x_url) && (
              <a href={lead.x_url} target="_blank" rel="noopener noreferrer"
                className="text-white/60 hover:text-white" onClick={(e) => e.stopPropagation()} title={lead.x_handle || "X"}>
                <span className="text-xs font-bold">𝕏</span>
              </a>
            )}
            {(val(lead.email_found) || val(lead.email_pattern)) && (
              <a href={`mailto:${val(lead.email_found) || lead.email_pattern}`} className="text-emerald-400 hover:text-emerald-300"
                onClick={(e) => e.stopPropagation()}>
                <Mail className="w-4 h-4" />
              </a>
            )}
            {val(lead.company_linkedin) && (
              <a href={lead.company_linkedin} target="_blank" rel="noopener noreferrer"
                className="text-blue-400/60 hover:text-blue-300" onClick={(e) => e.stopPropagation()} title="Company LinkedIn">
                <User className="w-4 h-4" />
              </a>
            )}
          </div>
        </td>
        <td className="px-4 py-3 text-white/60 max-w-[200px] truncate">
          {val(lead.company_description) || val(lead.product_description) || "—"}
        </td>
        <td className="px-4 py-3 text-white/60 max-w-[150px] truncate">{val(lead.kickstarter_signal) || "—"}</td>
        <td className="px-4 py-3">
          {lead.enriched ? <ConfidenceBadge value={lead.data_confidence} /> : <span className="text-white/20 text-xs">—</span>}
        </td>
        <td className="px-4 py-3 text-white/30">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-[hsl(var(--dark-border))]/50 bg-white/[0.01]">
          <td colSpan={8} className="px-6 py-4 space-y-3">
            {/* X/Twitter */}
            {val(lead.x_handle) && (
              <div className="bg-white/[0.02] rounded-lg p-3">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">𝕏 / Twitter</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-white font-medium">{lead.x_handle}</span>
                  {val(lead.x_followers) && <span className="text-white/40 text-xs">{lead.x_followers} followers</span>}
                </div>
                {val(lead.x_bio) && <p className="text-white/50 text-xs mt-1">{lead.x_bio}</p>}
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Detail label="Email (confirmed)" value={val(lead.email_found)} />
              <Detail label="Email (pattern)" value={val(lead.email_pattern)} confidence={val(lead.email_confidence)} />
              <Detail label="Email Source" value={val(lead.email_source)} />
              <Detail label="Product Stage" value={val(lead.product_stage)} />
              <Detail label="Employees" value={val(lead.employee_count) || val(lead.employees)} />
              <Detail label="Funding" value={val(lead.funding_stage)} />
              <Detail label="Recent News" value={val(lead.recent_news)} />
              <Detail label="Signal Reason" value={val(lead.signal_reason)} />
              <Detail label="Source" value={val(lead.source_url)} isLink />
              <Detail label="Notes" value={val(lead.notes)} />
              {lead.enriched && <Detail label="Confidence" value={`${lead.data_confidence ?? 0}%`} />}
            </div>
            {/* Project mentions */}
            {val(lead.project_mentions) && (() => {
              try {
                const mentions = JSON.parse(lead.project_mentions!);
                if (Array.isArray(mentions) && mentions.length > 0) {
                  return (
                    <div className="bg-white/[0.02] rounded-lg p-3">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Wzmianki o projekcie</p>
                      <div className="space-y-1">
                        {mentions.map((m: any, idx: number) => (
                          <div key={idx} className="text-xs">
                            <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary">{m.title || m.source}</a>
                            {m.summary && <span className="text-white/40 ml-2">— {m.summary}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
              } catch { /* ignore */ }
              return null;
            })()}
          </td>
        </tr>
      )}
    </>
  );
}
