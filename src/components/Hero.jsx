import { useEffect, useState } from "react";
import ShinyText from "../reactbits/ShinyText";
import { profile, stats } from "../data/site";

function Stat({ to, suffix = "", label, run }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    const dur = 1200, t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (<li className="glass stat"><b className="stat__num">{v}{suffix}</b><span>{label}</span></li>);
}

export default function Hero({ ready }) {
  return (
    <section className="hero" id="top">
      <span className="hero__spot" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__eyebrow">PERSONAL PORTFOLIO · VISUAL ART DESIGN · 2022—2026</div>
        <h1 className="hero__title">
          <ShinyText text="Design" className="hero__line" speed={4} color="#8b93a8" shineColor="#ffffff" />
          <span className="hero__line hero__line--outline">Portfolio</span>
        </h1>

        <div className="hero__main">
          <p className="hero__role">{profile.role} <span>{profile.roleEn}</span></p>
          <p className="hero__tag">{profile.tagline}</p>
          <div className="hero__actions">
            <a href="#works" className="glass glass-btn glass-btn--primary shine">查看作品 <span aria-hidden="true">↓</span></a>
            <a href="#contact" className="glass glass-btn shine">联系我</a>
          </div>
          <ul className="hero__stats">
            {stats.map((s, i) => <Stat key={i} {...s} run={ready} />)}
          </ul>
        </div>

        <a href="#about" className="hero__scroll">SCROLL</a>
      </div>
    </section>
  );
}
