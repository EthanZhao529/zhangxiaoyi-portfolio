import TiltedCard from "../reactbits/TiltedCard";
import Gallery from "./Gallery";
import Reveal from "./Reveal";
import ModuleBg from "./ModuleBg";
import { projects, img, asset } from "../data/site";

// 每模块对应风格的动态背景（按主题配色）
// 想换成"静态图→AI微动化"的视频背景：把生成好的循环 mp4 放进 public/videos/，
// 然后给对应模块加 video 字段，例如 "01": { type:"aurora", video:"/videos/work-01.mp4", ... }
// 有 video 就用视频，没有就用下面的 WebGL 背景兜底。
const BG = {
  "01": { type: "aurora", colorStops: ["#2f8f63", "#9ff5c8", "#2f8f63"], video: asset("videos/work-01.mp4") }, // 城市寻宝家 · 绿
  "02": { type: "threads", video: asset("videos/work-02.mp4") },                                              // 碧海鲜踪 · 蓝
  "03": { type: "aurora", colorStops: ["#6e5436", "#e6c074", "#6e5436"], video: asset("videos/work-03.mp4") }, // 诗意糕点 · 暖棕
  "04": { type: "threads", video: asset("videos/work-04.mp4") },                                              // 文创 · 青铜
  "05": { type: "aurora", colorStops: ["#7a1f1a", "#ff8a7e", "#7a1f1a"], video: asset("videos/work-05.mp4") }, // 广告海报 · 红
};

export default function Work({ onOpen }) {
  return (
    <section id="works">
      {projects.map((p) => {
        const coverImages = p.images || (p.subWorks && p.subWorks[0].images) || [p.cover];
        return (
          <article className={`work-module cursor-${p.no}`} id={`work-${p.no}`} style={{ "--accent": p.accent }} key={p.no}>
            <ModuleBg type={BG[p.no].type} accent={p.accent} colorStops={BG[p.no].colorStops} video={BG[p.no].video} />
            <div className="wm-inner">
              <Reveal className="wm-head">
                <span className="wm-no">{p.no}</span>
                <div>
                  <p className="wm-cat">{p.cat}</p>
                  <h2 className="wm-title">{p.title}<span>{p.en}</span></h2>
                  <ul className="wm-meta">
                    {p.meta.map((m, i) => (
                      <li key={i} className={String(m).startsWith("🏆") ? "is-award" : ""}>{m}</li>
                    ))}
                  </ul>
                  {p.lead && <p className="wm-lead">{p.lead}</p>}
                </div>
              </Reveal>

              <Reveal className="wm-cover" onClick={() => onOpen(coverImages, 0)}>
                <TiltedCard
                  imageSrc={img(p.cover)}
                  altText={`${p.title} ${p.en}`}
                  captionText={`${p.title} · ${p.en}`}
                  containerHeight="clamp(220px,42vw,540px)"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  scaleOnHover={1.04}
                  rotateAmplitude={8}
                  showMobileWarning={false}
                  showTooltip={true}
                />
              </Reveal>

              {p.subWorks ? (
                p.subWorks.map((w, i) => (
                  <Reveal className="wm-work" key={i}>
                    <div className="wm-sub">
                      <h3>{w.sub}<span>{w.subEn}</span></h3>
                      {w.award && <span className="is-award">{w.award}</span>}
                    </div>
                    <div className="wm-narr single"><div><p>{w.desc}</p></div></div>
                    <Gallery images={w.images} onOpen={onOpen} />
                  </Reveal>
                ))
              ) : (
                <Reveal className="wm-work">
                  <div className="wm-narr">
                    {p.background && <div><h4>背景 Background</h4><p>{p.background}</p></div>}
                    {p.concept && <div><h4>概念 Concept</h4><p>{p.concept}</p></div>}
                  </div>
                  <Gallery images={p.images} onOpen={onOpen} />
                </Reveal>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
