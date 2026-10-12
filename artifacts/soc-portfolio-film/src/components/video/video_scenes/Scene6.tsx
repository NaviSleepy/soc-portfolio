import { motion } from "framer-motion";
import { EASE, Frame, Kicker, Reveal, useBeat } from "../FilmPrimitives";

export function Scene6() {
  const beat = useBeat([500, 1000, 1400, 1900, 2100, 3200]);
  return <Frame color="#ff62ad" light scene="signature" entry="inset(0 50% 0 0)">
    <Kicker>Evidence. Not assumptions.</Kicker>
    <motion.div className="end-iris" animate={{ clipPath: beat >= 6 ? "circle(140% at 84% 13%)" : "circle(0% at 84% 13%)" }} transition={{ duration: 1, ease: EASE }} />
    <motion.div animate={{ color: beat >= 6 ? "#f8eff5" : "#19131a" }} transition={{ duration: .4 }}>
      <h2 className="end-name"><Reveal delay={.1}>Layla</Reveal><Reveal delay={.5}>Drummond.</Reveal></h2>
      <Reveal delay={1} className="film-body" style={{ position: "absolute", left: "7%", top: "61%" }}>SOC Analyst L1 candidate</Reveal>
      <Reveal delay={1.4} style={{ position: "absolute", left: "7%", top: "69%", fontSize: "2.8vmin" }}>Investigation. Triage. Clarity.</Reveal>
      <Reveal delay={1.9} style={{ position: "absolute", left: "7%", top: "79%", font: "500 2.4vmin var(--font-mono)" }}>LinkedIn messaging</Reveal>
      <Reveal delay={2.1} style={{ position: "absolute", left: "7%", top: "85%", font: "2.1vmin var(--font-mono)" }}>linkedin.com/in/layladrummond6010</Reveal>
    </motion.div>
  </Frame>;
}
