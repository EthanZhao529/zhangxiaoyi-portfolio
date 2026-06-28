import { useRef } from "react";
import { img } from "../data/site";

// 小图排成一排（可横向拖动浏览），悬停上浮放大，点击看大图
export default function Gallery({ images, onOpen }) {
  const trackRef = useRef(null);
  const drag = useRef({ down: false, x: 0, sl: 0, moved: 0 });

  return (
    <div className="gallery gallery--row">
      <div
        className="gal-track"
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
