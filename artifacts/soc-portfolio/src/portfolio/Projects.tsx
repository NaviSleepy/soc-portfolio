import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { projects } from "./data";
import type { Mode } from "./Hero";

export function Projects({ mode }: { mode: Mode }) {
  const [open, setOpen] = useState<Set<string>>(new Set(["splunk"]));

  useEffect(() => {
    setOpen(mode === "deep" ? new Set(projects.map((p) => p.id)) : new Set(["splunk"]));
  }, [mode]);

  const openFromHash = useCallback(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!projects.some((p) => p.id === id)) return;
    setOpen((cur) => (cur.has(id) ? cur : new Set(cur).add(id)));
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
  }, []);

  useEffect(() => {
    openFromHash();
    const openOnLink = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = anchor?.getAttribute("href")?.slice(1);
      if (!id || !projects.some((p) => p.id === id)) return;
      setOpen((cur) => new Set(cur).add(id));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    };
    window.addEventListener("hashchange", openFromHash);
    document.addEventListener("click", openOnLink);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      document.removeEventListener("click", openOnLink);
    };
  }, [openFromHash]);

  const toggle = (id: string) =>
    setOpen((cur) => { const n = new Set(cur); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (
    <section className="soc-section" id="projects" aria-labelledby="projects-title">
      <div className="soc-section-head">
        <div><div className="soc-kicker soc-mono">03 / Investigation record</div><h2 className="soc-h2" id="projects-title">Work, with its limits attached.</h2></div>
        <p className="soc-section-note">Ordered by SOC L1 relevance. Open a record to see problem, contribution, tools, and outcome. Lab and academic labels are explicit.</p>
      </div>
      <div className="soc-project-list">
        {projects.map((p) => {
          const expanded = open.has(p.id);
          return (
            <article className={`soc-project ${expanded ? "is-open" : ""}`} id={p.id} key={p.id} data-testid={`card-project-${p.id}`}>
              <h3>
                <button type="button" className="soc-project-trigger" aria-expanded={expanded} aria-controls={`details-${p.id}`} onClick={() => toggle(p.id)} data-testid={`button-project-${p.id}`}>
                  <span className="soc-project-num" aria-hidden="true">{p.number}</span>
                  <span><span className="soc-project-title">{p.title}</span><span className="soc-project-intro">{p.intro}</span></span>
                  <span className="soc-tag">{p.type}</span>
                  <ChevronRight className="soc-chev" size={18} aria-hidden="true" />
                </button>
              </h3>
              {expanded && (
                <div className="soc-project-body" id={`details-${p.id}`}>
                  <dl className="soc-evidence-grid">
                    <div><dt>Problem</dt><dd>{p.problem}</dd></div>
                    <div><dt>Contribution</dt><dd>{p.contribution}</dd></div>
                    <div><dt>Tools</dt><dd><span className="soc-tool-list">{p.tools.map((t) => <span className="soc-tool" key={t}>{t}</span>)}</span></dd></div>
                    <div><dt>Outcome</dt><dd>{p.outcome}</dd></div>
                  </dl>
                  <div className="soc-review-note">{p.detail}</div>
                  <div className="soc-project-foot">
                    <small>Evidence type: {p.type.toLowerCase()}. Self-reported resume evidence.</small>
                    {p.link ? <a className="soc-inline-link" href={p.link} target="_blank" rel="noreferrer" data-testid={`link-repo-${p.id}`}>Review repository <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in new tab)</span></a> : <small>No repository link supplied</small>}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
