import { useEffect, useRef, useState } from "react";

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const called = useRef(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      if (called.current) return;
      called.current = true;
      document.body.classList.add("ready");
      document.documentElement.style.overflow = "";
      setDone(true);
      onDone && onDone();
    };
    document.documentElement.style.overflow = "hidden";
    if (reduce) {
      setPct(100);
      const t = setTimeout(finish, 200);
      return () => clearTimeout(t);
    }
    const DUR = 1500, t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / DUR);
      setPct(Math.round(100 * (1 - Math.pow(1 - p, 2))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, 260);
    };
    raf = requestAnimationFrame(tick);
    const safety = setTimeout(finish, 3000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      document.documentElement.style.overflow = ""; // 兜底：卸载/重跑时务必还原，避免页面锁死无法滚动
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`preloader${done ? " done" : ""}`}>
      <div className="pl-inner">
        <div className="pl-name">张小艺 · ZHANG XIAOYI</div>
        <div className="pl-num"><span>{pct}</span><i>%</i></div>
        <div className="pl-bar"><span style={{ width: pct + "%" }} /></div>
        <div className="pl-tag">LOADING PORTFOLIO</div>
      </div>
    </div>
  );
}
