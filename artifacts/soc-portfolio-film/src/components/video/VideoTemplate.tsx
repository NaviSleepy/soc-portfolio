import {
  VideoCanvas,
  type VideoAspectRatio,
  useVideoPlayer,
  VideoPausedContext,
} from '@/lib/video';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';
import './film.css';

export const SCENE_DURATIONS = {
  hook: 4000,
  splunk: 6000,
  phishing: 5000,
  coaching: 4000,
  ambassador: 7000,
  signature: 4000,
};
const VIDEO_ASPECT_RATIO: VideoAspectRatio = '1:1';
const SCENES = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];
const MARKERS = [
  { left: "81%", top: "8%", scale: 1, color: "#ff62ad" },
  { left: "78%", top: "18%", scale: 1.5, color: "#291c28" },
  { left: "45%", top: "35%", scale: .7, color: "#ff62ad" },
  { left: "81%", top: "41%", scale: 1, color: "#ff62ad" },
  { left: "80%", top: "75%", scale: .7, color: "#ff62ad" },
  { left: "81%", top: "8%", scale: 1, color: "#291c28" },
];
const SCENE_START_SEC: Record<string, number> = {};
let cumulativeMs = 0;
for (const [key, duration] of Object.entries(SCENE_DURATIONS)) {
  SCENE_START_SEC[key] = cumulativeMs / 1000;
  cumulativeMs += duration;
}

export default function VideoTemplate({
  durations = SCENE_DURATIONS, loop = true, paused = false, muted = false, onSceneChange,
}: { durations?: Record<string, number>; loop?: boolean; paused?: boolean; muted?: boolean; onSceneChange?: (sceneKey: string) => void } = {}) {
  const { currentSceneKey } = useVideoPlayer({
    durations, loop, paused,
  });
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const canonicalIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const Scene = SCENES[canonicalIndex];
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastSceneKeyRef = useRef<string | null>(null);
  useEffect(() => { onSceneChange?.(currentSceneKey); }, [currentSceneKey, onSceneChange]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = .45;
    if (paused) { audio.pause(); return; }
    if (lastSceneKeyRef.current !== currentSceneKey) {
      lastSceneKeyRef.current = currentSceneKey;
      const target = SCENE_START_SEC[baseSceneKey] ?? 0;
      if (Math.abs(audio.currentTime - target) > .18) audio.currentTime = target;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, paused, muted]);

  return (
    <VideoCanvas
      aspectRatio={VIDEO_ASPECT_RATIO}
      style={{ backgroundColor: '#121014' }}
    >
      <VideoPausedContext.Provider value={paused}>
        <AnimatePresence mode="sync">
          <Scene key={currentSceneKey} />
        </AnimatePresence>
        <motion.div className="film-marker" initial={false} animate={MARKERS[canonicalIndex]} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}><span /></motion.div>
      </VideoPausedContext.Provider>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`} preload="auto" autoPlay muted={muted} />
    </VideoCanvas>
  );
}
