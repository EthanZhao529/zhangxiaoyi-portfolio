import { useEffect, useState, useCallback } from "react";
import { img } from "../data/site";

export default function Lightbox({ images, index, onClose }) {
  const [i, setI] = useState(index);
  const step = useCallback((d) => setI((p) => (p + d + images.length) % images.length), [images.length]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", onKey); };
  }, [onClose, step]);

  const multi = images.length > 1;
  return (
    <div className="viewer is-open" onClick={(e) => { if (e.target.classList.contains("viewer")) onClose(); }}>
      <button className="viewer__close" onClick={onClose} aria-label="关闭">✕</button>
      {multi && <button className="viewer__nav viewer__prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="上一张">‹</button>}
      <img className="viewer__img" src={img(images[i])} alt="" />
      {multi && <button className="viewer__nav viewer__next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="下一张">›</button>}
      <div className="viewer__count">{i + 1} / {images.length}</div>
    </div>
  );
}
