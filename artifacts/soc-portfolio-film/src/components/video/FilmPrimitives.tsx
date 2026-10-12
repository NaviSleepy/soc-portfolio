import { useState, type PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { useSceneTimer } from "@/lib/video";

export const EASE = [0.22, 1, 0.36, 1] as const;
export function useBeat(times: number[]) {
  const [beat, setBeat] = useState(0);
  useSceneTimer(times.map((time, index) => ({ time, callback: () => setBeat(index + 1) })));
  return beat;
}
export function Frame({ children, color, light = false, entry = "inset(0% 0% 0% 0%)", scene }: PropsWithChildren<{ color: string; light?: boolean; entry?: string; scene: string }>) {
  return (
    <motion.section data-scene={scene} className={`film-scene ${light ? "light" : ""}`}
      style={{ background: color }}
      initial={{ opacity: 1, clipPath: entry, scale: 1.055 }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
      exit={{ opacity: 0, scale: 1.045, rotate: -0.5 }}
      transition={{ duration: .55, ease: EASE }}>
      {children}
    </motion.section>
  );
}
export function Reveal({ children, delay = 0, className, style }: PropsWithChildren<{ delay?: number; className?: string; style?: React.CSSProperties }>) {
  return <motion.div className={className} style={style}
    initial={{ clipPath: "inset(100% 0 0 0)", y: 12 }}
    animate={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
    transition={{ delay, duration: .5, ease: EASE }}>{children}</motion.div>;
}
export function Kicker({ children }: PropsWithChildren) {
  return <><div className="film-kicker">{children}</div><div className="film-toprule" /></>;
}
