import { motion } from "framer-motion";
import { EASE, Frame, Kicker, Reveal, useBeat } from "../FilmPrimitives";

export function Scene4() {
  const beat = useBeat([500, 1000, 1700, 2200, 2700, 3200]);
  return <Frame color="#f8eff5" light scene="coaching" entry="inset(0 17% 0 0)">
    <motion.div className="coach-side" animate={{ width: beat >= 6 ? "27%" : "20%" }} transition={{ duration: .8, ease: EASE }} />
    <Kicker>03 / Communication · WGU peer coaching</Kicker>
    <Reveal delay={.2} style={{ position: "absolute", top: "20%", left: "7%" }}>
      <h2 className="film-head" style={{ fontSize: "7.6vmin" }}>Communicate.</h2>
    </Reveal>
    <Reveal delay={.5} className="coach-number">20+</Reveal>
    <Reveal delay={1} className="film-body" style={{ position: "absolute", left: "7%", top: "59%" }}>students coached / month</Reveal>
    <Reveal delay={1.7} style={{ position: "absolute", top: "69%", left: "7%", fontSize: "8vmin", fontWeight: 800, letterSpacing: "-.05em" }}>4.8 / 5</Reveal>
    <Reveal delay={2.2} style={{ position: "absolute", top: "80%", left: "7%", fontSize: "2.5vmin" }}>satisfaction across 80+ sessions</Reveal>
    <motion.svg style={{ position: "absolute", right: 0, top: "40%", width: "30%", height: "35%" }} viewBox="0 0 300 350">
      <motion.path d="M0 290H130V55H255" fill="none" stroke="#ff62ad" strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.7, duration: .7 }} />
    </motion.svg>
    <div className="film-footer">Resume-reported coaching metrics</div>
  </Frame>;
}
