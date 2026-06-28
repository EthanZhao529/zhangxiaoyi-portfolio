import { useEffect, useRef } from "react";

// 金色粒子从根部（底）缓缓升到树梢（顶），轻微左右摇曳，发光
export default function GoldParticles() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, dpr = 1, parts = [], raf = null, visible = false;

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (atBottom) => ({
      x: Math.random() * W,
      y: atBottom ? H + Math.random() * 30 : Math.random() * H,
      vy: 0.3 + Math.random() * 0.9,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.008 + Math.random() * 0.02,
      amp: 0.2 + Math.random() * 0.9,
      r: 0.6 + Math.random() * 1.9,
    });
    const build = () => {
      const n = Math.round(Math.min(140, (W * H) / 8500));
      parts = Array.from({ length: n }, () => spawn(false));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        p.y -= p.vy;
        p.sway += p.swaySpd;
        p.x += Math.sin(p.sway) * p.amp;
        if (p.y < -10) Object.assign(p, spawn(true));
        const prog = Math.max(0, Math.min(1, 1 - p.y / H));
        const a = Math.sin(Math.PI * prog); // 底/顶淡、中间亮
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,210,130,${0.55 * a})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    const start = () => { if (!raf && visible) raf = requestAnimationFrame(draw); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };

    size(); build();
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; visible ? start() : stop(); }, { threshold: 0 });
    io.observe(cv);
    const onResize = () => { size(); build(); };
    window.addEventListener("resize", onResize);
    return () => { io.disconnect(); stop(); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={ref} className="gold-particles" aria-hidden="true" />;
}
