import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RefreshCw, Loader2, ExternalLink, TrendingUp, Eye, MousePointerClick, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";

type Row = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };
type FileStatus = { url: string; status: number; ok: boolean; urlCount: number; preview?: string | null };
type SitemapEntry = { path?: string; lastSubmitted?: string; isPending?: boolean; warnings?: string; errors?: string; contents?: { type: string; submitted: number; indexed?: number }[] };

type Data = {
  generatedAt: string;
  site: string;
  files: {
    robots: FileStatus;
    sitemapIndex: FileStatus;
    sitemapEn: FileStatus;
    sitemapPl: FileStatus;
  };
  gsc: {
    totals: Row | null;
    topQueries: Row[];
    topPages: Row[];
    countries: Row[];
    devices: Row[];
    sitemaps: SitemapEntry[];
  };
};

const fmt = (n: number, d = 0) => n?.toLocaleString("en-US", { maximumFractionDigits: d }) ?? "—";
const pct = (n: number) => `${(n * 100).toFixed(2)}%`;

const StatusPill = ({ ok, label }: { ok: boolean; label: string }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${ok ? "text-emerald-400" : "text-red-400"}`}>
    {ok ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
    {label}
  </span>
);

const FileCard = ({ title, file }: { title: string; file: FileStatus }) => (
  <Card className="bg-card/50 border-border">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          <a href={file.url} target="_blank" rel="noopener" className="text-xs text-muted-foreground hover:text-primary truncate block mt-1">
            {file.url.replace("https://jay23.com", "")} <ExternalLink size={10} className="inline" />
          </a>
        </div>
        <StatusPill ok={file.ok} label={`HTTP ${file.status}`} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold tracking-tight">{file.urlCount > 0 ? file.urlCount : "—"}</div>
      <div className="text-xs text-muted-foreground">URLs</div>
    </CardContent>
  </Card>
);

const MetricCard = ({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub?: string }) => (
  <Card className="bg-card/50 border-border">
    <CardContent className="pt-6">
      <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider font-medium mb-2">
        <Icon size={14} /> {label}
      </div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </CardContent>
  </Card>
);

const Table = ({ rows, keyLabel, max }: { rows: Row[]; keyLabel: string; max?: number }) => {
  const items = max ? rows.slice(0, max) : rows;
  if (!items.length) return <p className="text-sm text-muted-foreground">No data yet.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
            <th className="py-2 pr-4 font-medium">{keyLabel}</th>
            <th className="py-2 px-2 font-medium text-right">Clicks</th>
            <th className="py-2 px-2 font-medium text-right">Impr.</th>
            <th className="py-2 px-2 font-medium text-right">CTR</th>
            <th className="py-2 pl-2 font-medium text-right">Pos.</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r, i) => (
            <tr key={i} className="border-b border-border/50 hover:bg-card/50">
              <td className="py-2 pr-4 truncate max-w-[420px]" title={r.keys?.[0]}>
                {r.keys?.[0]?.replace("https://jay23.com", "") || "—"}
              </td>
              <td className="py-2 px-2 text-right font-medium">{fmt(r.clicks)}</td>
              <td className="py-2 px-2 text-right text-muted-foreground">{fmt(r.impressions)}</td>
              <td className="py-2 px-2 text-right text-muted-foreground">{pct(r.ctr)}</td>
              <td className="py-2 pl-2 text-right text-muted-foreground">{r.position?.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function SeoDashboard() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: res, error: e } = await supabase.functions.invoke("seo-dashboard");
      if (e) throw e;
      if ((res as any)?.error) throw new Error((res as any).error);
      setData(res as Data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="SEO Dashboard — JAY-23" description="Internal SEO status: sitemap, robots, Google Search Console." noindex />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <header className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SEO Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {data ? `${data.site} · last 28 days · updated ${new Date(data.generatedAt).toLocaleString()}` : "Loading…"}
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
            <Loader2 className="animate-spin mr-2" size={18} /> Loading SEO data…
          </div>
        )}

        {data && (
          <>
            {/* Crawl files */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight">Crawl files</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FileCard title="robots.txt" file={data.files.robots} />
                <FileCard title="sitemap_index.xml" file={data.files.sitemapIndex} />
                <FileCard title="sitemap-en.xml" file={data.files.sitemapEn} />
                <FileCard title="sitemap-pl.xml" file={data.files.sitemapPl} />
              </div>
            </section>

            {/* Totals */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight">Search performance (28d)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard icon={MousePointerClick} label="Clicks" value={fmt(data.gsc.totals?.clicks ?? 0)} />
                <MetricCard icon={Eye} label="Impressions" value={fmt(data.gsc.totals?.impressions ?? 0)} />
                <MetricCard icon={TrendingUp} label="CTR" value={pct(data.gsc.totals?.ctr ?? 0)} />
                <MetricCard icon={BarChart3} label="Avg. position" value={(data.gsc.totals?.position ?? 0).toFixed(1)} />
              </div>
            </section>

            {/* Queries + Pages */}
            <section className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-border">
                <CardHeader><CardTitle className="text-base">Top queries</CardTitle></CardHeader>
                <CardContent><Table rows={data.gsc.topQueries} keyLabel="Query" max={15} /></CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardHeader><CardTitle className="text-base">Top pages</CardTitle></CardHeader>
                <CardContent><Table rows={data.gsc.topPages} keyLabel="Page" max={15} /></CardContent>
              </Card>
            </section>

            {/* Countries + Devices */}
            <section className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-border">
                <CardHeader><CardTitle className="text-base">Countries</CardTitle></CardHeader>
                <CardContent><Table rows={data.gsc.countries} keyLabel="Country" /></CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardHeader><CardTitle className="text-base">Devices</CardTitle></CardHeader>
                <CardContent><Table rows={data.gsc.devices} keyLabel="Device" /></CardContent>
              </Card>
            </section>

            {/* Sitemaps registered in GSC */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight">Sitemaps submitted to Google</h2>
              {data.gsc.sitemaps?.length ? (
                <div className="space-y-2">
                  {data.gsc.sitemaps.map((s, i) => (
                    <Card key={i} className="bg-card/50 border-border">
                      <CardContent className="pt-4 pb-4 flex items-center justify-between gap-4 flex-wrap">
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{s.path}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Submitted {s.lastSubmitted ? new Date(s.lastSubmitted).toLocaleDateString() : "—"}
                            {s.contents?.[0] && ` · ${s.contents[0].submitted} URLs`}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {s.isPending && <Badge variant="outline">Pending</Badge>}
                          {Number(s.errors) > 0 && <Badge variant="destructive">{s.errors} errors</Badge>}
                          {Number(s.warnings) > 0 && <Badge variant="secondary">{s.warnings} warnings</Badge>}
                          {!s.isPending && !Number(s.errors) && <StatusPill ok label="OK" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No sitemaps registered in Search Console for this property.</p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
