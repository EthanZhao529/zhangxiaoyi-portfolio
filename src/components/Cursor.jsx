import { useEffect } from "react";

// 精美自定义光标：发光主点 + 缓动拖尾环 + 拖尾小点 + 点击水纹特效 + 按区域变色
export default function Cursor() {
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const TRAIL = 6, EASE = 0.2;
    const HOVER = "a,button,.glass,.glass-btn,.gal-item,.cap-card,.tilted-card-figure,.nav__toggle,.hero__scroll,.gal-arrow,[role=button]";

    const dot = el("cur-dot"), ring = el("cur-ring");
    const trail = Array.from({ length: TRAIL }, () => el("cur-trail"));
    function el(cls) { const d = document.createElement("div"); d.className = cls; document.body.appendChild(d); return d; }
    document.body.classList.add("cur-on");

    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, vis = false, raf;
    const hist = Array.from({ length: TRAIL }, () => ({ x: mx, y: my }));
    const show = () => { vis = true; [dot, ring].forEach((e) => (e.style.opacity = 1)); };
    const hide = () => { vis = false; [dot, ring, ...trail].forEach((e) => (e.style.opacity = 0)); };

    const onMove = (e) => { mx = e.clientX; my = e.clientY; if (!vis) show(); };
    const onOver = (e) => { if (e.target.closest && e.target.closest(HOVER)) ring.classList.add("hover"); };
    const onOut = (e) => { if (e.target.closest && e.target.closest(HOVER)) ring.classList.remove("hover"); };
    const onDown = (e) => {
      ring.classList.add("down");
      const r = document.createElement("div");
      r.className = "cur-ripple";
      r.style.left = e.clientX + "px"; r.style.top = e.clientY + "px";
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 650);
    };
    const onUp = () => ring.classList.remove("down");

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerover", onOver);
    addEventListener("pointerout", onOut);
    addEventListener("pointerdown", onDown);
    addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    // 分区变色：滚到不同区块，光标用对应主题色
    const sections = [...document.querySelectorAll(".hero,.about,.work-module,.caps,.closing")];
    const accentOf = (el) =>
      el.classList.contains("work-module")
        ? getComputedStyle(el).getPropertyValue("--accent").trim() || "#9fb4ff"
        : el.classList.contains("hero") ? "#cfe0ff" : "#e6c87a"; // 关于/能力/结尾 → 金色
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) document.documentElement.style.setProperty("--cc", accentOf(e.target)); }),
      { rootMargin: "-49% 0px -49% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));

    const loop = () => {
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      rx += (mx - rx) * EASE; ry += (my - ry) * EASE;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      hist.unshift({ x: mx, y: my }); hist.pop();
      for (let i = 0; i < TRAIL; i++) {
        const h = hist[i], k = 1 - i / TRAIL;
        trail[i].style.transform = `translate(${h.x}px,${h.y}px) translate(-50%,-50%) scale(${k})`;
        trail[i].style.opacity = vis ? 0.4 * k : 0;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      removeEventListener("pointermove", onMove); removeEventListener("pointerover", onOver);
      removeEventListener("pointerout", onOut); removeEventListener("pointerdown", onDown);
      removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", hide); document.removeEventListener("mouseenter", show);
      [dot, ring, ...trail].forEach((e) => e.remove());
      document.body.classList.remove("cur-on");
    };
  }, []);

  return null;
}
