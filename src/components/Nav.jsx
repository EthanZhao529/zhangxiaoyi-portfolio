import { useEffect, useRef, useState } from "react";
import { profile, projects } from "../data/site";

const LINKS = [
  { href: "#about", cn: "关于", en: "About" },
  {
    href: "#works", cn: "作品", en: "Work",
    children: projects.map((p) => ({ href: `#work-${p.no}`, label: `${p.no} · ${p.title}` })),
  },
  { href: "#capabilities", cn: "能力", en: "Skills" },
  { href: "#contact", cn: "联系", en: "Contact" },
];

export default function Nav({ muted, onToggleMute }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // 滚动高亮当前章节
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive("#" + e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="scrollbar" ref={barRef} />
      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__brand-cn">{profile.name}</span>
          <span className="nav__brand-en">{profile.nameEn}</span>
        </a>
        <nav
          className={`nav__links${open ? " is-open" : ""}`}
          onClick={(e) => { if (e.target.closest("a")) setOpen(false); }}
        >
          {LINKS.map((l) =>
            l.children ? (
              <div className="nav__item nav__item--menu" key={l.href}>
                <a href={l.href} className={active === l.href ? "is-active" : ""}>
                  {l.cn} <em>{l.en}</em>
                </a>
                <div className="nav__menu">
                  {l.children.map((c) => (
                    <a key={c.href} href={c.href}>{c.label}</a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={l.href} href={l.href} className={active === l.href ? "is-active" : ""}>
                {l.cn} <em>{l.en}</em>
              </a>
            )
          )}
        </nav>
        <button
          className={`nav__mute${muted ? " is-muted" : ""}`}
          aria-label={muted ? "取消静音" : "静音"}
          title={muted ? "取消静音" : "静音"}
          onClick={onToggleMute}
        >
          {muted ? "🔇" : "🔊"}
        </button>
        <button className="nav__toggle" aria-label="菜单" onClick={() => setOpen((o) => !o)}>☰</button>
      </header>
    </>
  );
}
