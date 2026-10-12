import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Lock, Unlock, Pause, Play, Volume2, VolumeX } from "lucide-react";
import VideoTemplate, { SCENE_DURATIONS } from "./VideoTemplate";
import { SCENE_META } from "./sceneMeta";
import { useSceneControls } from "./useSceneControls";

const formatTime = (ms: number) => `0:${String(Math.floor(ms / 1000)).padStart(2, "0")}`;
function PlaybackStatus({ controls, onJump }: { controls: ReturnType<typeof useSceneControls>; onJump: (index: number) => void }) {
  const [elapsed, setElapsed] = useState(0);
  const timeRef = useRef({ started: performance.now(), elapsed: 0 });
  useEffect(() => {
    timeRef.current = { started: performance.now(), elapsed: 0 };
    setElapsed(0);
  }, [controls.tick]);
  useEffect(() => {
    if (controls.paused) {
      timeRef.current.elapsed += performance.now() - timeRef.current.started;
      return;
    }
    timeRef.current.started = performance.now();
    const timer = window.setInterval(() => setElapsed(timeRef.current.elapsed + performance.now() - timeRef.current.started), 60);
    return () => window.clearInterval(timer);
  }, [controls.paused, controls.tick]);
  const localMs = Math.min(elapsed, Object.values(SCENE_DURATIONS)[controls.activeIndex]);
  return <>
    <div className="film-segments" aria-label="Video scenes">
      {SCENE_META.map((scene, index) => {
        const progress = index < controls.activeIndex ? 1 : index > controls.activeIndex ? 0 : localMs / Object.values(SCENE_DURATIONS)[index];
        return <button key={scene.title} className="film-segment" onClick={() => onJump(index)} title={scene.title} aria-label={`Play scene ${index + 1}: ${scene.title}`} aria-current={index === controls.activeIndex ? "step" : undefined}>
          <span className="film-segment-track"><span className="film-segment-fill" style={{ transform: `scaleX(${progress})` }} /></span>
        </button>;
      })}
    </div>
    <span className="film-counter" style={{ fontSize: 11 }}>{controls.activeIndex + 1}/{SCENE_META.length}</span>
    <span className="film-timer">{formatTime(controls.activeStartTime + localMs)} / {formatTime(controls.totalDuration)}</span>
  </>;
}
function IframeVideo() {
  const controls = useSceneControls(SCENE_DURATIONS);
  const [muted, setMuted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [pinned, setPinned] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!controls.paused) return;
    const running = document.getAnimations().filter(animation => animation.playState === "running");
    running.forEach(animation => animation.pause());
    return () => running.forEach(animation => animation.play());
  }, [controls.paused]);
  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (!collapsed || pinned) return;
      setRevealed(event.clientY > window.innerHeight * .75);
    };
    const touch = (event: PointerEvent) => {
      if (barRef.current?.contains(event.target as Node)) return;
      if (event.pointerType === "touch" && event.clientY > window.innerHeight * .75) { setRevealed(true); setPinned(true); }
      else { setPinned(false); setRevealed(false); }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("pointerdown", touch);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("pointerdown", touch); };
  }, [collapsed, pinned]);
  const onJump = (index: number) => {
    controls.jumpTo(index);
    window.parent.postMessage({ type: "REPLIT_VIDEO_SCENE_SELECTED", payload: { sceneIndex: index, sceneCount: SCENE_META.length, sceneTitle: SCENE_META[index].title, filePath: SCENE_META[index].filePath, lineNumber: 1 } }, "*");
  };
  return <div className="film-stage">
    <VideoTemplate key={controls.mountKey} durations={controls.durations} paused={controls.paused} loop onSceneChange={controls.onSceneChange} muted={muted} />
    <div className={`film-control-sensor ${collapsed ? "active" : ""}`} aria-hidden="true" />
    <div ref={barRef} className={`film-controls ${collapsed && !revealed ? "collapsed" : ""}`} onFocusCapture={() => setRevealed(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setRevealed(false); }}>
      <button onClick={controls.togglePause} aria-label={controls.paused ? "Play video" : "Pause video"} aria-pressed={controls.paused}>{controls.paused ? <Play size={20} /> : <Pause size={20} />}</button>
      <button onClick={controls.toggleLock} aria-label={controls.locked ? "Unlock scene loop" : "Loop current scene"} aria-pressed={controls.locked}>{controls.locked ? <Lock size={18} /> : <Unlock size={18} />}</button>
      <button onClick={() => setMuted(m => !m)} aria-label={muted ? "Unmute music" : "Mute music"} aria-pressed={muted}>{muted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
      <span style={{ width: 1, height: 22, background: "#6d4a5e", margin: "0 4px" }} />
      <PlaybackStatus controls={controls} onJump={onJump} />
      <button onClick={() => { setCollapsed(c => !c); setRevealed(false); setPinned(false); }} aria-label={collapsed ? "Expand video controls" : "Collapse video controls"}>{collapsed ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>
    </div>
  </div>;
}
export default function VideoWithControls() {
  const isIframed = window.self !== window.top;
  return isIframed ? <IframeVideo /> : <div className="film-stage"><VideoTemplate /></div>;
}
