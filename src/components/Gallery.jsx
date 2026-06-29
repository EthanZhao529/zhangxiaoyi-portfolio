import { useRef, useEffect, useState } from "react";
import { img } from "../data/site";

// 舒适尺寸横向滚动浏览；放不下才滚动并在左右两端渐隐（类 iOS 选择器），图少则自动居中。悬停上浮放大，点击看大图
export default function Gallery({ images, onOpen }) {
  const trackRef = useRef(null);
  const drag = useRef({ down: false, x: 0, sl: 0, moved: 0 });
  const [scrollable, setScrollable] = useState(false);

  // 内容宽度超过可用容器才需要滚动 + 两端渐隐；随视口变化重新判断
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // 以父容器可用宽度为基准，避免 fit-content 自身宽度变化造成误判
    const check = () => {
      const avail = el.parentElement ? el.parentElement.clientWidth : el.clientWidth;
      setScrollable(el.scrollWidth > avail + 1);
    };
    check();
    // 首屏布局/字体可能未稳定，补几次延迟复测
    const rafId = requestAnimationFrame(check);
    const t1 = setTimeout(check, 300);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(rafId); clearTimeout(t1);
      ro.disconnect(); window.removeEventListener("resize", check);
    };
  }, [images]);

  return (
    <div className="gallery gallery--row">
      <div
        className={"gal-track" + (scrollable ? " is-scroll" : "")}
        ref={trackRef}
        onPointerDown={(e) => { const d = drag.current; d.down = true; d.moved = 0; d.x = e.clientX; d.sl = trackRef.current.scrollLeft; trackRef.current.classList.add("is-drag"); trackRef.current.setPointerCapture(e.pointerId); }}
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
