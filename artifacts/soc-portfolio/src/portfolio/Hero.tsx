import { ArrowDownToLine, ChevronDown, ChevronRight, Linkedin } from "lucide-react";
import { LINKEDIN, RESUME_HREF } from "./data";

export type Mode = "scan" | "deep";

export function Hero({ mode, onMode }: { mode: Mode; onMode: (m: Mode) => void }) {
  return (
    <section className="soc-hero" aria-labelledby="hero-title">
      <div className="soc-crumb soc-mono">
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>PORTFOLIO <ChevronRight size={12} aria-hidden="true" /> <b style={{ color: "var(--pink)", fontWeight: 500 }}>RECRUITER VIEW</b></span>
        <div className="soc-modes" role="group" aria-label="Recruiter reading mode">
          <button type="button" aria-pressed={mode === "scan"} onClick={() => onMode("scan")} data-testid="button-mode-scan">60-second scan</button>
          <button type="button" aria-pressed={mode === "deep"} onClick={() => onMode("deep")} data-testid="button-mode-deep">Deeper review</button>
        </div>
      </div>
      <div className="soc-hero-grid">
        <div>
          <div className="soc-eyebrow soc-mono"><span className="soc-live-dot" aria-hidden="true" /> Evidence-led candidate brief</div>
          <h1 className="soc-h1" id="hero-title">SOC Analyst L1.<br /><span>Investigation.<br />Triage. Clarity.</span></h1>
          <p className="soc-intro">SOC Analyst L1 candidate pursuing a B.S. in Cybersecurity and Information Assurance. Hands-on investigations, explainable triage, and coaching, shown through the work, with lab observations kept distinct from production impact.</p>
          <div className="soc-hero-cta">
            <a className="soc-btn pink" href="#projects" data-testid="link-explore-work">Explore investigation work <ChevronDown size={15} aria-hidden="true" /></a>
            <a className="soc-btn" href={RESUME_HREF} download data-testid="link-resume-hero"><ArrowDownToLine size={15} aria-hidden="true" /> Download resume (PDF)</a>
            <a className="soc-btn" href={LINKEDIN} target="_blank" rel="noreferrer" data-testid="link-linkedin-hero"><Linkedin size={15} aria-hidden="true" /> Message on LinkedIn<span className="sr-only"> (opens in new tab)</span></a>
          </div>
        </div>
        <aside className="soc-identity" aria-labelledby="snapshot-title">
          <h2 id="snapshot-title">Candidate snapshot</h2>
          <div className="soc-identity-sub">A quick, factual read</div>
          <dl className="soc-kv">
            <dt>Focus</dt><dd>SOC Analyst L1</dd>
            <dt>Study</dt><dd>WGU, B.S. Cybersecurity &amp; Information Assurance</dd>
            <dt>Evidence</dt><dd>Home lab + academic simulation</dd>
            <dt>Credential</dt><dd>CompTIA Security+ (2026)</dd>
            <dt>Lab</dt><dd>180 authentication events, 3 SPL detections</dd>
            <dt>Tests</dt><dd>46 automated tests, phishing workflow</dd>
          </dl>
        </aside>
      </div>
      <div className="soc-scan" role="group" aria-label="60-second recruiter scan">
        <div className="lead"><div className="soc-mono soc-kicker">01 / 60-second scan</div><h2>What to remember</h2><div className="cap" style={{ color: "var(--muted)", fontSize: 12 }}>Three capabilities. Concrete evidence below.</div></div>
        <a href="#splunk" data-testid="link-scan-investigate"><strong>Investigate</strong><span className="cap">180 lab events, detection gap identified</span></a>
        <a href="#phishing" data-testid="link-scan-automate"><strong>Automate</strong><span className="cap">Phishing triage, 46 automated tests</span></a>
        <a href="#experience" data-testid="link-scan-communicate"><strong>Communicate</strong><span className="cap">20+ students coached per month</span></a>
      </div>
    </section>
  );
}
