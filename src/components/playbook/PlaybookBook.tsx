import { ArrowUpRight } from "lucide-react";

export default function PlaybookBook() {
  return <div className="playbook-book-scene" role="img" aria-label="MVA Playbook — Minimum Viable Audience — Marek Cieśla, JAY-23 book cover">
    <div className="playbook-book">
      <div className="playbook-book-spine" aria-hidden="true">MVA PLAYBOOK</div>
      <div className="playbook-book-cover">
        <div className="flex items-center justify-between text-xs font-bold"><span>JAY-23</span><ArrowUpRight size={20} /></div>
        <div className="mt-12"><span className="playbook-book-title">MVA<br />PLAYBOOK</span><p className="mt-4 text-sm font-light">Minimum Viable Audience</p></div>
        <div className="playbook-cover-diagram" aria-hidden="true"><span /><span /><span /></div>
        <p className="mt-auto text-xs">Marek Cieśla, JAY-23</p>
      </div>
    </div>
  </div>;
}