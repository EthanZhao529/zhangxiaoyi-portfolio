import { useEffect, useRef } from "react";
import { asset } from "../data/site";

// 背景音乐 + 点击音效；受 muted 控制；浏览器策略下首次用户交互才启动
export default function AudioManager({ muted }) {
  const bgmRef = useRef(null);
  const ctxRef = useRef(null);
  const bufRef = useRef(null);
  const startedRef = useRef(false);
  const muteRef = useRef(muted);

  useEffect(() => {
    const bgm = new Audio(asset("audio/bgm.mp3"));
    bgm.loop = true; bgm.volume = 0.32; bgm.preload = "auto";
    bgmRef.current = bgm;

    const AC = window.AudioContext || window.webkitAudioContext;
    const ctx = AC ? new AC() : null;
    ctxRef.current = ctx;
    if (ctx) {
      fetch(asset("audio/click.mp3")).then((r) => r.arrayBuffer()).then((b) => ctx.decodeAudioData(b))
        .then((buf) => { bufRef.current = buf; }).catch(() => {});
    }

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      if (ctx && ctx.state === "suspended") ctx.resume();
      if (!muteRef.current) bgm.play().catch(() => {});
    };
    const onDown = () => {
      start();
      if (muteRef.current || !ctx || !bufRef.current) return;
      const src = ctx.createBufferSource();
      const g = ctx.createGain(); g.gain.value = 0.45;
      src.buffer = bufRef.current; src.connect(g).connect(ctx.destination); src.start();
    };
    addEventListener("pointerdown", onDown);
    addEventListener("scroll", start, { once: true, passive: true });

    return () => {
      removeEventListener("pointerdown", onDown);
      removeEventListener("scroll", start);
      bgm.pause();
      if (ctx && ctx.close) ctx.close();
    };
  }, []);

  // 同步静音
  useEffect(() => {
    muteRef.current = muted;
    const bgm = bgmRef.current;
    if (!bgm) return;
    bgm.muted = muted;
    if (!muted && startedRef.current) bgm.play().catch(() => {});
  }, [muted]);

  return null;
}
