import { useCallback, useMemo, useState } from "react";

export function stripRepeatSuffix(key: string) { return key.replace(/_r[12]$/, ""); }
export function useSceneControls(baseDurations: Record<string, number>) {
  const sceneKeys = useMemo(() => Object.keys(baseDurations), [baseDurations]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mountKey, setMountKey] = useState(0);
  const [tick, setTick] = useState(0);
  // Only a remount changes the hook's captured playback order.
  const durations = useMemo(() => {
    const key = sceneKeys[activeIndex];
    if (locked) return { [`${key}_r1`]: baseDurations[key], [`${key}_r2`]: baseDurations[key] };
    const rotated = [...sceneKeys.slice(activeIndex), ...sceneKeys.slice(0, activeIndex)];
    return Object.fromEntries(rotated.map(k => [k, baseDurations[k]]));
  }, [baseDurations, sceneKeys, activeIndex, locked]);
  const onSceneChange = useCallback((raw: string) => {
    const index = sceneKeys.indexOf(stripRepeatSuffix(raw));
    if (index >= 0) setActiveIndex(index);
    setTick(t => t + 1);
  }, [sceneKeys]);
  const jumpTo = useCallback((index: number) => {
    setActiveIndex(index); setPaused(false); setMountKey(k => k + 1); setTick(t => t + 1);
  }, []);
  const toggleLock = () => { setLocked(l => !l); setPaused(false); setMountKey(k => k + 1); setTick(t => t + 1); };
  const activeStartTime = sceneKeys.slice(0, activeIndex).reduce((sum, k) => sum + baseDurations[k], 0);
  const totalDuration = Object.values(baseDurations).reduce((sum, ms) => sum + ms, 0);
  return { durations, sceneKeys, activeIndex, activeStartTime, totalDuration, locked, paused, mountKey, tick, onSceneChange, jumpTo, toggleLock, togglePause: () => setPaused(p => !p) };
}
