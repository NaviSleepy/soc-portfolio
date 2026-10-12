import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, MessageSquareText, RotateCcw, Trash2 } from "lucide-react";
import { useAskAmbassador, type EvidenceExcerpt } from "@workspace/api-client-react";
import { SECTION_IDS, starters } from "./data";

interface Turn { id: number; question: string; answer: string; supported: boolean; citations: EvidenceExcerpt[] }

export function citationHref(section: string): string | null {
  const id = section.replace(/^#/, "");
  return SECTION_IDS.includes(id) ? `#${id}` : null;
}

export function Ambassador() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [failed, setFailed] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const counter = useRef(0);
  const generation = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, reset } = useAskAmbassador({ mutation: { gcTime: 0, retry: false } });

  const ask = (raw: string) => {
    const question = raw.trim().slice(0, 600);
    if (!question || pending) return;
    setFailed(null);
    setPending(question);
    const currentGeneration = generation.current;
    mutate({ data: { question } }, {
      onSuccess: (res) => {
        if (currentGeneration !== generation.current) return;
        setTurns((t) => [...t, { id: ++counter.current, question, answer: res.answer, supported: res.supported, citations: res.citations ?? [] }]);
        setDraft("");
      },
      onError: (error) => {
        if (currentGeneration !== generation.current) return;
        setFailed(question);
        const status = (error as { status?: number }).status;
        setErrorMessage(status === 429
          ? "Question limit reached. Please wait 10 minutes or review the source library."
          : "The ambassador could not answer just now. Your question was not saved.");
      },
      onSettled: () => {
        if (currentGeneration !== generation.current) return;
        setPending(null); reset();
      },
    });
  };

  const submit = (e: FormEvent) => { e.preventDefault(); ask(draft); };
  const clear = () => { generation.current++; reset(); setTurns([]); setFailed(null); setPending(null); setDraft(""); inputRef.current?.focus(); };

  return (
    <section className="soc-section" id="ambassador" aria-labelledby="amb-title">
      <div className="soc-section-head">
        <div><div className="soc-kicker soc-mono">07 / Ask the ambassador</div><h2 className="soc-h2" id="amb-title">Ask the evidence directly.</h2></div>
        <p className="soc-section-note">Answers draw only from the verified source library below, with section citations.</p>
      </div>
      <div className="soc-ambassador">
        <div className="soc-amb-head">
          <div className="soc-amb-title"><span className="soc-amb-icon"><MessageSquareText size={19} aria-hidden="true" /></span><div><h3>Recruiter ambassador</h3><p>Source-grounded, no memory between visits</p></div></div>
          <button type="button" className="soc-btn" onClick={clear} disabled={!turns.length && !failed && !draft && !pending} data-testid="button-clear-chat"><Trash2 size={14} aria-hidden="true" /> Clear conversation</button>
        </div>
        <div className="soc-amb-body">
          <ul className="soc-starters" aria-label="Starter questions">
            {starters.map((s) => (
              <li key={s.label}><button type="button" className="soc-starter" disabled={!!pending} onClick={() => ask(s.question)} data-testid={`button-starter-${s.label.toLowerCase().replace(/\s+/g, "-")}`}><b>{s.label.toUpperCase()}</b>{s.question}</button></li>
            ))}
          </ul>
          <div className="soc-chat-log" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation" data-testid="log-chat">
            {turns.map((t) => (
              <div key={t.id} style={{ display: "grid", gap: 8 }} data-testid={`turn-${t.id}`}>
                <div className="soc-q"><span className="sr-only">You asked: </span>{t.question}</div>
                <div className={`soc-answer ${t.supported ? "" : "is-unsupported"}`}>
                  <div className="soc-answer-label soc-mono">{t.supported ? "Ambassador / verified sources" : "Ambassador / unsupported"}</div>
                  <p data-testid={`text-answer-${t.id}`}>{t.answer}</p>
                  {t.citations.length > 0 && (
                    <div className="soc-citations" aria-label="Sources">
                      {t.citations.map((c) => {
                        const href = citationHref(c.section);
                        return href
                          ? <a key={c.id} href={href} data-testid={`link-citation-${c.id}`}>{c.title} <ArrowUpRight size={12} aria-hidden="true" /></a>
                          : <span key={c.id} className="soc-mono" style={{ color: "var(--muted)" }}>{c.title}</span>;
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {pending && (
              <div style={{ display: "grid", gap: 8 }} aria-busy="true">
                <div className="soc-q">{pending}</div>
                <div className="soc-answer" data-testid="status-loading"><div className="soc-answer-label soc-mono">Checking verified sources</div><div className="soc-skel" style={{ width: "92%" }} /><div className="soc-skel" style={{ width: "74%" }} /><div className="soc-skel" style={{ width: "58%" }} /></div>
              </div>
            )}
            {failed && !pending && (
              <div className="soc-error" role="alert" data-testid="status-error">
                <span>{errorMessage}</span>
                <button type="button" className="soc-btn" onClick={() => ask(failed)} data-testid="button-retry"><RotateCcw size={14} aria-hidden="true" /> Retry</button>
              </div>
            )}
          </div>
          <form className="soc-chat-form" onSubmit={submit}>
            <label htmlFor="ambassador-input">Ask a recruiter question</label>
            <div className="soc-chat-row">
              <input id="ambassador-input" ref={inputRef} type="text" maxLength={600} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask about fit, a project, skills, or leadership" autoComplete="off" data-testid="input-question" />
              <button className="soc-btn pink" type="submit" disabled={!draft.trim() || !!pending} data-testid="button-ask">Ask <ArrowUpRight size={14} aria-hidden="true" /></button>
            </div>
            <div className="soc-count"><span>Unsupported questions receive a plain refusal.</span><span>{draft.length}/600</span></div>
          </form>
          <p className="soc-privacy"><strong>Privacy.</strong> This site does not store or log chat, and the conversation lives only in this page's memory. Each question is answered independently. Questions are processed by an AI provider. Anonymous, expiring request counters prevent abuse. Do not enter sensitive information.</p>
        </div>
      </div>
    </section>
  );
}
