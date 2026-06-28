import { useEffect, useRef, useState } from "react";
import Aurora from "../reactbits/Aurora";
import Threads from "../reactbits/Threads";

const hexToRgb01 = (hex) => {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const n = parseInt(hex, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

// 每个作品模块的动态背景：
//   - 若提供 video（按"静态图→AI微动化"流程生成的循环 mp4），用全屏视频背景层
//   - 否则回退到 React Bits 的 WebGL 背景（Aurora / Threads）
//   - 只在进入视口时才挂载，离开即卸载，省性能
export default function ModuleBg({ type, accent, colorStops, video }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [videoOk, setVideoOk] = useState(Boolean(video));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => setShow(es[0].isIntersecting),
      { rootMargin: "240px 0px 240px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let layer = null;
  if (show) {
    if (video && videoOk) {
      layer = (
        <video
          className="module-bg__video"
          src={video}
          muted
          loop
          autoPlay
          playsInline
          preload="none"
          onError={() => setVideoOk(false)}
        />
      );
    } else if (type === "threads") {
      layer = <Threads color={hexToRgb01(accent)} amplitude={1} distance={0.2} />;
    } else {
      layer = <Aurora colorStops={colorStops || [accent, "#ffffff", accent]} amplitude={1.1} blend={0.5} speed={0.7} />;
    }
  }

  return (
    <div className="module-bg" ref={ref} aria-hidden="true">
      {layer}
      <div className="module-bg__overlay" />
    </div>
  );
}
