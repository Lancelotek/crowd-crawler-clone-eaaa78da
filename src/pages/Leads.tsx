import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import {
  Lock, Search, Download, Flame, ThermometerSun, Snowflake,
  Loader2, Terminal, Sparkles, Mail, Linkedin, User, ChevronDown, ChevronUp
} from "lucide-react";
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
  // Enrichment fields
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
}

const BASE_CSV_FIELDS: (keyof Lead)[] = [
  "company_name", "domain", "founder_name", "founder_title",
  "founder_linkedin", "linkedin_url", "company_linkedin",
  "email_pattern", "email_confidence",
  "employees", "employee_count", "product_description", "company_description",
  "funding_stage", "kickstarter_signal", "buying_signal", "signal_reason",
  "recent_news", "data_confidence", "source_url", "notes",
];

function exportCSV(leads: Lead[]) {
  const header = BASE_CSV_FIELDS.join(",");
  const rows = leads.map((l) =>
    BASE_CSV_FIELDS.map((f) => `"${(String(l[f] ?? "")).replace(/"/g, '""')}"`).join(",")
  );
  const blob = new Blob([header + "\n" + rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

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

export default function Leads() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

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

  const handleAuth = () => {
    if (pw === PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

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
      setLeads((prev) => [...prev, ...(data.leads || [])]);
      setLogs(data.logs || []);
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
        const kept = prev.filter((l) => !enrichedNames.has(l.company_name));
        return [...kept, ...enrichedLeads];
      });
      setEnrichLogs(data.logs || []);
    } catch (e: any) {
      setEnrichLogs((prev) => [...prev, `Error: ${e.message}`]);
    } finally {
      setEnriching(false);
    }
  }, [leads]);

  const hot = leads.filter((l) => l.buying_signal === "HOT").length;
  const warm = leads.filter((l) => l.buying_signal === "WARM").length;
  const cold = leads.filter((l) => l.buying_signal === "COLD").length;
  const enrichedCount = leads.filter((l) => l.enriched).length;
  const unenrichedCount = leads.length - enrichedCount;

  const sortedLeads = [...leads].sort((a, b) => {
    const order = { HOT: 0, WARM: 1, COLD: 2 };
    return (order[a.buying_signal] ?? 3) - (order[b.buying_signal] ?? 3);
  });

  // ─── Password Gate ───────────────────────────────────────
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

  // ─── Main UI ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[hsl(var(--dark-bg))] text-white">
      {/* Header */}
      <header className="border-b border-[hsl(var(--dark-border))] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={jay23Logo} alt="JAY-23" className="h-6 opacity-70" />
          <span className="text-white/60 text-sm font-mono">/ Lead Researcher</span>
        </div>
        <div className="flex items-center gap-3">
          {leads.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={runEnrichment}
                disabled={enriching || unenrichedCount === 0}
                className="border-[hsl(var(--dark-border))] text-white/80 hover:text-white bg-transparent gap-2"
              >
                {enriching ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Enriching...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Enrich {unenrichedCount > 0 ? `(${unenrichedCount})` : "All"}</>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportCSV(leads)}
                className="border-[hsl(var(--dark-border))] text-white/80 hover:text-white bg-transparent gap-2"
              >
                <Download className="w-4 h-4" /> Export CSV
              </Button>
            </>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Config */}
        <div className="grid md:grid-cols-[1fr_300px] gap-6">
          <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))]">
            <CardHeader>
              <CardTitle className="text-white text-base">Search Queries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={queries}
                onChange={(e) => setQueries(e.target.value)}
                rows={8}
                className="bg-[hsl(var(--dark-bg))] border-[hsl(var(--dark-border))] text-white/90 text-sm font-mono"
                placeholder="One Brave Search query per line..."
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))]">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">Target leads</label>
                  <Input
                    type="number"
                    value={leadsTarget}
                    onChange={(e) => setLeadsTarget(Number(e.target.value))}
                    min={1}
                    max={100}
                    className="bg-[hsl(var(--dark-bg))] border-[hsl(var(--dark-border))] text-white"
                  />
                </div>
                <Button onClick={runSearch} disabled={loading} className="w-full bg-primary hover:bg-primary/90 gap-2">
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Researching...</>
                  ) : (
                    <><Search className="w-4 h-4" /> Run Research</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            {leads.length > 0 && (
              <Card className="bg-[hsl(var(--dark-card))] border-[hsl(var(--dark-border))]">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-2xl font-bold text-red-400">{hot}</p>
                      <p className="text-xs text-white/40 uppercase">Hot</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-400">{warm}</p>
                      <p className="text-xs text-white/40 uppercase">Warm</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-400">{cold}</p>
                      <p className="text-xs text-white/40 uppercase">Cold</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[hsl(var(--dark-border))] grid grid-cols-2 gap-3 text-center">
                    <div>
                      <p className="text-lg font-bold text-white">{leads.length}</p>
                      <p className="text-xs text-white/40 uppercase">Total</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-400">{enrichedCount}</p>
                      <p className="text-xs text-white/40 uppercase">Enriched</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Logs */}
        {logs.length > 0 && (
          <LogToggle label="Research logs" logs={logs} show={showLogs} toggle={() => setShowLogs(!showLogs)} />
        )}
        {enrichLogs.length > 0 && (
          <LogToggle label="Enrichment logs" logs={enrichLogs} show={showEnrichLogs} toggle={() => setShowEnrichLogs(!showEnrichLogs)} />
        )}

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
                    <>
                      <tr
                        key={`row-${i}`}
                        className="border-b border-[hsl(var(--dark-border))]/50 hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                      >
                        <td className="px-4 py-3"><SignalBadge signal={lead.buying_signal} /></td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{lead.company_name}</div>
                          {val(lead.domain) && (
                            <a
                              href={lead.domain.startsWith("http") ? lead.domain : `https://${lead.domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary/70 hover:text-primary text-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {lead.domain}
                            </a>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-white/80">{val(lead.founder_name) || val(lead.founder_title) ? (
                            <span>{val(lead.founder_name) || "—"}{val(lead.founder_title) && <span className="text-white/40 text-xs ml-1">({lead.founder_title})</span>}</span>
                          ) : "—"}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {(val(lead.linkedin_url) || val(lead.founder_linkedin)) && (
                              <a
                                href={val(lead.linkedin_url) || lead.founder_linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Linkedin className="w-4 h-4" />
                              </a>
                            )}
                            {val(lead.email_pattern) && (
                              <a
                                href={`mailto:${lead.email_pattern}`}
                                className="text-emerald-400 hover:text-emerald-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                            )}
                            {val(lead.company_linkedin) && (
                              <a
                                href={lead.company_linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400/60 hover:text-blue-300"
                                onClick={(e) => e.stopPropagation()}
                                title="Company LinkedIn"
                              >
                                <User className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-white/60 max-w-[200px] truncate">
                          {val(lead.company_description) || val(lead.product_description) || "—"}
                        </td>
                        <td className="px-4 py-3 text-white/60 max-w-[150px] truncate">
                          {val(lead.kickstarter_signal) || "—"}
                        </td>
                        <td className="px-4 py-3">
                          {lead.enriched ? <ConfidenceBadge value={lead.data_confidence} /> : (
                            <span className="text-white/20 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-white/30">
                          {expandedRow === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </td>
                      </tr>
                      {expandedRow === i && (
                        <tr key={`detail-${i}`} className="border-b border-[hsl(var(--dark-border))]/50 bg-white/[0.01]">
                          <td colSpan={8} className="px-6 py-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                              <Detail label="Email" value={val(lead.email_pattern)} confidence={val(lead.email_confidence)} />
                              <Detail label="Employees" value={val(lead.employee_count) || val(lead.employees)} />
                              <Detail label="Funding" value={val(lead.funding_stage)} />
                              <Detail label="Recent News" value={val(lead.recent_news)} />
                              <Detail label="Signal Reason" value={val(lead.signal_reason)} />
                              <Detail label="Source" value={val(lead.source_url)} isLink />
                              <Detail label="Notes" value={val(lead.notes)} />
                              {lead.enriched && <Detail label="Data Confidence" value={`${lead.data_confidence ?? 0}%`} />}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Empty state */}
        {!loading && leads.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Configure queries and hit Run Research</p>
            <p className="text-sm mt-1">Results will appear here sorted by buying signal</p>
          </div>
        )}
      </div>
    </div>
  );
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
      <p className="text-white/40 uppercase tracking-wider mb-0.5">{label}</p>
      {value ? (
        isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary break-all">{value}</a>
        ) : (
          <p className="text-white/80 break-words">
            {value}
            {confidence && <span className="text-white/40 ml-1">({confidence})</span>}
          </p>
        )
      ) : (
        <p className="text-white/20">—</p>
      )}
    </div>
  );
}
