import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Menu, ShieldCheck, X } from "lucide-react";
import { GITHUB, LINKEDIN, navItems } from "./data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="soc-topbar">
      <a className="soc-brand" href="#top" aria-label="Layla Drummond, back to top" data-testid="link-brand">
        <span className="soc-mark"><ShieldCheck size={17} strokeWidth={2.3} aria-hidden="true" /></span>
        <span className="soc-wordmark">LAYLA DRUMMOND<small>Evidence portfolio / SOC L1</small></span>
      </a>
      <nav id="site-nav" className={`soc-nav ${open ? "is-open" : ""}`} aria-label="Portfolio sections">
        {navItems.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>
        ))}
      </nav>
      <div className="soc-head-actions">
        <a className="soc-btn ghost" href={GITHUB} target="_blank" rel="noreferrer" data-testid="link-github-header"><Github size={15} aria-hidden="true" /> GitHub<span className="sr-only"> (opens in new tab)</span></a>
        <a className="soc-btn pink" href={LINKEDIN} target="_blank" rel="noreferrer" data-testid="link-linkedin-header"><Linkedin size={15} aria-hidden="true" /> <span className="lbl">Connect</span><span className="sr-only">Connect on LinkedIn (opens in new tab)</span></a>
        <button ref={toggleRef} type="button" className="soc-mobile-toggle" aria-label={open ? "Close section navigation" : "Open section navigation"} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((o) => !o)} data-testid="button-nav-toggle">
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
