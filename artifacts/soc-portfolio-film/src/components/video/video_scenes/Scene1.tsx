import { AnimatePresence, motion } from "framer-motion";
import { EASE, Frame, Kicker, Reveal, useBeat } from "../FilmPrimitives";

const WORDS = ["EVIDENCE.", "NOT", "ASSUMPTIONS."];
export function Scene1() {
  const beat = useBeat([900, 1400, 2150, 2650, 3200, 3500]);
  const wordIndex = Math.min(beat, 2);
  return <Frame color="#121014" scene="hook">
    <Kicker>SOC Analyst L1 / Evidence portfolio</Kicker>
    <motion.div className="film-word-stage" animate={{ scale: beat >= 5 ? 1.04 : 1 }} transition={{ duration: .6 }}>
      <AnimatePresence mode="sync">
        <motion.div key={wordIndex} className={`film-word ${wordIndex === 1 ? "film-outline" : "film-pink"}`}
          style={{ fontSize: wordIndex === 2 ? "10.9vmin" : "15.4vmin" }}
          initial={{ y: 30, rotateX: -18, opacity: .2 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          exit={{ y: -45, opacity: 0, transition: { duration: .14 } }}
          transition={{ duration: .4, ease: EASE }}>{WORDS[wordIndex]}</motion.div>
      </AnimatePresence>
    </motion.div>
    <motion.div style={{ position: "absolute", top: "49%", left: "7%", height: ".2vmin", background: "#ff62ad", transformOrigin: "left", width: "86%" }}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.9, duration: .6, ease: EASE }} />
    <Reveal delay={2.15} style={{ position: "absolute", left: "7%", top: "57%" }}>
      <h1 className="film-head" style={{ fontSize: "7.6vmin" }}>Layla Drummond</h1>
    </Reveal>
    <Reveal delay={2.65} className="film-body" style={{ position: "absolute", left: "7%", top: "70%" }}>
      Investigation. Triage. Clarity.
    </Reveal>
    <motion.div className="film-footer" animate={{ x: beat >= 6 ? 12 : 0 }}>
      A recruiter-ready visual résumé
    </motion.div>
  </Frame>;
}
