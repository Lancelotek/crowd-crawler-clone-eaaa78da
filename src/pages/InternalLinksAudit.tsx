import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, RefreshCw, Loader2, AlertTriangle, Link2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";

type Row = {
  url: string;
  lang: "en" | "pl";
  inFooter: boolean;
  inHome: boolean;
  inBlogIndex: boolean;
  blogSources: string[];
  totalSources: number;
  orphan: boolean;
  gaps: string[];
  isBlogPost: boolean;
};

type Data = {
  generatedAt: string;
  summary: {
    totalUrls: number;
    orphans: number;
    missingFooter: number;
    missingHomepage: number;
    missingBlog: number;
    blogPostsParsed: number;
  };
  report: Row[];
};

const Yes = () => <CheckCircle2 size={14} className="text-emerald-400 inline" />;
const No = () => <XCircle size={14} className="text-red-400/70 inline" />;

const Metric = ({ label, value, danger }: { label: string; value: number; danger?: boolean }) => (
  <Card className="bg-card/50 border-border">
    <CardContent className="pt-6">
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">{label}</div>
      <div className={`text-3xl font-bold tracking-tight ${danger && value > 0 ? "text-red-400" : ""}`}>{value}</div>
    </CardContent>
  </Card>
);

export default function InternalLinksAudit() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [tab, setTab] = useState<"all" | "orphan" | "footer" | "home" | "blog">("orphan");

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const { data: res, error: e } = await supabase.functions.invoke("internal-link-audit");
      if (e) throw e;
      if ((res as any)?.error) throw new Error((res as any).error);
      setData(res as Data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const rows = useMemo(() => {
    if (!data) return [];
    let r = data.report;
    if (tab === "orphan") r = r.filter((x) => x.orphan);
    else if (tab === "footer") r = r.filter((x) => !x.inFooter);
    else if (tab === "home") r = r.filter((x) => !x.inHome);
    else if (tab === "blog") r = r.filter((x) => !x.isBlogPost && x.blogSources.length === 0);
    if (filter) r = r.filter((x) => x.url.toLowerCase().includes(filter.toLowerCase()));
    return r;
  }, [data, tab, filter]);

  const tabs: { id: typeof tab; label: string; count: (d: Data) => number }[] = [
    { id: "orphan", label: "Orphans", count: (d) => d.summary.orphans },
    { id: "footer", label: "Missing footer", count: (d) => d.summary.missingFooter },
    { id: "home", label: "Missing homepage", count: (d) => d.summary.missingHomepage },
    { id: "blog", label: "Missing blog links", count: (d) => d.summary.missingBlog },
    { id: "all", label: "All", count: (d) => d.summary.totalUrls },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="Internal Link Audit — JAY-23" description="Internal link coverage audit: orphan pages and gaps by source." noindex />
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <header className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2"><Link2 size={26} /> Internal Link Audit</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {data ? `Generated ${new Date(data.generatedAt).toLocaleString()} · ${data.summary.blogPostsParsed} blog posts scanned` : "Loading…"}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={14} /> : <RefreshCw size={14} />}
            <span className="ml-2">Refresh</span>
          </Button>
        </header>

        {error && (
          <Card className="border-red-500/30 bg-red-500/5">
            <CardContent className="pt-6 text-sm text-red-400">Error: {error}</CardContent>
          </Card>
        )}

        {loading && !data && (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="animate-spin mr-2" size={18} /> Running audit…
          </div>
        )}

        {data && (
          <>
            <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Metric label="URLs audited" value={data.summary.totalUrls} />
              <Metric label="Orphans" value={data.summary.orphans} danger />
              <Metric label="Missing footer" value={data.summary.missingFooter} danger />
              <Metric label="Missing homepage" value={data.summary.missingHomepage} danger />
              <Metric label="No blog inbound" value={data.summary.missingBlog} danger />
            </section>

            <div className="flex items-center gap-2 flex-wrap">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    tab === t.id ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label} <span className="opacity-70">({t.count(data)})</span>
                </button>
              ))}
              <Input
                placeholder="Filter URLs…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="ml-auto max-w-xs h-8 text-sm"
              />
            </div>

            <Card className="bg-card/50 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Results ({rows.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {rows.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center">
                    <CheckCircle2 className="inline text-emerald-400 mr-2" size={16} /> No issues in this view.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                          <th className="py-2 pr-4 font-medium">URL</th>
                          <th className="py-2 px-2 font-medium">Lang</th>
                          <th className="py-2 px-2 font-medium text-center">Footer</th>
                          <th className="py-2 px-2 font-medium text-center">Home</th>
                          <th className="py-2 px-2 font-medium text-center">Blog idx</th>
                          <th className="py-2 px-2 font-medium text-center">Blog links</th>
                          <th className="py-2 pl-2 font-medium">Gaps</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr key={r.url} className="border-b border-border/50 hover:bg-card/50 align-top">
                            <td className="py-2 pr-4">
                              <a href={r.url} target="_blank" rel="noopener" className="hover:text-primary break-all">
                                {r.url}
                              </a>
                              {r.blogSources.length > 0 && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  from: {r.blogSources.slice(0, 3).join(", ")}
                                  {r.blogSources.length > 3 && ` +${r.blogSources.length - 3}`}
                                </div>
                              )}
                            </td>
                            <td className="py-2 px-2 uppercase text-xs text-muted-foreground">{r.lang}</td>
                            <td className="py-2 px-2 text-center">{r.inFooter ? <Yes /> : <No />}</td>
                            <td className="py-2 px-2 text-center">{r.inHome ? <Yes /> : <No />}</td>
                            <td className="py-2 px-2 text-center">{r.inBlogIndex ? <Yes /> : <No />}</td>
                            <td className="py-2 px-2 text-center text-xs">{r.blogSources.length || <span className="text-muted-foreground">0</span>}</td>
                            <td className="py-2 pl-2">
                              {r.orphan ? (
                                <Badge variant="destructive" className="gap-1"><AlertTriangle size={10} /> orphan</Badge>
                              ) : (
                                <div className="flex flex-wrap gap-1">
                                  {r.gaps.map((g) => <Badge key={g} variant="secondary" className="text-xs">{g}</Badge>)}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
