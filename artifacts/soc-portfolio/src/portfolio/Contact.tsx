import { ArrowDownToLine, Linkedin } from "lucide-react";
import { GITHUB, LINKEDIN, RESUME_HREF } from "./data";

export function Contact() {
  return (
    <section className="soc-section" id="contact" aria-labelledby="contact-title">
      <div className="soc-section-head">
        <div><div className="soc-kicker soc-mono">09 / Contact</div><h2 className="soc-h2" id="contact-title">Continue the conversation.</h2></div>
        <p className="soc-section-note">LinkedIn is the sole contact channel. The resume PDF is sanitized for public sharing.</p>
      </div>
      <div className="soc-contact">
        <div className="soc-card hot">
          <h3>Message Layla on LinkedIn</h3>
          <p>Direct messages go through LinkedIn.</p>
          <div className="soc-hero-cta"><a className="soc-btn pink" href={LINKEDIN} target="_blank" rel="noreferrer" data-testid="link-linkedin-contact"><Linkedin size={15} aria-hidden="true" /> Open LinkedIn<span className="sr-only"> (opens in new tab)</span></a></div>
        </div>
        <div className="soc-card">
          <h3>Resume</h3>
          <p>Sanitized PDF, self-reported content.</p>
          <div className="soc-hero-cta"><a className="soc-btn pink" href={RESUME_HREF} download data-testid="link-resume-contact"><ArrowDownToLine size={15} aria-hidden="true" /> Download resume (PDF)</a><a className="soc-btn" href={GITHUB} target="_blank" rel="noreferrer" data-testid="link-github-contact">GitHub<span className="sr-only"> (opens in new tab)</span></a></div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="soc-footer">
      <span>Layla Drummond · SOC Analyst L1 candidate · Evidence is self-reported resume content.</span>
      <span className="soc-footer-links">
        <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
        <a href="#top">Back to top</a>
      </span>
    </footer>
  );
}
