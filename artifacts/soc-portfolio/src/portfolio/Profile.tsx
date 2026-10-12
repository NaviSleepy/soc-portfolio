import { certs, demonstrated, skillGroups } from "./data";

export function Experience() {
  return (
    <section className="soc-section" id="experience" aria-labelledby="exp-title">
      <div className="soc-section-head">
        <div><div className="soc-kicker soc-mono">04 / Experience &amp; leadership</div><h2 className="soc-h2" id="exp-title">Technical clarity is a team skill.</h2></div>
        <p className="soc-section-note">Leadership shown through coaching and collaboration, not an implied management title. No prior SOC role is claimed.</p>
      </div>
      <div className="soc-work-grid">
        <article className="soc-card">
          <div className="soc-mono" style={{ color: "var(--pink-soft)" }}>Aug 2024 to present, as listed on resume · Remote</div>
          <h3>Western Governors University · Peer Coach Intern / Peer Tutor</h3>
          <p>Coaching in cybersecurity/IT, networking, troubleshooting, and certification preparation.</p>
          <div className="soc-stat"><strong>20+</strong><span>students coached per month</span></div>
          <ul className="soc-points">
            <li>Supports A+ and Network+ readiness.</li>
            <li>4.8/5.0 satisfaction across 80+ virtual coaching sessions.</li>
            <li>Protects sensitive student information; collaborates with faculty and peer coaches on resources.</li>
          </ul>
        </article>
        <div className="soc-card">
          <div className="soc-mono soc-kicker">Earlier experience</div>
          <h3>Customer service &amp; office support</h3>
          <p>Remote roles involving documentation, communication, and careful handling of information.</p>
          <ul className="soc-points">
            <li><b>VXI Global Solutions</b> · Customer Service / Call Center Representative · Jul to Dec 2022. Account/service/basic technical troubleshooting, CRM documentation, appropriate escalation, data-protection protocols.</li>
            <li><b>ERC</b> · Administrative Assistant / Office Support · Sept 2019 to Jan 2020. Scheduling, records, data entry, email communication, organized documentation and confidential information handling.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="soc-section" id="skills" aria-labelledby="skills-title">
      <div className="soc-section-head">
        <div><div className="soc-kicker soc-mono">05 / Skills</div><h2 className="soc-h2" id="skills-title">Demonstrated, then listed.</h2></div>
        <p className="soc-section-note">Filled chips appear in a project above. Dashed chips are resume-listed and not implied to be demonstrated in a project.</p>
      </div>
      <p className="soc-legend"><span><span className="soc-chip is-demo">Demonstrated in project</span></span><span><span className="soc-chip">Resume-listed</span></span></p>
      <div className="soc-skill-groups">
        {skillGroups.map((g) => (
          <div className="soc-skill-group" key={g.name}>
            <h3>{g.name}</h3>
            <ul className="soc-chips">
              {g.items.map((s) => {
                const demo = demonstrated.has(s);
                return <li key={s} className={`soc-chip ${demo ? "is-demo" : ""}`}>{s}<span className="sr-only">{demo ? " (demonstrated in project)" : " (resume-listed)"}</span></li>;
              })}
            </ul>
          </div>
        ))}
      </div>
      <p className="soc-disclaimer">Skills are self-reported from Layla's resume.</p>
    </section>
  );
}

export function Education() {
  return (
    <section className="soc-section" id="education" aria-labelledby="edu-title">
      <div className="soc-section-head">
        <div><div className="soc-kicker soc-mono">06 / Education &amp; certifications</div><h2 className="soc-h2" id="edu-title">Credentials, as listed.</h2></div>
      </div>
      <div className="soc-edu-grid">
        <article className="soc-card edu">
          <div className="soc-mono" style={{ color: "var(--pink-soft)" }}>Expected Dec 2027</div>
          <h3>Western Governors University</h3>
          <p>B.S. Cybersecurity and Information Assurance. 76 competency units completed.</p>
          <ul className="soc-pills">{["Network Security","Digital Forensics","Information Security","Legal Issues in Information Security","IT Project Management"].map((c) => <li key={c}>{c}</li>)}</ul>
        </article>
        <article className="soc-card edu">
          <div className="soc-mono" style={{ color: "var(--pink-soft)" }}>Certifications</div>
          <h3>Self-reported, per resume</h3>
          <ul className="soc-certs">{certs.map(([n, y]) => <li key={n}>{n}<span>{y}</span></li>)}</ul>
        </article>
      </div>
    </section>
  );
}
