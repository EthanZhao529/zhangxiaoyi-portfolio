import { useEffect } from "react";

// 液态玻璃：光斑跟随指针（给所有 .glass 元素设置 --mx/--my）
export default function GlassFX() {
  useEffect(() => {
    const els = [...document.querySelectorAll(".glass")];
    const handlers = [];
    els.forEach((el) => {
      const mv = (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      };
      const ml = () => { el.style.setProperty("--mx", "50%"); el.style.setProperty("--my", "0%"); };
      el.addEventListener("pointermove", mv);
      el.addEventListener("pointerleave", ml);
      handlers.push([el, mv, ml]);
    });
    return () => handlers.forEach(([el, mv, ml]) => {
      el.removeEventListener("pointermove", mv);
      el.removeEventListener("pointerleave", ml);
    });
  }, []);
  return null;
}
