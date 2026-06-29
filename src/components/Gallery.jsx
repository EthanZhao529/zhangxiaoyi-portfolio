import { useRef, useEffect, useState } from "react";
import { img } from "../data/site";

// 舒适尺寸横向滚动浏览；放不下才滚动并在左右两端渐隐（类 iOS 选择器），图少则自动居中。
// 滚轮带缓动惯性更顺滑；悬停上浮放大，点击看大图。
export default function Gallery({ images, onOpen }) {
  const trackRef = useRef(null);
  const drag = useRef({ down: false, x: 0, sl: 0, moved: 0 });
  const wheel = useRef({ target: 0, raf: 0, active: false });
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // 内容宽度超过可用容器才需要滚动 + 两端渐隐；以父容器为基准避免 fit-content 误判
    const check = () => {
      const avail = el.parentElement ? el.parentElement.clientWidth : el.clientWidth;
      // avail>0 守卫：避免 0 宽挂载瞬间误判成可滚动(会错套两端渐隐遮罩)
      setScrollable(avail > 0 && el.scrollWidth > avail + 1);
    };
    check();
    const rafId = requestAnimationFrame(check);
    const t1 = setTimeout(check, 300);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", check);

    // 滚轮 = 横向滚动，带缓动惯性（逐帧逼近目标，丝滑）；到两端放行页面纵向滚动
    const maxSL = () => el.scrollWidth - el.clientWidth;
    const onWheel = (e) => {
      if (el.scrollWidth <= el.clientWidth + 1) return;
      const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;
      const atStart = el.scrollLeft <= 0, atEnd = el.scrollLeft >= maxSL() - 1;
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) { wheel.current.active = false; return; }
      e.preventDefault();
      const w = wheel.current;
      if (!w.active) w.target = el.scrollLeft;
      w.target = Math.max(0, Math.min(maxSL(), w.target + delta * 1.15));
      if (!w.active) {
        w.active = true;
        const step = () => {
          const diff = w.target - el.scrollLeft;
          if (Math.abs(diff) < 0.5) { el.scrollLeft = w.target; w.active = false; return; }
          el.scrollLeft += diff * 0.18; // 缓动系数：越小越顺滑越慢
          w.raf = requestAnimationFrame(step);
        };
        step();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(rafId); clearTimeout(t1);
      cancelAnimationFrame(wheel.current.raf);
      ro.disconnect();
      window.removeEventListener("resize", check);
      el.removeEventListener("wheel", onWheel);
    };
  }, [images]);

  return (
    <div className="gallery gallery--row">
      <div
        className={"gal-track" + (scrollable ? " is-scroll" : "")}
        ref={trackRef}
        onPointerDown={(e) => { const d = drag.current; d.down = true; d.moved = 0; d.x = e.clientX; d.sl = trackRef.current.scrollLeft; wheel.current.active = false; cancelAnimationFrame(wheel.current.raf); trackRef.current.classList.add("is-drag"); trackRef.current.setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { const d = drag.current; if (!d.down) return; const dx = e.clientX - d.x; d.moved = Math.max(d.moved, Math.abs(dx)); trackRef.current.scrollLeft = d.sl - dx; }}
        onPointerUp={() => { drag.current.down = false; trackRef.current.classList.remove("is-drag"); }}
        onPointerCancel={() => { drag.current.down = false; trackRef.current.classList.remove("is-drag"); }}
      >
        {images.map((n, k) => (
          <figure className="gal-item" key={k} onClick={() => { if (drag.current.moved <= 6) onOpen(images, k); }}>
            <img src={img(n)} alt="作品" loading="lazy" draggable="false" />
          </figure>
        ))}
      </div>
    </div>
  );
}
