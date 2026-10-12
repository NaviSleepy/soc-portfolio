import { motion } from "framer-motion";
import { EASE, Frame, Kicker, Reveal, useBeat } from "../FilmPrimitives";

export function Scene3() {
  const beat = useBeat([700, 1500, 2100, 2500, 2900, 3200, 4100]);
  return <Frame color="#291c28" scene="phishing" entry="inset(38% 0 38% 0)">
    <Kicker>02 / Phishing triage · Home lab</Kicker>
    <motion.div className="mail-art" animate={{ rotateX: beat >= 3 ? 0 : 6, scale: beat >= 7 ? 1.13 : 1 }}
      transition={{ duration: .7, ease: EASE }}>
      <motion.svg viewBox="0 0 600 350" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        animate={{ opacity: beat >= 3 ? .2 : 1 }} transition={{ duration: .5 }}>
        <motion.path d="M0 0L300 200L600 0M0 350L215 195M600 350L385 195"
          fill="none" stroke="#ff62ad" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .7 }} />
      </motion.svg>
      <motion.div className="ticket-paper" initial={{ y: 50, opacity: 0 }}
        animate={{ y: beat >= 3 ? -24 : 28, opacity: beat >= 1 ? 1 : 0 }}
        transition={{ duration: .7, ease: EASE }}>
        <div style={{ font: "500 3.4vmin var(--font-mono)" }}>{beat >= 3 ? "TRIAGE RECORD" : ".eml"}</div>
        <div style={{ font: "1.7vmin var(--font-mono)" }}>SPF / DKIM / DMARC</div>
        {[85, 65, 92].map((width, i) => <motion.div className="ticket-line" key={i} style={{ width: `${width}%`, transformOrigin: "left" }}
          animate={{ scaleX: beat >= 3 ? 1 : .4 }} transition={{ duration: .5, delay: i * .12 }} />)}
      </motion.div>
    </motion.div>
    <Reveal delay={1.5} className="film-body" style={{ position: "absolute", top: "57%", left: "7%" }}>Indicators → verdict → ticket</Reveal>
    <Reveal delay={2.5} className="test-number">46</Reveal>
    <Reveal delay={2.1} style={{ position: "absolute", top: "68%", left: "41%" }}>
      <h2 className="film-head" style={{ fontSize: "5vmin", maxWidth: "47vmin" }}>Explainable<br />triage.</h2>
      <div className="film-body" style={{ marginTop: "2vmin" }}>automated tests</div>
    </Reveal>
    <Reveal delay={3.2} className="film-footer">Python · VirusTotal · AbuseIPDB</Reveal>
  </Frame>;
}
