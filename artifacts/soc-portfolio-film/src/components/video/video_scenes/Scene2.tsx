import { motion } from "framer-motion";
import { EASE, Frame, Kicker, Reveal, useBeat } from "../FilmPrimitives";

export function Scene2() {
  const beat = useBeat([800, 1300, 1700, 2400, 3100, 3700, 4300, 5100]);
  return <Frame color="#f4d9e8" light scene="splunk" entry="inset(0 0 0 85%)">
    <Kicker>01 / Splunk · Home lab</Kicker>
    <motion.div style={{ position: "absolute", inset: 0 }} animate={{ y: beat >= 8 ? -12 : 0, scale: beat >= 8 ? .98 : 1 }} transition={{ duration: .8 }}>
      <Reveal delay={.15} className="investigation-number">180</Reveal>
      <Reveal delay={.8} className="film-body" style={{ position: "absolute", top: "44%", left: "7%" }}>authentication events / two servers</Reveal>
      <Reveal delay={1.3} style={{ position: "absolute", top: "48.8%", right: "7%", font: "500 2.1vmin var(--font-mono)" }}>3 SPL detections</Reveal>
    </motion.div>
    <div className="detection-list">
      {["Password guessing", "Password spraying", "Stale credentials"].map((label, i) =>
        <motion.div className="detection-row" key={label}
          initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ delay: 1.7 + i * .7, duration: .45, ease: EASE }}>
          <span className="detection-index">{i + 1}</span><span>{label}</span>
        </motion.div>
      )}
    </div>
    <motion.div style={{ position: "absolute", left: "7%", right: "7%", top: "80%", fontSize: "2.4vmin", fontWeight: 700 }}
      animate={{ opacity: beat >= 6 ? 1 : 0 }} transition={{ duration: .25 }}>
      {beat >= 7 ? "Added distinct accounts per source." : "Per-account rule missed spraying."}
    </motion.div>
    <div className="film-footer">Resume-reported lab evidence</div>
  </Frame>;
}
