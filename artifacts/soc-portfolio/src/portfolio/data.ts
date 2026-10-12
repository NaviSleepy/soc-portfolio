export const LINKEDIN = "https://www.linkedin.com/in/layladrummond6010/";
export const GITHUB = "https://github.com/NaviSleepy";
export const RESUME_HREF = `${import.meta.env.BASE_URL}resume/Layla-Drummond-Resume.pdf`;

export const SECTION_IDS = ["top","role-fit","projects","splunk","phishing","python","network","experience","skills","education","ambassador","sources","contact"];

export const navItems: [string, string][] = [
  ["Overview", "#top"], ["Evidence", "#projects"], ["Experience", "#experience"],
  ["Skills", "#skills"], ["Education", "#education"], ["Ambassador", "#ambassador"],
];

export interface Project {
  id: string; number: string; title: string; type: "HOME LAB" | "ACADEMIC"; intro: string;
  problem: string; contribution: string; tools: string[]; outcome: string; detail: string;
  link: string | null;
}

export const projects: Project[] = [
  { id: "splunk", number: "01", title: "Splunk Authentication Log Investigation", type: "HOME LAB",
    intro: "Correlating authentication events without overstating what the evidence proves.",
    problem: "Correlate authentication events and distinguish suspicious patterns from confirmed compromise.",
    contribution: "Ingested and validated 180 authentication events across two servers. Built three SPL detections using stats, bin, streamstats, and sliding time windows.",
    tools: ["Splunk", "SPL", "MITRE ATT&CK"],
    outcome: "Identified password guessing (18 failures then a successful logon from the same source), password spraying (one source attempting 10 accounts in under three minutes), and stale service-account credentials. Added a distinct-account-per-source rule after the per-account burst rule missed spraying.",
    detail: "Mapped findings to T1110.001, T1110.003, and T1078. Created a three-panel dashboard, triage priorities, follow-up evidence, and explicit investigation limitations. These are lab observations, not production business impact.",
    link: "https://github.com/NaviSleepy/splunk-auth-investigation" },
  { id: "phishing", number: "02", title: "Automated Phishing Triage and Help Desk Integration", type: "HOME LAB",
    intro: "A Python workflow that makes email triage explainable and actionable.",
    problem: "Analyze reported .eml emails and prepare explainable incident tickets.",
    contribution: "Python CLI parses SPF/DKIM/DMARC results and extracts URLs, domains, sender IPs, and attachment hashes. Integrates reputation lookups with caching, rate limits, and per-message budgets.",
    tools: ["Python", "VirusTotal", "AbuseIPDB", "MITRE ATT&CK", "Raiseaticket"],
    outcome: "Explainable verdicts, defanged indicators, ATT&CK mappings, scoring rationale, recommended response actions, automated ticket payloads, and an enriched report captured in Raiseaticket. Includes duplicate-ticket prevention.",
    detail: "46 automated tests cover parsing, scoring, enrichment, ticketing, mocked API errors, and a local help-desk round trip. No project URL was supplied.",
    link: null },
  { id: "python", number: "03", title: "Python Authentication Log Analyzer", type: "HOME LAB",
    intro: "Reproducing SIEM detection logic with a dependency-free CLI.",
    problem: "Reproduce Splunk detections with a dependency-free Python CLI.",
    contribution: "Regex parsing; per-account and per-source correlation; severity based on behavior and source scope; sliding 10-minute windows; interval-variance analysis distinguishing scripted attempts from human retries.",
    tools: ["Python", "regex", "unittest"],
    outcome: "Reproduced three detections against the same 180-event dataset: failure bursts, successful logons after repeated failures, and password spraying.",
    detail: "24 unit tests cover parsing, thresholds, expiry, and spraying gaps. Standard exit codes support scheduled or pipeline use.",
    link: "https://github.com/NaviSleepy/auth-log-analyzer" },
  { id: "network", number: "04", title: "Network Incident Response and Monitoring Automation", type: "ACADEMIC",
    intro: "A simulated network lifecycle from drift detection through ticket resolution.",
    problem: "Monitor a simulated 16-device enterprise network and remediate unauthorized DNS configuration drift.",
    contribution: "CSV inventory parsing, scheduled ICMP checks, and email alerts; SSH baseline comparison of BIND/resolv.conf with drift correction and verification; REST help-desk tickets opened and updated across detect, alert, remediate, and resolve; timestamped configuration backups and structured DNS-service logs.",
    tools: ["Python", "GNS3", "Paramiko/SSH", "smtplib", "REST API", "Linux", "GitLab"],
    outcome: "Demonstrated monitoring, DNS baseline remediation, backups, and a full ticket lifecycle in a simulation.",
    detail: "No production impact metric was supplied. No project URL was supplied.",
    link: null },
];

export const starters = [
  { label: "Role fit", question: "Why is Layla a fit for a SOC Analyst L1 role?" },
  { label: "Strongest project", question: "What is the strongest project evidence?" },
  { label: "Skills", question: "Which skills are supported by project evidence?" },
  { label: "Leadership", question: "What leadership evidence does Layla bring?" },
];

export const demonstrated = new Set(["Splunk","SPL","VirusTotal","AbuseIPDB","MITRE ATT&CK","Python","regex","unittest","Paramiko/SSH","REST APIs","Linux","GitLab"]);

export const skillGroups: { name: string; items: string[] }[] = [
  { name: "Security operations", items: ["monitoring","alert triage","initial incident response","log review","email headers/IOC analysis","documentation","ticket workflows","detection fundamentals"] },
  { name: "Tools", items: ["Splunk","SPL","Wireshark","Nmap","Autopsy","VirusTotal","AbuseIPDB","SIEM","network traffic analysis","detection engineering"] },
  { name: "Networking", items: ["TCP/IP","DNS","DHCP","OSI","VPNs","segmentation","firewalls","IDS/IPS concepts","troubleshooting"] },
  { name: "Systems", items: ["Windows","Linux","CLI","systemd"] },
  { name: "Scripting", items: ["Python","regex","unittest","PowerShell","Java","Paramiko/SSH","REST APIs","Git/GitHub/GitLab"] },
  { name: "Frameworks", items: ["MITRE ATT&CK","risk concepts","security best practices"] },
  { name: "Professional", items: ["coaching","written/verbal communication","customer service","collaboration","confidentiality","adaptability"] },
];

export const certs = [["CompTIA Security+","2026"],["Network+","2025"],["A+","2025"],["Project+","2025"],["ITIL 4 Foundation","2025"]];
