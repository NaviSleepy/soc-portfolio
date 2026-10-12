import { AnimatePresence, motion } from "framer-motion";
import { EASE, Frame, Kicker, Reveal, useBeat } from "../FilmPrimitives";

export function Scene5() {
  const beat = useBeat([1000, 1500, 2100, 2800, 4000, 4400, 5000, 6000]);
  const refused = beat >= 6;
  return <Frame color="#121014" scene="ambassador" entry="inset(0 0 0 45%)">
    <Kicker>The recruiter view</Kicker>
    <Reveal delay={.3} style={{ position: "absolute", left: "7%", top: "17%" }}>
      <h2 className="film-head" style={{ fontSize: "7vmin" }}>Scan. Inspect. <span className="film-pink">Ask.</span></h2>
    </Reveal>
    <motion.div className="site-frame" initial={{ rotateX: 18, scale: 1.12 }}
      animate={{ rotateX: 0, scale: beat >= 8 ? 1.05 : 1 }}
      transition={{ duration: .8, ease: EASE }} style={{ perspective: 1200 }}>
      <img src={`${import.meta.env.BASE_URL}images/portfolio.jpg`} alt="Actual SOC L1 portfolio with dark-and-pink evidence-led design" />
    </motion.div>
    <Reveal delay={1} style={{ position: "absolute", left: "7%", top: "59.6%", font: "1.7vmin var(--font-mono)", color: "#efb4d2" }}>60-second scan + deeper review</Reveal>
    <div className="answer-art">
      <div className="answer-label">Virtual ambassador / illustrative excerpt</div>
      <div className="answer-q">{beat >= 5 ? "What is Layla’s availability?" : "What evidence supports SOC L1 fit?"}</div>
      <AnimatePresence mode="sync">
        <motion.div key={refused ? "unsupported" : "supported"}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: beat >= 3 ? 1 : 0, y: 0 }}
          exit={{ opacity: 0, transition: { duration: .1 } }} transition={{ duration: .3 }}>
          <p>{refused ? "I don’t have verified information about that" : "Splunk home lab: 180 authentication events. Three SPL detections."}</p>
          {!refused && <div className="answer-source">Source: Splunk investigation</div>}
        </motion.div>
      </AnimatePresence>
    </div>
    <Reveal delay={5} className="film-footer">Only verified site sources. No app chat storage.</Reveal>
  </Frame>;
}
