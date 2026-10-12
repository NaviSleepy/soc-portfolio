// Approved excerpts from the supplied resume. Served publicly on the site.
// The model can select IDs only; it cannot author the returned factual text.
export const evidence = [
  {
    id: "background", title: "Background and SOC L1 positioning", section: "#role-fit",
    text: "Layla Drummond is an early-career cybersecurity professional targeting SOC Analyst L1 roles, pursuing a B.S. in Cybersecurity and Information Assurance at Western Governors University. Her evidence includes home-lab Splunk investigations, Python log analysis, phishing triage, academic incident automation, and technical coaching. These projects are not claims of production SOC employment."
  },
  {
    id: "fit", title: "Role match: investigate, automate, communicate", section: "#role-fit",
    text: "The SOC L1 role match is grounded in three capabilities: authentication alert investigation demonstrated by the Splunk lab; explainable triage and ticket automation demonstrated by the phishing project; and clear documentation and communication demonstrated by investigation write-ups and WGU peer coaching. The resume lists security monitoring, alert triage, initial incident response, log review, IOC analysis, and incident documentation."
  },
  {
    id: "splunk", title: "Splunk Authentication Log Investigation — home lab", section: "#splunk",
    text: "In a home lab, Layla ingested and validated 180 authentication events across two servers and built three SPL detections using stats, bin, streamstats, and sliding time windows. Findings included password guessing (18 failures followed by a successful logon from the same source), password spraying (one source attempting 10 accounts in under three minutes), and stale service-account credentials. Findings were mapped to MITRE ATT&CK T1110.001, T1110.003, and T1078."
  },
  {
    id: "gap", title: "Detection gap and investigation limitations", section: "#splunk",
    text: "The per-account burst rule in the Splunk home lab missed the password-spraying pattern. Layla added a companion rule counting distinct accounts per source; the gap is enforced as a regression test in her Python analyzer. She produced a three-panel dashboard and documented triage priorities, recommended follow-up evidence, and explicit limitations separating suspicious activity from confirmed compromise."
  },
  {
    id: "phishing", title: "Automated Phishing Triage — home lab", section: "#phishing",
    text: "Layla built a Python CLI to analyze .eml phishing reports, parse SPF/DKIM/DMARC results, and extract URLs, domains, sender IPs, and attachment hashes. VirusTotal and AbuseIPDB reputation lookups use caching, rate limits, and per-message budgets. The workflow generates explainable verdicts from authentication, impersonation, suspicious content, and reputation signals."
  },
  {
    id: "tickets", title: "Phishing tickets and 46 automated tests", section: "#phishing",
    text: "The phishing home-lab workflow generates ticket payloads with MITRE ATT&CK mappings, defanged indicators, scoring rationale, and recommended response actions. An enriched phishing report was captured in Raiseaticket. Duplicate-ticket prevention and 46 automated tests cover parsing, scoring, enrichment, ticketing, mocked API errors, and a local help-desk round trip. No public repository link was supplied for this project."
  },
  {
    id: "python", title: "Python Authentication Log Analyzer — home lab", section: "#python",
    text: "Layla built a dependency-free Python CLI using regex to parse authentication logs and reproduce three Splunk detections against the same 180-event dataset: failure bursts, successful logons after repeated failures, and password spraying. It uses per-account and per-source correlation, behavior- and scope-based severity, sliding 10-minute windows to avoid time-bucket boundary misses, and interval-variance analysis to distinguish scripted attempts from human retries."
  },
  {
    id: "python-tests", title: "Python analyzer testing and automation", section: "#python",
    text: "The Python Authentication Log Analyzer includes 24 unit tests covering parser validation, thresholds, window expiry, and password-spraying detection gaps. Standard exit codes support scheduled and pipeline use. This is home-lab evidence, not a production business-impact metric."
  },
  {
    id: "network", title: "Network Incident Response — academic simulation", section: "#network",
    text: "For an academic project, Layla developed a Python automation suite for a simulated 16-device enterprise network in GNS3. It parses CSV inventory, performs scheduled ICMP checks, and sends alerts with smtplib. Paramiko/SSH automation compares live BIND and resolv.conf settings on Linux servers with an approved baseline, corrects unauthorized DNS drift, and verifies the fix."
  },
  {
    id: "network-tickets", title: "Network ticket lifecycle and backups", section: "#network",
    text: "The academic network automation integrates a help-desk REST API to open and update tickets across detect, alert, remediate, and resolve. It creates timestamped per-device configuration backups and structured DNS service logs. The codebase was managed in GitLab with function-scoped commits. The environment was simulated; no public repository link or production impact metric was supplied."
  },
  {
    id: "coaching", title: "Experience and leadership through coaching", section: "#experience",
    text: "The supplied resume lists WGU Peer Coach Intern / Peer Tutor, remote, Aug. 2024–Present. Layla coaches 20+ students per month through cybersecurity and IT coursework, troubleshooting, network security, and certification preparation. The resume reports a 4.8/5.0 student satisfaction rating across 80+ virtual coaching sessions. She protects sensitive student information and collaborates with faculty and peer coaches on learning resources. This is coaching and collaboration evidence, not a claimed management role."
  },
  {
    id: "work", title: "Earlier professional experience", section: "#experience",
    text: "At VXI Global Solutions, Layla was a remote Customer Service / Call Center Representative, July 2022–Dec. 2022, troubleshooting account, service, and basic technical issues, documenting interactions in CRM systems, escalating complex issues, and following data-protection protocols. At ERC, she was a remote Administrative Assistant / Office Support, Sept. 2019–Jan. 2020, handling scheduling, records, data entry, email communication, organized documentation, and confidential information."
  },
  {
    id: "education", title: "Education", section: "#education",
    text: "Layla is pursuing a B.S. in Cybersecurity and Information Assurance at Western Governors University, with expected completion Dec. 2027 and 76 competency units completed as listed on the supplied resume. Relevant coursework includes Network Security, Digital Forensics, Information Security, Legal Issues in Information Security, and IT Project Management."
  },
  {
    id: "certifications", title: "Certifications listed on the resume", section: "#education",
    text: "The supplied resume lists CompTIA Security+ (2026), Network+ (2025), A+ (2025), Project+ (2025), and ITIL 4 Foundation (2025). These are resume-reported credentials; no credential IDs, expiration dates, or independent verification links were supplied."
  },
  {
    id: "skills-demonstrated", title: "Skills supported by project evidence", section: "#skills",
    text: "Project evidence supports Splunk/SPL authentication correlation and detections, Python/regex log parsing, unit testing, phishing email header and IOC analysis, VirusTotal and AbuseIPDB integration, MITRE ATT&CK mappings, ticket payload generation, REST API integration, Linux/Paramiko SSH automation, DNS baseline remediation, GNS3 simulations, and investigation documentation."
  },
  {
    id: "skills-listed", title: "Additional resume-listed skills", section: "#skills",
    text: "Additional resume-listed skills include Wireshark, Nmap, Autopsy, SIEM operations, network traffic analysis, TCP/IP, DNS, DHCP, OSI, VPNs, segmentation, firewalls, IDS/IPS concepts, Windows, Linux, CLI, systemd, PowerShell, Java, Git/GitHub/GitLab, risk management concepts, security best practices, technical coaching, communication, customer service, collaboration, confidentiality, and adaptability. Listing a skill does not imply a demonstrated project or proficiency level."
  },
  {
    id: "impact", title: "Impact boundaries", section: "#projects",
    text: "Verified resume-reported outcomes are lab findings, tested tools, simulation workflows, and coaching metrics: 180 authentication events, three SPL detections, 46 phishing-workflow tests, 24 analyzer unit tests, a simulated 16-device network, 20+ students coached monthly, and 4.8/5.0 satisfaction across 80+ coaching sessions. No production SOC impact, monetary savings, incident-response time reduction, or enterprise deployment metric was supplied."
  },
  {
    id: "contact", title: "Public contact and project links", section: "#contact",
    text: "Public contact is LinkedIn messaging via https://www.linkedin.com/in/layladrummond6010/. GitHub is https://github.com/NaviSleepy. Public repositories supplied in the resume are https://github.com/NaviSleepy/splunk-auth-investigation and https://github.com/NaviSleepy/auth-log-analyzer. Phone, address, and private email are excluded from this public portfolio."
  }
] as const;

export const unsupportedAnswer = {
  answer: "I don’t have verified information about that",
  supported: false,
  citations: [],
};
